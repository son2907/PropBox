import { Box, Typography } from "@mui/material";
import PageTab from "../Tab/PageTab";
import { useState } from "react";
import { MdCloseFullscreen } from "react-icons/md";
import api from "../../api";
import { MenuResponseModel } from "../../types/menu";
import { useAuthStore } from "../../stores/authStore";
import instance from "../../utils/axiosInstance";
import axios from "axios";

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
  const [tabItem, setTabItem] = useState([
    { icon: <MdCloseFullscreen />, tabName: "탭이름", url: "/" },
    { icon: <MdCloseFullscreen />, tabName: "탭이름2", url: "/test" },
  ]);

  const onDelete = (url: string) => {
    setTabItem((prevTabItem) => prevTabItem.filter((item) => item.url !== url));
  };
  // 엑세스 토큰이 있을 때에만 useQuery 실행

  const { accessToken } = useAuthStore(["accessToken"]);

  if (accessToken) {
    console.log("액세스 토큰:", accessToken);
    const queryResult = api.MenuList.useMenuList();
    console.log("쿼리결과:", queryResult);
  }

  // axios
  //   .get("http://211.228.124.210:9060/api/user/slutn/list", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`, // Access token을 Authorization 헤더에 포함
  //       Accept: "application/json", // 응답 형식으로 JSON을 기대
  //       "Content-Type": "application/json", // 요청의 Content-Type을 JSON으로 설정
  //     },
  //   })
  //   .then((response) => {
  //     console.log("API Response:", response.data); // 응답 데이터 처리
  //   })
  //   .catch((error) => {
  //     console.error("API Error:", error); // 오류 처리
  //   });

  // fetch("http://211.228.124.210:9060/api/user/slutn/list", {
  //   method: "GET", // GET 요청
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`, // Access token을 Authorization 헤더에 포함
  //     Accept: "application/json", // 응답 형식으로 JSON을 기대
  //     "Content-Type": "application/json", // 요청의 Content-Type을 JSON으로 설정
  //   },
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json(); // JSON 응답을 처리
  //   })
  //   .then((data) => {
  //     console.log("API Response:", data); // 응답 데이터 처리
  //   })
  //   .catch((error) => {
  //     console.error("API Error:", error); // 오류 처리
  //   });

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
        {tabItem.map((item, index) => {
          return (
            <PageTab
              icon={item.icon}
              key={index}
              tabName={item.tabName}
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
