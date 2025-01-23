import { Box, Pagination, Stack } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import TabPanel from "../../../components/Tab/TabPanel";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";

import TableBox from "../../../components/Box/TableBox";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { usePagination } from "../../../hooks/usePagination";
import TableSelect from "../../../components/Select/TableSelect";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import GrayBox from "../../../components/Box/GrayBox";
import { useEffect } from "react";
import { useTableSelect } from "../../../hooks/useTableSelect";

interface Data {
  id: string;
  [key: string]: any;
}

export default function UserInfo() {
  const { value, handleChange: tabChange } = useTabs(0);

  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함

  // usePagination에
  const { currentPage, onChangePage } = usePagination();

  const { countValues, selectValue, handleChange } = useTableSelect();

  return (
    <>
      <TabPanel value={value} index={0}>
        <TableBox>
          <TableBox.Inner>
            <Box
              sx={{
                width: "100%",
                height: "calc(100vh - 280px)",
                overflow: "auto",
                marginBottom: 1,
                flexGrow: 1,
              }}
            >
              <BasicTable data={tableTestData}>
                <BasicTable.Th>구분</BasicTable.Th>
                <BasicTable.Th>그룹명칭</BasicTable.Th>
                <BasicTable.Th>등록건수</BasicTable.Th>
                <BasicTable.Tbody>
                  {tableTestData.map((item, index) => {
                    return (
                      <BasicTable.Tr
                        key={index}
                        isClicked={selectedRow.has(item.id)}
                        onClick={() => toggleRowSelection(item.id)}
                      >
                        <BasicTable.Td>{item.phone}</BasicTable.Td>
                        <BasicTable.Td>{item.name}</BasicTable.Td>
                        <BasicTable.Td>{item.age}</BasicTable.Td>
                      </BasicTable.Tr>
                    );
                  })}
                </BasicTable.Tbody>
              </BasicTable>
            </Box>
            <GrayBox gap={1} justifyContent={"space-between"}>
              <Pagination
                count={25}
                page={currentPage}
                onChange={onChangePage}
              />
              <TableSelect
                total={100}
                countValues={countValues}
                selectValue={selectValue}
                handleChange={handleChange}
              />
            </GrayBox>
          </TableBox.Inner>
        </TableBox>
      </TabPanel>
    </>
  );
}
