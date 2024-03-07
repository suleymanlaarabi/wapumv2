import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useKeyPressEvent } from "react-use";
import { useConversation } from "../../../../hooks/useConversation";
import { sendChat } from "../../../../services/api/chat-api";
import { MessageListContainer } from "./MessageListContainer";

export const Conversation = () => {
  const { id: conversationId } = useParams<{ id: string }>() as { id: string };

  const { state, setNewMessageRead, addMessages } =
    useConversation(conversationId);

  const messageInputRef = useRef<HTMLInputElement>(null);

  const handleMessageSend = useCallback(() => {
    if (messageInputRef.current) {
      sendChat(conversationId, messageInputRef.current.value);
      messageInputRef.current.value = "";
    }
  }, [conversationId]);

  useKeyPressEvent("Enter", handleMessageSend);

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
          gap={4}
          justifyContent={"space-around"}
          alignItems={"center"}
          w={"90%"}
          maxW={"550px"}
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
