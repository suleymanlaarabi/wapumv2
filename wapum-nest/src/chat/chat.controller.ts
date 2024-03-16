import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RequestWithAuthPayload } from 'src/auth/auth.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateConversationDto } from 'src/chat/dto/create-conversation.dto';
import { SendChatDto } from 'src/chat/dto/send-chat.dto';
import {
  CreateConversationResponse,
  GetConversationMessagesResponse,
  GetConversationsResponse,
  SendChatResponse,
} from 'src/wapum-types/chat/Response';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-conversation')
  async createConversation(
    @Body() createConversationDto: CreateConversationDto,
    @Request() request: RequestWithAuthPayload,
  ): Promise<CreateConversationResponse> {
    return await this.chatService.createConversation(
      createConversationDto,
      request.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('send-chat/:conversationId')
  @UseInterceptors(FilesInterceptor('images'))
  async sendMessage(
    @Param('conversationId') conversationId: string,
    @Body() sendChatDto: SendChatDto,
    @Request() request: RequestWithAuthPayload,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<SendChatResponse> {
    return await this.chatService.sendChat(
      sendChatDto,
      conversationId,
      request.user.userId,
      images,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-conversations')
  async getConversations(
    @Request() request: RequestWithAuthPayload,
  ): Promise<GetConversationsResponse> {
    return await this.chatService.getConversations(request.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-conversation/:conversationId/:page')
  async getConversation(
    @Param('conversationId') conversationId: string,
    @Param('page') page: number,
    @Request() request: RequestWithAuthPayload,
  ): Promise<GetConversationMessagesResponse> {
    return await this.chatService.getConversation(
      request.user.userId,
      conversationId,
      page,
    );
  }
}
