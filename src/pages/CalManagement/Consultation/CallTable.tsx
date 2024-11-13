import SelectorTabs from "../../../components/Tab/SelectorTabs";
import useTabs from "../../../hooks/useTabs";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import SearchResult from "../../../components/Table/SearchResult";
import { Box } from "@mui/material";
import TabPanel from "../../../components/Tab/TabPanel";
import { TabType } from "../../../types/menu";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";

export default function CallTable({ tabType, tabChange }: TabType) {
  //  통화콜, 부재콜
  const { value: takeValue, handleChange: takeChange } = useTabs(1);

  // 대기, 부재, 통화콜, 기타
  const { value: callOptionValue, handleChange: callOptionChange } = useTabs(0);

  // 단일 선택
  const { selectedRow, toggleRowSelection } = useSingleRowSelection();
  // 다중 선택
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  return (
    <>
      <SelectorTabs value={tabType} handleChange={tabChange}>
        <SelectorTabs.Tab label="전화받기" disableRipple />
        <SelectorTabs.Tab label="전화걸기" disableRipple />
      </SelectorTabs>
      {/* 전화받기 탭 */}
      <div
        style={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <TabPanel value={tabType} index={0}>
          <SelectorTabs value={takeValue} handleChange={takeChange}>
            <SelectorTabs.Tab label="통화콜" disableRipple />
            <SelectorTabs.Tab label="부재콜" disableRipple />
          </SelectorTabs>
          {/*  통화콜, 부재콜 탭에 따라 데이터가 바뀌도록 데이터 바인딩 해야함  */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              overflow: "auto",
              marginBottom: 1,
              flexGrow: 1,
            }}
          >
            <BasicTable data={tableTestData}>
              <BasicTable.Theader>이름</BasicTable.Theader>
              <BasicTable.Theader>상담전화</BasicTable.Theader>
              <BasicTable.Theader>상담일시</BasicTable.Theader>
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
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </Box>
          <SearchResult total={100} />
        </TabPanel>

        {/* 전화 걸기 탭 */}
        <TabPanel value={tabType} index={1}>
          <SelectorTabs value={callOptionValue} handleChange={callOptionChange}>
            <SelectorTabs.Tab label="대기" disableRipple />
            <SelectorTabs.Tab label="부재" disableRipple />
            <SelectorTabs.Tab label="통화콜" disableRipple />
            <SelectorTabs.Tab label="기타" disableRipple />
          </SelectorTabs>
          {/*  탭에 따라 데이터가 바뀌도록 데이터 바인딩 해야함  */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              overflow: "auto",
              marginBottom: 1,
              flexGrow: 1,
            }}
          >
            <BasicTable data={tableTestData}>
              <BasicTable.Theader>이름</BasicTable.Theader>
              <BasicTable.Theader>주제</BasicTable.Theader>
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
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </Box>
          <SearchResult total={100} />
        </TabPanel>
      </div>
    </>
  );
}
