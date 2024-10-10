import IconButton from "./IconButton";

import { ButtonProps, Button as MUIButton } from "@mui/material";

export { IconButton };

export default function Button({ children, ...rest }: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    rest.onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <MUIButton {...rest} onClick={handleClick} onKeyDown={handleKeyDown}>
      {children}
    </MUIButton>
  );
}
