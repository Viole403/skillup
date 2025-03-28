import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, PrismaService],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
