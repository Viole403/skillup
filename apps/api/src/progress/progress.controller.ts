import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('progress')
@Controller('progress')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update lesson progress' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created or updated progress',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  @ApiResponse({
    status: 409,
    description: 'User is not enrolled in the course',
  })
  create(@Request() req, @Body() createProgressDto: CreateProgressDto) {
    return this.progressService.create(req.user.sub, createProgressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all progress for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Returns all progress for the authenticated user',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Request() req) {
    return this.progressService.findAllForUser(req.user.sub);
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all progress for a specific course' })
  @ApiResponse({
    status: 200,
    description: 'Returns all progress for the specified course',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAllForCourse(@Request() req, @Param('courseId') courseId: string) {
    return this.progressService.findAllForCourse(req.user.sub, courseId);
  }

  @Get('course/:courseId/summary')
  @ApiOperation({ summary: 'Get progress summary for a course' })
  @ApiResponse({
    status: 200,
    description: 'Returns progress summary for the course',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getCourseProgress(@Request() req, @Param('courseId') courseId: string) {
    return this.progressService.getCourseProgress(req.user.sub, courseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get progress by ID' })
  @ApiResponse({ status: 200, description: 'Returns the progress' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Progress not found' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.progressService.findOne(req.user.sub, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update progress' })
  @ApiResponse({ status: 200, description: 'Successfully updated progress' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Progress not found' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateProgressDto: UpdateProgressDto,
  ) {
    return this.progressService.update(req.user.sub, id, updateProgressDto);
  }
}
