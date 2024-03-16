import { Heading } from "@chakra-ui/react";
import AutoComplete from "react-google-autocomplete";
import { UseFormSetValue } from "react-hook-form";
import { GOOGLE_MAPS_API_KEY } from "../../../../data/dev.variable";
import { FormAdData } from "./CreateAd";

interface Form2Props {
  setValue: UseFormSetValue<FormAdData>;
}

export default function Form2({ setValue }: Form2Props) {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Location Details
      </Heading>

      <AutoComplete
        apiKey={GOOGLE_MAPS_API_KEY}
        style={{
          width: "100%",
          height: "40px",
          paddingLeft: "16px",
          marginTop: "2%",
          marginBottom: "2%",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "5px",
          backgroundColor: "transparent",
        }}
        aria-placeholder="Search for your location"
        language="en"
        lang="en"
        onPlaceSelected={(place) => {
          setValue("location", place.formatted_address as string);
        }}
      />
    </>
  );
}
