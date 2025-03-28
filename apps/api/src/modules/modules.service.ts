import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async create(createModuleDto: CreateModuleDto, userId: string) {
    // Check if the course exists
    const course = await this.prisma.course.findUnique({
      where: { id: createModuleDto.courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Check if the user is the owner of the course or an admin
    if (course.ownerId !== userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || user.role !== UserRole.ADMIN) {
        throw new ForbiddenException(
          'You do not have permission to add modules to this course',
        );
      }
    }

    // Create the module
    return this.prisma.module.create({
      data: {
        title: createModuleDto.title,
        order: createModuleDto.order,
        courseId: createModuleDto.courseId,
      },
    });
  }

  async findAll(courseId: string) {
    // Check if the course exists
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Get all modules for the course
    return this.prisma.module.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findOne(id: string) {
    const module = await this.prisma.module.findUnique({
      where: { id },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
        },
        course: {
          select: {
            id: true,
            title: true,
            ownerId: true,
          },
        },
      },
    });

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    return module;
  }

  async update(id: string, updateModuleDto: UpdateModuleDto, userId: string) {
    // Check if the module exists
    const module = await this.prisma.module.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            ownerId: true,
          },
        },
      },
    });

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    // Check if the user is the owner of the course or an admin
    if (module.course.ownerId !== userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || user.role !== UserRole.ADMIN) {
        throw new ForbiddenException(
          'You do not have permission to update this module',
        );
      }
    }

    // Update the module
    return this.prisma.module.update({
      where: { id },
      data: updateModuleDto,
    });
  }

  async remove(id: string, userId: string) {
    // Check if the module exists
    const module = await this.prisma.module.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            ownerId: true,
          },
        },
      },
    });

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    // Check if the user is the owner of the course or an admin
    if (module.course.ownerId !== userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user || user.role !== UserRole.ADMIN) {
        throw new ForbiddenException(
          'You do not have permission to delete this module',
        );
      }
    }

    // Delete the module
    await this.prisma.module.delete({
      where: { id },
    });

    return { message: 'Module deleted successfully' };
  }
}
