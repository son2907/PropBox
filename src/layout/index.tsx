import { Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { appBarHeight } from "../config";
import Sidebar from "../components/layout/Sidebar";
import { MenuListType } from "../types/menu";
import { StarBorder } from "@mui/icons-material";
import { useState } from "react";

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

const menuList: MenuListType = [
  {
    label: "Dashboard",
    auth: true,
    subMenu: [
      { label: "Overview", url: "/overview" },
      { label: "Stats", url: "/stats" },
      { label: "Reports", url: "/reports" },
    ],
  },
  {
    label: "Settings",
    auth: false,
    subMenu: [
      { label: "Profile", url: "/profile" },
      { label: "Account", url: "/account" },
      { label: "Security", url: "/security" },
    ],
  },
  {
    label: "Support",
    auth: true,
    subMenu: [
      { label: "FAQs", url: "/faqs" },
      { label: "Contact", url: "/contact" },
    ],
  },
];

const SideMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== "fold", // oepn 속성을 DOM으로 전달하지 않음
})<{ fold: boolean }>(({ theme, fold }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.sidebar.menuBg,
  width: fold ? "50px" : "250px",
  justifyContent: "center",
  alignItems: "center",
}));

export default function DefaultLayout() {
  //여기서 메뉴의 햄버거 여부를 전달해서
  // 메뉴 컴포넌트에서 글자를 숨기거나 어쩌고 한다
  const [fold, setFold] = useState<boolean>(false);

  const onClick = () => {
    setFold(!fold);
  };

  return (
    <Box>
      <PageContainer>
        <SideMenu fold={fold}>
          <div>
            {" "}
            로고 <button onClick={onClick}>햄버거 버튼</button>{" "}
          </div>
          {menuList.map((item, index) => {
            return (
              <Sidebar
                key={index}
                label={"대메뉴명"}
                icon={<StarBorder />}
                menuListData={item.subMenu}
                auth={item.auth}
                isOpen={true}
                fold={fold}
              />
            );
          })}
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
