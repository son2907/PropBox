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
import { useAuthStore } from "../../stores/authStore";
import { ConfirmDeleteModal } from "../../components/Modal/modal/ConfirmDeleteModal";
import useModal from "../../hooks/useModal";
import { DeleteCompletedModal } from "../../components/Modal/modal/DeleteCompletedModal";
import {
  deleteNotice,
  updateNotice,
  useNoticeDetail,
} from "../../api/noticeList";
import { deleteNoticeType, noticeDetailType } from "../../types/notice";
import { EmptyDataModal } from "../../components/Modal/modal/EmptyDataModal";
import { UpdateCompletedModal } from "../../components/Modal/modal/UpdateCompletedModal";

export default function NoticeModify() {
  const NoticeModify = {
    url: PathConstants.Notice.NoticeModify,
    windowName: "공지사항 수정",
  };

  //모달
  const { openModal, closeModal } = useModal();

  //팝업 페이지에서 id를 가져오려면 window.location.search를 사용하여 파라미터를 파싱
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  console.log("id : ", id);

  // 이 ref를 통해 textArea에 입력된 값에 접근할 수 있음
  const noticeRef = useRef<HTMLTextAreaElement>(null); // textArea에 연결해 줄 ref

  // useMutation 훅을 컴포넌트 최상위에서 호출
  const { mutate: deleteNoticeAPI } = deleteNotice();

  // 시작 날짜
  const [startDate, setStartDate] = useState<Date>(new Date());
  // 끝 날짜
  const [endDate, setEndDate] = useState<Date>(new Date());
  // 체크박스 상태
  const [isPopupChecked, setIsPopupChecked] = useState(false);
  // 날짜 읽기 전용 상태
  const [isReadOnly, setIsReadOnly] = useState(false);
  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

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
        //window.close();
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

  //------------공지사항 상세 가져옴-------------//
  const { isSuccess, data } = useNoticeDetail(id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log("data확인", data);
    if (data?.data.contents) {
      if (data.data.contents) {
        const currentDetail = data.data.contents;
        //제목 및 내용 설정
        const textArea = noticeRef.current;
        if (textArea) {
          textArea.value = data.data.contents.noticeCn; //내용 설정
        }
      }
    }
  }, [data, isSuccess]);

  //공지사항 상세를 불러와서 기간설정 출력
  useEffect(() => {
    if (data?.data.contents) {
      if (data.data.contents?.popupBgnde && data.data.contents.popupEndde) {
        const parseDate = (dateString: string) => {
          const year = parseInt(dateString.slice(0, 4), 10);
          const month = parseInt(dateString.slice(4, 6), 10) - 1; // JavaScript의 월은 0부터 시작
          const day = parseInt(dateString.slice(6, 8), 10);

          // 로컬 타임존으로 설정
          return new Date(year, month, day);
        };

        // 변환된 값을 startDate와 endDate에 설정
        setStartDate(parseDate(data.data.contents.popupBgnde));
        setEndDate(parseDate(data.data.contents.popupEndde));
      }

      // 내용 설정
      setContent(data.data.contents.noticeCn || "");
      setTitle(data.data.contents.noticeSj || "");
      // popupYn이 'Y'일 경우 체크박스 상태를 true로 설정
      setIsPopupChecked(data.data.contents.popupYn === "Y");
    }
    console.log("textArea", noticeRef);
  }, [data?.data.contents]);

  useEffect(() => {
    const today = new Date();
    const strippedEndDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );
    const strippedToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // endDate가 오늘 이전이면 읽기 전용 상태로 전환
    setIsReadOnly(strippedEndDate < strippedToday);
  }, [endDate]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsPopupChecked(isChecked);
    console.log("Popup checkbox state:", isChecked);
  };

  //-------------공지사항 수정---------------//
  // 필요한 데이터를 준비
  const noticeData = {
    body: {
      noticeNo: id || "", //공지사항 번호
      noticeSj: title, //공지사항 제목
      noticeCn: content, //공지사항 내용
      popupYn: isPopupChecked ? "Y" : "N", //팝업 여부
      popupBgnde: formatDate(startDate), // 팝업 유지 시작일
      popupEndde: formatDate(endDate), // 팝업 유지 종료일
      regDe: formatDate(new Date()), //등록일
      userId: loginId,
    },
  };

  //api 호출
  const { mutate: updateNoticeAPI } = updateNotice(noticeData);

  // 수정 버튼 클릭 시 API 호출
  const handleUpdate = () => {
    console.log("데이터 확인", noticeData);
    // API 호출 실행
    if (noticeData.body.noticeSj && noticeData.body.noticeCn) {
      updateNoticeAPI(noticeData, {
        onSuccess: (response) => {
          console.log("공지사항 수정 성공!");
          // 추가 동작: 팝업 닫기 또는 알림 표시 등
          if (response.data.result === "SUCCESS") {
            console.log("수정완");
            updateCompletedModal();
          } else {
            console.warn("result가 SUCCESS가 아닙니다.");
          }
        },
        onError: (error) => {
          console.error("공지사항 수정 실패:", error);
        },
      });
    } else {
      emptyDataModal();
    }
  };

  //----------삭제---------------
  const handleDelete = () => {
    if (!id) {
      console.log("id 값이 존재하지 않습니다.");
      return;
    }

    const idArray = id.split(","); // 쉼표 기준으로 문자열을 배열로 분리
    console.log("id 배열: ", idArray);

    // 필요한 데이터 양식으로 준비
    const deleteData: deleteNoticeType = idArray.map((noticeId) => ({
      noticeNo: noticeId,
      noticeSj: "", // 현재 제목 상태값
      noticeCn: "", // 현재 내용 상태값
      popupYn: "", // 팝업 여부
      popupBgnde: "", // 팝업 시작일
      popupEndde: "", // 팝업 종료일
      regDe: "", // 등록일
      userId: loginId || "", // 사용자 ID
    }));

    console.log("삭제 요청 데이터: ", deleteData);

    deleteNoticeAPI(
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
          console.error("공지사항 삭제 실패:", error);
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
            ></BasicInput>
          </Box>
        </Stack>
        <Box width={"98%"} height={"90%"} margin={1}>
          <TextArea
            height="400px"
            resize="none"
            ref={noticeRef}
            onChange={(e) => {
              setContent(e.target.value); // 상태 업데이트
            }}
            onBlur={() => {
              const currentValue = noticeRef.current?.value || ""; // ref 값 가져오기
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
                disabled={isReadOnly} // isReadOnly에 따라 체크박스 비활성화
              />
            </Stack>
          </Stack>
          <Stack direction={"row"} gap={1} margin={1}>
            <BasicButton onClick={handleUpdate}>저장</BasicButton>
            <BasicButton onClick={() => window.close()}>닫기</BasicButton>
            <BasicButton onClick={confirmDeleteModal}>
              <IconButton color="error">
                <RiDeleteBinLine />
              </IconButton>
            </BasicButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
