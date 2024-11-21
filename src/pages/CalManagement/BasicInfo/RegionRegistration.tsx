import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { tableDataType } from "../../../types";
import { tableTestData } from "../../../utils/testData";
import RowDragTable from "../../../components/Table/RowDragTable";
import GrayBox from "../../../components/Box/GrayBox";
import CenteredBox from "../../../components/Box/CenteredBox";
import { BasicButton } from "../../../components/Button";
import TableBox from "../../../components/Box/TableBox";
import BasicInput from "../../../components/Input/BasicInput";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";

export default function RegionRegistration() {
  const [data, setData] = useState<tableDataType[]>(tableTestData);
  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  console.log("업데이트 된 데이터:", data);
  // console.log(selectedRow);

  return (
    <>
      <Box display={"flex"} width={"30%"} minWidth={"300px"} height={"100%"}>
        <TableBox>
          <TableBox.Inner>
            <TableBox>
              <TableBox.Inner>
                <RowDragTable data={data} checkbox={false} setData={setData}>
                  <RowDragTable.Theader>아이디</RowDragTable.Theader>
                  <RowDragTable.Theader>관리지역</RowDragTable.Theader>
                  <RowDragTable.Tbody>
                    {tableTestData.map((item) => (
                      <RowDragTable.Tr
                        key={item.id}
                        id={item.id}
                        // isClicked={selectedRow.has(item.id)}
                        // onClick={() => toggleRowSelection(item.id)}
                      >
                        <RowDragTable.Td>{item.id}</RowDragTable.Td>
                        <RowDragTable.Td>{item.name}</RowDragTable.Td>
                      </RowDragTable.Tr>
                    ))}
                  </RowDragTable.Tbody>
                </RowDragTable>
              </TableBox.Inner>
            </TableBox>
          </TableBox.Inner>
        </TableBox>
      </Box>
      <Box display={"flex"} width={"50%"} height={"100px"}>
        <GrayBox>
          <Stack width={"100%"} gap={1}>
            <CenteredBox gap={1}>
              <Typography variant="h3" marginRight={"auto"}>
                관리지역명
              </Typography>
              <BasicButton>새로고침</BasicButton>
              <BasicButton>저장</BasicButton>
              <BasicButton>삭제</BasicButton>
            </CenteredBox>
            <CenteredBox gap={1}>
              <Typography marginRight={3}>관리지역명</Typography>
              <BasicInput placeholder="입력창" fullWidth />
            </CenteredBox>
          </Stack>
        </GrayBox>
      </Box>
    </>
  );
}
