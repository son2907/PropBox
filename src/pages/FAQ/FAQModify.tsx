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
import useModal from "../../hooks/useModal";
import { useAuthStore } from "../../stores/authStore";
import { ConfirmDeleteModal } from "../../components/Modal/modal/ConfirmDeleteModal";
import { EmptyDataModal } from "../../components/Modal/modal/EmptyDataModal";
import { UpdateCompletedModal } from "../../components/Modal/modal/UpdateCompletedModal";
import { DeleteCompletedModal } from "../../components/Modal/modal/DeleteCompletedModal";
import { useForm } from "react-hook-form";
import { deleteFaq, updateFaq, useFaqDetail } from "../../api/faq";
import { FaqDeleteType } from "../../types/faq";

interface FormData {
  title: string;
  content: string;
}

export default function FAQModify() {
  //팝업 페이지에서 id를 가져오려면 window.location.search를 사용하여 파라미터를 파싱
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  console.log("id : ", id);

  //모달
  const { openModal, closeModal } = useModal();

  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);
  //faq 상세조회
  const { isSuccess, data } = useFaqDetail(id || "");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { register, handleSubmit, getValues, reset } = useForm<FormData>();
  const { mutate: deleteFaqAPI } = deleteFaq();

  // 여러개선택
  const {
    selectedRows: useSelectedRows,
    toggleRowsSelection: toggleUseRowsSelection,
  } = useMultiRowSelection();

  const FAQModify = {
    url: PathConstants.FAQ.FAQModify,
    windowName: "FAQ 수정",
  };

  // 이 ref를 통해 textArea에 입력된 값에 접근할 수 있음
  const faqRef = useRef<HTMLTextAreaElement>(null); // textArea에 연결해 줄 ref

  // 시작 날짜
  const [startDate, setStartDate] = useState<Date>(new Date());
  // 끝 날짜
  const [endDate, setEndDate] = useState<Date>(new Date());

  //모달
  const confirmDeleteModal = () => {
    openModal(ConfirmDeleteModal, {
      modalId: "noticeDelete",
      stack: false, //단일 모달 모드
      onClose: () => closeModal,
      onSubmit: () => {
        handleDelete();
      },
    });
  };

  //입력한 값이 없을때
  const emptyDataModal = () => {
    openModal(EmptyDataModal, {
      modalId: "emptyDataModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
      },
    });
  };

  //수정 완료 모달
  const updateCompletedModal = () => {
    openModal(UpdateCompletedModal, {
      modalId: "UpdateCompletedModal",
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

  const deleteCompletedModal = () => {
    openModal(DeleteCompletedModal, {
      modalId: "deleteCompleted",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
      },
    });
  };

  useEffect(() => {
    console.log("data확인", data);
    if (data?.data.contents) {
      if (data.data.contents) {
        const currentDetail = data.data.contents;
        //제목 및 내용 설정
        const textArea = faqRef.current;
        if (textArea) {
          textArea.value = data.data.contents.faqCn; //내용 설정
        }
        setTitle(data.data.contents.faqSj);
      }
    }
  }, [data, isSuccess]);

  // 필요한 데이터를 준비
  const faqUpdateReqData = {
    body: {
      faqNo: id || "", //공지사항 번호
      faqSj: title, //공지사항 제목
      faqCn: content, //공지사항 내용
      userId: loginId,
    },
  };

  //수정 api 호출
  const { mutate: updateNoticeAPI } = updateFaq(faqUpdateReqData);

  // 저장 버튼 클릭 시 API 호출
  const handleUpdate = () => {
    console.log("데이터 확인", faqUpdateReqData);
    // API 호출 실행
    if (faqUpdateReqData.body.faqSj && faqUpdateReqData.body.faqCn) {
      updateNoticeAPI(faqUpdateReqData, {
        onSuccess: (response) => {
          console.log("faq 수정 성공!");
          // 추가 동작: 팝업 닫기 또는 알림 표시 등
          if (response.data.result === "SUCCESS") {
            console.log("수정완");
            updateCompletedModal();
          } else {
            console.warn("result가 SUCCESS가 아닙니다.");
          }
        },
        onError: (error) => {
          console.error("faq 수정 실패:", error);
        },
      });
    } else {
      emptyDataModal();
    }
  };

  const handleDelete = () => {
    if (!id) {
      console.log("id 값이 존재하지 않습니다.");
      return;
    }

    const idArray = id.split(","); // 쉼표 기준으로 문자열을 배열로 분리
    console.log("id 배열: ", idArray);

    // 필요한 데이터 양식으로 준비
    const deleteData: FaqDeleteType = idArray.map((faqNo) => ({
      faqNo: faqNo,
      faqSj: "", // 현재 제목 상태값
      faqCn: "", // 현재 내용 상태값
      userId: loginId || "", // 사용자 ID
    }));

    console.log("삭제 요청 데이터: ", deleteData);

    deleteFaqAPI(
      { body: deleteData },
      {
        onSuccess: (response) => {
          console.log("공지사항 삭제 성공!", response);
          // 성공 시 추가 동작: 팝업 닫기 및 부모 창 새로 고침
          deleteCompletedModal();
          if (window.opener) {
            window.opener.location.reload();
          }
        },
        onError: (error) => {
          console.error("faq 삭제 실패:", error);
        },
      }
    );
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
            />
          </Box>
        </Stack>
        <Box width={"98%"} height={"90%"} margin={1}>
          <TextArea
            height="400px"
            resize="none"
            ref={faqRef}
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
            <BasicButton onClick={confirmDeleteModal}>
              <IconButton color="error">
                <RiDeleteBinLine />
              </IconButton>
            </BasicButton>
          </Stack>
          <Stack direction={"row"} gap={1} margin={1}>
            <BasicButton onClick={handleUpdate}>저장</BasicButton>
            <BasicButton onClick={() => window.close()}>닫기</BasicButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
