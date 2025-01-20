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
import { UserListType } from "../../../api/userList";
import { useLocalList, useLocalMemberList, usePermissionLocalList } from "../../../api/localManagement";
import { LocalListType, localMemberListType, LocalPermissionListType } from "../../../types/localManagementType";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import { useMemberMenuList } from "../../../api/authManagement";
import { MemberMenuList } from "../../../types/authManagement";

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
  const { data: localListData, isSuccess: isLocalListData } = useLocalList(localListReqData);
  const [selectLocalNo, setSelectLocalNo] = useState("");
  const [localList, setLocalList] = useState<LocalListType[]>([]);

  //현장 허가 솔루션
  const { data: localPermissionData, isSuccess: isLocalPermissionData } = usePermissionLocalList(selectLocalNo);
  const [localPermission, setLocalPermission] = useState<LocalPermissionListType[]>([]);

  //현장 구성원 리스트
  const [localMemberReqData, setLocalMemberReqData] = useState({ sptNo: "", userNm: "", rspofcNm: "" });
  const { data: localMemberListData, refetch: localMemberListDataRefetch } = useLocalMemberList(localMemberReqData);
  const [localMemberList, setLocalMemberList] = useState<localMemberListType[]>([]);
  const [selectMemberNo, setSelectMemberNo] = useState("");

  //구성원 메뉴 조회
  const { data: memberMenuListData, refetch: memberMenuListDataRefetch } = useMemberMenuList(selectMemberNo);
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
    selectedRow: memberSelectRow,
    toggleRowSelection: toggleMemberRowSelection,
  } = useSingleRowSelection();

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
  }, [localPermissionData]);
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
  }, [memberMenuListData,selectUserNo])

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
    //console.log("검색 실행:", searchQuery);
    // 검색 로직 추가 (API 호출)
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
            placeholder={"현장 이름 검색"}
          />
        </GrayBox>
        <Stack width={"100%"} height={"40%"} gap={1}>
          <TableBox gap={1}>
            <Stack width={"20%"} height={"100%"}>
              <TableBox.Inner>
                <BasicTable data={data?.data.contents}>
                  <BasicTable.Th>사용자ID</BasicTable.Th>
                  <BasicTable.Th>사용자이름</BasicTable.Th>

                  <BasicTable.Tbody>
                    {data?.data.contents.map((item, index) => {
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
                <BasicTable data={localList}>
                  <BasicTable.Th>현장번호</BasicTable.Th>
                  <BasicTable.Th>현장이름</BasicTable.Th>

                  <BasicTable.Tbody>
                    {localList.map((item, index) => {
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
                  data={localPermission}
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
                    {localPermission.map((item) => (
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
                <BasicTable data={localMemberList}>
                  <BasicTable.Th>구성원번호</BasicTable.Th>
                  <BasicTable.Th>구성원이름</BasicTable.Th>
                  <BasicTable.Th>직책</BasicTable.Th>

                  <BasicTable.Tbody>
                    {localMemberList.map((item, index) => {
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
                <Typography>구성원</Typography>
              </GrayBox>
              <TableBox.Inner>
                <BasicTable data={memberMenuList}>
                  <BasicTable.Th>솔루션 ID</BasicTable.Th>
                  <BasicTable.Th>솔루션 이름</BasicTable.Th>
                  <BasicTable.Th>메뉴 ID</BasicTable.Th>
                  <BasicTable.Th>메뉴 이름</BasicTable.Th>
                  <BasicTable.Th>권한관리</BasicTable.Th>
                  <BasicTable.Th>권한복사</BasicTable.Th>
                  <BasicTable.Th>권한회수</BasicTable.Th>
                  <BasicTable.Tbody>
                    {memberMenuList.map((item, index) => {
                      return (
                        <BasicTable.Tr
                          key={index}
                          isClicked={memberSelectRow.has(item.slutnId)}
                          onClick={() => toggleMemberRowSelection(item.slutnId)}
                        >
                          <BasicTable.Td>{item.slutnId}</BasicTable.Td>
                          <BasicTable.Td>{item.slutnNm}</BasicTable.Td>
                          <BasicTable.Td>{item.menuId}</BasicTable.Td>
                          <BasicTable.Td>{item.menuNm}</BasicTable.Td>
                          <BasicTable.Td>
                            <BasicButton
                              onClick={() => {
                                openPopup({
                                  url: memberMenuPermission.url,
                                  windowName: memberMenuPermission.windowName,
                                  windowFeatures: memberMenuPermission.windowFeatures,
                                });
                              }}
                            >권한관리</BasicButton>
                          </BasicTable.Td>
                          <BasicTable.Td>
                            <BasicButton
                              onClick={() => {
                                openPopup({
                                  url: menuPermissionCopy.url,
                                  windowName: menuPermissionCopy.windowName,
                                  windowFeatures: menuPermissionCopy.windowFeatures,
                                });
                              }}
                            >권한복사</BasicButton>
                          </BasicTable.Td>
                          <BasicTable.Td>
                            <BasicButton
                              onClick={() => {
                                openPopup({
                                  url: permissionRevoke.url,
                                  windowName: permissionRevoke.windowName,
                                  windowFeatures: permissionRevoke.windowFeatures,
                                });
                              }}
                            >권한회수</BasicButton>
                          </BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
              <GrayBox justifyContent={"end"}>
                <BasicButton >새로고침</BasicButton>
              </GrayBox>
            </Stack>
          </TableBox>
        </Stack>
      </Stack>
    </>
  );
}
