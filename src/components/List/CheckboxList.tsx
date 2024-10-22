import { Box, Typography } from "@mui/material";
import { forwardRef } from "react";

interface ItemProps {
  label: string;
}

interface CheckboxListProps {
  data: { id: string | number; label: string }[];
  refArray: (HTMLInputElement | null)[]; // refArray 타입
}

const ListItem = forwardRef<HTMLInputElement, ItemProps>(
  ({ label, ...rest }, ref) => {
    // 체크박스의 상태에 따라 배경색 변경
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // 체크박스의 상위 요소 Box에 접근
      const box = e.target.closest(".checkbox-box") as HTMLElement; // 타입 단언
      if (box) {
        box.style.backgroundColor = e.target.checked
          ? "#CBE0FF"
          : "transparent";
        box.style.borderBottom = e.target.checked
          ? "1px solid gray"
          : "transparent";
      }
    };

    return (
      <Box
        display="flex"
        className="checkbox-box" // className 추가
        sx={{ padding: "7px", transition: "background-color 0.2s" }}
      >
        <input {...rest} type="checkbox" ref={ref} onChange={handleChange} />
        <Typography>{label}</Typography>
      </Box>
    );
  }
);

export default function CheckboxList({ data, refArray }: CheckboxListProps) {
  return (
    <Box
      sx={{
        border: "1px solid gray",
        borderRadius: "7px",
        overflow: "hidden",
      }}
    >
      {data.map((item, index) => {
        return (
          <ListItem
            ref={(el) => (refArray[index] = el)} // forwardRef로 전달
            key={index}
            label={item.label}
          />
        );
      })}
    </Box>
  );
}
