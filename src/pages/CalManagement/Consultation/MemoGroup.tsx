import { Box, Stack } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import { BasicButton } from "../../../components/Button";
import BasicInput from "../../../components/Input/BasicInput";
import useTabs from "../../../hooks/useTabs";
import TabPanel from "../../../components/Tab/TabPanel";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import LabelTypo from "../../../components/Typography/LabelTypo";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import TextArea from "../../../components/TextArea/TextArea";
import TabMenus from "../../../components/Tab/TabMenus";

export default function MemoGroup() {
  const { value, handleChange: tabChange } = useTabs(0);

  // 테이블 선택 조건이 없으므로 다중선택 ui 적용
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  return (
    <>
      <TabMenus value={value} handleChange={tabChange}>
        <TabMenus.Tab label="상담이력" disableRipple />
        <TabMenus.Tab label="메모" disableRipple />
      </TabMenus>
      <TabPanel value={value} index={0}>
        <Box style={{ maxHeight: "350px", marginTop: 1, overflow: "auto" }}>
          <BasicTable data={tableTestData}>
            <BasicTable.Theader>구분</BasicTable.Theader>
            <BasicTable.Theader>일자</BasicTable.Theader>
            <BasicTable.Theader>특기사항</BasicTable.Theader>
            <BasicTable.Theader>상담내용</BasicTable.Theader>
            <BasicTable.Tbody>
              {tableTestData.map((item, index) => {
                return (
                  <BasicTable.Tr
                    key={index}
                    isClicked={selectedRows.has(item.id)}
                    onClick={() => toggleRowsSelection(item.id)}
                  >
                    <BasicTable.Td>{item.name}</BasicTable.Td>
                    <BasicTable.Td>{item.age}</BasicTable.Td>
                    <BasicTable.Td>{item.job}</BasicTable.Td>
                    <BasicTable.Td>{item.hireDate}</BasicTable.Td>
                  </BasicTable.Tr>
                );
              })}
            </BasicTable.Tbody>
          </BasicTable>
        </Box>
        <Stack overflow={"hidden"}>
          <GrayBox marginBottom={1}>상담상세</GrayBox>
          <Stack gap={1} overflow={"scroll"} alignItems={"center"}>
            {Array.from({ length: 40 }).map((item, index) => {
              return (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center" // 수직 중앙 정렬
                >
                  <LabelTypo>수신동의</LabelTypo>
                  <BasicInput sx={{ height: "25px" }} />
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GrayBox
          justifyContent={"space-between"}
          marginTop={1}
          marginBottom={1}
        >
          메모장
          <BasicButton>저장</BasicButton>
        </GrayBox>
        <TextArea />
      </TabPanel>
    </>
  );
}
