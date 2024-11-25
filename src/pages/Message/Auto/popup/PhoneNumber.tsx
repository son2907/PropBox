import { Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import CenteredBox from "../../../../components/Box/CenteredBox";
import BasicInput from "../../../../components/Input/BasicInput";
import GrayBox from "../../../../components/Box/GrayBox";
import { BasicButton } from "../../../../components/Button";

export default function PhoneNumber() {
  const bRef1 = useRef<HTMLInputElement>(null);
  const onClick = () => {
    console.log(bRef1.current?.value); // 입력한 전화번호
  };
  return (
    <Stack width={"100%"} bgcolor={"primary.light"}>
      <CenteredBox width={"100%"} padding={4}>
        <Typography>전화번호</Typography>
        <BasicInput sx={{ marginLeft: "auto" }} ref={bRef1} />
      </CenteredBox>
      <GrayBox>
        <BasicButton sx={{ marginLeft: "auto" }} onClick={onClick}>
          발송
        </BasicButton>
      </GrayBox>
    </Stack>
  );
}
