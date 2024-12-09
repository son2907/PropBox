import { Stack, Typography } from "@mui/material";
import GrayBox from "../../../../components/Box/GrayBox";
import CenteredBox from "../../../../components/Box/CenteredBox";
import { useState } from "react";
import Calendar from "../../../../components/Calendar/Calendar";
import { BasicButton } from "../../../../components/Button";
import CheckboxTable from "../../../../components/Table/CheckboxTable";
import { tableTestData } from "../../../../utils/testData";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import TableBox from "../../../../components/Box/TableBox";

export default function CallLog() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();
  const {
    selectedRows: selectedRows2,
    toggleRowsSelection: toggleRowsSelection2,
  } = useMultiRowSelection();

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

      <TableBox>
        <TableBox.Inner width="50%">
          {/* 왼쪽 테이블 */}
          <GrayBox justifyContent={"flex-end"} marginBottom={1}>
            <BasicButton>엑셀저장</BasicButton>
          </GrayBox>
          <CheckboxTable
            data={tableTestData}
            selectedRows={selectedRows}
            toggleRowsSelection={toggleRowsSelection}
          >
            <CheckboxTable.Thead>
              <CheckboxTable.Tr>
                <CheckboxTable.Th>No</CheckboxTable.Th>
                <CheckboxTable.Th>이름</CheckboxTable.Th>
                <CheckboxTable.Th>걸기</CheckboxTable.Th>
                <CheckboxTable.Th>통화콜</CheckboxTable.Th>
                <CheckboxTable.Th>부재콜</CheckboxTable.Th>
                <CheckboxTable.Th>계</CheckboxTable.Th>
              </CheckboxTable.Tr>
            </CheckboxTable.Thead>
            <CheckboxTable.Tbody>
              {tableTestData.map((item) => (
                <CheckboxTable.Tr key={item.id} id={item.id}>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                </CheckboxTable.Tr>
              ))}
            </CheckboxTable.Tbody>
          </CheckboxTable>
        </TableBox.Inner>

        {/* 오른쪽 테이블 */}
        <TableBox.Inner width="50%">
          <GrayBox justifyContent={"flex-end"} marginBottom={1}>
            <BasicButton>엑셀저장</BasicButton>
          </GrayBox>
          <CheckboxTable
            data={tableTestData}
            selectedRows={selectedRows2}
            toggleRowsSelection={toggleRowsSelection2}
          >
            <CheckboxTable.Thead>
              <CheckboxTable.Tr>
                <CheckboxTable.Th>상담일자</CheckboxTable.Th>
                <CheckboxTable.Th>걸기</CheckboxTable.Th>
                <CheckboxTable.Th>통화콜</CheckboxTable.Th>
                <CheckboxTable.Th>부재콜</CheckboxTable.Th>
                <CheckboxTable.Th>계</CheckboxTable.Th>
              </CheckboxTable.Tr>
            </CheckboxTable.Thead>
            <CheckboxTable.Tbody>
              {tableTestData.map((item) => (
                <CheckboxTable.Tr key={item.id} id={item.id}>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                </CheckboxTable.Tr>
              ))}
            </CheckboxTable.Tbody>
          </CheckboxTable>
        </TableBox.Inner>
      </TableBox>
    </Stack>
  );
}
