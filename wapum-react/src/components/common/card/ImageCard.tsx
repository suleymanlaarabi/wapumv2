import { Card, ChakraProps, IconButton, Image } from "@chakra-ui/react";
import { Trash } from "lucide-react";

export type ImageCardProps = {
  src: string;
  onDelete?: () => void;
  chakraProps?: ChakraProps;
};

export const ImageCard = (props: ImageCardProps) => {
  return (
    <Card p={2} position="relative" {...props.chakraProps}>
      <IconButton
        aria-label="Delete"
        icon={<Trash height={20} />}
        onClick={props.onDelete}
        position="absolute"
        right={-3}
        top={-3}
        colorScheme="red"
      />
      <Image
        src={props.src}
        alt="item"
        w="100%"
        h="100%"
        objectFit={"contain"}
        borderRadius="md"
      />
    </Card>
  );
};
