import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  AdProductState,
  AutomobileSubCategory,
  Categories,
  FashionSubCategory,
  HomeSubCategory,
  JobsSubCategory,
  ServicesSubCategory,
  TechnologySubCategory,
} from "../../../../wapum-types/ads/Ads.types";
import { FormAdData } from "./CreateAd";

interface Props {
  register: UseFormRegister<FormAdData>;
  errors: FieldErrors<FormAdData>;
}

export default function Form1({ register, errors }: Props) {
  const [categoriesSelected, setCategoriesSelected] = useState<Categories>(
    Object.values(Categories)[0]
  );

  const renderSubCategories = (categories: Record<string, string>) => {
    return Object.values(categories).map((subCategory) => (
      <option key={subCategory} value={subCategory}>
        {subCategory}
      </option>
    ));
  };

  const subCategoriesDisplay = () => {
    console.log(categoriesSelected);
    switch (categoriesSelected) {
      case Categories.TECHNOLOGY:
        return renderSubCategories(TechnologySubCategory);
      case Categories.FASHION:
        return renderSubCategories(FashionSubCategory);
      case Categories.HOME:
        return renderSubCategories(HomeSubCategory);
      case Categories.AUTOMOBILE:
        return renderSubCategories(AutomobileSubCategory);
      case Categories.JOBS:
        return renderSubCategories(JobsSubCategory);
      case Categories.SERVICES:
        return renderSubCategories(ServicesSubCategory);
      default:
        return null;
    }
  };

  return (
    <>
      {" "}
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Ad Details
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="title" fontWeight={"normal"}>
            Title
          </FormLabel>
          <Input
            {...register("title", {
              required: "This field is required",
              minLength: {
                value: 4,
                message: "Title must be at least 5 characters long",
              },
            })}
            placeholder="Title"
          />
          {errors.title && (
            <Text color="red" fontSize="sm">
              {errors.title.message}
            </Text>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="price" fontWeight={"normal"}>
            Price
          </FormLabel>
          <Input
            {...register("price", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Price must be at least 1",
              },
            })}
            placeholder="Price"
            type="number"
          />
          {errors.price && (
            <Text color="red" fontSize="sm">
              {errors.price.message}
            </Text>
          )}
        </FormControl>
      </Flex>
      <FormControl mt={4}>
        <FormLabel htmlFor="category" fontWeight={"normal"}>
          Category
        </FormLabel>
        <Select
          {...register("category", {
            required: "This field is required",
          })}
          onChange={(e) => {
            setCategoriesSelected(e.target.value as Categories);
          }}
          value={categoriesSelected}
          placeholder="Select category"
        >
          {Object.values(Categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="productState" fontWeight={"normal"}>
          Sub Category
        </FormLabel>
        <Select
          {...register("subCategory", {
            required: "This field is required",
          })}
          placeholder="Select sub category"
        >
          {subCategoriesDisplay()}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="productState" fontWeight={"normal"}>
          Product State
        </FormLabel>
        <Select
          {...register("state", {
            required: "This field is required",
          })}
          placeholder="Select product state"
        >
          {Object.values(AdProductState).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="description" fontWeight={"normal"}>
          Description
        </FormLabel>
        <Textarea
          {...register("description", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters long",
            },
          })}
          placeholder="Description"
        />
      </FormControl>
    </>
  );
}
