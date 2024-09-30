import { Box, styled } from "@mui/material";
import { appBarHeight } from "../../config";
import AppbarButton from "../appbar/AppbarButton";
import { useState } from "react";

// AppBarArea 컴포넌트: 앱바 영역
const AppBarArea = styled(Box)(({ theme }) => ({
  display: "flex",
  height: `${appBarHeight}px`,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.appbar.appbarBg,
}));

// 실시간으로 상태를 받아서 보여주어야 함
export default function Appbar() {
  const [state, setState] = useState<boolean>(true);
  const text = "010-1111-1111";
  return (
    <AppBarArea>
      <AppbarButton state={state} text={text} />
    </AppBarArea>
  );
}
