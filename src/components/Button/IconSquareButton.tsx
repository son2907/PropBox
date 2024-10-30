import { IconButtonProps, IconButton as MUIIconButton } from "@mui/material";

// 아이콘만 버튼으로 사용할 때 외곽에 둥근 사각 테두리를 넣는다
export default function IconSquareButton({
  children,
  ...rest
}: IconButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    rest.onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <MUIIconButton
      sx={{
        display: "flex",
        border: "1px solid", // 테두리 추가
        margin: "0px 5px 0px 5px",
        borderColor: "primary.main", // 테두리 색상 지정
        borderRadius: "8px", // 둥근 사각형 테두리
        backgroundColor: "primary.light",
        "&:hover": {
          backgroundColor: "primary.light", // 배경색 유지
          borderColor: "primary.main", // 테두리 색상 유지
        },
        ...(rest.sx || {}),
      }}
      {...rest}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </MUIIconButton>
  );
}
