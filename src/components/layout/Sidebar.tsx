import Solution from "../sidebar/Solution";
import MenuItem from "../sidebar/MenuItem";
import { Box, styled } from "@mui/material";
import { memo, useEffect, useState } from "react";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/svg/hambuger.svg";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useAuthStore } from "../../stores/authStore";
import { transformMenuData } from "../../utils/transformMenuData";
import { useMenuStore } from "../../stores/menuStore";
import { IconList } from "./MenuIconList";
import { testMenuList } from "../../utils/testData";
import { HiMenu } from "react-icons/hi";

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
  color: "#ffffff",
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
  color: "#ffffff",
}));

const Sidebar = memo(function Sidebar() {
  const [fold, setFold] = useState<boolean>(false);
  // const [menuFold, setMenuFold] = useState<boolean>(false);
  const { allMenus, setAllMenuData } = useMenuStore();
  const { accessToken } = useAuthStore(["accessToken"]);
  const { isSuccess, data } = api.MenuList.useMenuList();

  useEffect(() => {
    if (isSuccess && accessToken) {
      const result = transformMenuData(data?.data.contents, IconList);
      setAllMenuData(result);
    }
  }, [accessToken, isSuccess]);

  const onClick = () => {
    setFold(!fold);
  };
  const navigate = useNavigate();
  const moveMain = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log("allMenus", data?.data.contents);
  }, [data]);

  return (
    <SideMenu
      fold={fold}
      style={{ backgroundColor: "#323337", color: "#ffffff" }}
    >
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
        <HiMenu fontSize={"28px"} color="white" onClick={onClick} />
      </LogoArea>
      <hr
        style={{
          margin: 0,
          width: "90%",
          height: "1px",
          border: "none",
          color: "#e5e7eb",
          backgroundColor: "#323337",
        }}
      />
      {allMenus?.map((item, index) => {
        return (
          <Solution
            key={index}
            label={item.label}
            icon={item.icon}
            auth={item.auth}
            isOpen={!fold && item.label !== "시스템관리"} // fold가 true이면 자동으로 접힘
            fold={fold}
            style={{
              width: fold ? "0px" : "100%", // 접힐 때 너비 0으로 설정
              overflow: "hidden",
              transition: "width 0.3s ease", // 애니메이션 추가
              color: "#ffffff",
            }}
            onClick={() => setFold(false)} // 클릭 시 사이드바 열기
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
});

export default Sidebar;
