import { Box, Typography } from "@mui/material";
import SearchInput from "../../components/Input/SearchInput";
import { useRef } from "react";
import SiteBtn from "./Btn/SiteBtn";

export default function SiteSelection() {
  const searchRef = useRef<HTMLInputElement | null>(null);

  return (
    <Box>
      <Typography paddingBottom={1}>
        관리자 정보(세션이나 쿠키에 들어있음)
      </Typography>
      <SearchInput ref={searchRef} placeholder="현장 검색" />
      <hr />
      <Box overflow={"auto"} padding={1}>
        {/* api에서 정보 받아와 현장 개수만큼 그림 */}
        {/* 변수에 선택 정보 저장 */}
        <SiteBtn>현장이름</SiteBtn>
      </Box>
    </Box>
  );
}
