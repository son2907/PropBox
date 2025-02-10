import { Stack, Typography } from "@mui/material";
import GrayBox from "../../../../components/Box/GrayBox";
import CenteredBox from "../../../../components/Box/CenteredBox";
import { useState } from "react";
import Calendar from "../../../../components/Calendar/Calendar";
import { BasicButton } from "../../../../components/Button";
import TableBox from "../../../../components/Box/TableBox";
import {
  useCallyDetail,
  useCallyDetailExcel,
  useCallyMaster,
  useMasterExcel,
} from "../../../../api/callCnslt";
import { getFormattedDate } from "../../../../utils/getFormattedDate";
import BasicTable from "../../../../components/Table/BasicTable";
import { useSingleRowData } from "../../../../hooks/useTest";
import { CallyContentsType } from "../../../../types/callCnslt";

export default function CallLog() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { selectedRow, toggleRowSelection } =
    useSingleRowData<CallyContentsType>("seqNo");

  // 왼쪽 테이블 조회
  const { data: masterData } = useCallyMaster({
    fromDate: getFormattedDate(startDate),
    toDate: getFormattedDate(endDate),
  });
  // 왼쪽 테이블 엑셀 다운로드
  const { refetch: downloadMasteExcel } = useMasterExcel({
    fromDate: getFormattedDate(startDate),
    toDate: getFormattedDate(endDate),
  });

  // 오른쪽 테이블 조회
  const { data: detailData } = useCallyDetail({
    fromDate: getFormattedDate(startDate),
    toDate: getFormattedDate(endDate),
    cnsltnt: selectedRow?.cnsltnt || "",
  });
  // 오른쪽 테이블 엑셀 다운로드
  const { refetch: downloadDetailExcel } = useCallyDetailExcel({
    fromDate: getFormattedDate(startDate),
    toDate: getFormattedDate(endDate),
    cnsltnt: selectedRow?.cnsltnt || "",
  });

  const onClickMasterExcel = () => {
    downloadMasteExcel();
  };

  const onClickDetailExcel = () => {
    if (!selectedRow) return;
    downloadDetailExcel();
  };

  return (
    <Stack padding={2} bgcolor={"white"} height={"100%"} width={"100%"} gap={1}>
      {/* 상담일자 */}
      <GrayBox>
        <CenteredBox width={"100%"} gap={1}>
          <Typography display="inline" noWrap overflow={"visible"}>
            상담 일자
          </Typography>
          <Calendar selectedDate={startDate} setSelectedDate={setStartDate} />
          <Typography>~</Typography>
          <Calendar selectedDate={endDate} setSelectedDate={setEndDate} />
          <BasicButton sx={{ marginLeft: "20%" }}>조회</BasicButton>
        </CenteredBox>
      </GrayBox>

      {/* 구분 */}
      <GrayBox>
        <CenteredBox width={"100%"} gap={1}>
          <Typography display={"inline"}>구분</Typography>
          <BasicButton>대기자료 엑셀저장</BasicButton>
          <BasicButton>부재콜자료 엑셀저장</BasicButton>
        </CenteredBox>
      </GrayBox>

      <TableBox gap={1}>
        <TableBox.Inner width="50%">
          {/* 왼쪽 테이블 */}
          <GrayBox justifyContent={"flex-end"} marginBottom={1}>
            <BasicButton onClick={onClickMasterExcel}>엑셀저장</BasicButton>
          </GrayBox>
          <BasicTable data={masterData?.data.contents}>
            <BasicTable.Th>No</BasicTable.Th>
            <BasicTable.Th>이름</BasicTable.Th>
            <BasicTable.Th>걸기</BasicTable.Th>
            <BasicTable.Th>통화콜</BasicTable.Th>
            <BasicTable.Th>부재콜</BasicTable.Th>
            <BasicTable.Th>계</BasicTable.Th>
            <BasicTable.Tbody>
              {masterData?.data.contents.map((item, index) => {
                return (
                  <BasicTable.Tr
                    key={index}
                    isClicked={selectedRow?.seqNo === item.seqNo} // 전체 데이터 객체를 비교
                    onClick={() => toggleRowSelection(item)} // 데이터 자체를 전달
                  >
                    <BasicTable.Td>{item.seqNo}</BasicTable.Td>
                    <BasicTable.Td>{item.cnsltntNm}</BasicTable.Td>
                    <BasicTable.Td>{item.callY}</BasicTable.Td>
                    <BasicTable.Td>{item.trsmY}</BasicTable.Td>
                    <BasicTable.Td>{item.trsmN}</BasicTable.Td>
                    <BasicTable.Td>{item.callTot}</BasicTable.Td>
                  </BasicTable.Tr>
                );
              })}
            </BasicTable.Tbody>
          </BasicTable>
        </TableBox.Inner>

        {/* 오른쪽 테이블 */}
        <TableBox.Inner width="50%">
          <GrayBox justifyContent={"flex-end"} marginBottom={1}>
            <BasicButton onClick={onClickDetailExcel}>엑셀저장</BasicButton>
          </GrayBox>
          <BasicTable data={detailData?.data.contents}>
            <BasicTable.Th>상담일자</BasicTable.Th>
            <BasicTable.Th>걸기</BasicTable.Th>
            <BasicTable.Th>통화콜</BasicTable.Th>
            <BasicTable.Th>부재콜</BasicTable.Th>
            <BasicTable.Th>계</BasicTable.Th>
            <BasicTable.Tbody>
              {detailData?.data.contents.map((item, index) => {
                return (
                  <BasicTable.Tr key={index}>
                    <BasicTable.Td>{item.cnsltDt}</BasicTable.Td>
                    <BasicTable.Td>{item.callY}</BasicTable.Td>
                    <BasicTable.Td>{item.trsmY}</BasicTable.Td>
                    <BasicTable.Td>{item.trsmN}</BasicTable.Td>
                    <BasicTable.Td>{item.callTot}</BasicTable.Td>
                  </BasicTable.Tr>
                );
              })}
            </BasicTable.Tbody>
          </BasicTable>
        </TableBox.Inner>
      </TableBox>
    </Stack>
  );
}
