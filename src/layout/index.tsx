import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Appbar from "../components/layout/Appbar";
import Content from "../components/layout/Content";

// PageContainer 컴포넌트: 페이지 전체를 감싸는 컨테이너
const PageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  backgroundColor: theme.palette.common.white,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  flexShrink: 1,
}));

// ContentArea 컴포넌트: 컨텐츠와 앱바를 포함하는 메인 영역
const PageArea = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  minHeight: 0,
  maxHeight: "100%",
  flexBasis: "auto",
  flexDirection: "column",
  minWidth: 0,
  backgroundColor: theme.palette.common.white,
}));

export default function DefaultLayout() {
  return (
    <PageContainer>
      <Sidebar />
      <PageArea>
        <Appbar />
        <Content>
          <Outlet />
        </Content>
      </PageArea>
    </PageContainer>
  );
}
