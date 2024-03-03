import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { errorToast, successToast } from "../../../../data/toast";
import { useAuthStore } from "../../../../store/AuthStore";
import { PasswordWithEye } from "../../../common/inputs/PasswordWithEye";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
  age: number;
  phone: string;
  phoneRegion: string;
};

type KeyOfInputs = keyof Inputs;

export default function SignUp() {
  const { register: signUp } = useAuthStore();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    data.age = parseInt(data.age.toString());
    data.phone = data.phoneRegion + data.phone;
    try {
      await signUp(data);
      toast(
        successToast({
          title: "Account created",
          description: "Enjoy your new account",
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        toast(errorToast({ title: "Error", description: error.message }));
      }
    }
  };

  const ErrorText = ({ name, message }: { name: string; message: string }) => {
    return (
      <Text color={"red.200"}>
        {name} {message}
      </Text>
    );
  };

  const errorsDisplay = Object.keys(errors).map((key) => {
    const error = errors[key as KeyOfInputs] as FieldError;
    switch (error.type) {
      case "required":
        return <ErrorText name={key} message={"is required"} />;
      case "pattern":
        return <ErrorText name={key} message={"is not valid"} />;
      case "maxLength":
        return <ErrorText name={key} message={"is too long"} />;
      case "minLength":
        return <ErrorText name={key} message={"is too short"} />;
      default:
        return null;
    }
  });

  return (
    <Flex
      as={"form"}
      onSubmit={handleSubmit(onSubmit)}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
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
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    {...register("firstName", {
                      required: true,
                      maxLength: 30,
                      minLength: 4,
                    })}
                    type="text"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    {...register("lastName", {
                      required: true,
                      maxLength: 30,
                      minLength: 4,
                    })}
                    type="text"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                {...register("username", {
                  required: true,
                  maxLength: 30,
                  minLength: 4,
                })}
                type="text"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <Input
                {...register("age", {
                  required: true,
                  maxLength: 3,
                  minLength: 2,
                })}
                type="number"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <InputGroup>
                <InputLeftAddon
                  p={0}
                  children={
                    <Select
                      {...register("phoneRegion", {
                        required: true,
                      })}
                      id="phone-region"
                      m={0}
                      p={0}
                      border={"none"}
                    >
                      <option value="+216">+216</option>
                      <option value="+33">+33</option>
                    </Select>
                  }
                />
                <Input
                  {...register("phone", {
                    required: true,
                    maxLength: 15,
                    minLength: 9,
                  })}
                  type="number"
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                type="email"
              />
            </FormControl>

            <PasswordWithEye
              {...register("password", {
                required: true,
                maxLength: 30,
                minLength: 6,
              })}
              label="Password"
              placeholder="Enter your password"
              isRequired
            />
            <PasswordWithEye
              {...register("confirmPassword", {
                required: true,
                maxLength: 30,
                minLength: 6,
              })}
              label="Confirm Password"
              placeholder="Confirm your password"
              isRequired
            />

            {errorsDisplay}
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text textAlign={"center"} fontSize={"sm"}>
                Already have an account ?{" "}
                <Text as={"span"} color={"blue.400"}>
                  <NavLink to={"/auth/sign-in"}>Sign in</NavLink>
                </Text>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
