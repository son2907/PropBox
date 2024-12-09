import { Stack } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { Pagination } from "../../../components/Pagination";
import { usePagination } from "../../../hooks/usePagination";

export default function AuthCode() {

  // BasicTable에 연결할 한 행만 선택 가능하게 하는거(BasicTable 수정을 해야겐네요..)
  const { selectedRow, toggleRowSelection } = useSingleRowSelection();

  const { currentPage, onChangePage } = usePagination();

  return (
    <>
      <Stack width={"100%"} height={"100%"} marginBottom={1}>
        <GrayBox>
          <SearchInput placeholder="입력창"></SearchInput>
        </GrayBox>
        <Stack height={"98"} gap={1} width={"100%"} justifyContent={"space-between"}>
          <TableBox height="95%">
            <TableBox.Inner>
              <BasicTable data={tableTestData}>
                <BasicTable.Th>이름</BasicTable.Th>
                <BasicTable.Th>상담전화</BasicTable.Th>
                <BasicTable.Th>상담일시</BasicTable.Th>
                <BasicTable.Tbody>
                  {tableTestData.map((item, index) => {
                    return (
                      <BasicTable.Tr
                        key={index}
                        isClicked={selectedRow.has(item.id)}
                        onClick={() => toggleRowSelection(item.id)}
                      >
                        <BasicTable.Td>{item.name}</BasicTable.Td>
                        <BasicTable.Td>{item.age}</BasicTable.Td>
                        <BasicTable.Td>{item.job}</BasicTable.Td>
                      </BasicTable.Tr>
                    );
                  })}
                </BasicTable.Tbody>
              </BasicTable>
            </TableBox.Inner>
            
          </TableBox>
          <Pagination count={25} page={currentPage} onChange={onChangePage}/>
        </Stack>
      </Stack>
    </>
  );
}
