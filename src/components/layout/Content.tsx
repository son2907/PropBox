import { Box, Typography } from "@mui/material";
import PageTab from "../Tab/PageTab";
import { useMenuStore } from "../../stores/menuStore";

interface ContentProps {
  children: React.ReactNode;
}
export default function Content({ children }: ContentProps) {
  // url을 통해 페이지 정보를 얻어와 타이포그래피에 바인딩한다
  // zuStand에 메뉴 정보를 api로 가져와 넣어놓은 다음
  // useHook을 통해 가져옴

  // 메뉴를 클릭하면 tabItem에 tabName과 함께 url을 추가하는 함수
  // 현재 열린 메뉴 목록을 zuStatnd로 사용해야 함
  // x버튼을 누르면 tabItem에서 클릭한 url을 받아 tabItem [] 에서 삭제해야 함

  const { menus, closeMenu } = useMenuStore();
  console.log("메뉴 목록:", menus);

  const onDelete = (url: string, e: React.SyntheticEvent) => {
    closeMenu(url);
    e.preventDefault(); // 기본 동작을 막음
    e.stopPropagation(); // 이벤트 버블링을 막음
  };
  // 엑세스 토큰이 있을 때에만 useQuery 실행

  return (
    <>
      <div style={{ padding: "10px" }}>
        <Typography variant="h3">전화 관리</Typography>
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
