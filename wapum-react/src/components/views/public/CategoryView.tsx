import { Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAdsByCategory } from "../../../services/api/ad-api";
import { Categories } from "../../../wapum-types/ads/Ads.types";
import AdCard from "../../common/card/AdCard";

export const CategoryView = () => {
  const { category } = useParams() as { category: Categories };
  const { data, isLoading } = useQuery({
    queryKey: ["category", category],
    queryFn: () => getAdsByCategory(category),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Flex
        w={"100%"}
        mt={4}
        gap={4}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        {data?.map((ad) => (
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
    </>
  );
};
