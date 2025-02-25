import { forwardRef, useState } from "react";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import { regPhoneNumber } from "../../utils/regPhoneNumber";

interface InputProps extends OutlinedInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
      const numericValue = regPhoneNumber(target.value);

      setPhoneNum(numericValue);
      if (onChange) {
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
