import SelectorTabs from "../../../components/Tab/SelectorTabs";
import useTabs from "../../../hooks/useTabs";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import SearchResult from "../../../components/Table/SearchResult";
import { Box } from "@mui/material";
import TabPanel from "../../../components/Tab/TabPanner";

export default function CallTable() {
  const { value: callValue, handleChange: callChange } = useTabs(0);
  const { value: takeValue, handleChange: takeChange } = useTabs(1);
  const { value: callOptionValue, handleChange: callOptionChange } = useTabs(0);

  return (
    <>
      <Box marginBottom={1}>
        <SelectorTabs value={callValue} handleChange={callChange}>
          <SelectorTabs.Tab label="전화받기" disableRipple />
          <SelectorTabs.Tab label="전화걸기" disableRipple />
        </SelectorTabs>
      </Box>
      {/* 전화받기 탭 */}
      <TabPanel value={callValue} index={0}>
        <SelectorTabs value={takeValue} handleChange={takeChange}>
          <SelectorTabs.Tab label="통화콜" disableRipple />
          <SelectorTabs.Tab label="부재콜" disableRipple />
        </SelectorTabs>
        {/*  탭에 따라 데이터가 바뀌도록 데이터 바인딩 해야함  */}
        <div
          style={{
            height: "calc(100% - 169px)",
            width: "100%",
            overflow: "auto",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        >
          <BasicTable data={tableTestData}>
            <BasicTable.Theader>이름</BasicTable.Theader>
            <BasicTable.Theader>상담전화</BasicTable.Theader>
            <BasicTable.Theader>상담일시</BasicTable.Theader>
            <BasicTable.Tbody>
              {tableTestData.map((item, index) => {
                return (
                  <BasicTable.Tr key={index}>
                    <BasicTable.Td>{item.name}</BasicTable.Td>
                    <BasicTable.Td>{item.age}</BasicTable.Td>
                    <BasicTable.Td>{item.job}</BasicTable.Td>
                  </BasicTable.Tr>
                );
              })}
            </BasicTable.Tbody>
          </BasicTable>
        </div>
        <SearchResult total={100} />
      </TabPanel>

      {/* 전화 걸기 탭 */}
      <TabPanel value={callValue} index={1}>
        <SelectorTabs value={callOptionValue} handleChange={callOptionChange}>
          <SelectorTabs.Tab label="대기" disableRipple />
          <SelectorTabs.Tab label="부재" disableRipple />
          <SelectorTabs.Tab label="통화콜" disableRipple />
          <SelectorTabs.Tab label="기타" disableRipple />
        </SelectorTabs>
        {/*  탭에 따라 데이터가 바뀌도록 데이터 바인딩 해야함  */}
        <div
          style={{
            height: "calc(100% - 169px)",
            width: "100%",
            overflow: "auto",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        >
          <BasicTable data={tableTestData}>
            <BasicTable.Theader>이름</BasicTable.Theader>
            <BasicTable.Theader>주제</BasicTable.Theader>
            <BasicTable.Tbody>
              {tableTestData.map((item, index) => {
                return (
                  <BasicTable.Tr key={index}>
                    <BasicTable.Td>{item.name}</BasicTable.Td>
                    <BasicTable.Td>{item.age}</BasicTable.Td>
                  </BasicTable.Tr>
                );
              })}
            </BasicTable.Tbody>
          </BasicTable>
        </div>
        <SearchResult total={100} />
      </TabPanel>
    </>
  );
}
