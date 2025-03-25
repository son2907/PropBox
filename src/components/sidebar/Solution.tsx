import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { styled, Typography } from "@mui/material";
import { SolutionType } from "../../types/menu";

interface SolutionProps extends SolutionType {
  children: React.ReactNode;
  fold: boolean;
  style?: React.CSSProperties; // 스타일 속성 추
  onClick?: () => void; // onClick을 옵셔널로 추가
}

const SolutionList = styled(List)(() => ({
  width: "100%",
  backgroundColor: "#323337",
  color: "#ffffff",
}));

// shouldForwardProp을 사용하여 oepn이 DOM에 전달되지 않도록 설정
const MainMenu = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "auth",
})<{ open: boolean; auth: boolean }>(() => ({
  backgroundColor: "#009EFF",
  padding: "8px 8px 8px 12px",
  color: "white",
  "&:hover": {
    backgroundColor: "#009EFF", // 기존 배경색과 동일하게 설정
  },
}));

const SolutionIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== "auth",
})<{ auth: boolean }>(() => ({
  color: "white",
  paddingLeft: 1,
  minWidth: 30,
  fontSize: "20px",
}));

export default function Solution({
  children,
  onClick, // onClick을 받음
  ...solutionProps
}: SolutionProps) {
  const { label, icon, isOpen = false, auth, fold } = solutionProps;

  const [open, setOpen] = React.useState(isOpen);

  const handleClick = () => {
    setOpen(!open); // open 상태 변경
    if (onClick) {
      onClick(); // 부모로부터 전달된 onClick 실행
    }
  };

  return (
    <SolutionList>
      <MainMenu open={open} auth={auth} onClick={handleClick}>
        <SolutionIcon auth={auth}>{icon}</SolutionIcon>
        {!fold && (
          <Typography fontSize={"16px"} color="white" marginRight={"auto"}>
            {label}
          </Typography>
        )}
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
