import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { errorToast, successToast } from "../../../data/toast";
import { AdPreview, getAd } from "../../../services/api/ad-api";
import {
  createConversation,
  getConversations,
} from "../../../services/api/chat-api";
import { useAuthStore } from "../../../store/AuthStore";
import { getMediaUrl } from "../../../utils/urlParser";
import { AdMaps } from "../../maps/AdMaps";

export function AdView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery<AdPreview>({
    queryKey: ["adView", id],
    queryFn: () => getAd(id || ""),
  });

  const { data: conversationsResponse } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversations(),
  });

  const { user } = useAuthStore();

  console.log(data);

  const userConversations = conversationsResponse?.data.filter((conversation) =>
    conversation.participants.some(
      (participant) => participant.id === data?.authorId
    )
  );

  const toast = useToast();
  const handleContactSeller = async () => {
    if (!data || !data.authorId) return;
    if (!user) {
      navigate("/auth/sign-in");
      return;
    }

    if (data.authorId === user.id) {
      toast(
        successToast({
          title: "Edit Ad",
          description: "You are now editing your ad",
        })
      );
      return;
    }

    if (userConversations?.length === 0) {
      const newConversation = await createConversation(data.authorId);
      navigate("/private/conversation/" + newConversation.data.id);
      toast(
        successToast({
          title: "Contacted Seller",
          description: "You have successfully contacted the seller",
        })
      );
    } else {
      toast(
        errorToast({
          title: "Already Contacted",
          description: "You have already contacted the seller",
        })
      );
    }
  };

  return (
    <>
      <Flex direction={"column"} pb={8}>
        <motion.div
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Container maxW={"7xl"}>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 18, md: 24 }}
            >
              <Flex>
                <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={data && getMediaUrl(data.AdImages[0].id)}
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                  h={{ base: "100%", sm: "400px", lg: "500px" }}
                />
              </Flex>
              {data && (
                <Stack spacing={{ base: 6, md: 10 }}>
                  <Box as={"header"}>
                    <Heading
                      lineHeight={1.1}
                      fontWeight={600}
                      fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                    >
                      {data.title}
                    </Heading>
                    <Text fontWeight={300} fontSize={"2xl"}>
                      ${data.price} USD
                    </Text>
                  </Box>

                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={"column"}
                    divider={<StackDivider />}
                  >
                    <VStack spacing={{ base: 4, sm: 6 }}>
                      <Text fontSize={"2xl"} fontWeight={"300"}>
                        {data.description}
                      </Text>
                    </VStack>
                  </Stack>

                  <Button
                    rounded={"none"}
                    w={"full"}
                    mt={8}
                    size={"lg"}
                    py={"7"}
                    textTransform={"uppercase"}
                    _hover={{
                      transform: "translateY(2px)",
                      boxShadow: "lg",
                    }}
                    onClick={handleContactSeller}
                  >
                    {user
                      ? data.authorId === user?.id
                        ? "Edit Ad"
                        : userConversations?.length === 0
                        ? "Contact Seller"
                        : "Already Contacted"
                      : "Sign in to Contact Seller"}
                  </Button>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={"center"}
                  >
                    <Car />
                    <Text>Seller Respond in 24 hours</Text>
                  </Stack>
                </Stack>
              )}
            </SimpleGrid>
          </Container>
        </motion.div>
        {data && <AdMaps address={data.location} />}
      </Flex>
    </>
  );
}
