import { Stack, Typography } from "@mui/material";
import React from "react";
import CenteredBox from "../../../../components/Box/CenteredBox";
import BasicInput from "../../../../components/Input/BasicInput";
import { BasicButton } from "../../../../components/Button";
import BasicTable from "../../../../components/Table/BasicTable";
import { tableTestData } from "../../../../utils/testData";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import TableBox from "../../../../components/Box/TableBox";

export default function GroupCell() {
  const { selectedRows: ts_2, toggleRowsSelection: tt_2 } =
    useMultiRowSelection();

  return (
    <Stack width={"100%"} height={"100%"} bgcolor={"primary.light"}>
      <CenteredBox height={"60px"} gap={1} padding={2} marginTop={1}>
        <Typography>그룹명</Typography>
        <BasicInput />
        <BasicButton sx={{ marginLeft: "auto" }}>새로고침</BasicButton>
        <BasicButton>저장</BasicButton>
      </CenteredBox>
      <TableBox padding={1}>
        <TableBox.Inner>
          <BasicTable data={tableTestData}>
            <BasicTable.Theader>방통위 그룹</BasicTable.Theader>
            <BasicTable.Theader>삭제</BasicTable.Theader>

            <BasicTable.Tbody>
              {tableTestData.map((item, index) => {
                return (
                  <BasicTable.Tr
                    key={index}
                    isClicked={ts_2.has(item.id)}
                    onClick={() => tt_2(item.id)}
                  >
                    <BasicTable.Td>{item.name}</BasicTable.Td>
                    <BasicTable.Td>
                      <BasicButton
                        sx={{
                          borderColor: "error.main",
                        }}
                      >
                        삭제
                      </BasicButton>
                    </BasicTable.Td>
                  </BasicTable.Tr>
                );
              })}
            </BasicTable.Tbody>
          </BasicTable>
        </TableBox.Inner>
      </TableBox>
    </Stack>
  );
}
