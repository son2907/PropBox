import { forwardRef, useState } from "react";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";

interface InputProps extends OutlinedInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  name?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder = "",
      value,
      defaultValue = "",
      onChange,
      onBlur,
      name,
      ...rest
    },
    ref
  ) => {
    const [phoneNum, setPhoneNum] = useState(value);

    // 숫자만 입력되도록 함
    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const target = event.target as HTMLInputElement;
      let numericValue = target.value.replace(/\D/g, "");

      if (numericValue.length === 8) {
        // 8자리 업체번호 1668-0000
        numericValue = numericValue.replace(/(\d{4})(\d{4})/, "$1-$2");
      } else if (numericValue.startsWith("02")) {
        //02로 시작하는 전화번호
        numericValue = numericValue.replace(
          /^(02)(\d{3,4})(\d{4})$/,
          "$1-$2-$3"
        );
      } else if (numericValue.length === 11) {
        // 11자리 휴대폰 번호
        numericValue = numericValue.replace(
          /(\d{3})(\d{4})(\d{4})/,
          "$1-$2-$3"
        );
      } else if (numericValue.startsWith("080")) {
        //080으로 시작하며 중간자리가 3자리인 전화번호
        numericValue = numericValue.replace(
          /^(080)(\d{3})(\d{4})$/,
          "$1-$2-$3"
        );
      } else if (numericValue.length === 10) {
        //10자리 서울 외 전화번호
        numericValue = numericValue.replace(
          /(\d{3})(\d{3})(\d{4})/,
          "$1-$2-$3"
        );
      }

      setPhoneNum(numericValue);
      if (onChange) {
        event.target.value = numericValue;
        onChange(event);
      }
    };

    // 포커스 아웃 시 값 초기화
    const handleBlur = (
      event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setPhoneNum(value);
      if (onBlur) {
        onBlur(event);
      }
    };

    return (
      <OutlinedInput
        {...rest}
        size="small"
        placeholder={placeholder}
        inputRef={ref}
        value={phoneNum}
        defaultValue={defaultValue}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        sx={{
          backgroundColor: "white",
          ...(rest.sx || {}),
        }}
      />
    );
  }
);

export default PhoneInput;
