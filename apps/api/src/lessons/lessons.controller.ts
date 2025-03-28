import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { Public } from '../auth/decorators/public.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new lesson (Instructor & Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Lesson created successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - You do not have permission',
  })
  create(@Body() createLessonDto: CreateLessonDto, @Request() req) {
    return this.lessonsService.create(createLessonDto, req.user.id);
  }

  @Get('module/:moduleId')
  @Public()
  @ApiOperation({ summary: 'Get all lessons for a module' })
  @ApiResponse({
    status: 200,
    description: 'Return all lessons for a module',
  })
  @ApiResponse({
    status: 404,
    description: 'Module not found',
  })
  @ApiParam({ name: 'moduleId', description: 'Module ID' })
  findAll(@Param('moduleId') moduleId: string) {
    return this.lessonsService.findAll(moduleId);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a lesson by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the lesson',
  })
  @ApiResponse({
    status: 404,
    description: 'Lesson not found',
  })
  @ApiParam({ name: 'id', description: 'Lesson ID' })
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a lesson (Owner & Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Lesson updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - You do not have permission',
  })
  @ApiResponse({
    status: 404,
    description: 'Lesson not found',
  })
  @ApiParam({ name: 'id', description: 'Lesson ID' })
  update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @Request() req,
  ) {
    return this.lessonsService.update(id, updateLessonDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a lesson (Owner & Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Lesson deleted successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - You do not have permission',
  })
  @ApiResponse({
    status: 404,
    description: 'Lesson not found',
  })
  @ApiParam({ name: 'id', description: 'Lesson ID' })
  remove(@Param('id') id: string, @Request() req) {
    return this.lessonsService.remove(id, req.user.id);
  }
}
