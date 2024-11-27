import { Box, Stack } from "@mui/material";
import GrayBox from "../../../../components/Box/GrayBox";
import { BasicButton } from "../../../../components/Button";
import TableBox from "../../../../components/Box/TableBox";
import { tableTestData } from "../../../../utils/testData";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import RowDragTable from "../../../../components/Table/RowDragTable";
import { useState } from "react";
import CheckboxTable from "../../../../components/Table/CheckboxTable";
import SearchResult from "../../../../components/Table/SearchResult";

interface Data {
  id: string;
  [key: string]: any;
}

export default function UploadRegistration() {
  const [data, setData] = useState<Data[]>(tableTestData);
  const { selectedRows: s_2, toggleRowsSelection: t_2 } =
    useMultiRowSelection(); // CheckboxTable

  return (
    <Stack width={"100%"} height={"100%"} padding={1} bgcolor={"white"} gap={1}>
      <GrayBox justifyContent={"space-between"}>
        <Stack direction={"row"} gap={1}>
          <BasicButton>찾아보기</BasicButton>
          <BasicButton>삭제</BasicButton>
        </Stack>
        <BasicButton>저장</BasicButton>
      </GrayBox>
      <TableBox gap={1}>
        <TableBox.Inner width="40%">
          <RowDragTable data={data} setData={setData} checkbox={false}>
            <RowDragTable.Th>엑셀 항목</RowDragTable.Th>
            <RowDragTable.Th>Position</RowDragTable.Th>
            <RowDragTable.Tbody>
              {data.map((item) => (
                <RowDragTable.Tr key={item.id} id={item.id}>
                  <RowDragTable.Td>엑셀 항목</RowDragTable.Td>
                  <RowDragTable.Td>Text</RowDragTable.Td>
                </RowDragTable.Tr>
              ))}
            </RowDragTable.Tbody>
          </RowDragTable>
        </TableBox.Inner>
        <Stack width={"100%"} gap={1}>
          <TableBox.Inner width="100%">
            <CheckboxTable
              data={tableTestData}
              selectedRows={s_2}
              toggleRowsSelection={t_2}
            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh />
                  <CheckboxTable.Th>1번 항목</CheckboxTable.Th>
                  <CheckboxTable.Th>2번 항목</CheckboxTable.Th>
                  <CheckboxTable.Th>3번 항목</CheckboxTable.Th>
                  <CheckboxTable.Th>4번 항목</CheckboxTable.Th>
                  <CheckboxTable.Th>5번 항목</CheckboxTable.Th>
                  <CheckboxTable.Th>6번 항목</CheckboxTable.Th>
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>

              <CheckboxTable.Tbody>
                {tableTestData.map((item) => (
                  <CheckboxTable.Tr key={item.id} id={item.id}>
                    <CheckboxTable.CheckboxTd item={item} />
                    <CheckboxTable.Td>데이터</CheckboxTable.Td>
                    <CheckboxTable.Td>데이터</CheckboxTable.Td>
                    <CheckboxTable.Td>데이터</CheckboxTable.Td>
                    <CheckboxTable.Td>데이터</CheckboxTable.Td>
                    <CheckboxTable.Td>데이터</CheckboxTable.Td>
                    <CheckboxTable.Td>데이터</CheckboxTable.Td>
                  </CheckboxTable.Tr>
                ))}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          </TableBox.Inner>
          <SearchResult total={100} />
        </Stack>
      </TableBox>
    </Stack>
  );
}
