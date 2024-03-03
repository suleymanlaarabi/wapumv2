import { useEffect } from "react";

interface Props {
  onChange: (files: File[]) => void | File[];
}

export const useFileInput = ({ onChange }: Props) => {
  const fileInput = document.createElement("input");

  const onOpen = async () => {
    fileInput.click();
  };

  useEffect(() => {
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    function handleFileInput() {
      if (fileInput.files) {
        onChange(Array.from(fileInput.files) as File[]);
      }
    }
    fileInput.addEventListener("change", handleFileInput);

    return () => {
      fileInput.removeEventListener("change", handleFileInput);
    };
  }, [fileInput, onChange]);

  return { onOpen };
};
