"use client";

import {
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowLeft, MessageSquareText, Moon, Sun } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/AuthStore";
import { ProfileMenuButton } from "./ProfileMenuButton";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={"75px"} alignItems={"center"} justifyContent={"space-between"}>
          <Flex gap={4} alignItems={"center"}>
            <IconButton
              icon={<ArrowLeft />}
              aria-label=""
              onClick={() => navigate(-1)}
            />
            <Box as={NavLink} to={"/"} fontSize={28} fontWeight={"bold"}>
              {"Wapum"}
            </Box>
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={4}>
              {!user && (
                <Button as={NavLink} to={"/auth/sign-in"}>
                  Log In
                </Button>
              )}
              {user && (
                <IconButton
                  as={NavLink}
                  to={"/private/messages"}
                  aria-label={"Create Ad"}
                  icon={<MessageSquareText />}
                />
              )}
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <Moon /> : <Sun />}
              </Button>

              {user && <ProfileMenuButton />}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
