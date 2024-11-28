import Button from ".";
import { ButtonProps } from "@mui/material";

// 회색 배경, 검은 글씨
export default function BlackButton({ children, ...rest }: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    rest.onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: "#2C2C2C", color: "white" }}
      {...rest}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </Button>
  );
}
