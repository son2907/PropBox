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
import { useEffect, useRef, useState } from "react";
import { openPopup } from "../../utils/openPopup";
import api from "../../api";
import { NoticeListType } from "../../api/noticeList";
import { useAuthStore } from "../../stores/authStore";
import useModal from "../../hooks/useModal";
import { ConfirmMultipleDeletionModal } from "../../components/layout/modal/ConfirmMultipleDeletionModal";
import { deleteNotice } from "../../api/noticeDelete";
import { DeleteCompletedModal } from "../../components/layout/modal/DeleteCompletedModal";
import { EmptySelectModal } from "../../components/layout/modal/EmptySelectModal";

export default function NoticeList() {
  // 구성원 1002015, 사용자 1002010, 시스템관리자 1002005
  // 시스템 관리자일경우 구분
  const { userConstntSeCd } = useAuthStore(["userConstntSeCd"]);

  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리
  const [searchInput, setSearchInput] = useState(""); // 검색 입력값 상태 관리

  //공지사항 목록 가져오기
  const { isSuccess, data } = api.NoticeList.useNoticeList(searchQuery);
  const [noticeList, setNoticeList] = useState<NoticeListType[]>([]);

  //api 호출을 위한 id호출
  const { loginId } = useAuthStore(["loginId"]);

  // 제목과 내용 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //모달
  const { openModal, closeModal } = useModal();

  //여러개 삭제 api
  const deleteFAQMutation = deleteNotice(); // Hook 호출

  //공지사항 api 호출
  useEffect(() => {
    if (data?.data?.contents) {
      setNoticeList(data.data.contents);
      const noticeCo = data.data.contents.map((item) => item.noticeNo);
      console.log("상태", data.data.contents);
    }
  }, [data, isSuccess, searchQuery]);

  const formatNoticeList = noticeList.map((item) => ({
    id: item.noticeNo,
    noticeNo: item.noticeNo,
    noticeSj: item.noticeSj, //제목
    noticeCn: item.regDe, //등록일
  }));

  // 여러개선택
  const {
    selectedRows: useSelectedRows,
    toggleRowsSelection: toggleUseRowsSelection,
  } = useMultiRowSelection();

  // 선택된 항목 감지 및 로그 출력
  useEffect(() => {
    // Set을 배열로 변환
    const selectedData = Array.from(useSelectedRows).map(
      (selectedId: string) => {
        // formatNoticeList에서 선택된 ID에 해당하는 항목 찾기
        const selectedItem = formatNoticeList.find(
          (item) => item.id === selectedId
        );
        return {
          id: selectedItem?.id || "",
          noticeNo: selectedItem?.noticeNo || "",
          noticeSj: selectedItem?.noticeSj || "",
          noticeCn: selectedItem?.noticeCn, // 로그인 정보 추가
        };
      }
    );

    // 선택된 데이터를 콘솔에 출력
    console.log("선택된 항목 데이터:", selectedData);
  }, [useSelectedRows, formatNoticeList, loginId]);

  //여러개 삭제시 모달
  const confirmMultipleDeletionModal = () => {
    const selectedData = Array.from(useSelectedRows).map(
      (selectedId: string) => {
        const selectedItem = formatNoticeList.find(
          (item) => item.id === selectedId
        );
        return selectedItem;
      }
    );

    const itemCount = selectedData.length;

    console.log("선택갯수", itemCount);

    if (itemCount > 0) {
      openModal(ConfirmMultipleDeletionModal, {
        modalId: "deleteModal",
        stack: false,
        itemCount,
        onClose: () => closeModal,
        onSubmit: () => {
          handleDelete();
        },
      });
    } else {
      emptySelectionModal();
    }
  };

  //삭제 완료 모달
  const deleteCompletedModal = () => {
    openModal(DeleteCompletedModal, {
      modalId: "deleteCompleted",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        //window.close();
      },
    });
  };

  const emptySelectionModal = () => {
    openModal(EmptySelectModal, {
      modalId: "emptySelectModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        //window.close();
      },
    });
  };

  const handleDelete = () => {
    const selectedData = Array.from(useSelectedRows).map(
      (selectedId: string) => {
        const selectedItem = formatNoticeList.find(
          (item) => item.id === selectedId
        );
        return {
          noticeNo: selectedItem?.id || "",
          noticeSj: selectedItem?.noticeSj || "",
          noticeCn: selectedItem?.noticeCn || "",
          popupYn: "",
          popupBgnde: "",
          popupEndde: "",
          regDe: "",
          userId: loginId,
        };
      }
    );

    deleteFAQMutation.mutate(
      { body: selectedData },
      {
        onSuccess: () => {
          console.log("삭제 성공");
          deleteCompletedModal();
          setNoticeList((prevNoticeList) =>
            prevNoticeList.filter(
              (notice) =>
                !selectedData.some(
                  (delItem) => delItem.noticeNo === notice.noticeNo
                )
            )
          );
        },
        onError: (error) => {
          console.error("삭제 실패:", error);
        },
      }
    );
  };

  const NoticeList = {
    url: PathConstants.Notice.NoticeList,
    windowName: "공지사항",
  };

  //공지사항 등록
  const NoticeAdd = {
    url: PathConstants.Notice.NoticeAdd,
    windowName: "공지사항 등록",
    windowFeatures: "width=700,height=500,scrollbars=yes,resizable=yes",
  };

  //공지사항 상세보기
  const NoticeDetail = {
    url: PathConstants.Notice.NoticeDetail,
    windowName: "공지사항 상세보기",
    windowFeatures: "width=700,height=500,scrollbars=yes,resizable=yes",
  };

  //공지사항 상세보기
  const NoticeModify = {
    url: PathConstants.Notice.NoticeModify,
    windowName: "공지사항 수정",
    windowFeatures: "width=700,height=500,scrollbars=yes,resizable=yes",
  };

  const handleSearch = () => {
    setSearchQuery(searchInput); // 검색어 업데이트
    console.log("검색 실행:", searchQuery);
    // 검색 로직 추가 (API 호출)
  };

  return (
    <>
      <Stack bgcolor={"white"} width={"100%"} height={"100%"}>
        <Stack
          direction={"row"}
          padding={1}
          justifyContent={"space-between"}
          width={"100%"}
          height={"10%"}
        >
          <Box>
            <SearchInput
              placeholder="공지사항 검색"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)} // 검색어 입력값 업데이트
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(); // 검색 실행 함수 호출
                }
              }}
            ></SearchInput>
          </Box>
          <Box>
            {userConstntSeCd === "1002005" && (
              <>
                <BasicButton
                  sx={{ color: "primary.main", borderColor: "primary.main" }}
                  onClick={confirmMultipleDeletionModal}
                >
                  선택삭제
                </BasicButton>
                <BasicButton
                  sx={{
                    marginLeft: 1,
                    color: "primary.main",
                    borderColor: "primary.main",
                  }}
                  onClick={() => {
                    openPopup({
                      url: NoticeAdd.url,
                      windowName: NoticeAdd.windowName,
                      windowFeatures: NoticeAdd.windowFeatures,
                    });
                  }}
                >
                  <Stack
                    alignItems={"center"}
                    justifyContent={"center"}
                    direction={"row"}
                    gap={1}
                  >
                    <Typography color="primary.main">글쓰기</Typography>
                    <IoIosAddCircleOutline size={"24px"} />
                  </Stack>
                </BasicButton>
              </>
            )}
          </Box>
        </Stack>
        <Box width={"100%"} height={"90%"}>
          <TableBox>
            <TableBox.Inner>
              <CheckboxTable
                data={formatNoticeList}
                selectedRows={useSelectedRows}
                toggleRowsSelection={toggleUseRowsSelection}
              >
                <CheckboxTable.Thead>
                  <CheckboxTable.Tr>
                    <CheckboxTable.CheckboxTh keyName="noticeNo" />
                    <CheckboxTable.Th>제목</CheckboxTable.Th>
                    <CheckboxTable.Th>작성일</CheckboxTable.Th>
                    <CheckboxTable.Th>상세보기</CheckboxTable.Th>
                  </CheckboxTable.Tr>
                </CheckboxTable.Thead>

                <CheckboxTable.Tbody>
                  {formatNoticeList.map((item) => (
                    <CheckboxTable.Tr key={item.id} id={item.id}>
                      <CheckboxTable.CheckboxTd
                        item={item}
                        keyName="noticeNo"
                      />
                      <CheckboxTable.Td>{item.noticeSj}</CheckboxTable.Td>
                      <CheckboxTable.Td>{item.noticeSj}</CheckboxTable.Td>
                      <CheckboxTable.Td>
                        <BasicButton
                          onClick={() => {
                            if (userConstntSeCd === "1002005") {
                              openPopup({
                                url: `${NoticeModify.url}?id=${item.noticeNo}`,
                                windowName: NoticeModify.windowName,
                                windowFeatures: NoticeModify.windowFeatures,
                              });
                            } else {
                              openPopup({
                                url: `${NoticeDetail.url}?id=${item.noticeNo}`,
                                windowName: NoticeDetail.windowName,
                                windowFeatures: NoticeDetail.windowFeatures,
                              });
                            }
                          }}
                        >
                          상세보기
                        </BasicButton>
                      </CheckboxTable.Td>
                    </CheckboxTable.Tr>
                  ))}
                </CheckboxTable.Tbody>
              </CheckboxTable>
            </TableBox.Inner>
          </TableBox>
        </Box>
      </Stack>
    </>
  );
}
