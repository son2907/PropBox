import IconButton from "./IconButton";
import ButtonBase from "./ButtonBase";
import BasicButton from "./BasicButton";
import GrayButton from "./GrayButton";
import ToggleButton from "./ToggleButton";
import { ButtonProps, Button as MUIButton } from "@mui/material";

export { IconButton, ButtonBase, BasicButton, GrayButton, ToggleButton };

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
