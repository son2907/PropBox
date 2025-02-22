import { forwardRef, useState } from "react";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import { Controller } from "react-hook-form";

interface InputProps extends OutlinedInputProps {
  control: any;
  name: string;
  placeholder?: string;
}

//전화번호 정규식 추가 inputbox
//사용자가 입력한 값을 PhoneInput에 넘기고 입력값을 수정한 뒤 보내야하기때문에 Controller를 사용하도록 수정
const PhoneInput = forwardRef<HTMLInputElement, InputProps>(
  ({ control, name, placeholder = "", ...rest }, ref) => {
    return (
      <Controller
        name={name}  //필드명
        control={control}  //Controller를 사용하기위해 control전달함
        render={({ field: { onChange, value } }) => {
          // 숫자만 입력되도록 변경
          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const numericValue = event.target.value.replace(/\D/g, "");
            let formattedValue = numericValue;

            if (numericValue.length === 8) {
              formattedValue = numericValue.replace(/(\d{4})(\d{4})/, "$1-$2");
            } else if (numericValue.startsWith("02")) {
              formattedValue = numericValue.replace(
                /^(02)(\d{3,4})(\d{4})$/,
                "$1-$2-$3"
              );
            } else if (numericValue.length === 11) {
              formattedValue = numericValue.replace(
                /(\d{3})(\d{4})(\d{4})/,
                "$1-$2-$3"
              );
            } else if (numericValue.startsWith("080")) {
              formattedValue = numericValue.replace(
                /^(080)(\d{3})(\d{4})$/,
                "$1-$2-$3"
              );
            } else if (numericValue.length === 10) {
              formattedValue = numericValue.replace(
                /(\d{3})(\d{3})(\d{4})/,
                "$1-$2-$3"
              );
            }

            onChange(formattedValue);
          };

          return (
            <OutlinedInput
              {...rest}
              size="small"
              placeholder={placeholder}
              inputRef={ref}
              value={value || ""}
              onChange={handleChange}
              sx={{
                backgroundColor: "white",
                ...(rest.sx || {}),
              }}
            />
          );
        }}
      />
    );
  }
);

export default PhoneInput;
