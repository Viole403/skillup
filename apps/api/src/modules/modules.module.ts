import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  controllers: [ModulesController],
  providers: [ModulesService, PrismaService],
  exports: [ModulesService],
})
export class ModulesModule {}
