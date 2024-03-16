import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Progress,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  AdProductState,
  Categories,
} from "../../../../wapum-types/ads/Ads.types";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { errorToast } from "../../../../data/toast";
import { addAdPicture, createAd } from "../../../../services/api/ad-api";
import Form1 from "./Step1";
import Form2 from "./Step2";
import Form3 from "./Step3";

export type FormAdData = {
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  subCategory: string;
  condition: string;
  state: AdProductState;
  images: File[];
};

export function CreateAd() {
  const navigate = useNavigate();

  const toast = useToast();

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const [isInPublishing, setIsInPublishing] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormAdData>();

  const onSubmit = (data: FormAdData) => {
    if (step !== 3) {
      setStep(step + 1);
      setProgress(progress + 33.33);
      return;
    }
    setProgress(100);

    const AdCategoryArray: Categories[] = Object.values(Categories);
    if (AdCategoryArray.includes(data.category as Categories)) {
      createAd(data).then((res) => {
        setIsInPublishing(false);
        toast({
          title: "Ad Created",
          description: "Your ad has been created",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        addAdPicture(res.id, files);
      });
      navigate("/");
    } else {
      toast(errorToast({ title: "Invalid Category", description: "" }));
    }
  };

  if (isInPublishing) {
    return <Spinner />;
  }

  return (
    <>
      <motion.div
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%" }}
      >
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          m="10px auto"
          w={"97%"}
          mt={8}
        >
          <Progress
            hasStripe
            value={progress}
            mb="5%"
            mx="5%"
            isAnimated
          ></Progress>
          {step === 1 ? (
            <Form1 register={register} errors={errors} />
          ) : step === 2 ? (
            <Form2 setValue={setValue} />
          ) : (
            <Form3 files={files} setFiles={setFiles} />
          )}
          <ButtonGroup mt="5%" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Flex>
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    setProgress(progress - 33.33);
                  }}
                  isDisabled={step === 1}
                  variant="solid"
                  w="7rem"
                  mr="5%"
                >
                  Back
                </Button>
                {step !== 3 ? (
                  <Button
                    w="7rem"
                    type="submit"
                    colorScheme="blue"
                    variant="outline"
                  >
                    Next
                  </Button>
                ) : null}
              </Flex>
              {step === 3 ? (
                <Button
                  w="7rem"
                  colorScheme="green"
                  variant="solid"
                  onClick={() => {}}
                  type="submit"
                >
                  Publish
                </Button>
              ) : null}
            </Flex>
          </ButtonGroup>
        </Box>
      </motion.div>
    </>
  );
}
