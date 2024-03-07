import { Box, Container, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
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
      <Flex py={8} w="100%" gap={4} overflowX={"scroll"}>
        {cards.map((ad) => (
          <AdCard
            id={ad.id}
            preview={ad.AdImages[0].id}
            title={ad.title}
            price={ad.price}
            isNew
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
          <Flex p={4} mt={4} w="100%" gap={4} overflowX={"scroll"}>
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
    </Container>
  );
};
