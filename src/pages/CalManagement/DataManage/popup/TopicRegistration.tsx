import { Stack, Typography } from "@mui/material";
import IconSquareButton from "../../../../components/Button/IconSquareButton";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import GrayBox from "../../../../components/Box/GrayBox";
import { BasicButton } from "../../../../components/Button";
import BasicInput from "../../../../components/Input/BasicInput";
import TableBox from "../../../../components/Box/TableBox";
import CheckboxTable from "../../../../components/Table/CheckboxTable";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import { tableTestData } from "../../../../utils/testData";

export default function TopicRegistration() {
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  return (
    <Stack width={"100%"} height={"100%"} bgcolor={"primary.light"}>
      <GrayBox gap={1} marginBottom={1}>
        <IconSquareButton>
          <PiArrowsClockwiseBold color="#6AA5FE" />
        </IconSquareButton>
        <BasicButton>주제 삭제</BasicButton>
        <BasicButton>저장</BasicButton>
      </GrayBox>
      <GrayBox gap={1}>
        <Typography>주제명</Typography>
        <BasicInput sx={{ width: "350px" }} placeholder="입력창" />
      </GrayBox>
      <TableBox marginBottom={2}>
        <TableBox.Inner>
          <CheckboxTable
            data={tableTestData}
            selectedRows={selectedRows}
            toggleRowsSelection={toggleRowsSelection}
          >
            <CheckboxTable.CheckboxTh />
            <CheckboxTable.Theader>No</CheckboxTable.Theader>
            <CheckboxTable.Theader>주제명</CheckboxTable.Theader>

            <CheckboxTable.Tbody>
              {tableTestData.map((item) => (
                <CheckboxTable.Tr key={item.id} id={item.id}>
                  <CheckboxTable.CheckboxTd item={item} />
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                </CheckboxTable.Tr>
              ))}
            </CheckboxTable.Tbody>
          </CheckboxTable>
        </TableBox.Inner>
      </TableBox>
    </Stack>
  );
}
