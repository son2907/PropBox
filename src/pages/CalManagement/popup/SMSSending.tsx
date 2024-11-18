import { Box, Stack, Typography } from "@mui/material";
import { BasicButton } from "../../../components/Button";
import GrayBox from "../../../components/Box/GrayBox";
import DeleteBtnInput from "../../../components/Input/DeleteBtnInput";
import { useRef } from "react";
import BasicInput from "../../../components/Input/BasicInput";
import TextArea from "../../../components/TextArea/TextArea";

export default function SMSSending() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box padding={2} bgcolor={"white"} height={"100%"} width={"100%"}>
      <GrayBox height="40px">
        <BasicButton sx={{ marginLeft: "auto" }}>전송</BasicButton>
      </GrayBox>
      {/* 라디오 버튼 그룹 */}
      <Stack
        width="40%"
        height="100%"
        marginTop={1}
        gap={1}
        bgcolor={"whitesmoke"}
      >
        <Box display={"flex"} alignItems="center">
          <label className="whitespace-nowrap">
            <input type="radio" name="searchType" id="phone" />
            <Typography display="inline">SMS</Typography>
          </label>
          <label className="whitespace-nowrap">
            <input type="radio" name="searchType" id="phone" />
            <Typography display="inline">LMS</Typography>
          </label>
          <label className="whitespace-nowrap">
            <input type="radio" name="searchType" id="phone" />
            <Typography display="inline">MMS</Typography>
          </label>
          <BasicButton sx={{ marginLeft: "auto" }}>이미지 선택</BasicButton>
        </Box>

        <DeleteBtnInput ref={inputRef} placeholder="첨부파일" />
        {/* 제목 */}
        <Typography display={"inline"}>제목</Typography>
        <BasicInput placeholder="내용 입력" />
        <TextArea height="150px" resize="none" maxBytes={80} />
      </Stack>
    </Box>
  );
}
