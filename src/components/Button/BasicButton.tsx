import Button from ".";
import { ButtonProps } from "@mui/material";

// 회색 테두리, 검은 글씨
export default function BasicButton({ children, ...rest }: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    rest.onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </Button>
  );
}
