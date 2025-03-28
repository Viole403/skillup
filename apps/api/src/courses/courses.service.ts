import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto, ownerId: string) {
    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        ownerId,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        skip,
        take: limit,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              modules: true,
              enrollments: true,
            },
          },
        },
      }),
      this.prisma.course.count(),
    ]);

    return {
      data: courses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
        modules: {
          include: {
            lessons: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    // Check if course exists
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Update course
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string) {
    // Check if course exists
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Delete course
    await this.prisma.course.delete({
      where: { id },
    });

    return { message: 'Course deleted successfully' };
  }

  async findByOwner(ownerId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where: { ownerId },
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              modules: true,
              enrollments: true,
            },
          },
        },
      }),
      this.prisma.course.count({
        where: { ownerId },
      }),
    ]);

    return {
      data: courses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createCourse(userId: string, createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        owner: {
          connect: { id: userId },
        },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAllCourses() {
    return this.prisma.course.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            students: true,
            modules: true,
          },
        },
      },
    });
  }

  async findCourseById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        modules: {
          orderBy: {
            order: 'asc',
          },
          include: {
            lessons: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async updateCourse(
    userId: string,
    courseId: string,
    updateCourseDto: UpdateCourseDto,
    userRole: UserRole,
  ) {
    // Check if the course exists
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { ownerId: true },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Check if the user is the owner or an admin
    if (course.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to update this course',
      );
    }

    return this.prisma.course.update({
      where: { id: courseId },
      data: updateCourseDto,
    });
  }

  async deleteCourse(userId: string, courseId: string, userRole: UserRole) {
    // Check if the course exists
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { ownerId: true },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Check if the user is the owner or an admin
    if (course.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to delete this course',
      );
    }

    return this.prisma.course.delete({
      where: { id: courseId },
    });
  }

  async enrollInCourse(userId: string, courseId: string) {
    // Check if the course exists
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Enroll the user in the course
    return this.prisma.course.update({
      where: { id: courseId },
      data: {
        students: {
          connect: { id: userId },
        },
      },
    });
  }

  async createModule(
    userId: string,
    courseId: string,
    createModuleDto: CreateModuleDto,
    userRole: UserRole,
  ) {
    // Check if the course exists and if the user is the owner
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { ownerId: true },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Check if the user is the owner or an admin
    if (course.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to add modules to this course',
      );
    }

    return this.prisma.module.create({
      data: {
        ...createModuleDto,
        course: {
          connect: { id: courseId },
        },
      },
    });
  }

  async createLesson(
    userId: string,
    courseId: string,
    moduleId: string,
    createLessonDto: CreateLessonDto,
    userRole: UserRole,
  ) {
    // Check if the module exists and if the user is the owner of the course
    const module = await this.prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        course: {
          select: {
            id: true,
            ownerId: true,
          },
        },
      },
    });

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    if (module.course.id !== courseId) {
      throw new NotFoundException(
        'Module does not belong to the specified course',
      );
    }

    // Check if the user is the owner or an admin
    if (module.course.ownerId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to add lessons to this module',
      );
    }

    return this.prisma.lesson.create({
      data: {
        ...createLessonDto,
        module: {
          connect: { id: moduleId },
        },
      },
    });
  }
}
