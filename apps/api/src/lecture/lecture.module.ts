import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  controllers: [LectureController],
  providers: [LectureService, PrismaService],
  exports: [LectureService],
})
export class LectureModule {}
