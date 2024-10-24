import React, { ReactNode } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/system";
import { renderChild } from "../../utils/renderChild";

const StyledTabs = styled(Tabs)({
  backgroundColor: "#f5f7fa", // 탭의 기본 배경색
  minHeight: "48px",
  paddingRight: "5px",
  paddingLeft: "5px",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .Mui-selected": {
    color: "#000", // 선택된 탭의 글자 색
    fontWeight: "bold",
  },
});

const CustomTab = styled(Tab)({
  textTransform: "none",
  minHeight: "48px",
  minWidth: "100px",
  transition: "color 0.3s ease",
  zIndex: 2,
  "&.Mui-selected": {
    color: "#000", // 선택된 탭의 글자색
    fontWeight: "bold",
  },
});

const TabIndicator = styled(Box)({
  position: "absolute",
  height: "80%",
  top: "8%",
  borderRadius: "7px",
  backgroundColor: "#fff", // 선택된 탭의 배경 색상
  transition: "transform 0.3s ease",
  zIndex: 0,
});

interface SelectorTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void; // 두 개의 인자를 받도록 수정
  children: ReactNode;
}

export default function SelectorTabs({
  children,
  value,
  handleChange,
}: SelectorTabsProps) {
  return (
    <Box position="relative" display="inline-flex">
      <StyledTabs
        value={value}
        onChange={(event, newValue) => handleChange(event, newValue)}
        TabIndicatorProps={{ style: { display: "none" } }}
      >
        {/* children에서 SelectorTabs.Tab 타입만 필터링하여 렌더링 */}
        {renderChild(children, SelectorTabs.Tab)}
        <TabIndicator
          sx={{
            width: `${100 / React.Children.count(children)}%`, // 탭의 수에 따라 너비 조정
            transform: `translateX(${value * 100}%)`,
          }}
        />
      </StyledTabs>
    </Box>
  );
}

SelectorTabs.Tab = CustomTab;
