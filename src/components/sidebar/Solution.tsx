import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material";

interface SolutionProps {
  children: React.ReactNode;
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isAble: boolean;
}

const SolutionList = styled(List)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.sidebar.menuBg,
}));

// shouldForwardProp을 사용하여 oepn이 DOM에 전달되지 않도록 설정
const MainMenu = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isAble", // oepn 속성을 DOM으로 전달하지 않음
})<{ open: boolean; isAble: boolean }>(({ theme, open, isAble }) => ({
  borderRadius: "10px",
  backgroundColor:
    open && isAble
      ? theme.palette.sidebar.menuItemActiveBg
      : theme.palette.sidebar.menuBg, // oepn에 따라 배경색 변경
  padding: 0,
  margin: "0px 12px 0px 12px",
}));

const SolutionIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "isAble", // oepn 속성을 DOM으로 전달하지 않음
})<{ isAble: boolean }>(({ theme, isAble }) => ({
  color: isAble ? theme.palette.primary.main : theme.palette.root.coolGray400, // oepn에 따라 배경색 변경
  paddingLeft: 1,
  minWidth: 40,
}));

export default function Solution({
  children,
  label,
  icon,
  isOpen = false,
  isAble,
}: SolutionProps) {
  const [open, setOpen] = React.useState(isOpen);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <SolutionList>
      <MainMenu open={open} isAble={isAble} onClick={handleClick}>
        <SolutionIcon isAble={isAble}>{icon}</SolutionIcon>
        <ListItemText sx={{ pl: 0.5 }} primary={label} />
        {open && isAble ? <ExpandLess /> : <ExpandMore />}
      </MainMenu>
      {isAble && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
      )}
    </SolutionList>
  );
}
