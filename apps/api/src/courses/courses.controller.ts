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
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
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
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new course (Instructor & Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Course created successfully',
  })
  create(@Body() createCourseDto: CreateCourseDto, @Request() req) {
    return this.coursesService.create(createCourseDto, req.user.id);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({
    status: 200,
    description: 'Return all courses',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.coursesService.findAll(page ? +page : 1, limit ? +limit : 10);
  }

  @Get('my-courses')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Get all courses owned by the current user (Instructor & Admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all courses owned by the current user',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  findMyCourses(
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.coursesService.findByOwner(
      req.user.id,
      page ? +page : 1,
      limit ? +limit : 10,
    );
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a course by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the course',
  })
  @ApiResponse({
    status: 404,
    description: 'Course not found',
  })
  @ApiParam({ name: 'id', description: 'Course ID' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a course (Owner & Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Course updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Course not found',
  })
  @ApiParam({ name: 'id', description: 'Course ID' })
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Request() req,
  ) {
    // Check if user is owner or admin
    const course = await this.coursesService.findOne(id);

    if (course.ownerId !== req.user.id && req.user.role !== UserRole.ADMIN) {
      return { message: 'You do not have permission to update this course' };
    }

    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a course (Owner & Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Course deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Course not found',
  })
  @ApiParam({ name: 'id', description: 'Course ID' })
  async remove(@Param('id') id: string, @Request() req) {
    // Check if user is owner or admin
    const course = await this.coursesService.findOne(id);

    if (course.ownerId !== req.user.id && req.user.role !== UserRole.ADMIN) {
      return { message: 'You do not have permission to delete this course' };
    }

    return this.coursesService.remove(id);
  }
}
