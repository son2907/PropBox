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
import { noticeDetailType, useNoticeDetail } from "../../api/noticeDetail";

export default function NoticeDetail() {
  //팝업 페이지에서 id를 가져오려면 window.location.search를 사용하여 파라미터를 파싱
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  console.log("id : ", id);

  //공지사항 상세 가져오기
  const { isSuccess, data } = useNoticeDetail(id);
  const [noticeDetail, setNoticeDetail] = useState<noticeDetailType | null>(
    null
  );
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log("data확인", data);
    if (data?.data.contents) {
      setNoticeDetail(data.data.contents);
      if (noticeDetail) {
        const currentDetail = noticeDetail;
        //제목 및 내용 설정
        const textArea = tRef1.current;
        if (textArea) {
          textArea.value = noticeDetail.noticeCn; //내용 설정
        }
      }
    }
  }, [data, isSuccess]);

  //공지사항이 업데이트된 후 제목 및 내용을 설정
  useEffect(() => {
    if (noticeDetail) {
      const currentDetail = noticeDetail;

      const textArea = tRef1.current;
      if (textArea) {
        textArea.value = currentDetail.noticeCn;
      }
    }
  }, [noticeDetail]);

  const NoticeDetail = {
    url: PathConstants.Notice.NoticeDetail,
    windowName: "공지사항 상세",
  };

  // 이 ref를 통해 textArea에 입력된 값에 접근할 수 있음
  const tRef1 = useRef<HTMLTextAreaElement>(null); // textArea에 연결해 줄 ref

  const handleHideForADay = () => {
    if (!id) return;

    // 현재 날짜를 저장
    const today = new Date().toISOString().split("T")[0];
    const hiddenPopups = JSON.parse(
      localStorage.getItem("hiddenPopups") || "{}"
    );

    // 해당 공지사항 ID를 오늘 날짜와 함께 저장
    hiddenPopups[id] = today;
    localStorage.setItem("hiddenPopups", JSON.stringify(hiddenPopups));

    // 팝업 닫기
    window.close();
  };

  return (
    <>
      <Stack bgcolor={"white"} width={"100%"} height={"100%"}>
        <Stack
          direction={"row"}
          padding={1}
          width={"100%"}
          height={"5%"}
          gap={2}
          alignItems={"center"}
          marginTop={1}
        >
          <Typography>제목</Typography>
          <Box>
            <BasicInput
              sx={{ width: "650px" }}
              value={noticeDetail ? noticeDetail.noticeSj : ""}
              readOnly
            ></BasicInput>
          </Box>
        </Stack>
        <Box width={"98%"} height={"90%"} margin={1}>
          <TextArea height="400px" resize="none" ref={tRef1} placeholder="" />
        </Box>
        <Stack
          justifyContent={"space-between"}
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
        >
          <Stack
            direction={"row"}
            padding={1}
            alignItems={"center"}
            width={"80%"}
            gap={1}
          >
            <BasicButton onClick={handleHideForADay}>
              하루동안 보이지않기
            </BasicButton>
          </Stack>
          <Stack direction={"row"} gap={1} margin={1}>
            <BasicButton onClick={() => window.close()}>닫기</BasicButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
