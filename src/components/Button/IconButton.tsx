import { IconButtonProps, IconButton as MUIIconButton } from "@mui/material";

// 아이콘만 버튼으로 사용할 때
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
