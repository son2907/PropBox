import { Stack, Typography } from "@mui/material";
import CenteredBox from "../../../../components/Box/CenteredBox";
import TextArea from "../../../../components/TextArea/TextArea";

export default function SMSDetail() {
  return (
    <Stack
      width={"100%"}
      height={"100%"}
      bgcolor={"primary.light"}
      padding={3}
      gap={2}
      justifyContent={"center"}
    >
      <CenteredBox>
        <Typography width={"100px"}>공유</Typography>
        <Typography>SMS</Typography>
      </CenteredBox>
      <CenteredBox>
        <Typography width={"100px"}>결과</Typography>
        {/* 성공 파랑, 대기 주황, 실패 빨강 */}
        <Typography>성공</Typography>
      </CenteredBox>
      <CenteredBox>
        <Typography width={"100px"}>비고</Typography>
        <TextArea height="80px" />
      </CenteredBox>
      <CenteredBox>
        <Typography width={"100px"}>전송일시</Typography>
        <Typography>2024-09-06 10:43</Typography>
      </CenteredBox>
      <CenteredBox>
        <Typography width={"100px"}>전송 확인 일시</Typography>
        <Typography>2024-09-06 10:43</Typography>
      </CenteredBox>
      <CenteredBox>
        <Typography width={"100px"}>수신번호</Typography>
        <Typography>010-0000-0000</Typography>
      </CenteredBox>
      <CenteredBox>
        <Typography width={"100px"}>발신번호</Typography>
        <Typography>1651-1651</Typography>
      </CenteredBox>
      <CenteredBox>
        <Typography width={"100px"}>전송 메시지</Typography>
        <TextArea height="80px" />
      </CenteredBox>
    </Stack>
  );
}
