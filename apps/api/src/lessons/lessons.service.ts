import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async create(createLessonDto: CreateLessonDto, userId: string) {
    // Verify module exists
    const module = await this.prisma.module.findUnique({
      where: { id: createLessonDto.moduleId },
      include: { course: true },
    });

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    // Check if user is the course owner or admin
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== UserRole.ADMIN && module.course.ownerId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to add lessons to this module',
      );
    }

    // Get all lessons for the module to determine max order
    const existingLessons = await this.prisma.lesson.findMany({
      where: { moduleId: createLessonDto.moduleId },
      orderBy: { order: 'desc' },
      take: 1,
    });

    // Set order to be the max + 1, or 1 if no existing lessons
    const order = existingLessons.length > 0 ? existingLessons[0].order + 1 : 1;

    return this.prisma.lesson.create({
      data: {
        ...createLessonDto,
        order,
      },
    });
  }

  async findAll(moduleId: string) {
    // Verify module exists
    const module = await this.prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    return this.prisma.lesson.findMany({
      where: { moduleId },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto, userId: string) {
    // Verify lesson exists and get related info
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Check if user is the course owner or admin
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (
      user.role !== UserRole.ADMIN &&
      lesson.module.course.ownerId !== userId
    ) {
      throw new ForbiddenException(
        'You do not have permission to update this lesson',
      );
    }

    return this.prisma.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
  }

  async remove(id: string, userId: string) {
    // Verify lesson exists and get related info
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Check if user is the course owner or admin
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (
      user.role !== UserRole.ADMIN &&
      lesson.module.course.ownerId !== userId
    ) {
      throw new ForbiddenException(
        'You do not have permission to delete this lesson',
      );
    }

    await this.prisma.lesson.delete({
      where: { id },
    });

    return { message: 'Lesson deleted successfully' };
  }
}
