import {
  Box,
  Flex,
  Icon,
  Image,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { MessageSquareMore } from "lucide-react";
import { NavLink } from "react-router-dom";
import { getMediaUrl } from "../../../utils/urlParser";

interface AdCardProps {
  title: string;
  price: number;
  preview: string;
  id: string;
}

function AdCard({ title, price, preview, id }: AdCardProps) {
  return (
    <Flex
      as={NavLink}
      to={`/ad/${id}`}
      transition={"transform .3s"}
      alignItems="center"
      justifyContent="center"
      cursor={"pointer"}
      _hover={{
        transform: "scale(1.02)",
      }}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        w={{ base: "275px", md: "330px" }}
        h={{ base: "390px", md: "450px" }}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        p={4}
      >
        <Flex p={2} justifyContent="center" alignContent="center">
          <Image
            h={"25%"}
            objectFit={"cover"}
            src={getMediaUrl(preview)}
            rounded="lg"
          />
        </Flex>
        <Box p="6">
          <Box display="flex" alignItems="baseline"></Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {title}
            </Box>
            <Tooltip
              label="Contact seller"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <Icon as={MessageSquareMore} h={7} w={7} alignSelf={"center"} />
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                $ {""}
              </Box>
              {price}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default AdCard;
