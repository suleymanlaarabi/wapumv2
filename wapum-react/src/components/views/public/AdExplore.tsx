import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  AdFilter,
  AdPreview,
  getAdsWithFilter,
} from "../../../services/api/ad-api";
import AdCard from "../../common/card/AdCard";
import { SearchFilterDrawer } from "../../common/drawer/SearchFilterDrawer";

export const AdExplore = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [ads, setAds] = useState<AdPreview[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [filterSettings, setFilterSettings] = useState<Omit<AdFilter, "title">>(
    {
      subCategory: undefined,
      category: undefined,
      priceRange: {
        min: 0,
        max: 3000,
      },
    }
  );

  const handleFilterSubmit = (props: Omit<AdFilter, "title">) => {
    setFilterSettings({
      ...filterSettings,
      ...props,
    });
  };

  const handleSearchSubmit = () => {
    console.log({
      ...filterSettings,
      title: searchInputRef.current?.value || undefined,
    });
    getAdsWithFilter({
      ...filterSettings,
      title: searchInputRef.current?.value || undefined,
    }).then((res) => {
      console.log(res);
      setAds(res);
    });
  };

  useEffect(() => {
    getAdsWithFilter({
      title: undefined,
      category: undefined,
      subCategory: undefined,
      priceRange: {
        min: 0,
        max: 3000,
      },
    }).then((res) => {
      console.log(res);
      setAds(res);
    });
  }, []);

  return (
    <>
      <SearchFilterDrawer
        onSubmit={handleFilterSubmit}
        isOpen={isOpen}
        onClose={onClose}
      />
      <motion.div
        style={{
          width: "100%",
          height: "100px",
        }}
        initial={{ y: -20, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Flex
          gap={4}
          p={4}
          display="flex"
          justifyContent="center"
          background={useColorModeValue("gray.100", "gray.900")}
        >
          <Input placeholder="Search..." ref={searchInputRef} />
          <Button onClick={handleSearchSubmit} px={6}>
            Search
          </Button>
          <IconButton aria-label="" icon={<Filter />} onClick={onOpen} />
        </Flex>
      </motion.div>

      <Heading mt={4}>Explore</Heading>
      <Flex gap={4} p={4} display="flex" justifyContent="center">
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            id={ad.id}
            title={ad.title}
            price={ad.price}
            preview={ad.AdImages[0].id}
          />
        ))}
      </Flex>
    </>
  );
};
