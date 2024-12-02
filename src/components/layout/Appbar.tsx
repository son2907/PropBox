import { Box, styled } from "@mui/material";
import { appBarHeight } from "../../config";
import AppbarButton from "../appbar/AppbarButton";
import { useState } from "react";
import { Select } from "../Select";
import useSelect from "../../hooks/useSelect";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

// AppBarArea 컴포넌트: 앱바 영역
const AppBarArea = styled(Box)(({ theme }) => ({
  display: "flex",
  height: `${appBarHeight}px`,
  minHeight: `${appBarHeight}px`,
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.appbar.appbarBg,
  borderBottom: "1px solid",
  borderColor: theme.palette.appbar.appbarBorderColor,
  position: "relative",
  padding: "0 20px 0 20px",
}));

const testData = [
  {
    value: 1,
    data: "대구 수성구 센터",
  },
  {
    value: 2,
    data: "대구 OO구 센터2",
  },
  {
    value: 3,
    data: "대구 OO구 센터3",
  },
  {
    value: 4,
    data: "대구 OO구 센터4",
  },
];
// 실시간으로 상태를 받아서 보여주어야 함
export default function Appbar() {
  const [state, setState] = useState<boolean>(true);
  const { selectValue, handleChange } = useSelect();
  const text = "010-1111-1111";
  const clear = useAuthStore(["clear"]);
  const navigate = useNavigate();
  const textBtn = () => {
    clear.clear();
    navigate("/login");
  };

  return (
    <AppBarArea>
      <Select
        value={selectValue}
        onChange={handleChange}
        selectData={testData}
        placeholder={"현장 선택"}
        sx={{ width: "160px" }}
      />
      <AppbarButton state={state} text={text} />
      <button onClick={textBtn}>로그아웃</button>
    </AppBarArea>
  );
}
