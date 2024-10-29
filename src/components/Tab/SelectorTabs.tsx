import React, { ReactNode } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/system";
import { renderChild } from "../../utils/renderChild";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: "#f5f7fa", // 탭의 기본 배경색
  width: "100%", // 부모의 너비를 꽉 채우도록 설정
  minHeight: "48px", // 최소 높이 설정
  padding: "0", // 패딩 제거
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .Mui-selected": {
    color: "#000", // 선택된 탭의 글자 색
    fontWeight: "bold",
  },
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  flex: 1, // 모든 탭이 동일한 너비를 갖도록 설정
  minHeight: "48px",
  transition: "color 0.3s ease",
  zIndex: 2,
  padding: "16px 0", // 탭 내부 패딩 조정
  "&.Mui-selected": {
    color: "#000", // 선택된 탭의 글자색
    fontWeight: "bold",
  },
}));

const TabIndicator = styled(Box)(({ theme }) => ({
  position: "absolute",
  height: "80%", // 높이를 적절히 설정
  top: "10%", // 위쪽 여백 조정
  borderRadius: "7px",
  backgroundColor: "#fff", // 선택된 탭의 배경 색상
  transition: "transform 0.3s ease",
  zIndex: 0,
}));

interface SelectorTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void; // 두 개의 인자를 받도록 수정
  children: ReactNode;
}

export default function SelectorTabs({
  children,
  value,
  handleChange,
  ...rest
}: SelectorTabsProps) {
  return (
    <Box position="relative" display="flex" width="100%">
      {" "}
      {/* display를 flex로 변경 */}
      <StyledTabs
        value={value}
        onChange={(event, newValue) => handleChange(event, newValue)}
        TabIndicatorProps={{ style: { display: "none" } }}
        {...rest} // 나머지 prop을 여기에 전달
      >
        {/* children에서 SelectorTabs.Tab 타입만 필터링하여 렌더링 */}
        {renderChild(children, SelectorTabs.Tab)}
      </StyledTabs>
      <TabIndicator
        sx={{
          width: `${100 / React.Children.count(children)}%`, // 탭의 수에 따라 너비 조정
          transform: `translateX(${value * 100}%)`,
        }}
      />
    </Box>
  );
}

SelectorTabs.Tab = CustomTab;
