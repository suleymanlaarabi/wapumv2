import { UseToastOptions } from "@chakra-ui/react";

type toastProps = {
  title: string;
  description: string;
};

const reusedToastProps: UseToastOptions = {
  position: "top-right",
  isClosable: true,
  duration: 4000,
};

export const successToast = ({
  title,
  description,
}: toastProps): UseToastOptions => ({
  title,
  description,
  status: "success",
  ...reusedToastProps,
});

export const errorToast = ({
  title,
  description,
}: toastProps): UseToastOptions => ({
  title,
  description,
  status: "error",
  ...reusedToastProps,
});
