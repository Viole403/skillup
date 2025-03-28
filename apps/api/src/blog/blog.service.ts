import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  // Blog Posts Operations
  async createBlog(authorId: string, createBlogDto: CreateBlogDto) {
    return this.prisma.blog.create({
      data: {
        title: createBlogDto.title,
        content: createBlogDto.content,
        imageUrl: createBlogDto.imageUrl,
        author: { connect: { id: authorId } },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAllBlogs(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [blogs, totalCount] = await Promise.all([
      this.prisma.blog.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
              views: true,
            },
          },
        },
      }),
      this.prisma.blog.count(),
    ]);

    return {
      data: blogs,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async findBlogsByAuthor(authorId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [blogs, totalCount] = await Promise.all([
      this.prisma.blog.findMany({
        where: { authorId },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
              views: true,
            },
          },
        },
      }),
      this.prisma.blog.count({
        where: { authorId },
      }),
    ]);

    return {
      data: blogs,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async findOneBlog(id: string, userId?: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            likes: true,
            views: true,
          },
        },
      },
    });

    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }

    // Record the view if userId is provided
    if (userId) {
      await this.recordView(id, userId);
    }

    return blog;
  }

  async updateBlog(
    userId: string,
    id: string,
    updateBlogDto: UpdateBlogDto,
    userRole: UserRole,
  ) {
    // Check if the blog post exists
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }

    // Check if the user is the author or an admin
    if (blog.authorId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You are not authorized to update this blog post',
      );
    }

    return this.prisma.blog.update({
      where: { id },
      data: updateBlogDto,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async removeBlog(userId: string, id: string, userRole: UserRole) {
    // Check if the blog post exists
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }

    // Check if the user is the author or an admin
    if (blog.authorId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You are not authorized to delete this blog post',
      );
    }

    return this.prisma.blog.delete({
      where: { id },
    });
  }

  // Comments Operations
  async createComment(userId: string, createCommentDto: CreateCommentDto) {
    // Check if the blog post exists
    const blog = await this.prisma.blog.findUnique({
      where: { id: createCommentDto.blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }

    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        user: { connect: { id: userId } },
        blog: { connect: { id: createCommentDto.blogId } },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async updateComment(
    userId: string,
    commentId: string,
    updateCommentDto: UpdateCommentDto,
    userRole: UserRole,
  ) {
    // Check if the comment exists
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // Check if the user is the comment author or an admin
    if (comment.userId !== userId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'You are not authorized to update this comment',
      );
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: updateCommentDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async removeComment(userId: string, commentId: string, userRole: UserRole) {
    // Check if the comment exists
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true, blog: { select: { authorId: true } } },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // Check if the user is the comment author, blog author, or an admin
    if (
      comment.userId !== userId &&
      comment.blog.authorId !== userId &&
      userRole !== UserRole.ADMIN
    ) {
      throw new ForbiddenException(
        'You are not authorized to delete this comment',
      );
    }

    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }

  // Likes Operations
  async likeOrUnlikeBlog(userId: string, blogId: string) {
    // Check if the blog post exists
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }

    // Check if the user has already liked this blog post
    const existingLike = await this.prisma.like.findUnique({
      where: {
        blogId_userId: {
          blogId,
          userId,
        },
      },
    });

    if (existingLike) {
      // If they already liked it, remove the like (unlike)
      await this.prisma.like.delete({
        where: {
          blogId_userId: {
            blogId,
            userId,
          },
        },
      });
      return { liked: false };
    } else {
      // Otherwise, create a new like
      await this.prisma.like.create({
        data: {
          user: { connect: { id: userId } },
          blog: { connect: { id: blogId } },
        },
      });
      return { liked: true };
    }
  }

  async checkLiked(userId: string, blogId: string) {
    const like = await this.prisma.like.findUnique({
      where: {
        blogId_userId: {
          blogId,
          userId,
        },
      },
    });

    return { liked: !!like };
  }

  // Views Operations
  async recordView(blogId: string, userId: string) {
    // Check if the blog post exists
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }

    // Check if the user has already viewed this blog post
    const existingView = await this.prisma.view.findUnique({
      where: {
        blogId_userId: {
          blogId,
          userId,
        },
      },
    });

    if (existingView) {
      // Update the viewDate
      return this.prisma.view.update({
        where: {
          blogId_userId: {
            blogId,
            userId,
          },
        },
        data: {
          viewDate: new Date(),
        },
      });
    } else {
      // Create a new view record
      return this.prisma.view.create({
        data: {
          user: { connect: { id: userId } },
          blog: { connect: { id: blogId } },
        },
      });
    }
  }

  async getBlogStats(blogId: string) {
    // Check if the blog post exists
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }

    const [likesCount, viewsCount, commentsCount] = await Promise.all([
      this.prisma.like.count({ where: { blogId } }),
      this.prisma.view.count({ where: { blogId } }),
      this.prisma.comment.count({ where: { blogId } }),
    ]);

    return {
      likesCount,
      viewsCount,
      commentsCount,
    };
  }
}
