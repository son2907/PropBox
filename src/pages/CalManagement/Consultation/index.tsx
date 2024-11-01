import { Box, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import CallTable from "./CallTable";
import Calendar from "../../../components/Calendar/Calendar";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { BasicButton } from "../../../components/Button";
import BasicInput from "../../../components/Input/BasicInput";
import { IoSearchOutline } from "react-icons/io5";
import IconSquareButton from "../../../components/Button/IconSquareButton";
import useSelect from "../../../hooks/useSelect";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import useTabs from "../../../hooks/useTabs";
import SelectorTabs from "../../../components/Tab/SelectorTabs";
import InfoGroup from "./InfoGroup";
import MemoGroup from "../MemoGroup";

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
  return (
    <Box display={"flex"} width={"100%"} height={"100%"}>
      {/* 좌측 전화받기/전화걸기, 통화콜/부재콜 테이블 */}
      <Box width={"30%"} minWidth={"350px"} marginRight={1}>
        <CallTable />
      </Box>

      {/* 중간 상담 정보  */}
      <Box width={"50%"} minWidth={"750px"}>
        <InfoGroup />
      </Box>

      <Box width={"20%"} minWidth={"400px"} bgcolor={"white"} marginLeft={1}>
        <MemoGroup />
      </Box>
    </Box>
  );
}
