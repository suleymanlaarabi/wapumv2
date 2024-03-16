import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AdPreview, getHomeAds } from "../../../services/api/ad-api";
import { categories } from "../../../wapum-types/ads/Ads.types";
import AdCard from "../../common/card/AdCard";
import { CategoryCard } from "../../common/card/CategoryCard";

export const HomeCardList = ({ cards }: { cards: AdPreview[] }) => {
  return (
    <motion.div
      initial={{ y: 40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex
        p={{
          base: 0,
          md: 8,
        }}
        py={4}
        w="100%"
        gap={4}
        overflowX={"scroll"}
      >
        {cards.map((ad) => (
          <AdCard
            id={ad.id}
            preview={ad.AdImages[0].id}
            title={ad.title}
            price={ad.price}
            key={ad.id}
          />
        ))}
      </Flex>
    </motion.div>
  );
};

export const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: getHomeAds,
  });

  console.log("rendering home component");
  return (
    <Container maxW={"container.xl"} p={4}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Heading m={4}>Top Categories</Heading>
          <Flex
            bg={"transparent"}
            p={4}
            mt={4}
            w="100%"
            gap={4}
            overflowX={"scroll"}
          >
            {categories.map((category) => (
              <CategoryCard name={category} key={category} />
            ))}
          </Flex>

          <Box w={"full"}>
            <Heading m={4}>Home</Heading>
            {data && (
              <>
                <HomeCardList cards={data.homeCategoryAds} />
              </>
            )}
          </Box>
          <Box w={"full"}>
            <Heading m={4}>Technology</Heading>
            {data && (
              <>
                <HomeCardList cards={data.technologyCategoryAds} />
              </>
            )}
          </Box>
        </>
      )}
      <IconButton
        aria-label=""
        icon={<Search />}
        position="fixed"
        bottom={4}
        right={4}
        h={16}
        w={16}
        borderRadius="full"
        bg={useColorModeValue("gray.200", "gray.700")}
        _hover={{ bg: useColorModeValue("gray.300", "gray.600") }}
        as={NavLink}
        to={"/explore"}
      />
    </Container>
  );
};
