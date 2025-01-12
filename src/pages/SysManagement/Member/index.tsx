import { Box, Select, Stack, Typography } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { tableTestData } from "../../../utils/testData";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicInput from "../../../components/Input/BasicInput";
import { BasicButton, ToggleButton } from "../../../components/Button";
import useToggleButtton from "../../../hooks/useToggleButton";
import { useEffect, useState } from "react";
import { UserListType, useUserList } from "../../../api/userList";
import { MemberListType, useMemberList } from "../../../api/memberList";
import api from "../../../api";
import { memeberDetailType, useMemberDetail } from "../../../api/memberDetail";
import { useAuthStore } from "../../../stores/authStore";
import { updateMember } from "../../../api/memberUpdate";
import { insertMember } from "../../../api/memberInsert";
import { EmptyDataModal } from "../../../components/layout/modal/EmptyDataModal";
import { InsertCompletedModal } from "../../../components/layout/modal/InsertCompletedModal";
import { UpdateCompletedModal } from "../../../components/layout/modal/UpdateCompletedModal";
import useModal from "../../../hooks/useModal";
import { EmptySelectModal } from "../../../components/layout/modal/EmptySelectModal";
import { deleteMember } from "../../../api/membeDelete";
import { DeleteCompletedModal } from "../../../components/layout/modal/DeleteCompletedModal";
import { ConfirmDeleteModal } from "../../../components/layout/modal/ConfirmDeleteModal";

