import { forwardRef } from "react";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";

interface InputProps extends OutlinedInputProps {
  placeholder?: string;
}

const BasicInput = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder = "", ...rest }, ref) => {
    return (
      <OutlinedInput
        {...rest}
        size="small"
        placeholder={placeholder}
        inputRef={ref} // ref를 OutlinedInput에 전달합니다.
        sx={{ display: "flex", backgroundColor: "white", ...(rest.sx || {}) }}
      />
    );
  }
);

export default BasicInput;
