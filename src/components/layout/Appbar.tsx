import { Box, styled } from "@mui/material";
import { appBarHeight } from "../../config";
import AppbarButton from "../appbar/AppbarButton";
import { useState } from "react";
import { Select } from "../Select";

// AppBarArea 컴포넌트: 앱바 영역
const AppBarArea = styled(Box)(({ theme }) => ({
  display: "flex",
  height: `${appBarHeight}px`,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.appbar.appbarBg,
  borderBottom: "1px solid",
  borderColor: theme.palette.appbar.appbarBorderColor,
  position: "relative",
}));

const testData = [
  {
    value: 1,
    data: "하나",
  },
  {
    value: 2,
    data: "둘",
  },
  {
    value: 3,
    data: "셋",
  },
  {
    value: 4,
    data: "넷",
  },
];
// 실시간으로 상태를 받아서 보여주어야 함
export default function Appbar() {
  const [state, setState] = useState<boolean>(true);
  const text = "010-1111-1111";
  return (
    <AppBarArea>
      <Box
        sx={{
          position: "absolute", // 왼쪽에 고정
          left: 0,
        }}
      >
        <Select selectData={testData} />
      </Box>
      <AppbarButton state={state} text={text} />
    </AppBarArea>
  );
}
