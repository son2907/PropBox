import Solution from "../sidebar/Solution";
import MenuItem from "../sidebar/MenuItem";
import { MenuListType } from "../../types/menu";
import { Box, styled } from "@mui/material";
import { ReactNode, useState } from "react";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/svg/hambuger.svg";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { StarBorder } from "@mui/icons-material";

// 예시 데이터
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
const IconList: ReactNode[] = [
  <StarBorder />,
  <AlternateEmailIcon />,
  <AllInboxIcon />,
];

const SideMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== "fold", // fold 속성을 DOM으로 전달하지 않음
})<{ fold: boolean }>(({ theme, fold }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.sidebar.menuBg,
  width: fold ? "50px" : "250px",
  alignItems: "center",
  transition: "width 0.3s ease", // width 애니메이션 추가
  borderRight: "2px solid #e5e7eb",
  paddingTop: 10,
}));

export default function Sidebar() {
  const [fold, setFold] = useState<boolean>(false);

  // 추후 useMenu()로 바꾸어주어야 함 ... (api없음)
  const data = menuList;
  const onClick = () => {
    setFold(!fold);
  };

  return (
    <SideMenu fold={fold}>
      <div>
        {fold ? <></> : <img src={Logo} style={{ width: "160px" }} />}
        <img src={Menu} onClick={onClick} style={{ cursor: "pointer" }} />
      </div>
      {data.map((item, index) => {
        return (
          <Solution
            key={index}
            label={item.label}
            icon={IconList[index]}
            auth={item.auth}
            isOpen={true}
            fold={fold}
          >
            {item.subMenu.map((subData, index) => (
              <MenuItem
                key={index}
                label={subData.label}
                url={subData.url}
                fold={fold}
              />
            ))}
          </Solution>
        );
      })}
    </SideMenu>
  );
}
