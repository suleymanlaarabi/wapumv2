import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'src/prisma.service';
import { SocketService } from 'src/socket/socket.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, SocketService, FileService],
})
export class UsersModule {}
