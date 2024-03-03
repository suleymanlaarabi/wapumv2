import { create } from "zustand";
import { createConversation, getConversations } from "../services/api/chat-api";
import { Conversation } from "../wapum-types/chat/chat.types";

interface ChatStore {
  conversations: Conversation[];
  addConversation: (recipientId: string) => Promise<void>;
  init: () => void;
}

export const useChatsStore = create<ChatStore>((set) => ({
  conversations: [],

  addConversation: async (recipientId: string) => {
    const conversation = await createConversation(recipientId);

    set((state) => ({
      conversations: [...state.conversations, conversation],
    }));
  },

  init: () => {
    getConversations().then(({ data }) => {
      set({ conversations: data });
    });
  },
}));
