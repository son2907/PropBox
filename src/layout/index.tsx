import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { appBarHeight } from "../config";
import Sidebar from "../components/layout/Sidebar";
import { MenuType } from "../types/menu";
import { StarBorder } from "@mui/icons-material";

// PageContainer 컴포넌트: 페이지 전체를 감싸는 컨테이너
const PageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexGrow: 1,
  height: "100dvh", // 뷰포트 전체 높이를 차지
  backgroundColor: theme.palette.common.white,
}));

// type ContentWrapperProps = {
//   full?: boolean;
// };

// const ContentWrapper = styled(Stack)<ContentWrapperProps>(({ theme }) => ({
//   flexGrow: 1,
//   backgroundColor: theme.palette.common.white,
//   height: `calc(100dvh - ${appBarHeight}px)`,
// }));

// ContentArea 컴포넌트: 컨텐츠와 앱바를 포함하는 메인 영역
const ContentArea = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  backgroundColor: "yellow",
}));

// AppBarArea 컴포넌트: 앱바 영역
const AppBarArea = styled(Box)(() => ({
  display: "flex",
  height: `${appBarHeight}px`,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "skyblue",
}));

// Content 컴포넌트: 메인 컨텐츠 영역
const Content = styled(Box)(() => ({
  height: "100%",
  overflow: "auto", // 스크롤 필요 시 활성화
  backgroundColor: "green",
}));

const testData: MenuType[] = [
  {
    label: "테스트하나",
    url: "test",
  },
  {
    label: "테스트 둘",
    url: "test2",
  },
  {
    label: "테스트 셋",
    url: "test3",
  },
];

const SideMenu = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "250px",
  justifyContent: "center",
  alignItems: "center",
}));

export default function DefaultLayout() {
  return (
    <Box>
      <PageContainer>
        <SideMenu>
          <Sidebar
            label={"대메뉴명"}
            icon={<StarBorder />}
            menuListData={testData}
            isAble={true}
            isOpen={true}
          />
          <Sidebar
            label={"대메뉴명"}
            icon={<StarBorder />}
            menuListData={testData}
            isAble={false}
            isOpen={false}
          />
          <Sidebar
            label={"대메뉴명"}
            icon={<StarBorder />}
            menuListData={testData}
            isAble={true}
            isOpen={false}
          />
          <Sidebar
            label={"대메뉴명"}
            icon={<StarBorder />}
            menuListData={testData}
            isAble={false}
            isOpen={false}
          />
        </SideMenu>
        <ContentArea>
          <AppBarArea>앱바</AppBarArea>
          <Content>
            컨텐츠 영역
            <Outlet />
          </Content>
        </ContentArea>
      </PageContainer>
    </Box>
  );
}