export default function MemberManagement() {

  //api를 호출하기위해 userID 불러오기
  const { loginId } = useAuthStore(["loginId"]);

  //모달
  const { openModal, closeModal } = useModal();

  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리
  const [searchInput, setSearchInput] = useState(""); // 검색 입력값 상태 관리
  const [isUpdate, setIsUpdate] = useState(false);

  //사용자 리스트
  //const { data: userListData, isLoading: isLoadingUserList } = useUserList(searchQuery);
  const { isSuccess, data } = api.UserList.useUserList(searchQuery);
  const [userList, setUserList] = useState<UserListType[]>([]);
  const [selectUserNo, setSelectUserNo] = useState("");
  const [selectMemberNo, setSelectMemberNo] = useState("");
  const [userId, setUserID] = useState("")

  //구성원 리스트
  const [memberList, setMember] = useState<MemberListType[]>([]);
  const { data: memberListData, isLoading: isLoadingMemeber } = useMemberList(selectUserNo);

  //구성원 상세
  const [memberDeatil, setMemberDetail] = useState<memeberDetailType | null>(null);
  const { data: memberDetailData, isSuccess: isMemberDetailData } = useMemberDetail(selectMemberNo);
  const [memberId, setMemberId] = useState("");
  const [memberPassword, setMemberPassword] = useState("")
  const [memberName, setMemberName] = useState("");
  const [isMemberUse, setIsMemberUse] = useState(true);
  const [memberRmk, setMemberRmk] = useState("");

  const userListTableData = userList.map((item) => ({
    userNo: item.userNo,
    userNm: item.userNm,
    attlistMbtlNo: item.attlistMbtlNo,
    loginIdPrefix: item.loginIdPrefix,
    loginId: item.loginId,
    cmpnm: item.cmpnm,
    bizrno: item.bizrno,
    rprsntvNm: item.rprsntvNm,
    adres1: item.adres1,
    adres2: item.adres2,
    reprsntTelno: item.reprsntTelno,
    useYn: item.useYn,
  }));

  const memberListTableData = memberList.map((item) => ({
    id: item.userNo,
    userNo: item.userNo,
    userNm: item.userNm,
    attlistMbtlNo: item.attlistMbtlNo,
    loginIdPrefix: item.loginIdPrefix,
    loginId: item.loginId,
    cmpnm: item.cmpnm,
    bizrno: item.attlistMbtlNo,
    rprsntvNm: item.reprsntTelno,
    adres1: item.adres1,
    adres2: item.adres2,
    reprsntTelno: item.reprsntTelno,
    useYn: item.useYn,
  }));

  //수정
  const memberUpdateReqData = {
    body: {
      userNo: selectMemberNo,
      userNm: memberName,
      loginId: memberId, // 기본값 지정,
      attlistUserNm: "",
      useYn: isMemberUse === true ? "Y" : "N",
      rmk: memberRmk,
      userId: ""
    }
  };

  //추가
  const memberInsertReqData = {
    body: {
      userNo: "",             //구성원 또는 사용자 번호
      userNm: memberName,             //이름
      loginId: memberId,            //로그인 아이디
      constntUserNo: selectUserNo,      //구성원 소유자 번호
      userConstntSeCd: "",    //사용자 구성원 구분 102000 
      loginIdPrefix: "",      //로그인 아이디 프리픽스
      attlistUserNm: "",      //별문자 사용자 명
      pwdNo: "",              //패스워드
      advrtsAgreYn: "",       //광고동의여부
      useYn: isMemberUse === true ? "Y" : "N",             //사용여부
      rmk: memberRmk,                //비고
      userId: ""              //등록 및 수정자
    }
  }




  const { mutate: updateMemberAPI } = updateMember(memberUpdateReqData); //수정
  const { mutate: insertMemberAPI } = insertMember(memberInsertReqData); //추가
  const { mutate: deleteMemberAPI } = deleteMember(selectMemberNo);

  //useMultiRowSelection 분리해서 각 테이블에 독립적으로 selectedRow와 toggleRowSelection을 전달하여 동작이 분리되도록 설정.
  // 사용자 리스트 - 선택 상태 관리
  const {
    selectedRow: userSelectedRow,
    toggleRowSelection: toggleUserRowSelection,
  } = useSingleRowSelection();

  // 구성원 리스트 - 선택 상태 관리
  const {
    selectedRow: memberSelectedRow,
    toggleRowSelection: toggleMemberRowSelection,
  } = useSingleRowSelection();


  const { toggle, onChange: setToggle } = useToggleButtton({
    defaultValue: true,
  });

  const handleMenuAdd = () => {
    setIsUpdate(false);
    setMemberId("");
    setMemberName("");
    setIsMemberUse(true);
    setMemberRmk("");
  };

  const handleMemberRowClick = (id: string) => {
    setIsUpdate(true);
    setSelectMemberNo((prevId) => {
      const newId = prevId === id ? "" : id; // 이미 선택된 ID면 해제
      console.log("선택한 메뉴 아이디:", newId); // 선택된 ID를 콘솔에 출력
      return newId;
    });
  }

  const handleSearch = () => {
    setSearchQuery(searchInput); // 검색어 업데이트
    //console.log("검색 실행:", searchQuery);
    // 검색 로직 추가 (API 호출)
  };

  //입력한 값이 없을때
  const emptyDataModal = () => {
    openModal(EmptyDataModal, {
      modalId: "emptyDataModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
      }
    });
  };

  const emptySelectionModal = () => {
    openModal(EmptySelectModal, {
      modalId: "emptySelectModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
      }
    });
  }

  // 추가 완료 모달
  const insertCompletedModal = () => {
    openModal(InsertCompletedModal, {
      modalId: "InsertCompletedModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.location.reload();
      }
    })
  };

  //수정 완료 모달
  const updateCompletedModal = () => {
    openModal(UpdateCompletedModal, {
      modalId: "UpdateCompletedModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.location.reload();
      }
    });
  };

  //삭제 완료 모달
  const deleteCompletedModal = () => {
    openModal(DeleteCompletedModal, {
      modalId: "deleteCompleted",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.location.reload();
      }
    });
  };

  //삭제를 묻는 모달
  const confirmDeletionModal = () => {
    if(selectMemberNo) {
      openModal(ConfirmDeleteModal, {
        modalId: "deleteModal",
        stack: false,
        onClose: () => closeModal,
        onSubmit: () => {
          handleDelete();
        }
      });
    } else {
      emptySelectionModal();
    }
    
  };

  useEffect(() => {
    if (memberListData?.data.contents) {
      setMember(memberListData.data.contents);
    }
  }, [selectUserNo, memberListData]);

  useEffect(() => {
    if (data?.data.contents) {
      setUserList(data.data.contents);
    }
  }, [data, isSuccess, searchQuery]);

  useEffect(() => {
    if (memberDetailData?.data.contents) {
      setMemberDetail(memberDetailData.data.contents);
      console.log("memberDetailData", memberDetailData.data.contents)
    }
  }, [memberDetailData, selectMemberNo]);

  useEffect(() => {
    if (memberDeatil) {
      setMemberId(memberDeatil.loginId);
      setMemberName(memberDeatil.userNm);
      setIsMemberUse(memberDeatil.useYn === "Y" ? true : false);
      setMemberRmk(memberDeatil.rmk);
    }
  }, [memberDeatil]);

  const handleMemberDetail = () => {
    console.log("상위 구성원 번호가 뭔가요 : ", selectMemberNo);
    console.log("구성원 추가인지 수정인지 false면 추가 true면 수정 : ", isUpdate);
    if (isUpdate) {
      console.log("구성원 수정을 위한 데이터 확인 : ", memberUpdateReqData);
      if (memberUpdateReqData) {
        updateMemberAPI(memberUpdateReqData, {
          onSuccess: (response) => {
            if (response.data.message === "SUCCESS") {
              console.log("대답", response.data);
              updateCompletedModal();
            } else {
              console.warn("result가 SUCCESS가 아닙니다.");
            }
          },
          onError: (error) => {
            console.error("공지사항 수정 실패:", error);
          },
        })
      }
    } else {
      console.log("구성원 추가를 위한 데이터 확인 : ", memberInsertReqData);
      if (memberInsertReqData.body.userNm && memberInsertReqData.body.loginId && memberInsertReqData.body.useYn) {
        insertMemberAPI(memberInsertReqData, {
          onSuccess: (response) => {
            if (response.data.message === "SUCCESS") {
              console.log("대답", response.data);
              insertCompletedModal();
            }
          }
        })
      } else {
        emptyDataModal();
        return;
      }
    }
  };

  const handleDelete = () => {
    console.log("상위 구성원 번호가 뭔가요 : ", selectMemberNo);
    if (selectMemberNo) {
      deleteMemberAPI(selectMemberNo, {
        onSuccess: (response) => {
          if (response.data.message === "SUCCESS") {
            console.log("대답", response.data);
            deleteCompletedModal();
          }
        }
      })
    } else {
      emptySelectionModal();
    }
  }

  return (
    <>
      <Stack width={"100%"}>
        <GrayBox width={"100%"} height={"4%"}>
          <SearchInput
            placeholder="사용자이름 검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // 검색어 입력값 업데이트
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch(); // 검색 실행 함수 호출
              }
            }}
          ></SearchInput>
        </GrayBox>
        <Stack direction={"row"} height={"96%"}>
          <Stack width={"50%"} minWidth={"800px"} bgcolor={"white"} overflow={"auto"} marginBottom={1}>
            <TableBox>
              <TableBox.Inner>
                <BasicTable data={userListTableData}>
                  <BasicTable.Th>사용자ID</BasicTable.Th>
                  <BasicTable.Th>사용자이름</BasicTable.Th>
                  <BasicTable.Th>PREFIX</BasicTable.Th>
                  <BasicTable.Th>사용여부</BasicTable.Th>
                  <BasicTable.Tbody>
                    {userListTableData.map((item, index) => {
                      return (
                        <BasicTable.Tr
                          key={index}
                          isClicked={selectUserNo === item.userNo}
                          onClick={() => {
                            if (selectUserNo === item.userNo) {
                              setSelectUserNo("");
                            } else {
                              setSelectUserNo(item.userNo);
                            }
                          }}
                        >
                          <BasicTable.Td>{item.loginId}</BasicTable.Td>
                          <BasicTable.Td>{item.userNm}</BasicTable.Td>
                          <BasicTable.Td>{item.loginIdPrefix}</BasicTable.Td>
                          <BasicTable.Td>{item.useYn}</BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </TableBox>
          </Stack>
          <Stack width={"50%"} minWidth={"800px"} bgcolor={"white"} marginLeft={1}>
            <TableBox>
              <TableBox.Inner>
                <BasicTable data={memberListTableData}>
                  <BasicTable.Th>구성원ID</BasicTable.Th>
                  <BasicTable.Th>구성원 번호</BasicTable.Th>
                  <BasicTable.Th>구성원이름</BasicTable.Th>
                  <BasicTable.Th>사용여부</BasicTable.Th>
                  <BasicTable.Tbody>
                    {memberListTableData.map((item, index) => {
                      return (
                        <BasicTable.Tr
                          key={index}
                          isClicked={selectMemberNo === item.userNo}
                          onClick={() => handleMemberRowClick(item.userNo)}
                        >
                          <BasicTable.Td>{item.loginId}</BasicTable.Td>
                          <BasicTable.Td>{item.userNo}</BasicTable.Td>
                          <BasicTable.Td>{item.userNm}</BasicTable.Td>
                          <BasicTable.Td>{item.useYn}</BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </TableBox>
            <GrayBox
              flexDirection={"column"}
              width={"100%"}
              height={"40%"}
              overflow="auto"
              alignItems="start"
            >
              <Box justifyContent={"start"} width={"100%"} marginBottom={1}>
                <Typography fontWeight={"bold"} fontSize={"20px"}>상세정보</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>구성원 로그인 ID</LabelTypo>
                {/* height: 24px */}
                <BasicInput
                  sx={{ minHeight: "24px", width: "60%" }}
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  placeholder={memberId ? memberId : "구성원 아이디"}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>구성원이름</LabelTypo>
                {/* height: 24px */}
                <BasicInput
                  sx={{ minHeight: "24px", width: "60%" }}
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder={memberName ? memberName : "구성원이름"}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>사용여부</LabelTypo>
                {/* height: 24px */}
                <ToggleButton
                  checked={isMemberUse}
                  onChange={(e) => {
                    const newValue = e.target.checked; // Toggle 버튼의 변경된 값
                    setIsMemberUse(newValue); // solutionIsUes 상태 업데이트
                    console.log("solutionIsUes 값 변경:", newValue); // 콘솔 출력
                  }}
                  label=""
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column" // 세로 방향 설정
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                gap={1}
              >
                <LabelTypo width={"100%"}>비고</LabelTypo>
                {/* height: 24px */}
                <BasicInput
                  sx={{ minHeight: "24px", width: "100%" }}
                  value={memberRmk}
                  onChange={(e) => setMemberRmk(e.target.value)}
                  placeholder={memberRmk ? memberRmk : "구성원이름"}
                />
              </Box>
            </GrayBox>
            <GrayBox justifyContent={"end"} gap={1}>
              <BasicButton onClick={handleMenuAdd}>추가</BasicButton>
              <BasicButton onClick={handleMemberDetail}>저장</BasicButton>
              <BasicButton onClick={confirmDeletionModal}>삭제</BasicButton>
            </GrayBox>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
