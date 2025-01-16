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
import React from "react";

export default function AuthCode() {

  // BasicTable에 연결할 한 행만 선택 가능하게 하는거(BasicTable 수정을 해야겐네요..)
  const { selectedRow, toggleRowSelection } = useSingleRowSelection();

  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
    console.log(`현재 페이지: ${newPage}`); // 콘솔에 현재 페이지 출력
  };

  return (
    <>
      <Stack width={"100%"} height={"100%"} gap={1}>
        <GrayBox width={"100%"} height={"5%"}>
          <SearchInput placeholder="입력창"></SearchInput>
        </GrayBox>
        <Stack width={"100%"} height={"95%"} gap={1}>
          <TableBox.Inner>
            <BasicTable data={tableTestData}>
              <BasicTable.Th>발신전화번호</BasicTable.Th>
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
          <Pagination count={25} page={currentPage} onChange={onChangePage} />
        </Stack>
      </Stack>
    </>
  );
}
