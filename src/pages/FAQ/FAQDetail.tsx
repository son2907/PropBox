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
import { useEffect, useRef, useState } from "react";
import BasicInput from "../../components/Input/BasicInput";
import Calendar from "../../components/Calendar/Calendar";
import { useFaqDetail } from "../../api/faq";

export default function FAQDetail() {

  //팝업 페이지에서 id를 가져오려면 window.location.search를 사용하여 파라미터를 파싱
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  console.log("id : ", id);

  //faq 상세조회
  const { isSuccess, data } = useFaqDetail(id || "");

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

  useEffect(() => {
    console.log("data확인", data);
    if (data?.data.contents) {
      //setNoticeDetail(data.data.contents);
      if (data.data.contents) {
        const currentDetail = data.data.contents;
        //제목 및 내용 설정
        const textArea = tRef1.current;
        if (textArea) {
          textArea.value = data.data.contents.faqCn; //내용 설정
        }
      }
    }
  }, [data, isSuccess]);

  //faq 업데이트된 후 제목 및 내용을 설정
  useEffect(() => {
    if (data?.data.contents) {
      const currentDetail = data.data.contents;

      const textArea = tRef1.current;
      if (textArea) {
        textArea.value = currentDetail.faqCn;
      }
    }
  }, [data?.data.contents]);

  return (
    <>
      <Stack bgcolor={"white"} width={"100%"} height={"100%"}>
        <Stack direction={"row"} padding={1} width={"100%"} height={"5%"} gap={2} alignItems={"center"} marginTop={1}>
          <Typography>제목</Typography>
          <Box>
            <BasicInput
              sx={{ width: "650px" }}
              value={data?.data.contents ? data.data.contents.faqSj : ""}
            />
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
