import { Box } from "@mui/material";
import GrayBox from "../../components/Box/GrayBox";
import { BasicButton } from "../../components/Button";
import SelectorTabs from "../../components/Tab/SelectorTabs";
import BasicInput from "../../components/Input/BasicInput";
import useTabs from "../../hooks/useTabs";
import TabPanel from "../../components/Tab/TabPanner";
import BasicTable from "../../components/Table/BasicTable";
import { tableTestData } from "../../utils/testData";
import LabelTypo from "../../components/Typography/LabelTypo";

export default function MemoGroup() {
  const { value, handleChange: tabChange } = useTabs(0);

  return (
    <>
      <SelectorTabs value={value} handleChange={tabChange}>
        <SelectorTabs.Tab label="상담이력" disableRipple />
        <SelectorTabs.Tab label="메모" disableRipple />
      </SelectorTabs>
      <TabPanel value={value} index={0}>
        <div style={{ height: "300px", marginTop: "10px" }}>
          <div style={{ height: "100%", overflow: "auto" }}>
            <BasicTable data={tableTestData}>
              <BasicTable.Theader>구분</BasicTable.Theader>
              <BasicTable.Theader>일자</BasicTable.Theader>
              <BasicTable.Theader>특기사항</BasicTable.Theader>
              <BasicTable.Theader>상담내용</BasicTable.Theader>
              <BasicTable.Tbody>
                {tableTestData.map((item, index) => {
                  return (
                    <BasicTable.Tr key={index}>
                      <BasicTable.Td>{item.name}</BasicTable.Td>
                      <BasicTable.Td>{item.age}</BasicTable.Td>
                      <BasicTable.Td>{item.job}</BasicTable.Td>
                      <BasicTable.Td>{item.hireDate}</BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </div>
        </div>
        <div style={{ height: "100%" }}>
          <GrayBox marginBottom={1}>상담상세</GrayBox>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
            height={"calc(100% - 411px)"}
            gap={1}
            overflow={"scroll"}
            alignItems={"center"}
          >
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
          </Box>
        </div>
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
        <Box height={"calc(100% - 121px)"}>
          <BasicInput multiline />
        </Box>
      </TabPanel>
    </>
  );
}
