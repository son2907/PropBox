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
          <BasicTable.Theader>시간</BasicTable.Theader>
          <BasicTable.Theader>받기</BasicTable.Theader>
          <BasicTable.Theader>걸기</BasicTable.Theader>
          <BasicTable.Theader>전체</BasicTable.Theader>

          <BasicTable.Tbody>
            {tableTestData.map((item, index) => {
              return (
                <BasicTable.Tr
                  key={index}
                  isClicked={selectedRow === item.id}
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
        <BasicTable.Theader>합계</BasicTable.Theader>
        <BasicTable.Theader>0</BasicTable.Theader>
        <BasicTable.Theader>11</BasicTable.Theader>
        <BasicTable.Theader>0</BasicTable.Theader>
      </BasicTable>
    </Box>
  );
}
