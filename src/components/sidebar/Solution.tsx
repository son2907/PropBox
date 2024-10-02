import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material";
import { SolutionType } from "../../types/menu";

interface SolutionProps extends SolutionType {
  children: React.ReactNode;
  fold: boolean;
}

const SolutionList = styled(List)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.sidebar.menuBg,
}));

// shouldForwardProp을 사용하여 oepn이 DOM에 전달되지 않도록 설정
const MainMenu = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "auth",
})<{ open: boolean; auth: boolean }>(({ theme, open, auth }) => ({
  borderRadius: "10px",
  backgroundColor:
    open && auth
      ? theme.palette.sidebar.menuItemActiveBg
      : theme.palette.sidebar.menuBg,
  padding: 0,
  margin: "0px 12px 0px 12px",
}));

const SolutionIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "auth",
})<{ auth: boolean }>(({ theme, auth }) => ({
  color: auth ? theme.palette.primary.main : theme.palette.root.coolGray400,
  paddingLeft: 1,
  minWidth: 40,
}));

export default function Solution({
  children,
  ...solutionProps
}: SolutionProps) {
  const { label, icon, isOpen = false, auth, fold } = solutionProps;

  const [open, setOpen] = React.useState(isOpen);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <SolutionList>
      <MainMenu open={open} auth={auth} onClick={handleClick}>
        <SolutionIcon auth={auth}>{icon}</SolutionIcon>
        {!fold && <ListItemText sx={{ pl: 0.5 }} primary={label} />}
        {!fold && (open && auth ? <ExpandLess /> : <ExpandMore />)}
      </MainMenu>
      {auth && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
      )}
    </SolutionList>
  );
}
