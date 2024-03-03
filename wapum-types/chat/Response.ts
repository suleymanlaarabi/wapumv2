import { Response } from '../global.types';
import { Conversation, Message } from './chat.types';

export interface SendChatResponse extends Response {
  data: {
    id: string;
    content: string;
    sender: {
      id: string;
    };
  }[];
}

export interface GetConversationsResponse extends Response {
  data: Conversation[];
}

export interface CreateConversationResponse extends Response {
  data: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface GetConversationMessagesResponse extends Response {
  data: {
    id: string;
    updatedAt: Date;
    messages: Message[];
    participants: {
      id: string;
    }[];
  };
}
