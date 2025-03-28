import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, PrismaService],
  exports: [BlogService],
})
export class BlogModule {}
