import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AdFilter } from "../../../services/api/ad-api";
import { Categories, categories } from "../../../wapum-types/ads/Ads.types";

export type SearchFilterDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
  onSubmit: ({ category, priceRange }: Omit<AdFilter, "title">) => void;
};

export const SearchFilterDrawer = ({
  onClose,
  isOpen,
  onSubmit,
}: SearchFilterDrawerProps) => {
  const categoriesSelectRef = useRef<HTMLSelectElement>(null);

  const [priceRangeState, setPriceRangeState] = useState({
    min: 0,
    max: 3000,
  });

  const onSubmitDrawer = () => {
    onSubmit({
      category: (categoriesSelectRef.current?.value as Categories) || undefined,
      subCategory: undefined,
      priceRange: {
        min: priceRangeState.min,
        max: priceRangeState.max,
      },
    });
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Filter your search</DrawerHeader>

        <DrawerBody display={"flex"} flexDirection={"column"} gap={8}>
          <Select ref={categoriesSelectRef} placeholder="Select category">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>

          <Box>
            <Heading size="sm">Price range</Heading>
            <Flex mt={2} justifyContent="space-between">
              <Text>{priceRangeState.min}</Text>
              <Text>{priceRangeState.max}</Text>
            </Flex>
            <RangeSlider
              mt={2}
              aria-label={["min", "max"]}
              min={0}
              max={3000}
              defaultValue={[0, 3000]}
              onChangeEnd={(values) =>
                setPriceRangeState({ min: values[0], max: values[1] })
              }
              onChangeStart={(values) =>
                setPriceRangeState({ min: values[0], max: values[1] })
              }
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmitDrawer}>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
