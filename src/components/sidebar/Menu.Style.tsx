import { List, ListItemButton, ListItemIcon, styled } from "@mui/material";

export const MenuArea = styled(List)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.sidebar.menuBg,
}));

// shouldForwardProp을 사용하여 oepn이 DOM에 전달되지 않도록 설정
export const MainMenu = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "auth", // oepn 속성을 DOM으로 전달하지 않음
})<{ open: boolean; auth: boolean }>(({ theme, open, auth }) => ({
  borderRadius: "10px",
  backgroundColor:
    open && auth
      ? theme.palette.sidebar.menuItemActiveBg
      : theme.palette.sidebar.menuBg, // oepn에 따라 배경색 변경
  padding: 0,
  margin: "0px 12px 0px 12px",
}));

export const MainIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "auth", // oepn 속성을 DOM으로 전달하지 않음
})<{ auth: boolean }>(({ theme, auth }) => ({
  color: auth ? theme.palette.primary.main : theme.palette.root.coolGray400, // oepn에 따라 배경색 변경
  paddingLeft: 1,
  minWidth: 40,
}));
