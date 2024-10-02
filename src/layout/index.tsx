import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Appbar from "../components/layout/Appbar";

// PageContainer 컴포넌트: 페이지 전체를 감싸는 컨테이너
const PageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexGrow: 1,
  height: "100dvh", // 뷰포트 전체 높이를 차지
  backgroundColor: theme.palette.common.white,
}));

// ContentArea 컴포넌트: 컨텐츠와 앱바를 포함하는 메인 영역
const ContentArea = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.common.white,
}));

// Content 컴포넌트: 메인 컨텐츠 영역
const Content = styled(Box)(() => ({
  height: "100%",
  overflow: "auto", // 스크롤 필요 시 활성화
}));

export default function DefaultLayout() {
  return (
    <Box>
      <PageContainer>
        <Sidebar />
        <ContentArea>
          <Appbar />
          <Content>
            <Outlet />
          </Content>
        </ContentArea>
      </PageContainer>
    </Box>
  );
}
