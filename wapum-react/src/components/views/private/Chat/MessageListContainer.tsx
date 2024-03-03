import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../../../../store/AuthStore";
import { Message } from "../../../../wapum-types/chat/chat.types";

export type MessageListContainerProps = {
  messages: Message[];
};

function ChatBubble({
  message,
  isLeft,
}: {
  message: Message;
  isLeft: boolean;
}) {
  const ColorLeft = useColorModeValue("gray.100", "gray.600");
  const ColorRight = useColorModeValue("blue.500", "gray.700");

  const textColor = useColorModeValue("black", "white");
  return (
    <Flex
      flexDirection={"column"}
      alignItems={isLeft ? "flex-start" : "flex-end"}
      mb={4}
    >
      <Flex
        p={4}
        borderRadius={8}
        bg={isLeft ? ColorLeft : ColorRight}
        color={isLeft ? textColor : "white"}
      >
        {message.content}
      </Flex>
      <Flex
        fontSize={"xs"}
        color={useColorModeValue("gray.500", "gray.300")}
        justifyContent={isLeft ? "flex-start" : "flex-end"}
      >
        {message.createdAt.toLocaleString()}
      </Flex>
    </Flex>
  );
}

export const MessageListContainer = ({
  messages,
}: MessageListContainerProps) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { user } = useAuthStore();

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container ref={messageContainerRef} overflowY={"auto"} py={4} w={"100%"}>
      {messages?.map((message: Message) => {
        return (
          <ChatBubble
            message={message}
            isLeft={message.sender.id !== user?.id}
            key={message.id}
          />
        );
      })}
    </Container>
  );
};
