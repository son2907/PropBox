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
import { useAuthStore } from "../../stores/authStore";
import { insertNotice } from "../../api/noticeInsert";



export default function NoticeAdd() {

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
  // 체크박스 상태
  const [isPopupChecked, setIsPopupChecked] = useState(false);
  // 날짜 읽기 전용 상태
  const [isReadOnly, setIsReadOnly] = useState(false);

  // 상태: 제목과 내용을 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);

  //날짜 형식 재정의
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  //체크박스 핸들러
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsPopupChecked(isChecked);
    console.log("Popup checkbox state:", isChecked);
  };

  //api 호출시 필요한 데이터 준비
  const insertData = {
    body: {
      noticeNo: "",       //공지사항 번호
      noticeSj: title,       //공지사항 제목
      noticeCn: content,       //공지사항 내용
      popupYn: isPopupChecked ? "Y" : "N",        //팝업 여부
      popupBgnde: isPopupChecked ? formatDate(startDate) : "",     //팝업 유지 startdate
      popupEndde: isPopupChecked ? formatDate(endDate) : "",     //팝업 유지 enddate
      regDe: formatDate(new Date()),          //등록일
      userId: loginId //userID
    }
  }

  //api 호출
  const { mutate: insertNoticeAPI } = insertNotice(insertData);

  // 추가 버튼 클릭 시 API 호출
  const handleInsert = () => {
    // API 호출 실행
    insertNoticeAPI(insertData, {
      onSuccess: (response) => {
        if (response.data.result === "SUCCESS") {
          console.log("등록완");
          window.close();
          // 이전 창 새로 고침
          if (window.opener) {
            window.opener.location.reload();
          }
        } else {
          console.warn("result가 SUCCESS가 아닙니다.");
        }
      },
      onError: (error) => {
        console.error("FAQ 수정 실패:", error);
      },
    })
  };


  return (
    <>
      <Stack bgcolor={"white"} width={"100%"} height={"100%"}>
        <Stack direction={"row"} padding={1} width={"100%"} height={"5%"} gap={2} alignItems={"center"} marginTop={1}>
          <Typography>제목</Typography>
          <Box>
            <BasicInput
              sx={{ width: "650px" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지사항 제목을 입력하세요"
            ></BasicInput>
          </Box>
        </Stack>
        <Box width={"98%"} height={"90%"} margin={1}>
          <TextArea
            height="400px"
            resize="none"
            ref={tRef1}
            placeholder="공지사항 내용을 입력하세요"
            value={content} // content 상태 바인딩
            onChange={(e) => setContent(e.target.value)} // 사용자 입력 반영
          />
        </Box>
        <Stack justifyContent={"space-between"} width={"100%"} direction={"row"} alignItems={"center"}>
          <Stack direction={"row"} padding={1} alignItems={"center"} width={"80%"} gap={1}>
            <Typography>팝업 유지 기간</Typography>
            {/* 캘린더 시작 ~ 끝 날짜 이거 너무 자주나와서 복붙해두면 편함 */}
            <div
              style={{
                pointerEvents: isPopupChecked && !isReadOnly ? "auto" : "none",
                opacity: isPopupChecked && !isReadOnly ? 1 : 0.5, // 비활성화 시 흐리게
              }}
            >
              <Calendar
                selectedDate={startDate}
                setSelectedDate={setStartDate}
                width="200px"
                useMaxDate={true}
              />
            </div>
            <Typography>~</Typography>
            <div
              style={{
                pointerEvents: isPopupChecked && !isReadOnly ? "auto" : "none",
                opacity: isPopupChecked && !isReadOnly ? 1 : 0.5, // 비활성화 시 흐리게
              }}
            >
              <Calendar
                selectedDate={endDate}
                setSelectedDate={setEndDate}
                width="200px"
                useMaxDate={true}
              />
            </div>
            <Stack direction={"row"}>
              <Typography>팝업표시</Typography>
              <input
                type="checkbox"
                checked={isPopupChecked}
                onChange={handleCheckboxChange}
                disabled={isReadOnly}
              />
            </Stack>
          </Stack>
          <Stack direction={"row"} gap={1} margin={1}>
            <BasicButton onClick={handleInsert}>저장</BasicButton>
            <BasicButton onClick={() => window.close()}>닫기</BasicButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
