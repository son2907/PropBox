import { Stack } from "@mui/material";
import CallTable from "./CallTable";
import InfoGroup from "./InfoGroup";
import MemoGroup from "./MemoGroup";
import useTabs from "../../../hooks/useTabs";

export default function CallConsultation() {
  // 전화 받기, 전화 걸기
  const { value: callValue, handleChange: callChange } = useTabs(0);

  return (
    <>
      {/* 좌측 전화받기/전화걸기, 통화콜/부재콜 테이블 */}
      <Stack width={"30%"} marginRight={1} height={"100%"}>
        <CallTable tabType={callValue} tabChange={callChange} />
      </Stack>

      {/* 중간 상담 정보  */}
      <Stack width={"50%"} height={"100%"} minWidth={"763px"}>
        <InfoGroup tabType={callValue} tabChange={callChange} />
      </Stack>

      <Stack width={"20%"} bgcolor={"white"} marginLeft={1} height={"100%"}>
        <MemoGroup />
      </Stack>
    </>
  );
}
