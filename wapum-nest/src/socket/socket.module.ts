import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SocketService } from './socket.service';

@Global()
@Module({
  providers: [SocketService, PrismaService],
  exports: [SocketService],
})
export class SocketModule {}
