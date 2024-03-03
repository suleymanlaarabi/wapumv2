import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getConversationChats,
  sendChat,
} from "../../../../services/api/chat-api";
import { useSocketStore } from "../../../../store/SocketStore";
import { Message } from "../../../../wapum-types/chat/chat.types";
import { MessageListContainer } from "./MessageListContainer";

export const Conversation = () => {
  const { id: conversationId } = useParams<{ id: string }>() as { id: string };

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    getConversationChats(conversationId).then((data) => {
      setMessages(data.data.messages);
    });
  }, [conversationId]);

  const messageInputRef = useRef<HTMLInputElement>(null);

  const handleMessageSend = () => {
    if (messageInputRef.current) {
      sendChat(conversationId, messageInputRef.current.value);
      messageInputRef.current.value = "";
    }
  };

  const { socket, isSocketConnected } = useSocketStore();

  useEffect(() => {
    if (!socket) return;

    socket.emit("join-chat-room", conversationId);
    socket.on("send-chat-update", (messageData: Message) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
      console.log("Message received", messageData);
    });

    return () => {
      socket.off("send-chat-update");
    };
  }, [socket, conversationId]);
  console.log("Socket connected", isSocketConnected);

  return (
    <>
      <Flex
        h={"calc(100dvh - 100px)"}
        w={"100%"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading mt={4}>Conversation</Heading>

        <MessageListContainer messages={messages} />
        <Flex
          gap={4}
          justifyContent={"space-around"}
          alignItems={"center"}
          w={"90%"}
          maxW={"700px"}
        >
          <Input ref={messageInputRef} w={"80%"} />
          <Button onClick={handleMessageSend} w={"30%"}>
            Send
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
