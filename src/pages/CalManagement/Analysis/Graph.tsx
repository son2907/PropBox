import { Stack } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { BasicButton } from "../../../components/Button";

export default function Graph() {
  return (
    <Stack>
      <GrayBox justifyContent={"flex-end"} gap={1}>
        <BasicButton>엑셀 다운로드</BasicButton>
        <BasicButton>출력</BasicButton>
      </GrayBox>
    </Stack>
  );
}
