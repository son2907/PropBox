import { Box, Select, Stack, Typography } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { tableTestData } from "../../../utils/testData";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicInput from "../../../components/Input/BasicInput";
import { BasicButton, ToggleButton } from "../../../components/Button";
import useToggleButtton from "../../../hooks/useToggleButton";

export default function MemberManagement() {

  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함 

  const { toggle, onChange: setToggle } = useToggleButtton({
    defaultValue: true,
  });

  return (
    <>
      <Stack width={"100%"}>
        <GrayBox width={"100%"} height={"4%"}>
          <SearchInput placeholder="사용자명 검색"></SearchInput>
        </GrayBox>
        <Stack direction={"row"} height={"96%"}>
          <Stack width={"50%"} minWidth={"800px"} bgcolor={"white"} overflow={"auto"} marginBottom={1}>
            <TableBox>
              <TableBox.Inner>
                <BasicTable data={tableTestData}>
                  <BasicTable.Th>사용자ID</BasicTable.Th>
                  <BasicTable.Th>사용자이름</BasicTable.Th>
                  <BasicTable.Th>PREFIX</BasicTable.Th>
                  <BasicTable.Th>사용여부</BasicTable.Th>
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
                          <BasicTable.Td>{item.job}</BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </TableBox>
          </Stack>
          <Stack width={"50%"} minWidth={"800px"} bgcolor={"white"} marginLeft={1}>
            <TableBox>
              <TableBox.Inner>
                <BasicTable data={tableTestData}>
                  <BasicTable.Th>구성원ID</BasicTable.Th>
                  <BasicTable.Th>구성원이름</BasicTable.Th>
                  <BasicTable.Th>사용여부</BasicTable.Th>
                  <BasicTable.Tbody>
                    {tableTestData.map((item, index) => {
                      return (
                        <BasicTable.Tr
                          key={index}
                          isClicked={selectedRow.has(item.id)}
                          onClick={() => toggleRowSelection(item.id)}
                        >
                          <BasicTable.Td>{item.phone}</BasicTable.Td>
                          <BasicTable.Td>{item.age}</BasicTable.Td>
                          <BasicTable.Td>{item.job}</BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </TableBox>
            <GrayBox
              flexDirection={"column"}
              width={"100%"}
              height={"40%"}
              overflow="auto"
              alignItems="start"
            >
              <Box justifyContent={"start"} width={"100%"} marginBottom={1}>
                <Typography fontWeight={"bold"} fontSize={"20px"}>사용자 허가 솔루션</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>구성원ID</LabelTypo>
                {/* height: 24px */}
                <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>구성원이름</LabelTypo>
                {/* height: 24px */}
                <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>사용여부</LabelTypo>
                {/* height: 24px */}
                <ToggleButton checked={toggle} onChange={setToggle} label="" />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>비고</LabelTypo>
                {/* height: 24px */}
                <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
              </Box>
            </GrayBox>
            <GrayBox justifyContent={"end"} gap={1}>
              <BasicButton>추가</BasicButton>
              <BasicButton>저장</BasicButton>
              <BasicButton>삭제</BasicButton>
            </GrayBox>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
