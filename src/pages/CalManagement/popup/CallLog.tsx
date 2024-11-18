import { Box, Stack, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import CenteredBox from "../../../components/Box/CenteredBox";
import { useState } from "react";
import Calendar from "../../../components/Calendar/Calendar";
import { BasicButton } from "../../../components/Button";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { tableTestData } from "../../../utils/testData";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";

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
      <Box
        display={"flex"}
        width={"100%"}
        height={"100%"}
        overflow={"hidden"}
        gap={1}
      >
        {/* 왼쪽 테이블 */}
        <Box width={"50%"} height={"100%"} overflow={"auto"}>
          <GrayBox justifyContent={"flex-end"} marginBottom={1}>
            <BasicButton>엑셀저장</BasicButton>
          </GrayBox>
          <CheckboxTable
            data={tableTestData}
            checkbox={false}
            selectedRows={selectedRows}
            toggleRowSelection={toggleRowsSelection}
          >
            <CheckboxTable.Theader>No</CheckboxTable.Theader>
            <CheckboxTable.Theader>이름</CheckboxTable.Theader>
            <CheckboxTable.Theader>걸기</CheckboxTable.Theader>
            <CheckboxTable.Theader>통화콜</CheckboxTable.Theader>
            <CheckboxTable.Theader>부재콜</CheckboxTable.Theader>
            <CheckboxTable.Theader>계</CheckboxTable.Theader>

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
        </Box>
        {/* 오른쪽 테이블 */}
        <Box width={"50%"} height={"100%"} bgcolor={"yellow"} overflow={"auto"}>
          <GrayBox justifyContent={"flex-end"} marginBottom={1}>
            <BasicButton>엑셀저장</BasicButton>
          </GrayBox>
          <CheckboxTable
            data={tableTestData}
            checkbox={false}
            selectedRows={selectedRows2}
            toggleRowSelection={toggleRowsSelection2}
          >
            <CheckboxTable.Theader>상담일자</CheckboxTable.Theader>
            <CheckboxTable.Theader>걸기</CheckboxTable.Theader>
            <CheckboxTable.Theader>통화콜</CheckboxTable.Theader>
            <CheckboxTable.Theader>부재콜</CheckboxTable.Theader>
            <CheckboxTable.Theader>계</CheckboxTable.Theader>

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
        </Box>
      </Box>
    </Stack>
  );
}
