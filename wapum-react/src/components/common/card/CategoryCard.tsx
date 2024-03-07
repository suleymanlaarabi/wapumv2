import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Categories } from "../../../wapum-types/ads/Ads.types";

export type CategoryCardProps = {
  name: Categories;
};

export const CategoryCard = ({ name }: CategoryCardProps) => {
  const imageUrl = () => {
    switch (name) {
      case Categories.FASHION:
        return "https://www.leboncoin.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvetements.99f0e46e.png&w=384&q=75";
      case Categories.TECHNOLOGY:
        return "https://www.leboncoin.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finformatique.056b386d.png&w=384&q=75";
      case Categories.HOME:
        return "https://www.leboncoin.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fastuces_maison.0886c8f0.png&w=384&q=75";
      case Categories.AUTOMOBILE:
        return "https://www.leboncoin.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvoitures.15a661f1.png&w=384&q=75";
      case Categories.SERVICES:
        return "https://cdn-europe1.lanmedia.fr/var/europe1/storage/images/europe1/societe/a-la-francaise-a-lamericaine-connaissez-vous-les-differents-services-a-table-4042225/57093052-1-fre-FR/A-la-francaise-a-l-americaine-Connaissez-vous-les-differents-services-a-table.jpg";
      case Categories.JOBS:
        return "https:/www.leboncoin.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Foffres_emploi.df2c3c73.png&w=384&q=75";
      default:
        return;
    }
  };
  return (
    <Flex
      as={NavLink}
      to={`/category/${name}`}
      bg={useColorModeValue("white", "gray.800")}
      minW={{ base: "150px", md: "300px" }}
      maxW={{ base: "150px", md: "300px" }}
      h={{ base: "100px", md: "150px" }}
      rounded="10px"
      shadow="lg"
      backgroundImage={imageUrl()}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      transition={"0.3s"}
      _hover={{
        transform: "scale(1.05)",
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <Heading
          size="large"
          m={4}
          color="white"
          textShadow={"1px 1px 2px black"}
        >
          {name}
        </Heading>
      </div>
    </Flex>
  );
};
