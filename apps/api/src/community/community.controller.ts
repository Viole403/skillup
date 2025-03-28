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
import { CommunityService } from './community.service';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('community')
@Controller('community')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new community post' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new community post',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Request() req,
    @Body() createCommunityPostDto: CreateCommunityPostDto,
  ) {
    return this.communityService.create(req.user.sub, createCommunityPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all community posts with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns all community posts with pagination',
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
    return this.communityService.findAll(page ? +page : 1, limit ? +limit : 10);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all community posts by a specific user' })
  @ApiResponse({
    status: 200,
    description: 'Returns all community posts by the specified user',
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
  findByUser(
    @Param('userId') userId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.communityService.findByUser(
      userId,
      page ? +page : 1,
      limit ? +limit : 10,
    );
  }

  @Get('me')
  @ApiOperation({
    summary: 'Get all community posts by the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all community posts by the authenticated user',
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
  findMine(
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.communityService.findByUser(
      req.user.sub,
      page ? +page : 1,
      limit ? +limit : 10,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a community post by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the community post',
  })
  @ApiResponse({ status: 404, description: 'Community post not found' })
  findOne(@Param('id') id: string) {
    return this.communityService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a community post' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the community post',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 404,
    description: 'Community post not found or not authorized to update',
  })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCommunityPostDto: UpdateCommunityPostDto,
  ) {
    return this.communityService.update(
      req.user.sub,
      id,
      updateCommunityPostDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a community post' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the community post',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 404,
    description: 'Community post not found or not authorized to delete',
  })
  remove(@Request() req, @Param('id') id: string) {
    return this.communityService.remove(req.user.sub, id);
  }
}
