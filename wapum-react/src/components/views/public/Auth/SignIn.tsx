import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { errorToast, successToast } from "../../../../data/toast";
import { useAuthStore } from "../../../../store/AuthStore";
import { LoginUserForm } from "../../../../wapum-types/auth/Form";

export default function SignIn() {
  const { login } = useAuthStore();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserForm>();

  const onSubmit = async (data: LoginUserForm) => {
    console.log(data);
    try {
      await login(data);
      toast(
        successToast({
          title: "Welcome back",
          description: "You are now logged in",
        })
      );
    } catch (error) {
      toast(
        errorToast({
          title: "An error occurred",
          description: "Verify your credentials",
        })
      );
    }
  };
  return (
    <Flex
      as={"form"}
      onSubmit={handleSubmit(onSubmit)}
      w={"full"}
      align={"center"}
      justify={"center"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack textAlign={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool{" "}
            <Text as="span" color={"blue.400"}>
              features
            </Text>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input {...register("email")} type="email" />
              {errors.email?.type === "required" && (
                <Text color={"red.500"}>This field is required</Text>
              )}
              {errors.email?.type === "pattern" && (
                <Text color={"red.500"}>Invalid email address</Text>
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                type="password"
              />
              {errors.password?.type === "required" && (
                <Text color={"red.500"}>This field is required</Text>
              )}
              {errors.password?.type === "minLength" && (
                <Text color={"red.500"}>
                  Password must be at least 6 characters
                </Text>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type={"submit"}
              >
                Sign in
              </Button>
            </Stack>
            <Text textAlign={"center"} fontSize={"sm"}>
              Don't have an account ?{" "}
              <Text as={"span"} color={"blue.400"}>
                <NavLink to={"/auth/sign-up"}>Sign up</NavLink>
              </Text>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
