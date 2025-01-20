import { Stack, Typography } from "@mui/material";
import GrayBox from "../../../../components/Box/GrayBox";
import { BasicButton } from "../../../../components/Button";
import { Select } from "../../../../components/Select";
import useSelect from "../../../../hooks/useSelect";
import { selectTestData, tableTestData } from "../../../../utils/testData";
import TableBox from "../../../../components/Box/TableBox";
import BasicTable from "../../../../components/Table/BasicTable";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import CheckboxTable from "../../../../components/Table/CheckboxTable";

export default function Spam() {
  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectTestData, "value", "data");
  const { selectedRows: ts_1, toggleRowsSelection: tt_1 } =
    useMultiRowSelection();
  const { selectedRows: ts_2, toggleRowsSelection: tt_2 } =
    useMultiRowSelection();
  return (
    <Stack width={"100%"} height={"100%"}>
      <GrayBox gap={1}>
        <BasicButton>엑셀불러오기</BasicButton>
        <BasicButton>삭제</BasicButton>
        <BasicButton sx={{ marginRight: "auto" }}>컬럼보기</BasicButton>

        <Select
          selectData={sd_0}
          value={s_0}
          onChange={o_0}
          sx={{ width: "200px" }}
        />
        <BasicButton>저장</BasicButton>
      </GrayBox>
      <TableBox gap={1}>
        <TableBox.Inner width={"40%"} minWidth={"100px"}>
          <BasicTable data={tableTestData}>
            <BasicTable.Th>전송일시</BasicTable.Th>
            <BasicTable.Th>구분</BasicTable.Th>
            <BasicTable.Th>메시지</BasicTable.Th>

            <BasicTable.Tbody>
              {tableTestData.map((item, index) => {
                return (
                  <BasicTable.Tr
                    key={index}
                    isClicked={ts_2.has(item.id)}
                    onClick={() => tt_2(item.id)}
                  >
                    <BasicTable.Td>{item.name}</BasicTable.Td>
                    <BasicTable.Td>{item.age}</BasicTable.Td>
                    <BasicTable.Td>{item.age}</BasicTable.Td>
                  </BasicTable.Tr>
                );
              })}
            </BasicTable.Tbody>
          </BasicTable>
        </TableBox.Inner>
        <Stack width={"60%"} height={"100%"}>
          <TableBox.Inner minWidth={"200px"}>
            <CheckboxTable
              data={tableTestData}
              selectedRows={ts_1}
              toggleRowsSelection={tt_1}
            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh keyName="id" />
                  <CheckboxTable.Th>이름</CheckboxTable.Th>
                  <CheckboxTable.Th>휴대전화</CheckboxTable.Th>
                  <CheckboxTable.Th>집전화</CheckboxTable.Th>
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>
              <CheckboxTable.Tbody>
                {tableTestData.map((item) => (
                  <CheckboxTable.Tr key={item.id} id={item.id}>
                    <CheckboxTable.CheckboxTd item={item} keyName="id" />
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  </CheckboxTable.Tr>
                ))}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          </TableBox.Inner>
          <GrayBox>
            <Typography>전체:5678</Typography>
          </GrayBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}
