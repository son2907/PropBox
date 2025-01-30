import { Box, IconButton, Pagination, Stack, Typography } from "@mui/material";
import GroupInfo from "../../CustomerManagement/Registration/GroupInfo";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicInput from "../../../components/Input/BasicInput";
import { Select } from "../../../components/Select";
import { selectTestData, tableTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import CustomerInfo from "../../CustomerManagement/Registration/CustomerInfo";
import { useEffect, useState } from "react";
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { usePagination } from "../../../hooks/usePagination";
import TableSelect from "../../../components/Select/TableSelect";
import { RiDeleteBinLine } from "react-icons/ri";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import api from "../../../api";
import { deleteUser, userNonPermissionRegistration, userPermissionRegistration, userSolutionCount, useUserNonPermissionSolution, useUserPermitSolution } from "../../../api/userList";
import { useAuthStore } from "../../../stores/authStore";
import useModal from "../../../hooks/useModal";
import { ConfirmDeleteModal } from "../../../components/layout/modal/ConfirmDeleteModal";
import { DeleteCompletedModal } from "../../../components/layout/modal/DeleteCompletedModal";
import { UserListType, UserNonPermissionSolutionType, UserPermitSolutionType } from "../../../types/userList";

export default function Registration() {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리
  const [searchInput, setSearchInput] = useState(""); // 검색 입력값 상태 관리

  const [state, setState] = useState("insert");

  //사용자 목록 가져오기
  const { isSuccess, data } = api.UserList.useUserList(searchQuery);
  const [userList, setUserList] = useState<UserListType[]>([]);

  //사용자 허가 솔루션 목록 가져오기
  const [userSelectRow, setSelectRow] = useState(""); //사용자 허가 솔루션을 가져오기위한 id
  const [userPermitSolution, setUserPermitSolution] = useState<UserPermitSolutionType[]>([]);
  const { data: userPermitSolutionData, refetch: refetchPermitSolution } = useUserPermitSolution(userSelectRow);
  const [solutionCounts, setSolutionCounts] = useState<Record<string, string>>({}); // 각 행의 solutionCount 관리
  const [userNo, setUserNo] = useState("");
  const [solutionId, setSolutionId] = useState("");
  const [userId, setUserId] = useState("");
  const [solutionTotalCount, setSolutionTotalCount] = useState("");

  //사용자 미허가 솔루션 목록 가져오기
  const [userNonPermitSolution, setUserNonPermitSolution] = useState<UserNonPermissionSolutionType[]>([]);
  const { data: userNonPermitSolutionData, refetch: refetchNonPermitSolution, } = useUserNonPermissionSolution(userSelectRow);

  const permissionRegistration = userPermissionRegistration();
  const nonPermissionRegistration = userNonPermissionRegistration();
  //솔루션 전체 갯수를 수정할 경우 필요한 데이터
  const solutionTotalData = {
    body: {
      userNo: userNo,
      slutnId: solutionId,
      userlisneCnt: solutionTotalCount,
      userId: userId,
    }
  };

  //사용자 삭제를 위한 데이터
  const userDeleteData = {
    body: {
      userNo: userSelectRow,
      userNm: "",
      loginId: "",
      constntUserNo: "",
      pwdNo: "",
      mbtlNo: "",
      cmpnm: "",
      bizrno: "",
      rprsntvNm: "",
      adres1: "",
      adres2: "",
      reprsntTelno: "",
      userId: "",
    }
  };

  //api 호출을 위한 id호출
  const { loginId } = useAuthStore(["loginId"]);
  const { mutate: userSolutionCountAPI } = userSolutionCount(solutionTotalData);

  const userDelete = deleteUser();
  const { mutate: userDeleteAPI } = deleteUser();

  //모달
  const { openModal, closeModal } = useModal();
  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );

  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  //useMultiRowSelection 분리해서 각 테이블에 독립적으로 selectedRows와 toggleRowsSelection을 전달하여 동작이 분리되도록 설정.
  // 사용자 허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: authorizedSelectedRows,
    toggleRowsSelection: toggleAuthorizedRowsSelection,
  } = useMultiRowSelection();

  // 사용자 미허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: unauthorizedSelectedRows,
    toggleRowsSelection: toggleUnauthorizedRowsSelection,
  } = useMultiRowSelection();

  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함

  // usePagination에
  const { currentPage, onChangePage } = usePagination();

  //사용자 추가 팝업
  const uploadUser = {
    url: PathConstants.System.UserUpload,
    windowName: "사용자 등록 및 수정",
    windowFeatures: "width=700,height=700,scrollbars=yes,resizable=yes",
  };

  //사용자 추가 팝업
  const updataeUser = {
    url: PathConstants.System.UpdateUser,
    windowName: "사용자 수정",
    windowFeatures: "width=700,height=700,scrollbars=yes,resizable=yes",
  };

  //모달
  const confirmDeleteModal = (userNo: string) => {
    console.log("userNo?:", userNo)
    setSelectRow(userNo); // 선택된 사용자 저장
    openModal(ConfirmDeleteModal, {
      modalId: "noticeDelete",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        handleDeleteUser(userNo); // 저장된 userSelectRow를 사용하여 삭제
      },
    });
  };

  const deleteCompletedModal = () => {
    openModal(DeleteCompletedModal, {
      modalId: "deleteCompleted",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.location.reload();
      }
    })
  }

  //이벤트 발생시 동작

  useEffect(() => {
    if (data?.data.contents) {
      setUserList(data.data.contents);
      //console.log("사용자 데이터 확인 : ", data.data.contents);
    }
  }, [data, isSuccess, searchQuery]);

  const handleSearch = () => {
    setSearchQuery(searchInput); // 검색어 업데이트
    //console.log("검색 실행:", searchQuery);
    // 검색 로직 추가 (API 호출)
  };

  useEffect(() => {
    if (userPermitSolutionData?.data.contents) {
      setUserPermitSolution(userPermitSolutionData.data.contents);

      //console.log("선택된 id : ", userSelectRow);
      //console.log("그리고 나온 데이터 : ", userPermitSolutionData)
    }
  }, [userPermitSolutionData, userSelectRow]);

  useEffect(() => {
    if (userNonPermitSolutionData?.data.contents) {
      setUserNonPermitSolution(userNonPermitSolutionData.data.contents);
    }
  }, [userSelectRow, userNonPermitSolutionData]);

  // 각 입력값 변경 핸들러
  const handleSolutionCountChange = (slutnId: string, value: string) => {
    setSolutionCounts((prev) => ({
      ...prev,
      [slutnId]: value, // slutnId를 키로 사용하여 각 행의 값 저장
    }));
  };

  // 조회 버튼 클릭 시 데이터 출력
  const handleCheckSolutionData = () => {
    const updatedData = userPermitSolution.map((item) => {
      const updatedCount = solutionCounts[item.slutnId] || ""; // 변경된 값이 있으면 가져옴
      return {
        ...item,
        updatedCount,
      };
    });

    updatedData.forEach((item) => {
      if (item.updatedCount) {
        console.log("변경된 데이터:");
        console.log("slutnId:", item.slutnId);
        console.log("userNo:", userSelectRow); // 선택된 사용자 ID
        console.log("userlisneCnt:", item.updatedCount);
        console.log("userId:", item.userId); // item에 userID 포함 여부 확인 필요

        const solutionTotalData = {
          body: {
            userNo: userSelectRow,
            slutnId: item.slutnId,
            userlisneCnt: item.updatedCount,
            userId: loginId,
          },
        };

        console.log("body:", solutionTotalData);

        userSolutionCountAPI(solutionTotalData, {
          onSuccess: (response) => {
            console.log("API 호출 성공:", response);
            // 성공 처리 로직
            if (response.data.message === "SUCCESS") {
              //window.location.reload();
              console.log("response", response.data);
            }
          },
          onError: (error) => {
            console.error("API 호출 실패:", error);
            // 에러 처리 로직 추가
          },
        });
      }
    });
  };

  const handleSubmit = () => {
    // 선택된 데이터 추출 및 변환
    const userList = Array.from(unauthorizedSelectedRows).map((rowId) => {
      const selectedItem = userNonPermitSolution.find(
        (item) => item.slutnId === rowId
      );
      return {
        slutnId: selectedItem?.slutnId || "",
        userNo: userSelectRow, // 필요한 경우 API에서 userNo 데이터 확인
        lisneCnt: "1",
        useYn: "",
        delYn: "",
        rmk: "",
        userId: "",
      };
    });

    // API 호출 데이터 생성
    const requestData = {
      userList,
      userId: "", // 현재 사용자 ID (필요시 추가 로직 구현)
    };

    // 생성된 데이터 콘솔 출력
    console.log("API 호출 전에 생성된 데이터:", requestData);

    // API 호출
    permissionRegistration.mutate(
      { body: requestData },
      {
        onSuccess: (response) => {
          console.log("이동성공");
          if (response.data.result === "SUCCESS") {
            console.log("response.data", response.data);
            refetchPermitSolution();
          }
        },
        onError: (error) => {
          console.error("이동 실패:", error);
        },
      }
    );
  };

  const handleNonPerSubmit = () => {
    const userList = Array.from(authorizedSelectedRows).map((rowId) => {
      const selectedItem = userPermitSolution.find(
        (item) => item.slutnId === rowId
      );
      return {
        slutnId: selectedItem?.slutnId || "",
        userNo: userSelectRow, // 필요한 경우 API에서 userNo 데이터 확인
        lisneCnt: "1",
        useYn: "",
        delYn: "",
        rmk: "",
        userId: "",
      };
    });

    // API 호출 데이터 생성
    const requestData = {
      userList,
      userId: "", // 현재 사용자 ID (필요시 추가 로직 구현)
    };

    // 생성된 데이터 콘솔 출력
    console.log("API 호출 전에 생성된 데이터:", requestData);

    // API 호출
    nonPermissionRegistration.mutate(
      { body: requestData },
      {
        onSuccess: (response) => {
          console.log("이동성공");
          if (response.data.result === "SUCCESS") {
            console.log("response.data", response.data);
            refetchNonPermitSolution();
            refetchPermitSolution();
          }
        },
        onError: (error) => {
          console.error("이동 실패:", error);
        },
      }
    );
  };

  const handleDeleteUser = (userNo: string) => {
    console.log("삭제할 사용자 ID:", userNo);

    if (!userNo) {
      console.error("삭제할 사용자 ID가 없습니다.");
      return;
    }

    userDeleteAPI(userNo, {
      onSuccess: (response) => {
        if (response.data.message === "SUCCESS") {
          deleteCompletedModal();
          console.log("response", response.data);
        }
      },
      onError: (error) => {
        console.error("API 호출 실패:", error);
      },
    });
  };


  return (
    <>
      {/* 사용자 리스트 테이블 - 상단 테이블 */}
      <Stack width={"100%"} height={"100%"} gap={1}>
        <GrayBox gap={1} justifyContent={"space-between"}>
          <SearchInput
            placeholder="사용자이름 검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // 검색어 입력값 업데이트
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch(); // 검색 실행 함수 호출
              }
            }}
          />
          <Box gap={1}>
            <BasicButton
              onClick={() => {
                openPopup({
                  url: uploadUser.url,
                  windowName: uploadUser.windowName,
                  windowFeatures: uploadUser.windowFeatures,
                });
              }}
            >
              사용자추가
            </BasicButton>
          </Box>
        </GrayBox>
        <Stack width={"100%"} height={"95%"}>
          <Stack width={"100%"} height={"40%"}>
            <TableBox.Inner>
              <BasicTable data={data?.data?.contents || []}>
                <BasicTable.Th>사용자번호</BasicTable.Th>
                <BasicTable.Th>사용자이름</BasicTable.Th>
                <BasicTable.Th>휴대전화</BasicTable.Th>
                <BasicTable.Th>PREFIX</BasicTable.Th>
                <BasicTable.Th>회사이름</BasicTable.Th>
                <BasicTable.Th>사업자번호</BasicTable.Th>
                <BasicTable.Th>사용여부</BasicTable.Th>
                <BasicTable.Th>삭제</BasicTable.Th>
                <BasicTable.Th>수정</BasicTable.Th>
                <BasicTable.Tbody>
                  {(data?.data?.contents || []).map((item, index) => {
                    return (
                      <BasicTable.Tr
                        key={index}
                        isClicked={userSelectRow === item.userNo}
                        onClick={() => {
                          setState("update");
                          if (userSelectRow === item.userNo) {
                            // 동일 행을 클릭하면 선택 해제
                            setSelectRow("");
                            console.log("선택 해제");
                          } else {
                            // 다른 행 클릭 시 상태 업데이트
                            setSelectRow(item.userNo);
                            console.log("선택된 사용자 ID:", item.userNo);
                          }
                        }}
                      >
                        <BasicTable.Td>{item.userNo}</BasicTable.Td>
                        <BasicTable.Td>{item.userNm}</BasicTable.Td>
                        <BasicTable.Td>{item.attlistMbtlNo}</BasicTable.Td>
                        <BasicTable.Td>{item.loginIdPrefix}</BasicTable.Td>
                        <BasicTable.Td>{item.cmpnm}</BasicTable.Td>
                        <BasicTable.Td>{item.bizrno}</BasicTable.Td>
                        <BasicTable.Td>{item.useYn}</BasicTable.Td>
                        <BasicTable.Td>
                          <IconButton onClick={() => confirmDeleteModal(item.userNo)}>
                            <RiDeleteBinLine color="#f4475f" />
                          </IconButton>
                        </BasicTable.Td>
                        <BasicTable.Td>
                          <BasicButton
                            onClick={() => {
                              openPopup({
                                url: `${updataeUser.url}?id=${item.userNo}`,
                                windowName: updataeUser.windowName,
                                windowFeatures: updataeUser.windowFeatures,
                              });
                            }}
                          >
                            수정
                          </BasicButton>
                        </BasicTable.Td>
                      </BasicTable.Tr>
                    );
                  })}
                </BasicTable.Tbody>
              </BasicTable>
            </TableBox.Inner>
          </Stack>
          <Stack width={"100%"} height={"60%"}>
            <TableBox gap={1}>
              <Stack width={"69%"} height={"100%"} gap={1}>
                <GrayBox>
                  <Typography fontWeight={"bold"}>
                    사용자 허가 솔루션
                  </Typography>
                </GrayBox>
                <TableBox.Inner>
                  <CheckboxTable
                    data={userPermitSolutionData?.data?.contents || []}
                    selectedRows={authorizedSelectedRows}
                    toggleRowsSelection={toggleAuthorizedRowsSelection}
                  >
                    <CheckboxTable.Thead>
                      <CheckboxTable.Tr>
                        <CheckboxTable.CheckboxTh keyName="slutnId" />
                        <CheckboxTable.Th>솔루션ID</CheckboxTable.Th>
                        <CheckboxTable.Th>솔루션명</CheckboxTable.Th>
                        <CheckboxTable.Th>구분</CheckboxTable.Th>
                        <CheckboxTable.Th colSpan={3}>
                          라이선스
                        </CheckboxTable.Th>
                      </CheckboxTable.Tr>
                      <CheckboxTable.Tr>
                        <CheckboxTable.Th> </CheckboxTable.Th>
                        <CheckboxTable.Th> </CheckboxTable.Th>
                        <CheckboxTable.Th> </CheckboxTable.Th>
                        <CheckboxTable.Th> </CheckboxTable.Th>
                        <CheckboxTable.Th>전체</CheckboxTable.Th>
                        <CheckboxTable.Th>사용</CheckboxTable.Th>
                        <CheckboxTable.Th>잔여</CheckboxTable.Th>
                      </CheckboxTable.Tr>
                    </CheckboxTable.Thead>
                    <CheckboxTable.Tbody>
                      {(userPermitSolutionData?.data?.contents || []).map((item) => (
                        <CheckboxTable.Tr key={item.slutnId} id={item.slutnId}>
                          <CheckboxTable.CheckboxTd
                            item={item}
                            keyName="slutnId"
                          />
                          <CheckboxTable.Td>{item.slutnId}</CheckboxTable.Td>
                          <CheckboxTable.Td>{item.slutnNm}</CheckboxTable.Td>
                          <CheckboxTable.Td>{item.lisneSeNm}</CheckboxTable.Td>
                          <CheckboxTable.Td>
                            <BasicInput
                              placeholder={item.userlisneCnt}
                              value={solutionCounts[item.slutnId] || ""} // 현재 행의 입력값
                              onChange={(e) =>
                                handleSolutionCountChange(
                                  item.slutnId,
                                  e.target.value
                                )
                              } // 각 행의 상태 업데이트
                            />
                          </CheckboxTable.Td>
                          <CheckboxTable.Td>
                            {item.sptlisneCnt}
                          </CheckboxTable.Td>
                          <CheckboxTable.Td>{item.chrgcnt}</CheckboxTable.Td>
                        </CheckboxTable.Tr>
                      ))}
                    </CheckboxTable.Tbody>
                  </CheckboxTable>
                </TableBox.Inner>
                <GrayBox justifyContent={"end"} gap={1}>
                  <BasicButton onClick={handleCheckSolutionData}>
                    적용
                  </BasicButton>
                  <BasicButton onClick={() => refetchPermitSolution()}>새로고침</BasicButton>
                </GrayBox>
              </Stack>
              <Stack
                width={"2%"}
                bgcolor={"white"}
                justifyContent={"space-between"}
              >
                <BasicButton
                  sx={{
                    backgroundColor: "primary.A100",
                    height: "150px",
                    width: "100%",
                    padding: "0",
                    margin: "0",
                    minWidth: "unset", // 기본 minWidth 해제
                  }}
                  onClick={handleSubmit}
                >
                  <BiChevronLeft size={"24px"} />
                </BasicButton>
                <BasicButton
                  sx={{
                    backgroundColor: "primary.A100",
                    height: "150px",
                    width: "100%",
                    padding: "0",
                    margin: "0",
                    minWidth: "unset", // 기본 minWidth 해제
                  }}
                  onClick={handleNonPerSubmit}
                >
                  <BiChevronRight size={"24px"} />
                </BasicButton>
              </Stack>
              <Stack width={"29%"} height={"100%"} gap={1}>
                <GrayBox>
                  <Typography fontWeight={"bold"}>
                    사용자 미허가 솔루션
                  </Typography>
                </GrayBox>
                <TableBox.Inner>
                  <CheckboxTable
                    data={userNonPermitSolutionData?.data?.contents || []}
                    selectedRows={unauthorizedSelectedRows}
                    toggleRowsSelection={toggleUnauthorizedRowsSelection}
                  >
                    <CheckboxTable.Thead>
                      <CheckboxTable.Tr>
                        <CheckboxTable.CheckboxTh keyName="slutnId" />
                        <CheckboxTable.Th>솔루션ID</CheckboxTable.Th>
                        <CheckboxTable.Th>솔루션이름</CheckboxTable.Th>
                        <CheckboxTable.Th>구분</CheckboxTable.Th>
                        <CheckboxTable.Th>사용여부</CheckboxTable.Th>
                      </CheckboxTable.Tr>
                    </CheckboxTable.Thead>

                    <CheckboxTable.Tbody>
                      {(userNonPermitSolutionData?.data?.contents || []).map((item) => (
                        <CheckboxTable.Tr key={item.slutnId} id={item.slutnId}>
                          <CheckboxTable.CheckboxTd
                            item={item}
                            keyName="slutnId"
                          />
                          <CheckboxTable.Td>{item.slutnId}</CheckboxTable.Td>
                          <CheckboxTable.Td>{item.slutnNm}</CheckboxTable.Td>
                          <CheckboxTable.Td>{item.lisneSeNm}</CheckboxTable.Td>
                          <CheckboxTable.Td>{item.isOk}</CheckboxTable.Td>
                        </CheckboxTable.Tr>
                      ))}
                    </CheckboxTable.Tbody>
                  </CheckboxTable>
                </TableBox.Inner>
                <GrayBox>
                  <BasicButton
                    sx={{ marginLeft: "auto" }}
                    onClick={() => refetchNonPermitSolution()}
                  >
                    새로고침
                  </BasicButton>
                </GrayBox>
              </Stack>
            </TableBox>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
