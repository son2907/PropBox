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
import { useCallback, useEffect, useState } from "react";
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
import Calendar from "../../../components/Calendar/Calendar";
import SelectInput from "@mui/material/Select/SelectInput";
import useModal from "../../../hooks/useModal";
import api from "../../../api";
import { UserListType } from "../../../api/userList";
import { useLocalList, useLocalMemberList, useMemberList, useMemberPositionList } from "../../../api/localManagement";
import { LocalListType, localMemberListType, MemberPositionType, MemeberList } from "../../../types/localManagementType";
import useDidMountEffect from "../../../hooks/useDidMountEffect";

export default function LocalmemberManagement() {

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
  const [localList, setLocalList] = useState<LocalListType[]>([])

  //현장 구성원 리스트
  const [localMemberReqData, setLocalMemberReqData] = useState({sptNo:"",userNm:"",rspofcNm:""});
  const {data: localMemberListData, refetch: localMemberListDataRefetch} = useLocalMemberList(localMemberReqData);
  const [localMemberList, setLocalMemberList] = useState<localMemberListType[]>([]);

  //구성원 직책 리스트
  const {data: memberPositionListData, isSuccess: isMemberPositionListData} = useMemberPositionList("1004000");
  const [memberPositionList, setMemberPositionList] = useState<MemberPositionType[]>([]);
  const [memberPositionKey, setMemberPositionKey] = useState("");
  const [memberPositionValue, setMemberPositionValue] = useState("");

  //구성원 리스트
  const {data: memberListData, refetch: memberListDataRefetch} = useMemberList(selectUserNo);
  const [memberList, setMemberList] = useState<MemeberList[]>([]);

  const { selectListData, selectValue, handleChange } = useSelect(
    memberPositionList,
    "cd",
    "cdNm"
  );
  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  //useMultiRowSelection 분리해서 각 테이블에 독립적으로 selectedRows와 toggleRowsSelection을 전달하여 동작이 분리되도록 설정.
  // 사용자 리스트 - 선택 상태 관리
  const {
    selectedRow: userSelectedRow,
    toggleRowSelection: toggleUserRowSelection,
  } = useSingleRowSelection();

  // 현장 리스트 - 선택 상태 관리
  const {
    selectedRow: localSelectedRow,
    toggleRowSelection: toggleLocalRowSelection,
  } = useSingleRowSelection();

  // 현장 허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: localUseSelectedRows,
    toggleRowsSelection: toggleLocalUseRowsSelection,
  } = useMultiRowSelection();

  // 현장 미허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: localUnuseSelectedRows,
    toggleRowsSelection: toggleLocalUnuseRowsSelection,
  } = useMultiRowSelection();

  // usePagination에
  const { currentPage, onChangePage } = usePagination();

  //현장 추가 팝업
  const localRegistration = {
    url: PathConstants.System.LocalRegistration,
    windowName: "현장 등록 및 수정",
    windowFeatures: "width=500,height=500,scrollbars=yes,resizable=yes",
  };

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { selectValue: s_1, handleChange: o_1 } = useSelect(
    selectTestData,
    "value",
    "data"
  );

  useEffect(() => {
    if (data?.data.contents) {
      setUserList(data.data.contents);
    }
  }, [data, isSuccess, searchQuery]);

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
    if(localListData?.data.contents){
      setLocalList(localListData?.data.contents);
    }
  },[localListData]);
  useEffect(() => {
    setLocalMemberReqData((prev) => ({
      ...prev,
      sptNo: selectLocalNo
    }))
  },[selectLocalNo]);
  useDidMountEffect(() => {
    if(localMemberListData?.data.contents) {
      setLocalMemberList(localMemberListData.data.contents);
    }
  },[selectLocalNo,localMemberListData]);
  useDidMountEffect(() => {
    if(memberPositionListData?.data.contents){
      setMemberPositionList(memberPositionListData.data.contents);
    }
  },[memberPositionListData]);
  useDidMountEffect(() => {
    if(memberListData?.data.contents) {
      setMemberList(memberListData.data.contents);
    }
  },[memberListData])


  const handleSearch = () => {
    setSearchQuery(searchInput); // 검색어 업데이트
    //console.log("검색 실행:", searchQuery);
    // 검색 로직 추가 (API 호출)
  };

  const handleLocalSearch = () => {
    setLocalSearchQuery(localSearchInput); // 검색어 업데이트
    // setLocalListReqData((prev) => ({
    //   ...prev,
    //   sptNm: localSearchInput, // 선택한 값으로 isUse 업데이트
    //   userNo: selectUserNo
    // }));
  }

  const refreshLocalMemberList = useCallback(() => {
    if(localMemberListData?.data.contents) {
      localMemberListDataRefetch();
    }
  },[localMemberListDataRefetch]);

  const refreshMemberList = useCallback(() => {
    if(memberListData?.data.contents) {
      memberListDataRefetch();
    }
  },[memberListDataRefetch]);

  return (
    <>
      <Stack width={"100%"} height={"100%"} gap={1}>
        <GrayBox gap={1}>
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
        <Stack width={"100%"} height={"30%"} gap={1}>
          <TableBox gap={1}>
            <Stack width={"50%"} height={"100%"}>
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
            <Stack width={"50%"} height={"100%"}>
              <TableBox.Inner>
                <BasicTable data={localList}>
                  <BasicTable.Th>현장번호</BasicTable.Th>
                  <BasicTable.Th>현장이름</BasicTable.Th>
                  <BasicTable.Th>사용기간</BasicTable.Th>
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
                          <BasicTable.Td>{item.cntrctBgnde} ~ {item.cntrctEndde}</BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </Stack>
          </TableBox>
        </Stack>
        <Stack width={"100%"} overflow={"auto"} gap={1} height={"65%"}>
          <TableBox gap={1}>
            <Stack width={"69%"} height={"100%"}>
              <GrayBox>
                <Typography>현장 구성원</Typography>
              </GrayBox>
              <TableBox.Inner>
                <CheckboxTable
                  data={localMemberList}
                  selectedRows={localUseSelectedRows}
                  toggleRowsSelection={toggleLocalUseRowsSelection}
                >
                  <CheckboxTable.Thead>
                    <CheckboxTable.Tr>
                      <CheckboxTable.CheckboxTh keyName="id" />
                      <CheckboxTable.Th>구성원번호</CheckboxTable.Th>
                      <CheckboxTable.Th>구성원이름</CheckboxTable.Th>
                      <CheckboxTable.Th>직책</CheckboxTable.Th>
                    </CheckboxTable.Tr>
                  </CheckboxTable.Thead>
                  <CheckboxTable.Tbody>
                    {localMemberList.map((item) => (
                      <CheckboxTable.Tr key={item.userNo} id={item.userNo}>
                        <CheckboxTable.CheckboxTd
                          item={item}
                          keyName="id"
                        />
                        <CheckboxTable.Td>{item.userNo}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.userNm}</CheckboxTable.Td>
                        <CheckboxTable.Td>
                          <Select
                            sx={{ width: "200px" }}
                            value={selectValue}
                            onChange={(e) => {
                              const newValue = e.target.value; // 선택된 값 (cdNm)
                              const selectedOption = memberPositionList.find(
                                (item) => item.cdNm === newValue
                              );
                              if(selectedOption) {
                                console.log("직책변경:",  selectedOption.cdNm);
                                console.log(`직책 키 변경: ${selectedOption.cd}`); // cd 콘솔 출력
                                setMemberPositionKey(selectedOption.cd);
                                setMemberPositionValue(selectedOption.cdNm);
                              }
                            }}
                            selectData={memberPositionList.map((item) => ({
                              value: item.cdNm,
                              data: item.cdNm,
                            }))}
                            placeholder={item.rspofcNm}
                          />
                        </CheckboxTable.Td>
                      </CheckboxTable.Tr>
                    ))}
                  </CheckboxTable.Tbody>
                </CheckboxTable>
              </TableBox.Inner>
              <GrayBox justifyContent={"end"}>
                <BasicButton onClick={refreshMemberList}>새로고침</BasicButton>
              </GrayBox>
            </Stack>
            <Stack width={"2%"} bgcolor={"white"} justifyContent={"space-between"} height={"100%"}>
              <BasicButton
                sx={{
                  backgroundColor: "primary.A100",
                  height: "150px",
                  width: "100%",
                  padding: "0",
                  margin: "0",
                  minWidth: "unset", // 기본 minWidth 해제
                }}
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
              >
                <BiChevronLeft size={"24px"} />
              </BasicButton>
            </Stack>
            <Stack width={"29%"} height={"100%"}>
              <GrayBox>
                <Typography>구성원</Typography>
              </GrayBox>
              <TableBox.Inner>
                <CheckboxTable
                  data={memberList}
                  selectedRows={localUnuseSelectedRows}
                  toggleRowsSelection={toggleLocalUnuseRowsSelection}
                >
                  <CheckboxTable.Thead>
                    <CheckboxTable.Tr>
                      <CheckboxTable.CheckboxTh keyName="id" />
                      <CheckboxTable.Th>구성원ID</CheckboxTable.Th>
                      <CheckboxTable.Th>구성원이름</CheckboxTable.Th>
                    </CheckboxTable.Tr>
                  </CheckboxTable.Thead>

                  <CheckboxTable.Tbody>
                    {memberList.map((item) => (
                      <CheckboxTable.Tr key={item.userNo} id={item.userNo}>
                        <CheckboxTable.CheckboxTd
                          item={item}
                          keyName="id"
                        />
                        <CheckboxTable.Td>{item.userNo}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.userNm}</CheckboxTable.Td>
                      </CheckboxTable.Tr>
                    ))}
                  </CheckboxTable.Tbody>
                </CheckboxTable>
              </TableBox.Inner>
              <GrayBox justifyContent={"end"}>
                <BasicButton onClick={refreshLocalMemberList}>새로고침</BasicButton>
              </GrayBox>
            </Stack>
          </TableBox>
        </Stack>
      </Stack>
    </>
  );
}
