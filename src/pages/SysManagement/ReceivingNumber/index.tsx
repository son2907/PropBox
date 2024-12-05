import { Box, Stack, Typography } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { Pagination } from "../../../components/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicInput from "../../../components/Input/BasicInput";
import useSelect from "../../../hooks/useSelect";
import { useRef, useState } from "react";
import { Select } from "../../../components/Select";
import { selectTestData } from "../../../utils/testData";
import { BasicButton, ToggleButton } from "../../../components/Button";
import useToggleButtton from "../../../hooks/useToggleButton";
import TextArea from "../../../components/TextArea/TextArea";

export default function ReceivingNumber() {
  // BasicTable에 연결할 한 행만 선택 가능하게 하는거(BasicTable 수정을 해야겐네요..)
  const { selectedRow, toggleRowSelection } = useSingleRowSelection();

  const { currentPage, onChangePage } = usePagination();

  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );

  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  // 이 ref를 통해 textArea에 입력된 값에 접근할 수 있음
  const tRef1 = useRef<HTMLTextAreaElement>(null); // textArea에 연결해 줄 ref

  // 토글에 쓰이는거, defaultValue로 초기 클릭 여부 선택 가능
  const { toggle: receive, onChange: receiveToggle } = useToggleButtton({
    defaultValue: true,
  });

  return (
    <>
      <Stack
        width={"100%"}
        height={"100%"}
        marginBottom={1}
        direction={"row"}
        gap={1}
      >
        <Stack width={"70%"} height={"100%"}>
          <GrayBox>
            <SearchInput placeholder="고객정보 검색"></SearchInput>
          </GrayBox>
          <Stack
            height={"100%"}
            gap={1}
            width={"100%"}
            justifyContent={"space-between"}
            overflow={"hidden"}
            direction={"row"}
          >
            <Stack width={"30%"} gap={1}>
              <Stack height={"95%"}>
                <TableBox height="100%">
                  <TableBox.Inner>
                    <BasicTable data={tableTestData}>
                      <BasicTable.Th>전화번호</BasicTable.Th>
                      <BasicTable.Th>현장명</BasicTable.Th>
                      <BasicTable.Tbody>
                        {tableTestData.map((item, index) => {
                          return (
                            <BasicTable.Tr
                              key={index}
                              isClicked={selectedRow.has(item.id)}
                              onClick={() => toggleRowSelection(item.id)}
                            >
                              <BasicTable.Td>{item.name}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                            </BasicTable.Tr>
                          );
                        })}
                      </BasicTable.Tbody>
                    </BasicTable>
                  </TableBox.Inner>
                </TableBox>
              </Stack>
              <Stack height={"5%"} width={"100%"} justifyContent={"center"}>
                <Pagination
                  count={25}
                  page={currentPage}
                  onChange={onChangePage}
                />
              </Stack>
            </Stack>
            <Stack width={"70%"}>
              <Stack height={"95%"}>
                <TableBox height="100%">
                  <TableBox.Inner>
                    <BasicTable data={tableTestData}>
                      <BasicTable.Th>수신거부번호</BasicTable.Th>
                      <BasicTable.Th>070번호</BasicTable.Th>
                      <BasicTable.Th>수신거부코드</BasicTable.Th>
                      <BasicTable.Th>사용여부</BasicTable.Th>
                      <BasicTable.Th>비고</BasicTable.Th>
                      <BasicTable.Th>등록일시</BasicTable.Th>
                      <BasicTable.Th>희망평형</BasicTable.Th>
                      <BasicTable.Th>호응도</BasicTable.Th>
                      <BasicTable.Th>특기사항</BasicTable.Th>
                      <BasicTable.Th>등록일자</BasicTable.Th>

                      <BasicTable.Tbody>
                        {tableTestData.map((item, index) => {
                          return (
                            <BasicTable.Tr
                              key={index}
                              isClicked={selectedRow.has(item.id)}
                              onClick={() => toggleRowSelection(item.id)}
                            >
                              <BasicTable.Td>{item.name}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                            </BasicTable.Tr>
                          );
                        })}
                      </BasicTable.Tbody>
                    </BasicTable>
                  </TableBox.Inner>
                </TableBox>
              </Stack>
              <Stack height={"5%"} width={"100%"} justifyContent={"center"}>
                <Pagination
                  count={25}
                  page={currentPage}
                  onChange={onChangePage}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack width={"30%"} height={"100%"}>
          <Stack>
            <GrayBox
              flexDirection={"column"}
              width={"100%"}
              height={"100%"}
              gap={1}
              overflow="auto"
              alignItems="start"
            >
              <Box width="100%" justifyContent="flex-start">
                <Typography fontSize={"24px"} fontWeight={"bold"}>
                  상세정보
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>수신거부 번호</LabelTypo>
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
                <LabelTypo width={"100%"}>070 번호</LabelTypo>
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
                <ToggleButton
                  checked={receive}
                  onChange={receiveToggle}
                  label=""
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>고객정보</LabelTypo>
                {/* height: 24px */}
                <TextArea
                  height="100px"
                  resize="none"
                  ref={tRef1}
                  placeholder=""
                />
              </Box>
              <Stack
                justifyContent={"end"}
                width={"100%"}
                gap={1}
                direction={"row"}
              >
                <BasicButton>추가</BasicButton>
                <BasicButton>저장</BasicButton>
                <BasicButton>삭제</BasicButton>
              </Stack>
            </GrayBox>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
