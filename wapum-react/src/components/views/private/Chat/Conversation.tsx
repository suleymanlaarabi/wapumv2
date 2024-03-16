import {
  Button,
  Flex,
  Heading,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useKey } from "react-use";
import { useConversation } from "../../../../hooks/useConversation";
import { sendChat } from "../../../../services/api/chat-api";
import { ImageCard } from "../../../common/card/ImageCard";
import { MessageImageButton } from "./MessageImageButton";
import { MessageListContainer } from "./MessageListContainer";

export const Conversation = () => {
  const { id: conversationId } = useParams<{ id: string }>() as { id: string };

  const { state, setNewMessageRead, addMessages } =
    useConversation(conversationId);

  const [currentMessageImages, setCurrentMessageImages] = useState<File[]>([]);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const handleMessageSend = useCallback(() => {
    if (messageInputRef.current) {
      sendChat(conversationId, messageInputRef.current.value);
      messageInputRef.current.value = "";
    }
  }, [conversationId]);

  useKey("Enter", handleMessageSend, {}, [messageInputRef.current]);

  console.log("rendering conversation component");

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

        {state.messagesList.messages.length !== 0 && (
          <MessageListContainer
            haveNewMessage={state.haveNewMessage}
            setHaveNewMessage={setNewMessageRead}
            messages={state.messagesList.messages}
            onScrollTopIsReached={addMessages}
          />
        )}
        <Flex
          bg={useColorModeValue("gray.100", "gray.700")}
          p={6}
          borderRadius={8}
          justifyContent={"space-around"}
          alignItems={"center"}
          w={"90%"}
          maxW={"550px"}
          direction={"column"}
        >
          <Flex wrap={"wrap"} gap={4}>
            {currentMessageImages.map((file, index) => (
              <ImageCard
                chakraProps={{
                  w: "150px",
                  h: "150px",
                }}
                key={index}
                onDelete={() =>
                  setCurrentMessageImages((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                src={URL.createObjectURL(file)}
              />
            ))}
          </Flex>
          <Flex gap={4} justifyContent={"space-around"} w={"100%"}>
            <MessageImageButton
              onUpload={(file) => {
                setCurrentMessageImages([...currentMessageImages, ...file]);
              }}
            />
            <Input
              bg={useColorModeValue("white", "gray.800")}
              ref={messageInputRef}
              w={"80%"}
            />
            <Button
              bg={useColorModeValue("gray.200", "gray.600")}
              onClick={handleMessageSend}
              w={"30%"}
            >
              Send
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
