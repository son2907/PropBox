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



export default function FAQDetail() {

  // 여러개선택
  const {
    selectedRows: useSelectedRows,
    toggleRowsSelection: toggleUseRowsSelection,
  } = useMultiRowSelection();

  const FAQDetail = {
    url: PathConstants.FAQ.FAQDetail,
    windowName: "FAQ 상세",
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
            placeholder=""
          />
        </Box>
        <Stack justifyContent={"end"} width={"100%"} direction={"row"} alignItems={"center"}>
          <Stack direction={"row"} gap={1} margin={1}>
            <BasicButton>닫기</BasicButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
