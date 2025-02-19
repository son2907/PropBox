import { forwardRef, useState } from "react";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";

interface InputProps extends OutlinedInputProps {
  placeholder?: string;
  value?: string;
}

//전화번호 정규식 추가 inputbox
const PhoneInput = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder = "", value, defaultValue = "", ...rest }, ref) => {
    const [phoneNum, setPhoneNum] = useState(value);

    // 숫자만 입력되도록 함
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = event.target.value.replace(/\D/g, ""); // 숫자만 남기기

      let formattedValue = numericValue;

      if (numericValue.length === 8) {
        // 8자리 업체번호 1668-0000
        formattedValue = numericValue.replace(/(\d{4})(\d{4})/, "$1-$2");
      } else if (numericValue.startsWith("02")) {
        //02로 시작하는 전화번호
        formattedValue = numericValue.replace(
          /^(02)(\d{3,4})(\d{4})$/,
          "$1-$2-$3"
        );
      } else if (numericValue.length === 11) {
        // 11자리 휴대폰 번호
        formattedValue = numericValue.replace(
          /(\d{3})(\d{4})(\d{4})/,
          "$1-$2-$3"
        );
      } else if (numericValue.startsWith("080")) {
        //080으로 시작하며 중간자리가 3자리인 전화번호
        formattedValue = numericValue.replace(
          /^(080)(\d{3})(\d{4})$/,
          "$1-$2-$3"
        );
      } else if (numericValue.length === 10) {
        //10자리 서울 외 전화번호
        formattedValue = numericValue.replace(
          /(\d{3})(\d{3})(\d{4})/,
          "$1-$2-$3"
        );
      }

      setPhoneNum(formattedValue);
    };

    // 포커스 아웃 시 값 초기화
    const handleBlur = () => {
      setPhoneNum(value); // 입력값 초기화
    };

    return (
      <OutlinedInput
        {...rest}
        size="small"
        placeholder={placeholder}
        inputRef={ref}
        value={phoneNum}
        defaultValue={defaultValue}
        onChange={handleChange} // 숫자만 입력받도록 설정
        onBlur={handleBlur} // 포커스 아웃 시 초기화
        sx={{
          backgroundColor: "white",
          ...(rest.sx || {}),
        }}
      />
    );
  }
);

export default PhoneInput;
