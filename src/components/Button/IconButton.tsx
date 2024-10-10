import { IconButtonProps, IconButton as MUIIconButton } from "@mui/material";

export default function IconButton({ children, ...rest }: IconButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    rest.onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <MUIIconButton {...rest} onClick={handleClick} onKeyDown={handleKeyDown}>
      {children}
    </MUIIconButton>
  );
}
