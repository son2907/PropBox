import SelectorTabs from "../../../components/Tab/SelectorTabs";
import useTabs from "../../../hooks/useTabs";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";

export default function CallTable() {
  const { value: callValue, handleChange: callChange } = useTabs(0);
  const { value: takeValue, handleChange: takeChange } = useTabs(1);

  return (
    <>
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
    </>
  );
}
