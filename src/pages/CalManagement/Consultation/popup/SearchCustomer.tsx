import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import CheckboxTable from "../../../../components/Table/CheckboxTable";
import { tableTestData } from "../../../../utils/testData";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import SearchInput from "../../../../components/Input/SearchInput";
import { useRadioGroup } from "../../../../hooks/useRadioGroup";

export default function SearchCustomer() {
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();
  console.log(selectedRows);
  const { selectedValue: radioValue, handleRadioChange: setRadioValue } =
    useRadioGroup(""); // 초기값은 빈 문자열

  return (
    <Box padding={2} bgcolor={"white"} width={"100%"} height={"100%"}>
      <Box display={"flex"} alignItems="center" width="100%" paddingBottom={2}>
        <RadioGroup value={radioValue} onChange={setRadioValue} row>
          <FormControlLabel
            value="sms"
            control={<Radio size="small" />}
            label="고객이름으로 검색"
          />
          <FormControlLabel
            value="lms"
            control={<Radio size="small" />}
            label="전화번호로 검색"
          />
        </RadioGroup>

        <SearchInput
          sx={{ marginLeft: "auto", width: "50%" }}
          placeholder="검색 내용을 입력하세요."
        />
      </Box>
      <Box display="flex" height={"100%"} overflow="hidden">
        <Box
          flexDirection={"column"}
          width={"100%"}
          height={"calc(100% - 50px)"}
          overflow="auto"
        >
          <CheckboxTable
            data={tableTestData}
            selectedRows={selectedRows}
            toggleRowsSelection={toggleRowsSelection}
          >
            <CheckboxTable.CheckboxTh />
            <CheckboxTable.Theader>이름</CheckboxTable.Theader>
            <CheckboxTable.Theader>휴대전화</CheckboxTable.Theader>
            <CheckboxTable.Theader>집전화</CheckboxTable.Theader>
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
        </Box>
      </Box>
    </Box>
  );
}
