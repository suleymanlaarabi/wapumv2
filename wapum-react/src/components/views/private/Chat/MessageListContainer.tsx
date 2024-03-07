import {
  Container,
  Flex,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowDown } from "lucide-react";
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import { cssDefault } from "../../../../data/css.default";
import { useScrollBottom } from "../../../../hooks/useScrollBottom";
import { useScrollTop } from "../../../../hooks/useScrollTop";
import { useAuthStore } from "../../../../store/AuthStore";
import { Message } from "../../../../wapum-types/chat/chat.types";

export type MessageListContainerProps = {
  messages: Message[];
  onScrollTopIsReached: () => Promise<boolean>;
  haveNewMessage: boolean;
  setHaveNewMessage: (value: boolean) => void;
};

export const MessageListContainer = ({
  messages,
  onScrollTopIsReached,
  haveNewMessage,
  setHaveNewMessage,
}: MessageListContainerProps) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const { user } = useAuthStore();

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, []);

  const [hasMoreMessages, setHasMoreMessages] = useState(true);

  useScrollTop(messageContainerRef, () => {
    if (!hasMoreMessages) {
      return;
    }
    onScrollTopIsReached().then((hasMore) => {
      if (!hasMore) {
        setHasMoreMessages(false);
        return;
      }
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "instant" });
      }
    });
  });

  useScrollBottom(messageContainerRef, () => {
    if (haveNewMessage) {
      setHaveNewMessage(false);
    }
  });

  const bgNewMessage = useColorModeValue("blue.500", "gray.700");
  const hoverBgNewMessage = useColorModeValue("blue.600", "gray.800");

  const ColorMessageLeft = useColorModeValue("gray.100", "gray.600");
  const ColorMessageRight = useColorModeValue("blue.500", "gray.700");
  const textMessageColor = useColorModeValue("black", "white");

  return (
    <>
      <Container
        sx={cssDefault.scrollbar.conversation(
          useColorModeValue("gray.200", "gray.600") as string
        )}
        ref={messageContainerRef}
        overflowY={"auto"}
        py={4}
        my={4}
        w={"100%"}
      >
        {messages?.map((message: Message, index) => {
          return (
            <ChatBubble
              ColorLeft={ColorMessageLeft}
              ColorRight={ColorMessageRight}
              textColor={textMessageColor}
              ref={index == 0 ? lastMessageRef : null}
              message={message}
              isLeft={message.sender.id !== user?.id}
              key={message.id}
            />
          );
        })}
      </Container>
      {haveNewMessage && (
        <IconButton
          aria-label=""
          icon={<ArrowDown color="white" />}
          bg={bgNewMessage}
          _hover={{
            bg: hoverBgNewMessage,
          }}
          h={"40px"}
          w={"40px"}
          minH={"40px"}
          minW={"40px"}
          borderRadius={"50%"}
          position={"absolute"}
          bottom={"85px"}
          onClick={() => {
            if (messageContainerRef.current) {
              messageContainerRef.current.scrollTop =
                messageContainerRef.current.scrollHeight;
            }
          }}
        />
      )}
    </>
  );
};

const ChatBubble = forwardRef(function (
  {
    message,
    isLeft,
    ColorLeft,
    ColorRight,
    textColor,
  }: {
    message: Message;
    isLeft: boolean;
    ColorLeft: string;
    ColorRight: string;
    textColor: string;
  },
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <Flex
      ref={ref}
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
});
