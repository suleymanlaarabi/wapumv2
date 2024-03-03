export interface Message {
  id: string;
  content: string;
  createdAt: Date;
  sender: {
    id: string;
  };
}

export interface ConversationParticipants {
  id: string;
  username: string;
  lastName: string;
  phone: string;
  avatar: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
  participants: ConversationParticipants[];
}
