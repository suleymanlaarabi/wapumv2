import { HttpException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from 'src/chat/dto/create-conversation.dto';
import { SendChatDto } from 'src/chat/dto/send-chat.dto';
import { PrismaService } from 'src/prisma.service';
import { SocketService } from 'src/socket/socket.service';
import { ConversationError } from 'src/wapum-types/chat/Error';
import {
  CreateConversationResponse,
  GetConversationMessagesResponse,
  SendChatResponse,
} from 'src/wapum-types/chat/Response';

@Injectable()
export class ChatService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly socketService: SocketService,
  ) {}

  async sendChat(
    sendChatDto: SendChatDto,
    conversationId: string,
    userId: string,
    images: Express.Multer.File[],
  ): Promise<SendChatResponse> {
    console.log(images);
    const [existingConversation, existingUser] = await Promise.all([
      this.prismaService.conversation.findUnique({
        where: { id: conversationId },
      }),
      this.prismaService.user.findUnique({
        where: { id: userId },
      }),
    ]);
    if (!existingConversation) {
      throw new HttpException(ConversationError.CONVERSATION_NOT_FOUND, 404);
    }
    if (!existingUser) {
      throw new HttpException(ConversationError.USER_NOT_FOUND, 404);
    }

    const updatedConversation = await this.prismaService.conversation.update({
      where: { id: conversationId },
      data: {
        messages: {
          create: {
            content: sendChatDto.content,
            sender: {
              connect: { id: userId },
            },
          },
        },
      },
      select: {
        messages: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            sender: {
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    this.socketService.server
      .to(existingConversation.id)
      .emit('send-chat-update', updatedConversation.messages.pop());
    return {
      error: false,
      message: ['Chat sent successfully'],
      data: updatedConversation.messages,
    };
  }

  async getConversations(userId: string) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        conversations: {
          select: {
            id: true,
            messages: {
              select: {
                id: true,
                content: true,
                createdAt: true,
                sender: {
                  select: {
                    id: true,
                  },
                },
              },
              take: 1,
              orderBy: {
                createdAt: 'asc',
              },
            },
            participants: {
              select: {
                id: true,
                username: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            updatedAt: 'desc',
          },
        },
      },
    });
    if (!existingUser) {
      throw new HttpException(ConversationError.USER_NOT_FOUND, 404);
    }
    return {
      error: false,
      message: ['Conversations fetched successfully'],
      data: existingUser.conversations,
    };
  }
  async getConversation(
    userId: string,
    conversationId: string,
    page: number,
  ): Promise<GetConversationMessagesResponse> {
    const existingConversation =
      await this.prismaService.conversation.findUnique({
        where: { id: conversationId },
        select: {
          id: true,
          createdAt: true,
          participants: {
            select: {
              id: true,
            },
          },
          messages: {
            select: {
              content: true,
              id: true,
              createdAt: true,
              sender: {
                select: {
                  id: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 15,
            skip: 15 * (page - 1),
          },
        },
      });

    if (!existingConversation) {
      throw new HttpException(ConversationError.CONVERSATION_NOT_FOUND, 404);
    }

    existingConversation.messages = existingConversation.messages.reverse();

    return {
      error: false,
      message: ['Conversation fetched successfully'],
      data: existingConversation,
    };
  }

  async createConversation(
    createConversationDto: CreateConversationDto,
    userId: string,
  ): Promise<CreateConversationResponse> {
    const existingConversation =
      await this.prismaService.conversation.findFirst({
        where: {
          participants: {
            some: {
              id: userId,
            },
          },
        },
        select: {
          id: true,
        },
      });
    if (existingConversation) {
      throw new HttpException(
        ConversationError.CONVERSATION_ALREADY_EXISTS,
        400,
      );
    }
    const newConversation = await this.prismaService.conversation.create({
      data: {
        participants: {
          connect: [{ id: userId }, { id: createConversationDto.recipientId }],
        },
      },
      select: {
        id: true,
        messages: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            sender: {
              select: {
                id: true,
              },
            },
          },
        },
        participants: {
          select: {
            id: true,
            username: true,
            lastName: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });

    return {
      error: false,
      message: ['Conversation created successfully'],
      data: newConversation,
    };
  }
}
