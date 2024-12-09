import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import GrayBox from "../../../../components/Box/GrayBox";
import { BasicButton } from "../../../../components/Button";
import { selectTestData, tableTestData } from "../../../../utils/testData";
import useSelect from "../../../../hooks/useSelect";
import { Select } from "../../../../components/Select";
import TableBox from "../../../../components/Box/TableBox";
import RowDragTable from "../../../../components/Table/RowDragTable";
import { tableDataType } from "../../../../types";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import CheckboxTable from "../../../../components/Table/CheckboxTable";

export default function RegistrationExel() {
  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectTestData, "value", "data");

  const [data, setData] = useState<tableDataType[]>(tableTestData);
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection(); //

  return (
    <Stack width={"100%"} height={"100%"}>
      <GrayBox gap={1}>
        <BasicButton>찾아보기</BasicButton>
        <Select
          selectData={sd_0}
          value={s_0}
          onChange={o_0}
          sx={{ width: "250px" }}
        />
        <BasicButton sx={{ marginLeft: "auto" }}>삭제</BasicButton>
        <BasicButton>저장</BasicButton>
      </GrayBox>

      <TableBox gap={1} padding={1}>
        <TableBox.Inner width="30%">
          <RowDragTable
            checkbox={false}
            data={data}
            setData={setData} // 데이터를 업데이트할 함수를 전달
          >
            <RowDragTable.Th>엑셀항목</RowDragTable.Th>
            <RowDragTable.Th>칼럼위치</RowDragTable.Th>

            <RowDragTable.Tbody>
              {data.map((item) => (
                <RowDragTable.Tr key={item.id} id={item.id}>
                  <RowDragTable.Td>TEXT</RowDragTable.Td>
                  <RowDragTable.Td>TEXT</RowDragTable.Td>
                </RowDragTable.Tr>
              ))}
            </RowDragTable.Tbody>
          </RowDragTable>
        </TableBox.Inner>
        <Stack width={"70%"} height={"100%"}>
          <TableBox.Inner>
            <CheckboxTable
              data={tableTestData}
              selectedRows={selectedRows}
              toggleRowsSelection={toggleRowsSelection}
            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh />
                  <CheckboxTable.Th>이름</CheckboxTable.Th>
                  <CheckboxTable.Th>휴대전화</CheckboxTable.Th>
                  <CheckboxTable.Th>집전화</CheckboxTable.Th>
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>
              <CheckboxTable.Tbody>
                {tableTestData.map((item) => (
                  <CheckboxTable.Tr key={item.id} id={item.id}>
                    <CheckboxTable.CheckboxTd item={item} />
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  </CheckboxTable.Tr>
                ))}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          </TableBox.Inner>
          <GrayBox justifyContent={"flex-end"}>
            <Typography>전체 : 5678</Typography>
          </GrayBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}
