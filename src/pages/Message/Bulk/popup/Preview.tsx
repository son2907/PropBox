import { Stack, Tab, Typography } from "@mui/material";
import CustomTabs from "./components/CustomTabs";
import useTabs from "../../../../hooks/useTabs";
import TabPanel from "../../../../components/Tab/TabPanel";
import TableBox from "../../../../components/Box/TableBox";
import BasicTable from "../../../../components/Table/BasicTable";
import { tableTestData } from "../../../../utils/testData";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import GrayBox from "../../../../components/Box/GrayBox";

export default function Preview() {
  const { value, handleChange } = useTabs(0);

  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  return (
    <Stack width={"100%"} height={"100%"} bgcolor={"primary.light"}>
      <CustomTabs value={value} handleChange={handleChange}>
        <Tab label="확정인원" />
        <Tab label="중복인원" />
        <Tab label="형식오류인원" />
        <Tab label="수신거부인원" />
      </CustomTabs>
      <TabPanel index={0} value={value}>
        <TableBox>
          <TableBox.Inner>
            <BasicTable data={tableTestData}>
              <BasicTable.Th>휴대전화</BasicTable.Th>
              <BasicTable.Th>고객정보</BasicTable.Th>

              <BasicTable.Tbody>
                {tableTestData.map((item, index) => {
                  return (
                    <BasicTable.Tr
                      key={index}
                      isClicked={selectedRows.has(item.id)}
                      onClick={() => toggleRowsSelection(item.id)}
                    >
                      <BasicTable.Td
                      // 아래와 같이 조건에 따라 배경색을 다르게 줌,
                      // 중복 여부는 api에서 판단하여 item에 넣어 보내줌
                      // style={{
                      //   backgroundColor: selectedRow.has(item.id)
                      //     ? "red"
                      //     : "white",
                      // }}
                      >
                        {item.name}
                      </BasicTable.Td>
                      <BasicTable.Td>{item.age}</BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
        </TableBox>
      </TabPanel>
      <GrayBox gap={3}>
        <Typography>확정인원 : 306</Typography>
        <Typography>중복인원 : 19</Typography>
        <Typography>형식오류인원 : 18</Typography>
        <Typography>수신거부인원 : 3</Typography>
      </GrayBox>
    </Stack>
  );
}
