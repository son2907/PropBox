import { ButtonBaseProps, ButtonBase as MUIButtonBase } from "@mui/material";

export default function ButtonBase({ children, ...rest }: ButtonBaseProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    rest.onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <MUIButtonBase {...rest} onClick={handleClick} onKeyDown={handleKeyDown}>
      {children}
    </MUIButtonBase>
  );
}
