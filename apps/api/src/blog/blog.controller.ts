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
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('blog')
@Controller('blog')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // Blog Posts Endpoints
  @Post()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new blog post',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  createBlog(@Request() req, @Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(req.user.sub, createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog posts with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns all blog posts with pagination',
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
  findAllBlogs(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.blogService.findAllBlogs(page ? +page : 1, limit ? +limit : 10);
  }

  @Get('author/:authorId')
  @ApiOperation({ summary: 'Get all blog posts by a specific author' })
  @ApiResponse({
    status: 200,
    description: 'Returns all blog posts by the specified author',
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
  findBlogsByAuthor(
    @Param('authorId') authorId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.blogService.findBlogsByAuthor(
      authorId,
      page ? +page : 1,
      limit ? +limit : 10,
    );
  }

  @Get('me')
  @ApiOperation({ summary: 'Get all blog posts by the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Returns all blog posts by the authenticated user',
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
  findMyBlogs(
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.blogService.findBlogsByAuthor(
      req.user.sub,
      page ? +page : 1,
      limit ? +limit : 10,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog post by ID' })
  @ApiResponse({ status: 200, description: 'Returns the blog post' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  findOneBlog(@Request() req, @Param('id') id: string) {
    return this.blogService.findOneBlog(id, req.user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog post' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the blog post',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Not authorized to update this blog post',
  })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  updateBlog(
    @Request() req,
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogService.updateBlog(
      req.user.sub,
      id,
      updateBlogDto,
      req.user.role,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog post' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the blog post',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Not authorized to delete this blog post',
  })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  removeBlog(@Request() req, @Param('id') id: string) {
    return this.blogService.removeBlog(req.user.sub, id, req.user.role);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get blog post statistics' })
  @ApiResponse({
    status: 200,
    description: 'Returns blog post statistics (likes, views, comments)',
  })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  getBlogStats(@Param('id') id: string) {
    return this.blogService.getBlogStats(id);
  }

  // Comments Endpoints
  @Post('comment')
  @ApiOperation({ summary: 'Create a new comment on a blog post' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new comment',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  createComment(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    return this.blogService.createComment(req.user.sub, createCommentDto);
  }

  @Patch('comment/:id')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the comment',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Not authorized to update this comment',
  })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  updateComment(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.blogService.updateComment(
      req.user.sub,
      id,
      updateCommentDto,
      req.user.role,
    );
  }

  @Delete('comment/:id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the comment',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Not authorized to delete this comment',
  })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  removeComment(@Request() req, @Param('id') id: string) {
    return this.blogService.removeComment(req.user.sub, id, req.user.role);
  }

  // Likes Endpoints
  @Post(':id/like')
  @ApiOperation({ summary: 'Like or unlike a blog post' })
  @ApiResponse({
    status: 200,
    description: 'Successfully liked/unliked the blog post',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  likeOrUnlikeBlog(@Request() req, @Param('id') id: string) {
    return this.blogService.likeOrUnlikeBlog(req.user.sub, id);
  }

  @Get(':id/liked')
  @ApiOperation({
    summary: 'Check if the authenticated user has liked a blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns whether the user has liked the blog post',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  checkLiked(@Request() req, @Param('id') id: string) {
    return this.blogService.checkLiked(req.user.sub, id);
  }
}
