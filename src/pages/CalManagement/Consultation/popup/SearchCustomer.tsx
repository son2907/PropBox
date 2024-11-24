import { Box, Typography } from "@mui/material";
import CheckboxTable from "../../../../components/Table/CheckboxTable";
import { tableTestData } from "../../../../utils/testData";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import SearchInput from "../../../../components/Input/SearchInput";

export default function SearchCustomer() {
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  return (
    <Box padding={2} bgcolor={"white"} width={"100%"} height={"100%"}>
      <Box display={"flex"} alignItems="center" width="100%" paddingBottom={2}>
        <label className="whitespace-nowrap">
          <input type="radio" name="searchType" id="name" />
          <Typography>고객이름으로 검색</Typography>
        </label>
        <label className="whitespace-nowrap">
          <input type="radio" name="searchType" id="phone" />
          <Typography>전화번호로 검색</Typography>
        </label>
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
            checkbox={true}
            selectedRows={selectedRows}
            toggleRowSelection={toggleRowsSelection}
          >
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
