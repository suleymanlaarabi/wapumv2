import { Flex, useColorModeValue } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface PageContainerProps extends PropsWithChildren {}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Flex
      w={"full"}
      minH={"calc(100dvh - 75px)"}
      bg={useColorModeValue("gray.50", "gray.800")}
      direction={"column"}
      alignItems={"center"}
    >
      {children}
    </Flex>
  );
};
