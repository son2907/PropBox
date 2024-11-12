import { Box } from "@mui/material";
import CallTable from "./CallTable";
import InfoGroup from "./InfoGroup";
import MemoGroup from "../MemoGroup";
import useTabs from "../../../hooks/useTabs";

const testData = [
  {
    value: 1,
    data: "대구 수성구 센터",
  },
  {
    value: 2,
    data: "대구 OO구 센터2",
  },
  {
    value: 3,
    data: "대구 OO구 센터3",
  },
  {
    value: 4,
    data: "대구 OO구 센터4",
  },
];

export default function CallConsultation() {
  // 전화 받기, 전화 걸기
  const { value: callValue, handleChange: callChange } = useTabs(0);

  return (
    <>
      {/* 좌측 전화받기/전화걸기, 통화콜/부재콜 테이블 */}
      <Box width={"30%"} minWidth={"350px"} marginRight={1}>
        <CallTable tabType={callValue} tabChange={callChange} />
      </Box>

      {/* 중간 상담 정보  */}
      <Box width={"50%"} minWidth={"750px"}>
        <InfoGroup tabType={callValue} tabChange={callChange} />
      </Box>

      <Box width={"20%"} minWidth={"400px"} bgcolor={"white"} marginLeft={1}>
        <MemoGroup />
      </Box>
    </>
  );
}
