import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { errorToast } from "../data/toast";
import { getConversationChats } from "../services/api/chat-api";
import { useSocketStore } from "../store/SocketStore";
import { Message } from "../wapum-types/chat/chat.types";

interface MessagesList {
  page: number;
  messages: Message[];
}

interface state {
  haveNewMessage: boolean;
  messagesList: MessagesList;
}

export const useConversation = (conversationId: string) => {
  const toast = useToast();

  const [state, setState] = useState<state>({
    haveNewMessage: false,
    messagesList: {
      page: 1,
      messages: [],
    },
  });
  const { socket } = useSocketStore();

  const fetchAndSetMessages = useCallback(
    async (page: number) => {
      const response = await getConversationChats(conversationId, page);
      if (response.data.messages.length <= 0) {
        toast(
          errorToast({
            title: "No more messages",
            description: "No more messages",
          })
        );
        setState((prev) => ({ ...prev, hasNoMoreMessages: true }));
        return false;
      }

      const existingIds = new Set(
        state.messagesList.messages.map((msg) => msg.id)
      );

      const newMessages = response.data.messages.filter(
        (message) => !existingIds.has(message.id)
      );

      if (newMessages.length > 0) {
        setState((prev) => ({
          ...prev,
          messagesList: {
            page: page,
            messages: [...newMessages, ...prev.messagesList.messages],
          },
        }));
      }
      return true;
    },
    [conversationId, state.messagesList.messages, toast]
  );

  useEffect(() => {
    fetchAndSetMessages(1);
  }, [conversationId, fetchAndSetMessages]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join-chat-room", conversationId);
    socket.on("send-chat-update", (messageData: Message) => {
      setState((prev) => ({
        ...prev,
        haveNewMessage: state.messagesList.messages.length >= 8,
        messagesList: {
          page: prev.messagesList.page,
          messages: [...prev.messagesList.messages, messageData],
        },
      }));
    });

    return () => {
      socket.off("send-chat-update");
    };
  }, [socket, conversationId, state.messagesList.messages.length]);

  return {
    state,
    setNewMessageRead: () =>
      setState((prev) => ({ ...prev, haveNewMessage: false })),
    addMessages: () => fetchAndSetMessages(state.messagesList.page + 1),
  };
};
