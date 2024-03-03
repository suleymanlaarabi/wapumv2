import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'src/prisma.service';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';

@Module({
  controllers: [AdsController],
  providers: [AdsService, PrismaService, FileService],
})
export class AdsModule {}
