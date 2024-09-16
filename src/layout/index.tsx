import { Box, Stack, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { appBarHeight } from "../config";

const PageContainer = styled(Box)(() => ({
  position: "relative",
}));

type ContentWrapperProps = {
  full?: boolean;
};

const ContentWrapper = styled(Stack)<ContentWrapperProps>(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.common.white,
  height: `calc(100dvh - ${appBarHeight}px)`,
}));

export default function DefaultLayout() {
  return (
    <Box>
      <PageContainer>
        {/* 이곳에 상단 바와 */}
        {/* 사이드 메뉴 삽입 필요 */}
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </PageContainer>
    </Box>
  );
}
