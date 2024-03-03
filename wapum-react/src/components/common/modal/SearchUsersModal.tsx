import {
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { errorToast, successToast } from "../../../data/toast";
import { searchUsers } from "../../../services/api/user-api";
import { useChatsStore } from "../../../store/ChatStore";

export type SearchUsersModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

export const SearchUsersModal = ({
  onClose,
  isOpen,
}: SearchUsersModalProps) => {
  const [users, setUsers] = useState<{ username: string; id: string }[]>([]);
  const [userSelected, setUserSelected] = useState<{
    username: string;
    id: string;
  } | null>(null);

  const toast = useToast();

  const { addConversation } = useChatsStore();

  const onAddUser = async () => {
    if (userSelected) {
      try {
        await addConversation(userSelected.id);
        toast(
          successToast({
            title: "Success",
            description: "Conversation created",
          })
        );
      } catch (error) {
        if (error instanceof Error) {
          toast(errorToast({ title: "Error", description: error.message }));
        }
      }

      onClose();
    }
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length < 3) {
      setUsers([]);
      return;
    }
    searchUsers(e.currentTarget.value).then((users) => {
      setUsers(users);
    });
  };

  const customUserRenderBackground = useColorModeValue("gray.300", "gray.800");

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems={"center"}>
            <Heading fontSize={"larger"} mr={4}>
              Search Users
            </Heading>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input onChange={onSearch} placeholder={"Search"} />
          <Flex flexDir={"column"} w={"full"} gap={4} mt={4}>
            {users.map((user) => (
              <Flex
                key={user.id}
                gap={4}
                justifyContent={"space-around"}
                alignItems={"center"}
                bg={customUserRenderBackground}
                py={2}
                borderRadius={8}
              >
                <Heading fontSize={"larger"}>{user.username}</Heading>
                <Button
                  onClick={() => {
                    setUserSelected(user);
                  }}
                  isDisabled={
                    userSelected && userSelected.id === user.id ? true : false
                  }
                >
                  {userSelected && userSelected.id === user.id
                    ? "Selected"
                    : "Select"}
                </Button>
              </Flex>
            ))}
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          {userSelected && (
            <Button onClick={onAddUser} variant="ghost">
              Add {userSelected && userSelected.username}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
