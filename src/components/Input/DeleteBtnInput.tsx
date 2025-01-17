import { forwardRef, ReactNode } from "react";
import {
  OutlinedInput,
  OutlinedInputProps,
  InputAdornment,
} from "@mui/material";

interface InputProps extends OutlinedInputProps {
  placeholder?: string;
  children?: ReactNode;
  btnfn?: () => void;
}

const DeleteBtnInput = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder = "검색", btnfn, children, ...rest }, ref) => {
    const handleClear = () => {
      if (ref && typeof ref !== "string") {
        const input = (ref as React.RefObject<HTMLInputElement>).current; // 전달받은 ref 사용
        if (input) {
          input.value = ""; // 입력 값을 초기화
          input.focus(); // 입력 필드에 포커스
        }
      }
    };

    return (
      <>
        <OutlinedInput
          placeholder={placeholder}
          inputRef={ref}
          size="small"
          endAdornment={
            <InputAdornment position="end">
              <button
                onClick={btnfn ? btnfn : handleClear}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </InputAdornment>
          }
          {...rest}
        />
        {children}
      </>
    );
  }
);

export default DeleteBtnInput;
