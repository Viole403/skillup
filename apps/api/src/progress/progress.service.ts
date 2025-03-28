import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createProgressDto: CreateProgressDto) {
    // Check if the lesson exists
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: createProgressDto.lessonId },
      include: {
        module: {
          include: {
            course: {
              include: {
                enrollments: {
                  where: {
                    userId,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Check if the user is enrolled in the course that contains this lesson
    if (lesson.module.course.enrollments.length === 0) {
      throw new ConflictException('User is not enrolled in this course');
    }

    // Check if progress for this lesson already exists
    const existingProgress = await this.prisma.progress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId: createProgressDto.lessonId,
        },
      },
    });

    if (existingProgress) {
      // Update existing progress instead of creating a new one
      return this.update(userId, existingProgress.id, {
        completed:
          createProgressDto.completed !== undefined
            ? createProgressDto.completed
            : existingProgress.completed,
        lastViewed: new Date(),
      });
    }

    // Create the progress record
    return this.prisma.progress.create({
      data: {
        user: { connect: { id: userId } },
        lesson: { connect: { id: createProgressDto.lessonId } },
        completed:
          createProgressDto.completed !== undefined
            ? createProgressDto.completed
            : false,
      },
    });
  }

  async findAllForUser(userId: string) {
    return this.prisma.progress.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        lastViewed: 'desc',
      },
    });
  }

  async findAllForCourse(userId: string, courseId: string) {
    // Get all lessons in the course
    const courseLessons = await this.prisma.lesson.findMany({
      where: {
        module: {
          courseId,
        },
      },
      include: {
        module: true,
      },
      orderBy: [
        {
          module: {
            order: 'asc',
          },
        },
        {
          order: 'asc',
        },
      ],
    });

    // Get progress for each lesson
    const progress = await this.prisma.progress.findMany({
      where: {
        userId,
        lesson: {
          module: {
            courseId,
          },
        },
      },
    });

    // Create a map for quick lookups
    const progressMap = new Map();
    progress.forEach((p) => {
      progressMap.set(p.lessonId, p);
    });

    // Combine lesson data with progress data
    return courseLessons.map((lesson) => {
      const lessonProgress = progressMap.get(lesson.id);
      return {
        lessonId: lesson.id,
        moduleId: lesson.moduleId,
        moduleTitle: lesson.module.title,
        moduleOrder: lesson.module.order,
        lessonTitle: lesson.title,
        lessonOrder: lesson.order,
        completed: lessonProgress ? lessonProgress.completed : false,
        lastViewed: lessonProgress ? lessonProgress.lastViewed : null,
        progressId: lessonProgress ? lessonProgress.id : null,
      };
    });
  }

  async findOne(userId: string, progressId: string) {
    const progress = await this.prisma.progress.findFirst({
      where: {
        id: progressId,
        userId,
      },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true,
              },
            },
          },
        },
      },
    });

    if (!progress) {
      throw new NotFoundException('Progress not found');
    }

    return progress;
  }

  async update(
    userId: string,
    progressId: string,
    updateProgressDto: UpdateProgressDto,
  ) {
    // Check if the progress exists and belongs to the user
    const progress = await this.prisma.progress.findFirst({
      where: {
        id: progressId,
        userId,
      },
    });

    if (!progress) {
      throw new NotFoundException('Progress not found');
    }

    // Update the progress
    return this.prisma.progress.update({
      where: { id: progressId },
      data: {
        ...updateProgressDto,
        // Always update lastViewed when progress is updated
        lastViewed: updateProgressDto.lastViewed || new Date(),
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            moduleId: true,
            module: {
              select: {
                title: true,
                courseId: true,
                course: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getCourseProgress(userId: string, courseId: string) {
    // Get the total number of lessons in the course
    const totalLessonsResult = await this.prisma.lesson.count({
      where: {
        module: {
          courseId,
        },
      },
    });

    // Get the total number of completed lessons
    const completedLessonsResult = await this.prisma.progress.count({
      where: {
        userId,
        completed: true,
        lesson: {
          module: {
            courseId,
          },
        },
      },
    });

    // Get the most recently viewed lesson
    const recentProgress = await this.prisma.progress.findFirst({
      where: {
        userId,
        lesson: {
          module: {
            courseId,
          },
        },
      },
      orderBy: {
        lastViewed: 'desc',
      },
      include: {
        lesson: {
          include: {
            module: true,
          },
        },
      },
    });

    return {
      totalLessons: totalLessonsResult,
      completedLessons: completedLessonsResult,
      progressPercentage:
        totalLessonsResult > 0
          ? Math.round((completedLessonsResult / totalLessonsResult) * 100)
          : 0,
      currentLesson: recentProgress
        ? {
            lessonId: recentProgress.lesson.id,
            lessonTitle: recentProgress.lesson.title,
            moduleId: recentProgress.lesson.moduleId,
            moduleTitle: recentProgress.lesson.module.title,
            lastViewed: recentProgress.lastViewed,
          }
        : null,
    };
  }
}
