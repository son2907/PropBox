import { Box, styled, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "../Button";
import { IoCloseOutline } from "react-icons/io5";

interface PageTabProps {
  icon?: ReactNode;
  tabName: string;
  url: string;
  onDelete: (url: string, e: React.SyntheticEvent) => void; // onDelete의 타입을 두 인자로 수정
}

// 메뉴 클릭함 -> zuStand에 메뉴의 아이콘, 메뉴명, url 정보 넘김 -> zuStand에서 현재 메뉴 배열에 추가
// 그러면 pageTab을 만드는 Content에서 배열을 읽어 map으로 만듦
// 현재 url과 받은 url이 같으면 backgroundColor : 'lightgray'
//

const PageTabStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "url" && prop !== "nowUrl",
})<{ url: string; nowUrl: string }>(({ theme, url, nowUrl }) => ({
  border: "1px solid lightgray",
  //padding: "0 0 0 1rem",
  borderBottom: "none",
  borderRadius: "3px",
  marginRight: "5px",
  backgroundColor:
    nowUrl === url
      ? theme.palette.pageTab.selectedTabBg
      : theme.palette.pageTab.tabBg,
  display: nowUrl == "/" ? "none" : "flex",
  alignItems: "center",
  cursor: "pointer",
}));

const Icon = styled(Box)(({ theme }) => ({
  color: theme.palette.pageTab.tabIcon,
}));

export default function PageTab({
  icon,
  tabName,
  url,
  onDelete,
}: PageTabProps) {
  const navigate = useNavigate();
  const nowUrl = useLocation();

  const onClick = () => {
    navigate(url);
  };

  return (
    <PageTabStyle
      onClick={onClick}
      sx={{
        backgroundColor: nowUrl.pathname === url ? "white" : "#F7F9FA",
      }}
      url={url}
      nowUrl={nowUrl.pathname}
    >
      <Icon sx={{ display: "inline-flex", fontSize:"19px", paddingLeft:1 }}>{icon}</Icon>
      <Typography variant="bodyS" fontSize={"19px"} paddingLeft={1}>
        {tabName}
      </Typography>
      <IconButton
        onClick={(e) => {
          onDelete(url, e); // 이벤트 객체를 함께 전달
        }}
        sx={{paddingRight:1}}
      >
        <IoCloseOutline size={"19px"}/>
      </IconButton>
    </PageTabStyle>
  );
}
