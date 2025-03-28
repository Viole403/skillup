import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createEnrollmentDto: CreateEnrollmentDto) {
    // Check if the user is already enrolled in the course
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: createEnrollmentDto.courseId,
        },
      },
    });

    if (existingEnrollment) {
      throw new ConflictException('User is already enrolled in this course');
    }

    // Check if the course exists
    const course = await this.prisma.course.findUnique({
      where: { id: createEnrollmentDto.courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Create the enrollment
    return this.prisma.enrollment.create({
      data: {
        user: { connect: { id: userId } },
        course: { connect: { id: createEnrollmentDto.courseId } },
        enrollmentDate: createEnrollmentDto.enrollmentDate || new Date(),
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            modules: {
              select: {
                id: true,
                title: true,
                _count: {
                  select: {
                    lessons: true,
                  },
                },
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
      orderBy: {
        enrollmentDate: 'desc',
      },
    });
  }

  async findOne(userId: string, enrollmentId: string) {
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        id: enrollmentId,
        userId,
      },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return enrollment;
  }

  async update(
    userId: string,
    enrollmentId: string,
    updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    // Check if the enrollment exists and belongs to the user
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        id: enrollmentId,
        userId,
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    // Update the enrollment
    return this.prisma.enrollment.update({
      where: { id: enrollmentId },
      data: updateEnrollmentDto,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  async remove(userId: string, enrollmentId: string) {
    // Check if the enrollment exists and belongs to the user
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        id: enrollmentId,
        userId,
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    // Delete the enrollment
    return this.prisma.enrollment.delete({
      where: { id: enrollmentId },
    });
  }
}
