import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SocketService {
  public server: Server;
  constructor(private readonly prismaService: PrismaService) {}

  async valideteRoomJoin(conversationId: string, userId: string) {}
}
