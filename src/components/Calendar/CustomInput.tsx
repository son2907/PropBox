import React, { forwardRef } from "react";
import TextField from "@mui/material/TextField";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <TextField
      inputRef={ref}
      onClick={onClick}
      value={value}
      variant="outlined"
      placeholder="yyyy-MM-dd"
      InputProps={{
        endAdornment: <CalendarTodayIcon style={{ cursor: "pointer" }} />,
        readOnly: true, // 직접 입력을 방지하고 클릭으로만 날짜 선택
      }}
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          color: "gray", // 텍스트 색상 회색으로
          borderRadius: "10px", // border radius 50%
        },
      }} // 필요에 따라 너비 조정
    />
  )
);

export default CustomInput;
