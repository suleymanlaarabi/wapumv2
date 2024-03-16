import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { Image } from "lucide-react";

export type MessageImageButtonProps = {
  onUpload: (file: File[]) => void;
};

export const MessageImageButton = ({ onUpload }: MessageImageButtonProps) => {
  const handleImageUploadRequest = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      console.log("file selected");
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        onUpload(Array.from(files));
      }
    };
    input.click();
  };
  return (
    <>
      <IconButton
        bg={useColorModeValue("gray.200", "gray.600")}
        aria-label=""
        icon={<Image />}
        onClick={handleImageUploadRequest}
      />
    </>
  );
};
