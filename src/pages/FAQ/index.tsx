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
import { useAuthStore } from "../../stores/authStore";
import api from "../../api";
import useModal from "../../hooks/useModal";
import { ConfirmMultipleDeletionModal } from "../../components/layout/modal/ConfirmMultipleDeletionModal";
import { EmptySelectModal } from "../../components/layout/modal/EmptySelectModal";
import { deleteFaq } from "../../api/faq";
import { DeleteCompletedModal } from "../../components/layout/modal/DeleteCompletedModal";

export default function FAQList() {
  // 구성원 1002015, 사용자 1002010, 시스템관리자 1002005
  // 시스템 관리자일경우 구분
  const { userConstntSeCd } = useAuthStore(["userConstntSeCd"]);

  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리
  const [searchInput, setSearchInput] = useState(""); // 검색 입력값 상태 관리

  //faq 목록 가져오기
  const { isSuccess, data } = api.FAQ.useFaqList(searchQuery);

  //api 호출을 위한 id호출
  const { loginId } = useAuthStore(["loginId"]);

  //여러개 삭제 api
  const deleteFAQMutation = deleteFaq(); // Hook 호출

  // 제목과 내용 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //모달
  const { openModal, closeModal } = useModal();

  // 여러개선택
  const {
    selectedRows: useSelectedRows,
    toggleRowsSelection: toggleUseRowsSelection,
  } = useMultiRowSelection();

  const faqList = {
    url: PathConstants.FAQ.FAQList,
    windowName: "FAQ",
  };

  //공지사항 등록
  const faqAdd = {
    url: PathConstants.FAQ.FAQAdd,
    windowName: "FAQ 등록",
    windowFeatures: "width=570,height=500,scrollbars=yes,resizable=yes",
  };

  //공지사항 상세보기
  const faqDetail = {
    url: PathConstants.FAQ.FAQDetail,
    windowName: "FAQ 상세보기",
    windowFeatures: "width=570,height=500,scrollbars=yes,resizable=yes",
  };

  //공지사항 상세보기
  const faqModify = {
    url: PathConstants.FAQ.FAQModify,
    windowName: "FAQ 수정",
    windowFeatures: "width=570,height=500,scrollbars=yes,resizable=yes",
  };

  const handleSearch = () => {
    setSearchQuery(searchInput); // 검색어 업데이트
    console.log("검색 실행:", searchQuery);
    // 검색 로직 추가 (API 호출)
  };

  // 선택된 항목 감지 및 로그 출력
  useEffect(() => {
    // Set을 배열로 변환
    const selectedData = Array.from(useSelectedRows).map(
      (selectedId: string) => {
        // formatNoticeList에서 선택된 ID에 해당하는 항목 찾기
        const selectedItem = data?.data?.contents.find(
          (item) => item.faqNo === selectedId
        );
        return {
          faqNo: selectedItem?.faqNo || "",
          faqSj: selectedItem?.faqSj || "",
          faqCn: selectedItem?.faqCn, // 로그인 정보 추가
        };
      }
    );

    // 선택된 데이터를 콘솔에 출력
    console.log("선택된 항목 데이터:", selectedData);
  }, [useSelectedRows, data?.data.contents, loginId]);

  //여러개 삭제시 모달
  const confirmMultipleDeletionModal = () => {
    const selectedData = Array.from(useSelectedRows).map(
      (selectedId: string) => {
        const selectedItem = data?.data.contents.find(
          (item) => item.faqNo === selectedId
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

  const handleDelete = () => {
    const selectedData = Array.from(useSelectedRows).map(
      (selectedId: string) => {
        const selectedItem = data?.data?.contents.find(
          (item) => item.faqNo === selectedId
        );
        return {
          faqNo: selectedItem?.faqNo || "",
          faqSj: selectedItem?.faqSj || "",
          faqCn: "",
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
          // setNoticeList((prevNoticeList) =>
          //   prevNoticeList.filter(
          //     (notice) =>
          //       !selectedData.some(
          //         (delItem) => delItem.noticeNo === notice.noticeNo
          //       )
          //   )
          // );
        },
        onError: (error) => {
          console.error("삭제 실패:", error);
        },
      }
    );
  };

  const emptySelectionModal = () => {
    openModal(EmptySelectModal, {
      modalId: "emptySelectModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
      },
    });
  };

  //삭제 완료 모달
  const deleteCompletedModal = () => {
    openModal(DeleteCompletedModal, {
      modalId: "deleteCompleted",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        //window.close();
        window.location.reload();
      },
    });
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
              placeholder="FAQ 검색"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)} // 검색어 입력값 업데이트
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(); // 검색 실행 함수 호출
                }
              }}
            />
          </Box>
          {userConstntSeCd === "1002005" && (
            <>
              <Box>
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
                      url: faqAdd.url,
                      windowName: faqAdd.windowName,
                      windowFeatures: faqAdd.windowFeatures,
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
              </Box>
            </>
          )}
        </Stack>
        <Box width={"100%"} height={"90%"}>
          <TableBox>
            <TableBox.Inner>
              <CheckboxTable
                data={data?.data?.contents || []}
                selectedRows={useSelectedRows}
                toggleRowsSelection={toggleUseRowsSelection}
              >
                <CheckboxTable.Thead>
                  <CheckboxTable.Tr>
                    <CheckboxTable.CheckboxTh keyName="faqNo" />
                    <CheckboxTable.Th>제목</CheckboxTable.Th>
                    <CheckboxTable.Th>작성일</CheckboxTable.Th>
                    <CheckboxTable.Th>상세보기</CheckboxTable.Th>
                  </CheckboxTable.Tr>
                </CheckboxTable.Thead>

                <CheckboxTable.Tbody>
                  {(data?.data?.contents || []).map((item) => (
                    <CheckboxTable.Tr key={item.faqNo} id={item.faqNo}>
                      <CheckboxTable.CheckboxTd
                        item={item}
                        keyName="faqNo" />
                      <CheckboxTable.Td>{item.faqSj}</CheckboxTable.Td>
                      <CheckboxTable.Td>{item.faqCn}</CheckboxTable.Td>
                      <CheckboxTable.Td>
                        <BasicButton
                          onClick={() => {
                            if (userConstntSeCd === "1002005") {
                              openPopup({
                                url: `${faqModify.url}?id=${item.faqNo}`,
                                windowName: faqModify.windowName,
                                windowFeatures: faqModify.windowFeatures,
                              });
                            } else {
                              openPopup({
                                url: `${faqDetail.url}?id=${item.faqNo}`,
                                windowName: faqDetail.windowName,
                                windowFeatures: faqDetail.windowFeatures,
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
