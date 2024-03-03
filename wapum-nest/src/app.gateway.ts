import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket/socket.service';

@WebSocketGateway(8001, {
  cors: '*',
})
export class AppGateway implements OnGatewayInit, OnModuleInit {
  @WebSocketServer()
  private readonly server;

  constructor(private readonly socketService: SocketService) {}
  afterInit() {
    this.socketService.server = this.server;
  }

  onModuleInit() {
    this.server.emit('confirmation');
  }

  @SubscribeMessage('message')
  sendMessage(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    console.log('message sent');
    socket.emit('test', 'test');
  }

  @SubscribeMessage('join-chat-room')
  async joinChatRoom(
    @MessageBody() conversationId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(conversationId);
  }

  @SubscribeMessage('connection')
  async sendConfirm(@ConnectedSocket() socket: Socket) {
    console.log('connected');
    socket.emit('confirmation');
  }
}
