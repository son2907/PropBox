import { Box, Typography } from "@mui/material";
import PageTab from "../Tab/PageTab";
import { useMenuStore } from "../../stores/menuStore";
import { useLocation, useNavigate } from "react-router-dom";
import PathConstants from "../../routers/path";
import { IconList } from "./MenuIconList";

interface ContentProps {
  children: React.ReactNode;
}
export default function Content({ children }: ContentProps) {
  const { allMenus, menus, closeMenu } = useMenuStore();

  const navigate = useNavigate();
  const location = useLocation();

  const currentMenuLabel = allMenus.find((menu) =>
    menu.subMenu.some((item) => item.url === location.pathname)
  )?.label;

  const onDelete = (url: string, e: React.SyntheticEvent) => {
    closeMenu(url);
    if (url == location.pathname) {
      const currentMenuIndex = menus.findIndex(
        (item) => item.url === location.pathname
      );
      // 현재 항목이 있을 때, 직전 항목으로 이동
      if (currentMenuIndex > 0) {
        const prevMenu = menus[currentMenuIndex - 1];
        navigate(prevMenu.url);
      } else if (menus.length == 1) {
        // 첫 번째 메뉴이면서 배열이 비어있을 경우 경우 Home 페이지로 이동
        navigate(PathConstants.Home);
      } else {
        // 첫번째 메뉴이면서 배열이 비어있지도 않을 때
        // 배열의 첫번재 항목으로 이동
        navigate(menus[1].url);
      }
    }
    e.preventDefault(); // 기본 동작을 막음
    e.stopPropagation(); // 이벤트 버블링을 막음
  };

  return (
    <>
      <div style={{ padding: "10px" }}>
        <Typography variant="h3">{currentMenuLabel}</Typography>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        {menus.map((item, index) => {
          return (
            <PageTab
              icon={
                IconList[
                  allMenus.findIndex((menu) =>
                    menu.subMenu.some((data) => data.url === item.url)
                  )
                ]
              }
              key={index}
              tabName={item.label}
              url={item.url}
              onDelete={onDelete}
            />
          );
        })}
      </div>
      <Box
        display={"flex"}
        width={"100%"}
        height={"100%"}
        overflow={"hidden"}
        paddingLeft={1}
        paddingRight={1}
        paddingTop={1}
        paddingBottom={1}
      >
        {children}
      </Box>
    </>
  );
}
