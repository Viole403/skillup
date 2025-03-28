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
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole, LectureStatus } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('lecture')
@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new lecture application' })
  @ApiResponse({
    status: 201,
    description: 'Lecture application created successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createLectureDto: CreateLectureDto, @Request() req) {
    return this.lectureService.create(createLectureDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Get all lecture applications (Admin) or current user applications',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all lecture applications',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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
  @ApiQuery({
    name: 'status',
    required: false,
    enum: LectureStatus,
    description: 'Filter by status',
  })
  findAll(
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: LectureStatus,
  ) {
    // If admin, get all applications with optional filtering
    if (req.user.role === UserRole.ADMIN) {
      return this.lectureService.findAll(
        page ? +page : 1,
        limit ? +limit : 10,
        status,
      );
    }

    // For regular users, get only their applications
    return this.lectureService.findAllByUser(
      req.user.id,
      page ? +page : 1,
      limit ? +limit : 10,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get lecture application by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the lecture application',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Lecture application not found' })
  @ApiParam({ name: 'id', description: 'Lecture application ID' })
  async findOne(@Param('id') id: string, @Request() req) {
    const lectureApplication = await this.lectureService.findOne(id);

    // Check if the user is the owner or admin
    if (
      lectureApplication.userId !== req.user.id &&
      req.user.role !== UserRole.ADMIN
    ) {
      return { message: 'Access denied' };
    }

    return lectureApplication;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update lecture application' })
  @ApiResponse({
    status: 200,
    description: 'Lecture application updated successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - you do not have permission',
  })
  @ApiResponse({ status: 404, description: 'Lecture application not found' })
  @ApiParam({ name: 'id', description: 'Lecture application ID' })
  update(
    @Param('id') id: string,
    @Body() updateLectureDto: UpdateLectureDto,
    @Request() req,
  ) {
    const isAdmin = req.user.role === UserRole.ADMIN;
    return this.lectureService.update(
      id,
      updateLectureDto,
      req.user.id,
      isAdmin,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete lecture application' })
  @ApiResponse({
    status: 200,
    description: 'Lecture application deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - you do not have permission',
  })
  @ApiResponse({ status: 404, description: 'Lecture application not found' })
  @ApiParam({ name: 'id', description: 'Lecture application ID' })
  remove(@Param('id') id: string, @Request() req) {
    const isAdmin = req.user.role === UserRole.ADMIN;
    return this.lectureService.remove(id, req.user.id, isAdmin);
  }
}
