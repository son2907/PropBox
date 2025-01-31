import { Box, Stack, Typography } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import {
  BasicButton,
  IconButton,
  ToggleButton,
} from "../../../components/Button";
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
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicInput from "../../../components/Input/BasicInput";
import useToggleButtton from "../../../hooks/useToggleButton";
import TextArea from "../../../components/TextArea/TextArea";

export default function PhoneSetting() {
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

  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );

  const [date, setDate] = useState<Date>(new Date());

  //   수신동의 고객 select
  const {
    selectListData: sd_1,
    selectValue: s_1,
    handleChange: o_1,
  } = useSelect(selectTestData, "value", "data");

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
      <Stack width={"100%"} height={"100%"} gap={1}>
        <GrayBox>
          <SearchInput />
        </GrayBox>
        <TableBox width={"100%"} gap={1}>
          <Stack overflow={"auto"} width={"20%"} height={"100%"}>
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
          </Stack>
          <Stack width={"38%"} overflow={"auto"} height={"100%"}>
            <TableBox.Inner>
              <CheckboxTable
                data={tableTestData}
                selectedRows={useSelectedRows}
                toggleRowsSelection={toggleUseRowsSelection}
              >
                <CheckboxTable.Thead>
                  <CheckboxTable.Tr>
                    <CheckboxTable.CheckboxTh keyName="id" />
                    <CheckboxTable.Th>전화기ID</CheckboxTable.Th>
                    <CheckboxTable.Th>전화기이름</CheckboxTable.Th>
                    <CheckboxTable.Th>아이디</CheckboxTable.Th>
                    <CheckboxTable.Th>비밀번호</CheckboxTable.Th>
                    <CheckboxTable.Th>전화번호</CheckboxTable.Th>
                  </CheckboxTable.Tr>
                </CheckboxTable.Thead>

                <CheckboxTable.Tbody>
                  {tableTestData.map((item) => (
                    <CheckboxTable.Tr key={item.id} id={item.id}>
                      <CheckboxTable.CheckboxTd
                        item={item}
                        keyName="id"
                      />
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
          </Stack>
          <Stack width={"2%"} bgcolor={"white"} justifyContent={"space-between"} height={"100%"}>
            <BasicButton
              sx={{
                backgroundColor: "primary.A100",
                height: "150px",
                width: "100%",
                padding: "0",
                margin: "0",
                minWidth: "unset", // 기본 minWidth 해제
              }}

            >
              <BiChevronLeft size={"24px"} />
            </BasicButton>
            <BasicButton
              sx={{
                backgroundColor: "primary.A100",
                height: "150px",
                width: "100%",
                padding: "0",
                margin: "0",
                minWidth: "unset", // 기본 minWidth 해제
              }}

            >
              <BiChevronRight size={"24px"} />
            </BasicButton>
          </Stack>
          <Stack width={"38%"} height={"100%"} gap={1}>
            <Stack width={"100%"} height={"60%"} overflow={"auto"}>
              <TableBox.Inner>
                <CheckboxTable
                  data={tableTestData}
                  selectedRows={useSelectedRows}
                  toggleRowsSelection={toggleUseRowsSelection}
                >
                  <CheckboxTable.Thead>
                    <CheckboxTable.Tr>
                      <CheckboxTable.CheckboxTh keyName="id" />
                      <CheckboxTable.Th>전화기ID</CheckboxTable.Th>
                      <CheckboxTable.Th>전화기이름</CheckboxTable.Th>
                      <CheckboxTable.Th>아이디</CheckboxTable.Th>
                      <CheckboxTable.Th>비밀번호</CheckboxTable.Th>
                      <CheckboxTable.Th>전화번호</CheckboxTable.Th>
                      <CheckboxTable.Th>상세보기</CheckboxTable.Th>
                    </CheckboxTable.Tr>
                  </CheckboxTable.Thead>
                  <CheckboxTable.Tbody>
                    {tableTestData.map((item) => (
                      <CheckboxTable.Tr key={item.id} id={item.id}>
                        <CheckboxTable.CheckboxTd
                          item={item}
                          keyName="id"
                        />
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
            </Stack>
            <Stack width={"100%"} height={"40%"}>
              <GrayBox width={"100%"} height={"100%"} overflow={"auto"} flexDirection={"column"}>
                <Box justifyContent={"start"} width={"100%"} marginBottom={1}>
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
              </GrayBox>
            </Stack>
          </Stack>
        </TableBox>
      </Stack>
    </>
  );
}
