import { Box, Typography } from "@mui/material";
import PageTab from "../Tab/PageTab";
import { useMenuStore } from "../../stores/menuStore";
import { useLocation } from "react-router-dom";

interface ContentProps {
  children: React.ReactNode;
}
export default function Content({ children }: ContentProps) {
  const { menus, closeMenu } = useMenuStore();

  const onDelete = (url: string, e: React.SyntheticEvent) => {
    closeMenu(url);
    e.preventDefault(); // 기본 동작을 막음
    e.stopPropagation(); // 이벤트 버블링을 막음
  };

  const location = useLocation();

  return (
    <>
      <div style={{ padding: "10px" }}>
        <Typography variant="h3">
          {menus.find((item) => item.url === location.pathname)?.label}
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        {menus.map((item, index) => {
          return (
            <PageTab
              // icon={item.icon}
              key={index}
              tabName={item.label}
              url={item.url}
              onDelete={onDelete}
            />
          );
        })}
      </div>
      {/* 탭까지 만들어주면 좋음 */}
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
