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
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
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

@ApiTags('modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new module (Instructor & Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Module created successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - You do not have permission',
  })
  create(@Body() createModuleDto: CreateModuleDto, @Request() req) {
    return this.modulesService.create(createModuleDto, req.user.id);
  }

  @Get('course/:courseId')
  @Public()
  @ApiOperation({ summary: 'Get all modules for a course' })
  @ApiResponse({
    status: 200,
    description: 'Return all modules for a course',
  })
  @ApiResponse({
    status: 404,
    description: 'Course not found',
  })
  @ApiParam({ name: 'courseId', description: 'Course ID' })
  findAll(@Param('courseId') courseId: string) {
    return this.modulesService.findAll(courseId);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a module by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the module',
  })
  @ApiResponse({
    status: 404,
    description: 'Module not found',
  })
  @ApiParam({ name: 'id', description: 'Module ID' })
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a module (Owner & Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Module updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - You do not have permission',
  })
  @ApiResponse({
    status: 404,
    description: 'Module not found',
  })
  @ApiParam({ name: 'id', description: 'Module ID' })
  update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
    @Request() req,
  ) {
    return this.modulesService.update(id, updateModuleDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a module (Owner & Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Module deleted successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - You do not have permission',
  })
  @ApiResponse({
    status: 404,
    description: 'Module not found',
  })
  @ApiParam({ name: 'id', description: 'Module ID' })
  remove(@Param('id') id: string, @Request() req) {
    return this.modulesService.remove(id, req.user.id);
  }
}
