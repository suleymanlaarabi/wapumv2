import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import { useFileInput } from "../../../../hooks/useFileInput";
import { ImageCard } from "../../../common/card/ImageCard";

interface Props {
  files: File[];
  setFiles: (callback: (prevFiles: File[]) => File[]) => void;
}

export default function Form3({ files, setFiles }: Props) {
  const { onOpen } = useFileInput({
    onChange: (files) => setFiles((prevFiles) => [...prevFiles, ...files]),
  });

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Images of the item
      </Heading>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="image"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Image
        </FormLabel>
        <Button onClick={onOpen} w="100%" h={"5rem"} variant="outline">
          Upload Image
        </Button>
      </FormControl>
      <Flex w="100%" flexWrap="wrap" justifyContent="center" gap={4} mt={4}>
        {files.map((file, index) => (
          <ImageCard
            key={index}
            src={URL.createObjectURL(file)}
            onDelete={() => {
              setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
            }}
          />
        ))}
      </Flex>
    </>
  );
}
