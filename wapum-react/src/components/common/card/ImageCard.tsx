import { Card, IconButton, Image } from "@chakra-ui/react";
import { Trash } from "lucide-react";

export type ImageCardProps = {
  src: string;
  onDelete?: () => void;
};

export const ImageCard = (props: ImageCardProps) => {
  return (
    <Card p={2}>
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
        w="200px"
        h="200px"
        objectFit={"contain"}
        borderRadius="md"
      />
    </Card>
  );
};
