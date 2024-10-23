import { forwardRef } from "react";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";

interface InputProps extends OutlinedInputProps {
  placeholder: string;
}

// forwardRef를 사용하여 BasicInput 컴포넌트를 정의합니다.
const BasicInput = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, ...rest }, ref) => {
    return (
      <OutlinedInput
        placeholder={placeholder}
        inputRef={ref} // ref를 OutlinedInput에 전달합니다.
        {...rest} // 나머지 props를 전달합니다.
      />
    );
  }
);

export default BasicInput;
