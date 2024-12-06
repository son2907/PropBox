import { Box, Stack, Typography } from "@mui/material";
import SearchInput from "../../components/Input/SearchInput";
import { BasicButton, IconButton } from "../../components/Button";
import { IoIosAddCircleOutline } from "react-icons/io";
import TableBox from "../../components/Box/TableBox";
import CheckboxTable from "../../components/Table/CheckboxTable";
import { tableTestData } from "../../utils/testData";
import { RiDeleteBinLine } from "react-icons/ri";
import { useMultiRowSelection } from "../../hooks/useMultiRowSelection";
import PathConstants from "../../routers/path";
import TextArea from "../../components/TextArea/TextArea";
import { useRef, useState } from "react";
import BasicInput from "../../components/Input/BasicInput";
import Calendar from "../../components/Calendar/Calendar";



export default function NoticeAdd() {

  // 여러개선택
  const {
    selectedRows: useSelectedRows,
    toggleRowsSelection: toggleUseRowsSelection,
  } = useMultiRowSelection();

  const NoticeAdd = {
    url: PathConstants.Notice.NoticeAdd,
    windowName: "공지사항 등록",
  };

  // 이 ref를 통해 textArea에 입력된 값에 접근할 수 있음
  const tRef1 = useRef<HTMLTextAreaElement>(null); // textArea에 연결해 줄 ref

  // 시작 날짜
  const [startDate, setStartDate] = useState<Date>(new Date());
  // 끝 날짜
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <>
      <Stack bgcolor={"white"} width={"100%"} height={"100%"}>
        <Stack direction={"row"} padding={1} width={"100%"} height={"5%"} gap={2} alignItems={"center"} marginTop={1}>
          <Typography>제목</Typography>
          <Box>
            <BasicInput sx={{ width: "650px" }}></BasicInput>
          </Box>
        </Stack>
        <Box width={"98%"} height={"90%"} margin={1}>
          <TextArea
            height="400px"
            resize="none"
            ref={tRef1}
            placeholder="공지사항 내용을 입력하세요"
          />
        </Box>
        <Stack justifyContent={"space-between"} width={"100%"} direction={"row"} alignItems={"center"}>
          <Stack direction={"row"} padding={1} alignItems={"center"} width={"80%"} gap={1}>
            <Typography>팝업 유지 기간</Typography>
            {/* 캘린더 시작 ~ 끝 날짜 이거 너무 자주나와서 복붙해두면 편함 */}
            <Calendar
              selectedDate={startDate}
              setSelectedDate={setStartDate}
              width="50px"
            />
            <Typography>~</Typography>
            <Calendar selectedDate={endDate} setSelectedDate={setEndDate} width="50px" />
            <Stack direction={"row"}>
              <Typography>팝업표시</Typography>
              <input type="checkbox" />
            </Stack>
          </Stack>
          <Stack direction={"row"} gap={1} margin={1}>
            <BasicButton>저장</BasicButton>
            <BasicButton>닫기</BasicButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
