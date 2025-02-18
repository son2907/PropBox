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
import { BiChevronLeft } from "react-icons/bi";
import useModal from "../../../hooks/useModal";
import api from "../../../api";
import { useLocalList, useLocalMemberList, usePermissionLocalList } from "../../../api/localManagement";
import { LocalListType, localMemberListType, LocalPermissionListType } from "../../../types/localManagementType";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import { useMemberMenuList } from "../../../api/authManagement";
import { MemberMenuList } from "../../../types/authManagement";
import { UserListType } from "../../../types/userList";
import { EmptySelectModal } from "../../../components/layout/modal/EmptySelectModal";

export default function AuthManagement() {

  //모달
  const { openModal, closeModal } = useModal();

  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리 - 사용자 검색
  const [searchInput, setSearchInput] = useState(""); // 검색 입력값 상태 관리

  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [localSearchInput, setLocalSearchInput] = useState("");

  //사용자 리스트
  //const { data: userListData, isLoading: isLoadingUserList } = useUserList(searchQuery);
  const { isSuccess, data } = api.UserList.useUserList(searchQuery);
  const [userList, setUserList] = useState<UserListType[]>([]);
  const [selectUserNo, setSelectUserNo] = useState("");

  //현장 리스트
  const [localListReqData, setLocalListReqData] = useState({ sptNm: "", progrsSeCd: "", userNo: "", cntrctBgnde: "", cntrctEndde: "" });
  const { data: localListData, refetch: refetchLocalListData } = useLocalList(localListReqData);
  const [selectLocalNo, setSelectLocalNo] = useState("");
  const [localList, setLocalList] = useState<LocalListType[]>([]);

  //현장 허가 솔루션
  const { data: localPermissionData, refetch: refetchLocalPermissionData } = usePermissionLocalList(selectLocalNo);
  const [localPermission, setLocalPermission] = useState<LocalPermissionListType[]>([]);

  //현장 구성원 리스트
  const [localMemberReqData, setLocalMemberReqData] = useState({ sptNo: "", userNm: "", rspofcNm: "" });
  const { data: localMemberListData, refetch: localMemberListDataRefetch } = useLocalMemberList(localMemberReqData);
  const [localMemberList, setLocalMemberList] = useState<localMemberListType[]>([]);
  const [selectMemberNo, setSelectMemberNo] = useState("");

  //구성원 메뉴 조회
  const { data: memberMenuListData, refetch: memberMenuListDataRefetch } = useMemberMenuList(selectMemberNo);  //팝업테스트를 위해 임시로 처리
  const [memberMenuList, setMemberMenuList] = useState<MemberMenuList[]>([]);

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

  // 구성원 리스트 - 선택 상태 관리
  const {
    selectedRows: memberSelectRows,
    toggleRowsSelection: toggleMemberRowsSelection,
  } = useMultiRowSelection();

  // usePagination에
  const { currentPage, onChangePage } = usePagination();

  useEffect(() => {
    if (selectUserNo !== "") {
      // selectUserNo가 변경될 때 localListReqData를 업데이트하고 useLocalList 호출 트리거
      setLocalListReqData((prev) => ({
        ...prev,
        userNo: selectUserNo, // selectUserNo 값을 userNo에 반영
      }));
    } else return;
  }, [selectUserNo]);

  useDidMountEffect(() => {
    //console.log("localListData 확인 : ",localListData);
    if (localListData?.data.contents) {
      setLocalList(localListData?.data.contents);
    }
  }, [localListData]);
  useDidMountEffect(() => {
    if (localPermissionData?.data.contents) {
      setLocalPermission(localPermissionData.data.contents);
    }
  }, [localPermissionData, selectLocalNo]);
  useEffect(() => {
    setLocalMemberReqData((prev) => ({
      ...prev,
      sptNo: selectLocalNo
    }))
  }, [selectLocalNo]);
  useDidMountEffect(() => {
    if (localMemberListData?.data.contents) {
      setLocalMemberList(localMemberListData.data.contents);
    }
  }, [selectLocalNo, localMemberListData]);
  useDidMountEffect(() => {
    if (memberMenuListData?.data.contents) {
      setMemberMenuList(memberMenuListData.data.contents);
    }
  }, [memberMenuListData, selectUserNo])

  //구성원 메뉴 권한 등록 및 수정
  const memberMenuPermission = {
    url: PathConstants.System.MemberMenuPermission,
    windowName: "구성원 메뉴 권한 등록 및 수정",
    windowFeatures: "width=1860,height=735,scrollbars=yes,resizable=yes",
  };

  //구성원 메뉴 권한 복사
  const menuPermissionCopy = {
    url: PathConstants.System.MenuPermissionCopy,
    windowName: "구성원 메뉴 권한 복사",
    windowFeatures: "width=800,height=700,scrollbars=yes,resizable=yes",
  };

  //회수 사유
  const permissionRevoke = {
    url: PathConstants.System.PermissionRevoke,
    windowName: "회수 사유",
    windowFeatures: "width=700,height=230,scrollbars=yes,resizable=yes",
  };

  const handleSearch = () => {
    setSearchQuery(searchInput); // 검색어 업데이트
    console.log("검색 실행:", searchQuery);
    // 검색 로직 추가 (API 호출)
  };

  const handleLocalSearch = () => {
    console.log("현장검색호출");
    setLocalSearchQuery(localSearchInput); // 검색어 업데이트
    setLocalListReqData((prev) => ({
      ...prev,
      sptNm: localSearchInput, // 선택한 값으로 isUse 업데이트
      userNo: selectUserNo
    }));
  };

  const emptySelectModal = () => {
    openModal(EmptySelectModal, {
      modalId: "EmptySelectModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
      },
    });
  };

  return (
    <>
      <Stack width={"100%"} height={"100%"} gap={1}>
        <GrayBox gap={1}>
          <SearchInput
            placeholder={"사용자 이름 검색"}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // 검색어 입력값 업데이트
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch(); // 검색 실행 함수 호출
              }
            }}
          />
          <SearchInput
            placeholder="현장 검색"
            value={localSearchInput}
            onChange={(e) => setLocalSearchInput(e.target.value)} // 검색어 입력값 업데이트
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleLocalSearch(); // 검색 실행 함수 호출
              }
            }}
          />
        </GrayBox>
        <Stack width={"100%"} height={"40%"} gap={1}>
          <TableBox gap={1}>
            <Stack width={"20%"} height={"100%"}>
              <TableBox.Inner>
                <BasicTable data={data?.data.contents || []}>
                  <BasicTable.Th>사용자ID</BasicTable.Th>
                  <BasicTable.Th>사용자이름</BasicTable.Th>

                  <BasicTable.Tbody>
                    {(data?.data.contents || []).map((item, index) => {
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
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </Stack>
            <Stack width={"20%"} height={"100%"}>
              <TableBox.Inner>
                <BasicTable data={localListData?.data.contents || []}>
                  <BasicTable.Th>현장번호</BasicTable.Th>
                  <BasicTable.Th>현장이름</BasicTable.Th>

                  <BasicTable.Tbody>
                    {(localListData?.data.contents || []).map((item, index) => {
                      return (
                        <BasicTable.Tr
                          key={index}
                          isClicked={selectLocalNo === item.sptNo}
                          onClick={() => {
                            if (selectLocalNo === item.sptNo) {
                              setSelectLocalNo("");
                            } else {
                              setSelectLocalNo(item.sptNo);
                            }
                          }}
                        >
                          <BasicTable.Td>{item.sptNo}</BasicTable.Td>
                          <BasicTable.Td>{item.sptNm}</BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </Stack>
            <Stack width={"60%"} height={"100%"}>
              <TableBox.Inner>
                <CheckboxTable
                  data={localPermissionData?.data.contents || []}
                  selectedRows={authorizedSelectedRows}
                  toggleRowsSelection={toggleAuthorizedRowsSelection}
                >
                  <CheckboxTable.Thead>
                    <CheckboxTable.Tr>
                      <CheckboxTable.Th>솔루션ID</CheckboxTable.Th>
                      <CheckboxTable.Th>솔루션명</CheckboxTable.Th>
                      <CheckboxTable.Th>구분</CheckboxTable.Th>
                      <CheckboxTable.Th colSpan={3}>라이선스</CheckboxTable.Th>
                    </CheckboxTable.Tr>
                    <CheckboxTable.Tr>
                      <CheckboxTable.Th> </CheckboxTable.Th>
                      <CheckboxTable.Th> </CheckboxTable.Th>
                      <CheckboxTable.Th> </CheckboxTable.Th>
                      <CheckboxTable.Th>전체</CheckboxTable.Th>
                      <CheckboxTable.Th>사용</CheckboxTable.Th>
                      <CheckboxTable.Th>잔여</CheckboxTable.Th>
                    </CheckboxTable.Tr>
                  </CheckboxTable.Thead>
                  <CheckboxTable.Tbody>
                    {(localPermissionData?.data.contents || []).map((item) => (
                      <CheckboxTable.Tr key={item.slutnId} id={item.slutnId}>
                        <CheckboxTable.Td>{item.slutnId}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.slutnNm}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.lisneSeNm}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.userlisneCnt}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.sptlisneCnt}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.chrgcnt}</CheckboxTable.Td>
                      </CheckboxTable.Tr>
                    ))}
                  </CheckboxTable.Tbody>
                </CheckboxTable>
              </TableBox.Inner>
            </Stack>
          </TableBox>
        </Stack>
        <Stack width={"100%"} height={"55%"} gap={1} overflow={"auto"}>
          <TableBox gap={1}>
            <Stack width={"40%"} height={"100%"}>
              <GrayBox>
                <Typography>현장 구성원</Typography>
              </GrayBox>
              <TableBox.Inner>
                <BasicTable data={localMemberListData?.data.contents || []}>
                  <BasicTable.Th>구성원번호</BasicTable.Th>
                  <BasicTable.Th>구성원이름</BasicTable.Th>
                  <BasicTable.Th>직책</BasicTable.Th>

                  <BasicTable.Tbody>
                    {(localMemberListData?.data.contents || []).map((item, index) => {
                      return (
                        <BasicTable.Tr
                          key={index}
                          isClicked={selectMemberNo === item.userNo}
                          onClick={() => {
                            if (selectMemberNo === item.userNo) {
                              setSelectMemberNo("");
                            } else {
                              setSelectMemberNo(item.userNo);
                            }
                          }}
                        >
                          <BasicTable.Td>{item.userNo}</BasicTable.Td>
                          <BasicTable.Td>{item.userNm}</BasicTable.Td>
                          <BasicTable.Td>{item.rspofcNm}</BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </Stack>
            <Stack width={"60%"} height={"100%"}>
              <GrayBox>
                <Typography>구성원 허가 솔루션</Typography>
              </GrayBox>
              <TableBox.Inner>
                <CheckboxTable
                  data={memberMenuListData?.data.contents || []}
                  selectedRows={memberSelectRows}
                  toggleRowsSelection={toggleMemberRowsSelection}
                >
                  <CheckboxTable.Thead>
                    <CheckboxTable.Tr>
                      <CheckboxTable.CheckboxTh keyName="menuId" />
                      <CheckboxTable.Th>솔루션ID</CheckboxTable.Th>
                      <CheckboxTable.Th>솔루션이름</CheckboxTable.Th>
                      <CheckboxTable.Th>메뉴ID</CheckboxTable.Th>
                      <CheckboxTable.Th>메뉴명</CheckboxTable.Th>
                    </CheckboxTable.Tr>
                  </CheckboxTable.Thead>
                  <CheckboxTable.Tbody>
                    {(memberMenuListData?.data.contents || []).map((item) => (
                      <CheckboxTable.Tr key={item.menuId} id={item.menuId}>
                        <CheckboxTable.CheckboxTd
                          item={item}
                          keyName="menuId"
                        />
                        <CheckboxTable.Td>{item.slutnId}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.slutnNm}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.menuId}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.menuNm}</CheckboxTable.Td>
                      </CheckboxTable.Tr>
                    ))}
                  </CheckboxTable.Tbody>
                </CheckboxTable>
              </TableBox.Inner>
              <GrayBox>
                <TableBox justifyContent={"space-between"}>
                  <Stack width={"50%"} gap={1} direction={"row"} >
                    <BasicButton onClick={() => memberMenuListDataRefetch()}>새로고침</BasicButton>
                  </Stack>
                  <Stack width={"50%"} gap={1} direction={"row"} justifyContent={"end"}>
                    <BasicButton
                      onClick={() => {
                        const selectedMember = (localMemberListData?.data.contents || []).find(
                          (item) => item.userNo === selectMemberNo
                        );
                        const selectedSptNo = selectedMember?.sptNo || "";

                        console.log("선택된 userNo:", selectMemberNo);
                        console.log("선택된 sptNo:", selectedSptNo);

                        if(selectMemberNo) {
                          openPopup({
                            url: `${memberMenuPermission.url}?userNo=${selectMemberNo}&sptNo=${selectedSptNo}`,
                            windowName: memberMenuPermission.windowName,
                            windowFeatures: memberMenuPermission.windowFeatures,
                          });
                        } else {
                          emptySelectModal()
                        }
                        
                      }}
                    >권한관리</BasicButton>
                    <BasicButton
                      onClick={() => {
                        const selectedMember = (localMemberListData?.data.contents || []).find(
                          (item) => item.userNo === selectMemberNo
                        );
                        const selectedSptNo = selectedMember?.sptNo || "";

                        if(selectMemberNo) {
                          openPopup({
                            url: `${menuPermissionCopy.url}?userNo=${selectMemberNo}&sptNo=${selectedSptNo}`,
                            windowName: menuPermissionCopy.windowName,
                            windowFeatures: menuPermissionCopy.windowFeatures,
                          });
                        } else {
                          emptySelectModal()
                        }
                        
                      }}
                    >권한복사</BasicButton>
                    <BasicButton
                      onClick={() => {

                        // 선택된 menuId 값에 해당하는 slutnId 찾기
                        const selectedSlutnIds = (memberMenuListData?.data.contents || [])
                          .filter((item) => memberSelectRows.has(item.menuId)) // menuId로 필터링
                          .map((item) => item.menuId); // slutnId만 추출

                        const slutnIdParam = selectedSlutnIds.join(','); // 콤마로 연결된 문자열

                        //userNo 추출
                        const selectedMember = (localMemberListData?.data.contents || []).find(
                          (item) => item.userNo === selectMemberNo
                        );
                        //현장 번호 추출
                        const selectedSptNo = selectedMember?.sptNo || "";

                        console.log("선택한 슬루션 ID:", selectedSlutnIds);

                        if(selectMemberNo) {
                          openPopup({
                            url: `${permissionRevoke.url}?slutnId=${slutnIdParam}&userNo=${selectMemberNo}&sptNo=${selectedSptNo}`,
                            windowName: permissionRevoke.windowName,
                            windowFeatures: permissionRevoke.windowFeatures,
                          });
                        } else {
                          emptySelectModal();
                        }
                        
                      }}
                    >권한회수</BasicButton>
                  </Stack>
                </TableBox>
              </GrayBox>
            </Stack>
          </TableBox>
        </Stack>
      </Stack>
    </>
  );
}
