import { Box } from "@mui/material";
import BasicTable from "../../../../components/Table/BasicTable";
import { tableTestData } from "../../../../utils/testData";
import { useSingleRowSelection } from "../../../../hooks/useSingleRowSelection";

export default function ConsultationStatus() {
  // 단일 선택
  const { selectedRow, toggleRowSelection } = useSingleRowSelection();

  return (
    <Box width={"100%"} height={"100%"} overflow={"hidden"}>
      <Box width={"100%"} height={"calc(100% - 47px)"} overflow={"auto"}>
        <BasicTable data={tableTestData}>
          <BasicTable.Th>시간</BasicTable.Th>
          <BasicTable.Th>받기</BasicTable.Th>
          <BasicTable.Th>걸기</BasicTable.Th>
          <BasicTable.Th>전체</BasicTable.Th>

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
                  <BasicTable.Td>{item.job}</BasicTable.Td>
                </BasicTable.Tr>
              );
            })}
          </BasicTable.Tbody>
        </BasicTable>
      </Box>
      <BasicTable data={tableTestData}>
        <BasicTable.Th>합계</BasicTable.Th>
        <BasicTable.Th>0</BasicTable.Th>
        <BasicTable.Th>11</BasicTable.Th>
        <BasicTable.Th>0</BasicTable.Th>
      </BasicTable>
    </Box>
  );
}
