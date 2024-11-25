import { Box, Pagination, Stack, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { BasicButton, ToggleButton } from "../../../components/Button";
import BasicInput from "../../../components/Input/BasicInput";
import useTabs from "../../../hooks/useTabs";
import TabPanel from "../../../components/Tab/TabPanel";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import LabelTypo from "../../../components/Typography/LabelTypo";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import RowDragTable from "../../../components/Table/RowDragTable";
import TextArea from "../../../components/TextArea/TextArea";
import { useRef, useState } from "react";
import { Select } from "../../../components/Select";
import { selectTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import useToggleButtton from "../../../hooks/useToggleButton";
import TableBox from "../../../components/Box/TableBox";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { usePagination } from "../../../hooks/usePagination";
import TableSelect from "../../../components/Select/TableSelect";

interface Data {
  id: string;
  [key: string]: any;
}

export default function GroupInfo() {
  const { value, handleChange: tabChange } = useTabs(0);

  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함 

  // usePagination에
  const { currentPage, onChangePage } = usePagination();

  const { selectValue, handleChange } = useSelect();

  const { toggle, onChange: setToggle } = useToggleButtton({
    defaultValue: true,
  });

  return (
    <>
      <TabPanel value={value} index={0}>
        <div
          style={{
            height: "100%",
            overflowY: "scroll", // 세로 스크롤 활성화
            overflowX: "hidden", // 가로 스크롤 비활성화
          }}
        >
          <TableBox>
            <TableBox.Inner>
              <BasicTable data={tableTestData}>
                <BasicTable.Theader>구분</BasicTable.Theader>
                <BasicTable.Theader>그룹명칭</BasicTable.Theader>
                <BasicTable.Theader>등록건수</BasicTable.Theader>
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
            </TableBox.Inner>
          </TableBox>
          <Stack direction="row" gap={1} >
            <Pagination count={25} page={currentPage} onChange={onChangePage} />
            <TableSelect total={100} />
          </Stack>
        </div>
      </TabPanel>
    </>
  );
}
