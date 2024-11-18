import { Box, Stack, Typography } from "@mui/material";
import { BasicButton, IconButton } from "../../../components/Button";
import GrayBox from "../../../components/Box/GrayBox";
import DeleteBtnInput from "../../../components/Input/DeleteBtnInput";
import { useRef, useState } from "react";
import BasicInput from "../../../components/Input/BasicInput";
import TextArea from "../../../components/TextArea/TextArea";
import { Select } from "../../../components/Select";
import { selectTestData, tableTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import CenteredBox from "../../../components/Box/CenteredBox";
import { IoSettingsOutline } from "react-icons/io5";
import Calendar from "../../../components/Calendar/Calendar";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";

export default function SMSSending() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectValue, handleChange } = useSelect("1");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  return (
    <Box padding={2} bgcolor={"white"} height={"100%"} width={"100%"}>
      <GrayBox height="40px">
        <BasicButton sx={{ marginLeft: "auto" }}>전송</BasicButton>
      </GrayBox>
      {/* 라디오 버튼 그룹 */}
      <Box display={"flex"} width={"100%"} height={"100%"} marginTop={1}>
        <Box
          display={"flex"}
          width="45%"
          minWidth={"401px"}
          height="calc(100% - 50px)"
        >
          <Stack overflow={"hidden"} marginTop={1} gap={1}>
            <Box display={"flex"} alignItems="center">
              <label className="whitespace-nowrap">
                <input type="radio" name="searchType" id="type" />
                <Typography display="inline">SMS</Typography>
              </label>
              <label className="whitespace-nowrap">
                <input type="radio" name="searchType" id="type" />
                <Typography display="inline">LMS</Typography>
              </label>
              <label className="whitespace-nowrap">
                <input type="radio" name="searchType" id="type" />
                <Typography display="inline">MMS</Typography>
              </label>
              <BasicButton sx={{ marginLeft: "auto" }}>이미지 선택</BasicButton>
            </Box>

            <DeleteBtnInput ref={inputRef} placeholder="첨부파일" />
            {/* 제목 */}
            <Typography display={"inline"}>제목</Typography>
            <BasicInput placeholder="내용 입력" />
            <TextArea height="150px" resize="none" maxBytes={80} />

            <CenteredBox gap={1}>
              <Typography display="inline" marginRight={2}>
                발신번호
              </Typography>
              <Select
                value={selectValue}
                selectData={selectTestData}
                onChange={handleChange}
                sx={{ width: "280px" }}
              />
              <IconButton>
                <IoSettingsOutline />
              </IconButton>
            </CenteredBox>
            <CenteredBox justifyContent={"space-between"}>
              <Typography display="inline">전송 대상 : 1명</Typography>
              <Typography display="inline"> 수신 거부 대상 1명</Typography>
              <Typography display="inline"> 확정 대상: 1명</Typography>
              <BasicButton>미리보기</BasicButton>
            </CenteredBox>
            <CenteredBox gap={1}>
              <input type="checkbox" />
              <Typography noWrap display="inline">
                예약전송
              </Typography>
              <Box width={"78%"}>
                <Calendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </Box>
            </CenteredBox>
            <CenteredBox>
              <input type="checkbox" />
              <Typography noWrap display="inline">
                인터발
              </Typography>
              <Stack width={"50%"} marginLeft={10}>
                <label className="whitespace-nowrap">
                  <input type="radio" name="searchType" id="need" />
                  <Typography display="inline" marginRight={1}>
                    소요
                  </Typography>
                  <BasicInput sx={{ width: "100px" }} />
                  <Typography display="inline" marginLeft={1}>
                    분
                  </Typography>
                </label>
                <label className="whitespace-nowrap">
                  <input type="radio" name="searchType" id="term" />
                  <Typography display="inline" marginRight={1}>
                    간격
                  </Typography>
                  <BasicInput sx={{ width: "100px" }} />
                  <Typography display="inline" marginLeft={1}>
                    초
                  </Typography>
                </label>
              </Stack>
            </CenteredBox>
            <CenteredBox gap={1}>
              <label className="whitespace-nowrap">
                <input type="checkbox" name="searchType" id="type" />
                <Typography display="inline">광고문자</Typography>
              </label>
              <BasicInput sx={{ width: "100%" }} />
              <BasicButton>번호 삽입</BasicButton>
            </CenteredBox>
          </Stack>
        </Box>
        <Box
          width={"100%"}
          height={"100%"}
          marginLeft={1}
          borderLeft={1}
          borderColor="primary.main"
          padding={1.5}
        >
          <GrayBox height="40px">
            ● 하단의 메세지를 클릭하면 좌측 메세지 창에 표시됨
          </GrayBox>
          <CenteredBox padding={2} gap={1}>
            <Typography fontWeight={"bold"}>저장 메시지</Typography>
            <BasicButton sx={{ marginLeft: "auto" }}>
              현재 메시지 저장
            </BasicButton>
            <BasicButton>삭제</BasicButton>
          </CenteredBox>
          <Box height={"35%"} width={"100%"} overflow={"auto"}>
            <CheckboxTable
              data={tableTestData}
              checkbox={false}
              selectedRows={selectedRows}
              toggleRowSelection={toggleRowsSelection}
            >
              <CheckboxTable.Theader>메시지</CheckboxTable.Theader>
              <CheckboxTable.Theader> </CheckboxTable.Theader>
              <CheckboxTable.Theader> </CheckboxTable.Theader>
              <CheckboxTable.Theader>구분</CheckboxTable.Theader>

              <CheckboxTable.Tbody>
                {tableTestData.map((item) => (
                  <CheckboxTable.Tr key={item.id} id={item.id}>
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  </CheckboxTable.Tr>
                ))}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          </Box>

          <CenteredBox padding={2} gap={1}>
            <Typography fontWeight={"bold"}>매크로</Typography>
          </CenteredBox>
          <Box height={"30%"} width={"100%"} overflow={"auto"}>
            <CheckboxTable
              data={tableTestData}
              checkbox={false}
              selectedRows={selectedRows}
              toggleRowSelection={toggleRowsSelection}
            >
              <CheckboxTable.Theader>매크로</CheckboxTable.Theader>
              <CheckboxTable.Theader>실제 변환 예제</CheckboxTable.Theader>

              <CheckboxTable.Tbody>
                {tableTestData.map((item) => (
                  <CheckboxTable.Tr key={item.id} id={item.id}>
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                  </CheckboxTable.Tr>
                ))}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
