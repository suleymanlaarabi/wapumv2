import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFileInput } from "../../../../hooks/useFileInput";
import { updateUserProfilePicture } from "../../../../services/api/user-api";
import { useAuthStore } from "../../../../store/AuthStore";
import { getMediaUrl } from "../../../../utils/urlParser";
import { PasswordWithEye } from "../../../common/inputs/PasswordWithEye";

type UserProfileInput = {
  username: string;
  email: string;
  password: string;
};

export default function UserProfileEdit() {
  const { user } = useAuthStore();

  const [currentProfilePicture, setCurrentProfilePicture] = useState<{
    file: File | null;
    preview: string;
  }>({
    file: new File([""], "undefined-cuid"),
    preview: getMediaUrl(user?.avatar || ""),
  });

  const onFileChange = (files: File[]) => {
    const file = files[0];
    setCurrentProfilePicture({
      file: file,
      preview: URL.createObjectURL(file),
    });
  };

  const { onOpen } = useFileInput({
    onChange: onFileChange,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileInput>();

  const onSubmit = async (data: UserProfileInput) => {
    if (currentProfilePicture.file) {
      await updateUserProfilePicture(currentProfilePicture.file);
    }
    if (
      data.username &&
      data.username !== user?.username &&
      data.username !== ""
    ) {
      console.log(data.username);
    }
    console.log(data);
  };

  const errorRenderer = (error: string) => {
    return (
      <Text color={"red.500"} fontSize={"sm"}>
        {error}
      </Text>
    );
  };

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={currentProfilePicture.preview}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<Trash2 size={18} />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button onClick={onOpen} w="full">
                  Change Icon
                </Button>
              </Center>
            </Stack>
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email",
                },
              })}
              required={false}
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
            {errors.email && errorRenderer(errors.email.message as string)}
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              {...register("username", {
                maxLength: { value: 30, message: "Max length should be 20" },
                minLength: { value: 3, message: "Min length should be 3" },
              })}
              placeholder="UserName"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
            {errors.username &&
              errorRenderer(errors.username.message as string)}
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <PasswordWithEye
              placeholder="Password"
              {...register("password", {
                maxLength: { value: 20, message: "Max length should be 20" },
                minLength: { value: 8, message: "Min length should be 8" },
              })}
            />
            {errors.password &&
              errorRenderer(errors.password.message as string)}
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </motion.div>
  );
}
