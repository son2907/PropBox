import { Box, Pagination } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import useTabs from "../../../hooks/useTabs";
import TabPanel from "../../../components/Tab/TabPanel";
import { tableTestData } from "../../../utils/testData";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import TableBox from "../../../components/Box/TableBox";
import TableSelect from "../../../components/Select/TableSelect";
import { usePagination } from "../../../hooks/usePagination";
import CheckboxTable from "../../../components/Table/CheckboxTable";

// interface Data {
//   id: string;
//   [key: string]: any;
// }

interface CustomerInfoProps {
  selectedAge: number | null;
}

export default function CustomerInfo({ selectedAge }: CustomerInfoProps) {
  const { value, handleChange: tabChange } = useTabs(0);

  const { selectedRows, toggleRowsSelection } = useMultiRowSelection(); // 체크박스는 보통 여러개가 가능하므로 useMultiRowSelection 권장

  // usePagination에
  const { currentPage, onChangePage } = usePagination();

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
              <CheckboxTable
                data={tableTestData}
                selectedRows={selectedRows}
                toggleRowsSelection={toggleRowsSelection}
              >
                <CheckboxTable.Thead>
                  <CheckboxTable.Tr>
                    <CheckboxTable.CheckboxTh keyName="id" />
                    <CheckboxTable.Th>이름</CheckboxTable.Th>
                    <CheckboxTable.Th>휴대전화</CheckboxTable.Th>
                    <CheckboxTable.Th>일반전화</CheckboxTable.Th>
                    <CheckboxTable.Th>고객정보</CheckboxTable.Th>
                    <CheckboxTable.Th>주소</CheckboxTable.Th>
                  </CheckboxTable.Tr>
                </CheckboxTable.Thead>

                <CheckboxTable.Tbody>
                  {tableTestData.map((item) => (
                    <CheckboxTable.Tr key={item.id} id={item.id}>
                      <CheckboxTable.CheckboxTd item={item} keyName="id" />
                      <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                      <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                      <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                      <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                      <CheckboxTable.Td>{item.address}</CheckboxTable.Td>
                    </CheckboxTable.Tr>
                  ))}
                </CheckboxTable.Tbody>
              </CheckboxTable>
            </Box>
            <GrayBox gap={1} justifyContent={"space-between"}>
              <Pagination
                count={25}
                page={currentPage}
                onChange={onChangePage}
              />
              <TableSelect total={100} />
            </GrayBox>
          </TableBox.Inner>
        </TableBox>
      </TabPanel>
    </>
  );
}
