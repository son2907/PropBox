import { Box, Typography, Divider } from "@mui/material";
import { forwardRef } from "react";

interface ItemProps {
  label: string;
  value: string;
  isFirst: boolean;
  isLast: boolean;
}

interface CheckboxListProps {
  data: { id: string; label: string }[];
  refArray: (HTMLInputElement | null)[];
  dividerIds?: (string | number)[]; // Divider를 추가할 id 배열
}

const ListItem = forwardRef<HTMLInputElement, ItemProps>(
  ({ label, isFirst, isLast, value, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const box = e.target.closest(".checkbox-box") as HTMLElement;
      if (box) {
        const isChecked = e.target.checked;

        // 첫 항목일 때
        if (isFirst) {
          box.style.borderBottom = isChecked ? "1px solid gray" : "none";
          box.style.borderTop = "none";
        }
        // 마지막 항목일 때
        else if (isLast) {
          box.style.borderTop = isChecked ? "1px solid gray" : "none";
          box.style.borderBottom = "none";
        }
        // 중간 항목일 때
        else {
          // box.style.borderTop = isChecked ? "1px solid gray" : "none";
          // box.style.borderBottom = isChecked ? "1px solid gray" : "none";
        }

        box.style.backgroundColor = isChecked ? "#CBE0FF" : "transparent";
      }
    };

    return (
      <Box
        display="flex"
        className="checkbox-box"
        sx={{
          padding: "7px",
          backgroundColor: "transparent",
          transition: "background-color 0.2s, border 0.2s",
        }}
      >
        <input
          {...rest}
          type="checkbox"
          ref={ref}
          onChange={handleChange}
          value={value}
        />
        <Typography>{label}</Typography>
      </Box>
    );
  }
);

export default function CheckboxList({
  data,
  refArray,
  dividerIds = [],
}: CheckboxListProps) {
  return (
    <Box
      sx={{
        border: "1px solid gray",
        borderRadius: "7px",
        overflow: "auto",
      }}
    >
      {data.map((item, index) => (
        <Box key={item.id} sx={{ overflow: "auto" }}>
          <ListItem
            ref={(el) => (refArray[index] = el)}
            value={item.id}
            label={item.label}
            isFirst={index === 0}
            isLast={index === data.length - 1}
          />
          {/* dividerIds 배열에 포함된 id의 아래에만 Divider 삽입 */}
          {dividerIds.includes(item.id) && index < data.length - 1 && (
            <Divider
              sx={{
                margin: "4px 0",
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
