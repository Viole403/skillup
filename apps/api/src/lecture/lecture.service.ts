import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { LectureStatus } from '@prisma/client';

@Injectable()
export class LectureService {
  constructor(private prisma: PrismaService) {}

  async create(createLectureDto: CreateLectureDto, userId: string) {
    // Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create lecture application
    return this.prisma.lectureApplication.create({
      data: {
        ...createLectureDto,
        status: LectureStatus.PENDING,
        userId,
      },
    });
  }

  async findAll(page = 1, limit = 10, status?: LectureStatus) {
    const skip = (page - 1) * limit;

    // Build where conditions
    const where = status ? { status } : {};

    // Get total count for pagination
    const total = await this.prisma.lectureApplication.count({ where });

    // Get lecture applications with pagination
    const lectureApplications = await this.prisma.lectureApplication.findMany({
      skip,
      take: limit,
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: lectureApplications,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findAllByUser(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    // Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get total count for pagination
    const total = await this.prisma.lectureApplication.count({
      where: { userId },
    });

    // Get user's lecture applications with pagination
    const lectureApplications = await this.prisma.lectureApplication.findMany({
      skip,
      take: limit,
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: lectureApplications,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const lectureApplication = await this.prisma.lectureApplication.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });

    if (!lectureApplication) {
      throw new NotFoundException('Lecture application not found');
    }

    return lectureApplication;
  }

  async update(
    id: string,
    updateLectureDto: UpdateLectureDto,
    userId: string,
    isAdmin: boolean,
  ) {
    // Find the lecture application
    const lectureApplication = await this.prisma.lectureApplication.findUnique({
      where: { id },
    });

    if (!lectureApplication) {
      throw new NotFoundException('Lecture application not found');
    }

    // Check permission - only the owner or admin can update
    if (lectureApplication.userId !== userId && !isAdmin) {
      throw new ForbiddenException(
        'You do not have permission to update this lecture application',
      );
    }

    // Restrict users from changing the status (only admins can)
    if (!isAdmin && updateLectureDto.status) {
      delete updateLectureDto.status;
    }

    // Regular users cannot add feedback
    if (!isAdmin && updateLectureDto.feedback) {
      delete updateLectureDto.feedback;
    }

    // Update lecture application
    return this.prisma.lectureApplication.update({
      where: { id },
      data: updateLectureDto,
    });
  }

  async remove(id: string, userId: string, isAdmin: boolean) {
    // Find the lecture application
    const lectureApplication = await this.prisma.lectureApplication.findUnique({
      where: { id },
    });

    if (!lectureApplication) {
      throw new NotFoundException('Lecture application not found');
    }

    // Check permission - only the owner or admin can delete
    if (lectureApplication.userId !== userId && !isAdmin) {
      throw new ForbiddenException(
        'You do not have permission to delete this lecture application',
      );
    }

    // Delete the lecture application
    await this.prisma.lectureApplication.delete({
      where: { id },
    });

    return { message: 'Lecture application deleted successfully' };
  }
}
