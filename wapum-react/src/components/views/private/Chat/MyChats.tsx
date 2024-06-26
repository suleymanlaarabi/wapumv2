import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Input,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Filter, MessageSquarePlus } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  createConversation,
  getConversations,
} from "../../../../services/api/chat-api";
import { useAuthStore } from "../../../../store/AuthStore";
import { getMediaUrl } from "../../../../utils/urlParser";
import {
  Conversation,
  ConversationParticipants,
} from "../../../../wapum-types/chat/chat.types";
import { User } from "../../../../wapum-types/users/global";
import { SearchUsersModal } from "../../../common/modal/SearchUsersModal";

interface ChatConversationButtonProps {
  conversation: Conversation;
  user: User;
}

function ChatConversationButton({
  conversation,
  user,
}: ChatConversationButtonProps) {
  const recipient = conversation.participants.find(
    (participant) => participant.username !== user.username
  ) as ConversationParticipants;

  return (
    <Flex
      as={NavLink}
      to={"/private/conversation/" + conversation.id}
      key={conversation.id}
      justifyContent={"space-around"}
      w={"100%"}
      alignItems={"center"}
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900"),
      }}
      transition={".3s"}
      cursor={"pointer"}
      h={"90px"}
    >
      <Avatar size={"lg"} src={getMediaUrl(recipient.avatar)} />
      <Heading>
        {conversation.participants[0].username === user?.username
          ? conversation.participants[1].username
          : conversation.participants[0].username}
      </Heading>
    </Flex>
  );
}

export const MyChats = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useAuthStore() as { user: User };

  const { data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversations(),
    refetchOnMount: true,
  });

  const queryClient = useQueryClient();

  const handleCreateConversation = async (userId: string) => {
    const conversation = await createConversation(userId);
    queryClient.setQueryData(["conversations"], () => {
      if (data) {
        return {
          data: [...data.data, conversation.data],
        };
      }
    });
  };

  return (
    <>
      <SearchUsersModal
        addConversation={handleCreateConversation}
        isOpen={isOpen}
        onClose={onClose}
      />
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: "100%" }}
      >
        <Flex
          h={"80px"}
          w={"100%"}
          bg={useColorModeValue("gray.100", "gray.900")}
          justifyContent={"space-around"}
          alignItems={"center"}
          p={4}
          gap={4}
        >
          <Input placeholder={"Search"} />
          <Flex gap={4} justifyContent={"center"} alignItems={"center"}>
            <IconButton
              onClick={onOpen}
              icon={<MessageSquarePlus />}
              aria-label=""
            />
            <IconButton icon={<Filter />} aria-label="" />
          </Flex>
        </Flex>
      </motion.div>
      {data?.data.map((conversation) => (
        <ChatConversationButton
          conversation={conversation}
          user={user}
          key={conversation.id}
        />
      ))}
    </>
  );
};
