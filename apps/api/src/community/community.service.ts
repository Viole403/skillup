import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateCommunityPostDto } from './dto/create-community-post.dto';
import { UpdateCommunityPostDto } from './dto/update-community-post.dto';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createCommunityPostDto: CreateCommunityPostDto) {
    return this.prisma.communityPost.create({
      data: {
        user: { connect: { id: userId } },
        content: createCommunityPostDto.content,
        imageUrl: createCommunityPostDto.imageUrl,
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

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [posts, totalCount] = await Promise.all([
      this.prisma.communityPost.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      this.prisma.communityPost.count(),
    ]);

    return {
      data: posts,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async findOne(id: string) {
    const post = await this.prisma.communityPost.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Community post not found');
    }

    return post;
  }

  async update(
    userId: string,
    id: string,
    updateCommunityPostDto: UpdateCommunityPostDto,
  ) {
    // Check if post exists and belongs to the user
    const post = await this.prisma.communityPost.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!post) {
      throw new NotFoundException(
        'Community post not found or you are not authorized to update it',
      );
    }

    return this.prisma.communityPost.update({
      where: { id },
      data: updateCommunityPostDto,
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

  async remove(userId: string, id: string) {
    // Check if post exists and belongs to the user
    const post = await this.prisma.communityPost.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!post) {
      throw new NotFoundException(
        'Community post not found or you are not authorized to delete it',
      );
    }

    return this.prisma.communityPost.delete({
      where: { id },
    });
  }

  async findByUser(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [posts, totalCount] = await Promise.all([
      this.prisma.communityPost.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      this.prisma.communityPost.count({
        where: { userId },
      }),
    ]);

    return {
      data: posts,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }
}
