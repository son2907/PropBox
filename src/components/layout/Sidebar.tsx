import Solution from "../sidebar/Solution";
import MenuItem from "../sidebar/MenuItem";
import { Box, styled } from "@mui/material";
import { memo, ReactNode, useEffect, useState } from "react";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/svg/hambuger.svg";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useAuthStore } from "../../stores/authStore";
import { LuHeadphones } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { transformMenuData } from "../../utils/transformMenuData";
import { useMenuStore } from "../../stores/menuStore";

const IconList: ReactNode[] = [
  <LuHeadphones />,
  <MdOutlineMailOutline />,
  <GoPeople />,
  <IoSettingsOutline />,
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

const Sidebar = memo(function Sidebar() {
  const [fold, setFold] = useState<boolean>(false);
  const { allMenus, setAllMenuData } = useMenuStore();
  const { accessToken } = useAuthStore(["accessToken"]);
  const { isSuccess, data } = api.MenuList.useMenuList();

  useEffect(() => {
    if (isSuccess && accessToken) {
      console.log("데이터좀요:", data.data);
      const result = transformMenuData(data?.data.contents);
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
      {allMenus?.map((item, index) => {
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
});

export default Sidebar;
