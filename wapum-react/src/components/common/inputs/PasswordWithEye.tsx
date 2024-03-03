import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

export interface PasswordWithEyeProps extends InputProps {
  label?: string;
  isRequired?: boolean;
}

export const PasswordWithEye = forwardRef(function (
  props: PasswordWithEyeProps,
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl isRequired={props.isRequired || false}>
      {props.label && <FormLabel>{props.label}</FormLabel>}
      <InputGroup>
        <Input ref={ref} {...props} type={showPassword ? "text" : "password"} />
        <InputRightElement h={"full"}>
          <IconButton
            variant={"ghost"}
            onClick={() => setShowPassword((showPassword) => !showPassword)}
            aria-label="Toggle password visibility"
            icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
});
