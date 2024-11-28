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
import { useNavigate } from "react-router-dom";
// 예시 데이터
const menuList: MenuListType = [
  {
    label: "전화관리",
    auth: true,
    subMenu: [
      { label: "전화상담", url: "/call/consultation" },
      { label: "상담분석", url: "/call/analysis" },
      { label: "데이터관리", url: "/call/management" },
      { label: "기본정보", url: "/call/information" },
    ],
  },
  {
    label: "문자관리",
    auth: true,
    subMenu: [
      { label: "자동문자", url: "/message/auto" },
      { label: "대량문자", url: "/message/bulk" },
      { label: "방통위신고", url: "/message/declaration" },
      { label: "수신거부", url: "/message/reject" },
      { label: "결과보기", url: "/message/result" },
    ],
  },
  {
    label: "고객관리",
    auth: true,
    subMenu: [{ label: "고객등록", url: "/customer/registration" }],
  },
  {
    label: "시스템관리",
    auth: true,
    subMenu: [
      { label: "솔루션 및 메뉴 관리", url: "/system/solution" },
      { label: "사용자 관리", url: "/system/user" },
      { label: "구성원 관리", url: "/system/member" },
      { label: "현장 관리", url: "/system/local" },
      { label: "현장 별 구성원 관리", url: "/system/localmember" },
      { label: "현장 별 구성원 권한 관리", url: "/system/auth" },

      { label: "통신환경설정", url: "/system/networksetup" },
      { label: "인증번호관리", url: "/system/authCode" },
      { label: "수신번호관리", url: "/system/receivingNumber" },
      { label: "전화기관리", url: "/system/phone" },

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
  flexShrink: 0,
  alignItems: "center",
  transition: "width 0.3s ease", // width 애니메이션 추가
  borderRight: "2px solid #e5e7eb",
}));

const LogoArea = styled(Box)(() => ({
  width: "100%",
  height: 60,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  padding: "0 10px 0 10px",
  cursor: "pointer",
}));

export default function Sidebar() {
  const [fold, setFold] = useState<boolean>(false);

  // 추후 useMenu()로 바꾸어주어야 함 ... (api없음)
  const data = menuList;
  const onClick = () => {
    setFold(!fold);
  };
  const navigate = useNavigate();
  const moveMain = () => {
    navigate("/");
  };

  return (
    <SideMenu fold={fold}>
      <LogoArea>
        {fold ? (
          <></>
        ) : (
          <img
            onClick={moveMain}
            src={Logo}
            style={{ width: "130px", height: "fit-content" }}
          />
        )}
        <img
          src={Menu}
          onClick={onClick}
          style={{ cursor: "pointer", width: "20px" }}
        />
      </LogoArea>
      <hr
        style={{
          margin: 0,
          width: "90%",
          height: "1px",
          border: "none",
          color: "#e5e7eb",
          backgroundColor: "#e5e7eb",
        }}
      />
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
