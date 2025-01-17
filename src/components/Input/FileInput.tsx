import { forwardRef } from "react";
import DeleteBtnInput from "./DeleteBtnInput";
import { OutlinedInputProps } from "@mui/material";

export const FileInput = forwardRef<HTMLInputElement, OutlinedInputProps>(
  ({ ...props }, ref) => {
    return (
      <DeleteBtnInput
        ref={ref}
        placeholder="첨부파일"
        inputProps={{ multiple: true, type: "file" }}
        {...props}
      />
    );
  }
);
