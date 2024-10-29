import { Box } from "@mui/material";
import SelectorTabs from "../../../components/Tab/SelectorTabs";
import useTabs from "../../../hooks/useTabs";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";

export default function CallConsultation() {
  const { value: callValue, handleChange: callChange } = useTabs(0);
  const { value: takeValue, handleChange: takeChange } = useTabs(1);

  return (
    <Box
      bgcolor={"wheat"}
      display={"flex"}
      width={"100%"}
      height={"100%"}
      overflow={"hidden"}
    >
      <Box width={"30%"} minWidth={"350px"} bgcolor={"violet"}>
        <SelectorTabs value={callValue} handleChange={callChange}>
          <SelectorTabs.Tab label="전화받기" disableRipple />
          <SelectorTabs.Tab label="전화걸기" disableRipple />
        </SelectorTabs>
        <SelectorTabs value={takeValue} handleChange={takeChange}>
          <SelectorTabs.Tab label="통화콜" disableRipple />
          <SelectorTabs.Tab label="부재콜" disableRipple />
        </SelectorTabs>
        <div
          style={{
            height: "calc(100% - 97px)",
            width: "100%",
            overflow: "auto",
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
      </Box>
      <Box width={"50%"} minWidth={"calc(1080px * 0.5)"} bgcolor={"tomato"}>
        <div>
          회색배경에 날짜 컴포넌트, 경고 컴포넌트, 상담현황, 추가, 삭제, 문자
          버튼
        </div>
        <Box display={"flex"}>
          <div>인풋들</div>
          <div>인풋들2</div>
        </Box>
        <Box display={"flex"}>왼쪽 인풋 리스트 / 오른쪽 테이블?</Box>
      </Box>
      <Box width={"20%"} minWidth={"400px"} bgcolor={"violet"}>
        <div>상담이력 메모 탭메뉴</div>
        <div>회색 배경 메모장 저장버튼</div>
        <div>그냥 인풋 큰거</div>
      </Box>
    </Box>
  );
}
