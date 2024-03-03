import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AdPreview, getHomeAds } from "../../../services/api/ad-api";
import AdCard from "../../common/card/AdCard";

export const HomeCardList = ({ cards }: { cards: AdPreview[] }) => {
  return (
    <motion.div
      initial={{ y: 40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex py={8} px={4} w="100%" gap={4} overflowX={"scroll"}>
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
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Box p={4} w={"full"}>
            <Heading m={4}>Home</Heading>
            {data && (
              <>
                <HomeCardList cards={data.homeCategoryAds} />
              </>
            )}
          </Box>
          <Box p={4} w={"full"}>
            <Heading m={4}>Technology</Heading>
            {data && (
              <>
                <HomeCardList cards={data.technologyCategoryAds} />
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
};
