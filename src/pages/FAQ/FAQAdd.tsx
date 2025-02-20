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
import useModal from "../../hooks/useModal";
import { InsertCompletedModal } from "../../components/Modal/modal/InsertCompletedModal";
import { EmptyDataModal } from "../../components/Modal/modal/EmptyDataModal";
import { insertFaq } from "../../api/faq";

interface FormData {
  noticeSj: string;
  noticeCn: string;
  sj: string;
}

export default function FAQAdd() {
  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);

  //모달
  const { openModal, closeModal } = useModal();

  // 여러개선택
  const {
    selectedRows: useSelectedRows,
    toggleRowsSelection: toggleUseRowsSelection,
  } = useMultiRowSelection();

  const NoticeAdd = {
    url: PathConstants.Notice.NoticeAdd,
    windowName: "FAQ 등록",
  };

  // 이 ref를 통해 textArea에 입력된 값에 접근할 수 있음
  const faqRef = useRef<HTMLTextAreaElement>(null); // textArea에 연결해 줄 ref

  // 상태: 제목과 내용을 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //api 호출시 필요한 데이터 준비
  const insertData = {
    body: {
      faqNo: "", //공지사항 번호
      faqSj: title, //공지사항 제목
      faqCn: content, //공지사항 내용
      userId: loginId, //userID
    },
  };

  //api 호출
  const { mutate: insertFaqAPI } = insertFaq(insertData);

  // 추가 버튼 클릭 시 API 호출
  const handleInsert = () => {
    if (insertData.body.faqSj && insertData.body.faqCn) {
      // API 호출 실행
      insertFaqAPI(insertData, {
        onSuccess: (response) => {
          if (response.data.result === "SUCCESS") {
            console.log("등록완");
            insertCompletedModal();
          } else {
            console.warn("result가 SUCCESS가 아닙니다.");
          }
        },
        onError: (error) => {
          console.error("FAQ 추가 실패:", error);
        },
      });
    } else {
      emptyDataModal();
    }
  };

  //입력한 값이 없을때
  const emptyDataModal = () => {
    openModal(EmptyDataModal, {
      modalId: "emptyDataModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        //window.close();
      },
    });
  };

  // 추가 완료 모달
  const insertCompletedModal = () => {
    openModal(InsertCompletedModal, {
      modalId: "InsertCompletedModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
        // 이전 창 새로 고침
        if (window.opener) {
          window.opener.location.reload();
        }
      },
    });
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="faq 제목을 입력하세요"
            />
          </Box>
        </Stack>
        <Box width={"98%"} height={"90%"} margin={1}>
          <TextArea
            height="400px"
            resize="none"
            ref={faqRef}
            placeholder="FAQ 내용을 입력하세요"
            onChange={(e) => {
              setContent(e.target.value); // 상태 업데이트
            }}
            onBlur={() => {
              const currentValue = faqRef.current?.value || ""; // ref 값 가져오기
              setContent(currentValue); // 상태 업데이트
              console.log("포커스 잃음, ref 값:", currentValue); // 콘솔 출력
            }}
          />
        </Box>
        <Stack
          justifyContent={"end"}
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
        >
          <Stack direction={"row"} gap={1} margin={1}>
            <BasicButton onClick={handleInsert}>저장</BasicButton>
            <BasicButton onClick={() => window.close()}>닫기</BasicButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
