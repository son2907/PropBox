import { Box, Stack, Typography } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton, IconButton, ToggleButton } from "../../../components/Button";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import { tableTestData, selectTestData } from "../../../utils/testData";
import SearchResult from "../../../components/Table/SearchResult";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import Calendar from "../../../components/Calendar/Calendar";
import { useRef, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa6";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { BiChevronLeft } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicInput from "../../../components/Input/BasicInput";
import useToggleButtton from "../../../hooks/useToggleButton";
import TextArea from "../../../components/TextArea/TextArea";

export default function NetworkSetup() {

  //useMultiRowSelection 분리해서 각 테이블에 독립적으로 selectedRows와 toggleRowsSelection을 전달하여 동작이 분리되도록 설정.
  // 사용자 리스트 - 선택 상태 관리
  const {
    selectedRow: userSelectedRow,
    toggleRowSelection: toggleUserRowSelection,
  } = useSingleRowSelection();

  // 현장 리스트 - 선택 상태 관리
  const {
    selectedRow: localSelectedRow,
    toggleRowSelection: toggleLocalRowSelection,
  } = useSingleRowSelection();

  // 회사 리스트 - 선택 상태 관리
  const {
    selectedRow: companySelectedRow,
    toggleRowSelection: toggleCompanyRowSelection,
  } = useSingleRowSelection();

  // 현장 허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: useSelectedRows,
    toggleRowsSelection: toggleUseRowsSelection,
  } = useMultiRowSelection();

  // 현장 미허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: localUnuseSelectedRows,
    toggleRowsSelection: toggleLocalUnuseRowsSelection,
  } = useMultiRowSelection();

  const { selectValue, handleChange } = useSelect()

  const [date, setDate] = useState<Date>(new Date());

  //   수신동의 고객 select
  const { selectValue: s_1, handleChange: o_1 } = useSelect();

  // 이 ref를 통해 textArea에 입력된 값에 접근할 수 있음
  const tRef1 = useRef<HTMLTextAreaElement>(null); // textArea에 연결해 줄 ref

  // 토글에 쓰이는거, defaultValue로 초기 클릭 여부 선택 가능
  const { toggle: receive, onChange: receiveToggle } = useToggleButtton({
    defaultValue: true,
  });


  //전화기 추가 팝업
  const phoneAddPopup = {
    url: PathConstants.System.PhoneAdd,
    windowName: "전화기 추가",
    windowFeatures: "width=500,height=500,scrollbars=yes,resizable=yes",
  };

  return (
    <>
      <Stack width={"100%"} height={"100%"} marginBottom={1}>
        <GrayBox gap={2} justifyContent={"start"}>
          <SearchInput></SearchInput>
        </GrayBox>
        <Stack height={"100%"} direction={"row"} gap={1}>
          {/* 사용자 및 회사 정보 */}
          <Stack width={"30%"} overflow={"auto"} height={"96%"}>
            <TableBox>
              <TableBox.Inner>
                <BasicTable data={tableTestData}>
                  <BasicTable.Th>사용자이름</BasicTable.Th>
                  <BasicTable.Th>사용자ID</BasicTable.Th>
                  <BasicTable.Th>전화기수</BasicTable.Th>
                  <BasicTable.Tbody>
                    {tableTestData.map((item, index) => {
                      return (
                        <BasicTable.Tr
                          key={index}
                          isClicked={userSelectedRow.has(item.id)}
                          onClick={() => toggleUserRowSelection(item.id)}
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
          </Stack>
          {/* 전화기 리스트 */}
          <Stack height={"96%"} width={"100%"} direction={"row"} gap={1} sx={{ minWidth: '800px', overflowX: 'auto' }}>
            <Stack width={"50%"} justifyContent={"start"} overflow={"hidden"}>
              <Box overflow={"auto"}>
                <TableBox>
                  <TableBox.Inner>
                    <CheckboxTable
                      data={tableTestData}
                      selectedRows={useSelectedRows}
                      toggleRowsSelection={toggleUseRowsSelection}
                    >
                      <CheckboxTable.Thead>
                        <CheckboxTable.Tr>
                          <CheckboxTable.CheckboxTh />
                          <CheckboxTable.Th>전화기ID</CheckboxTable.Th>
                          <CheckboxTable.Th>전화기이름</CheckboxTable.Th>
                          <CheckboxTable.Th >아이디</CheckboxTable.Th>
                          <CheckboxTable.Th >비밀번호</CheckboxTable.Th>
                          <CheckboxTable.Th >전화번호</CheckboxTable.Th>
                        </CheckboxTable.Tr>
                      </CheckboxTable.Thead>

                      <CheckboxTable.Tbody>
                        {tableTestData.map((item) => (
                          <CheckboxTable.Tr key={item.id} id={item.id}>
                            <CheckboxTable.CheckboxTd item={item} />
                            <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                          </CheckboxTable.Tr>
                        ))}
                      </CheckboxTable.Tbody>
                    </CheckboxTable>
                  </TableBox.Inner>
                </TableBox>
              </Box>
              <GrayBox justifyContent={"end"}>
                <BasicButton>새로고침</BasicButton>
              </GrayBox>
            </Stack>
            <Stack width={"3%"} bgcolor={"white"} justifyContent={"space-between"} justifyItems={"center"}>
              <BasicButton sx={{ backgroundColor: "primary.A100", height: "200px", width: "5px" }}>
                <BiChevronLeft size={"24px"} />
              </BasicButton>
              <BasicButton sx={{ backgroundColor: "primary.A100", height: "200px", width: "5px" }}>
                <BiChevronLeft size={"24px"} />
              </BasicButton>
            </Stack>
            <Stack width={"50%"} justifyContent={"start"} overflow={"hidden"}>
              <Box overflow={"auto"}>
                <TableBox>
                  <TableBox.Inner>
                    <CheckboxTable
                      data={tableTestData}
                      selectedRows={useSelectedRows}
                      toggleRowsSelection={toggleUseRowsSelection}
                    >
                      <CheckboxTable.Thead>
                        <CheckboxTable.Tr>
                          <CheckboxTable.CheckboxTh />
                          <CheckboxTable.Th>전화기ID</CheckboxTable.Th>
                          <CheckboxTable.Th>전화기이름</CheckboxTable.Th>
                          <CheckboxTable.Th >아이디</CheckboxTable.Th>
                          <CheckboxTable.Th >비밀번호</CheckboxTable.Th>
                          <CheckboxTable.Th >전화번호</CheckboxTable.Th>
                          <CheckboxTable.Th >상세보기</CheckboxTable.Th>
                        </CheckboxTable.Tr>
                      </CheckboxTable.Thead>
                      <CheckboxTable.Tbody>
                        {tableTestData.map((item) => (
                          <CheckboxTable.Tr key={item.id} id={item.id}>
                            <CheckboxTable.CheckboxTd item={item} />
                            <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                            <CheckboxTable.Td>
                              <BasicButton>상세보기</BasicButton>
                            </CheckboxTable.Td>
                          </CheckboxTable.Tr>
                        ))}
                      </CheckboxTable.Tbody>
                    </CheckboxTable>
                  </TableBox.Inner>
                </TableBox>
              </Box>
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
                    <Typography fontSize={"24px"} fontWeight={"bold"}>상세정보</Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>전화기ID</LabelTypo>
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
                    <LabelTypo width={"100%"}>전화기이름</LabelTypo>
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
                    <LabelTypo width={"100%"}>아이디</LabelTypo>
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
                    <LabelTypo width={"100%"}>비밀번호</LabelTypo>
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
                    <LabelTypo width={"100%"}>전화번호</LabelTypo>
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
                    <LabelTypo width={"100%"}>비고</LabelTypo>
                    {/* height: 24px */}
                    <TextArea
                      height="100px"
                      resize="none"
                      ref={tRef1}
                      placeholder=""
                    />
                  </Box>
                  <Stack justifyContent={"end"} width={"100%"} gap={1} direction={"row"}>
                    <BasicButton>추가</BasicButton>
                    <BasicButton>저장</BasicButton>
                    <BasicButton>삭제</BasicButton>
                  </Stack>
                </GrayBox>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
