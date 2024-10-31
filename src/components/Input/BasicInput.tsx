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
        inputRef={ref}
        sx={{
          display: "flex", // 부모 컴포넌트에 맞추어 높이와 가로 길이가 줄어들도록 함
          backgroundColor: "white",
          minHeight: 0,
          height: "100%",
          ...(rest.sx || {}),
        }}
      />
    );
  }
);

export default BasicInput;
