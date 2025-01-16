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
import Calendar from "../../../components/Calendar/Calendar";
import useModal from "../../../hooks/useModal";
import { UserListType } from "../../../api/userList";
import api from "../../../api";
import { useLocalList, useNonPermissionLocalList, usePermissionLocalList } from "../../../api/localManagement";
import { LocalListType, LocalPermissionListType } from "../../../types/localManagementType";

export default function LocalManagement() {

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

  //현장리스트
  const [localListReqData, setLocalListReqData] = useState(
    { sptNm: "", progrsSeCd: "", userNo: "", cntrctBgnde: "", cntrctEndde: "" });
  const { data: localListData, isSuccess: isLocalListData } = useLocalList(localListReqData);
  const [localList, setLocalList] = useState<LocalListType[]>([]);
  const [selectLocalNo, setSelectLocalNo] = useState("");

  //현장 허가 솔루션
  const { data: localPermissionData, isSuccess: isLocalPermissionData } = usePermissionLocalList(selectLocalNo);
  const [localPermission, setLocalPermission] = useState<LocalPermissionListType[]>([]);

  //현장 미허가 솔루션
  const {data : localNonPermissionData, isSuccess: isLocalNonPermissionData} = useNonPermissionLocalList();

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

  const localListTableData = localList.map((item) => ({
    sptNo: item.sptNo,
    userNo: item.userNo,
    sptNm: item.sptNm,
    progrsSeCd: item.progrsSeCd,
    useYn: item.useYn,
    cntrctBgnde: item.cntrctBgnde,
    cntrctEndde: item.cntrctEndde,
  }));

  const localPermissionTableData = localPermission.map((item) => ({
    id : item.sptNo,
    sptNo: item.sptNo,
    slutnId: item.slutnId,
    slutnNm: item.slutnNm,
    lisneSeCd: item.lisneSeCd,
    lisneSeNm: item.lisneSeNm,
    userlisneCnt: item.userlisneCnt,
    sptlisneCnt: item.sptlisneCnt,
    chrgcnt: item.chrgcnt,
    userId: item.userId
  }));

  const selectData = [
    { value: "1003005", data: "진행" },
    { value: "1003099", data: "종료" },
  ];

  const {
    selectListData: sd_1,
    selectValue: s_1,
    handleChange: o_1,
  } = useSelect(selectData, "value", "data");

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

  useEffect(() => {
    if (data?.data.contents) {
      setUserList(data.data.contents);
    }
  }, [data, isSuccess, searchQuery]);

  useEffect(() => {
    // selectUserNo가 변경될 때 localListReqData를 업데이트하고 useLocalList 호출 트리거
    setLocalListReqData((prev) => ({
      ...prev,
      userNo: selectUserNo, // selectUserNo 값을 userNo에 반영
    }));
  }, [selectUserNo]);

  useEffect(() => {
    if (localListData?.data.contents) {
      setLocalList(localListData.data.contents);
    }
  }, [localListData, localListReqData]);

  //현장선택하면 허가현장
  useEffect(() => {
    if (localPermissionData?.data.contents) {
      setLocalPermission(localPermissionData.data.contents);
    }
  }, [localPermissionData, selectLocalNo]);

  const handleSearch = () => {
    setSearchQuery(searchInput); // 검색어 업데이트
    //console.log("검색 실행:", searchQuery);
    // 검색 로직 추가 (API 호출)
  };

  const handleLocalSearch = () => {
    setLocalSearchQuery(localSearchInput); // 검색어 업데이트
    setLocalListReqData((prev) => ({
      ...prev,
      sptNm: localSearchInput, // 선택한 값으로 isUse 업데이트
    }));
  };

  const handleIsUseChange = (value) => {
    setLocalListReqData((prev) => ({
      ...prev,
      progrsSeCd: value, // 선택한 값으로 isUse 업데이트
    }));
    console.log("선택값은? :", value)
  };

  return (
    <>
      {/* 사용자 리스트 테이블 - 상단 테이블 */}
      <Stack width={"100%"} height={"100%"} gap={1}>
        <GrayBox gap={1} width={"100%"} justifyContent={"space-between"}>
          <Stack direction={"row"} gap={1}>
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
            <Select
              value={s_1}
              onChange={(event) => {
                const selectedValue = event.target.value;
                o_1(event); // 기존의 handleChange 호출
                handleIsUseChange(selectedValue); // isUse 값 업데이트
              }}
              selectData={sd_1}
              sx={{ width: "204px" }}
              placeholder="종료 구분 선택"
              defaultValue={""}
            />
            <Box width={"200px"}>
              <Calendar selectedDate={endDate} setSelectedDate={setEndDate} />
            </Box>
            <Typography>~</Typography>
            <Box width={"200px"}>
              <Calendar
                selectedDate={startDate}
                setSelectedDate={setStartDate}
              />
            </Box>
          </Stack>
          <Stack>
            <BasicButton>추가</BasicButton>
          </Stack>
        </GrayBox>
        <Stack width={"100%"} height={"95%"} gap={1}>
          <TableBox gap={1} height={"50%"}>
            <Stack width={"35%"} height={"100%"}>
              <TableBox.Inner>
                <BasicTable data={userListTableData}>
                  <BasicTable.Th>사용자ID</BasicTable.Th>
                  <BasicTable.Th>사용자이름</BasicTable.Th>
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
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </Stack>
            <Stack width={"65%"} height={"100%"}>
              <TableBox.Inner>
                <BasicTable data={localListTableData}>
                  <BasicTable.Th>현장번호</BasicTable.Th>
                  <BasicTable.Th>현장이름</BasicTable.Th>
                  <BasicTable.Th>사용기간</BasicTable.Th>
                  <BasicTable.Th>구분</BasicTable.Th>
                  <BasicTable.Th>수정</BasicTable.Th>
                  <BasicTable.Tbody>
                    {localListTableData.map((item, index) => {
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
                          <BasicTable.Td>{item.sptNm}</BasicTable.Td>
                          <BasicTable.Td>{item.sptNo}</BasicTable.Td>
                          <BasicTable.Td>{item.cntrctBgnde} ~ {item.cntrctEndde}</BasicTable.Td>
                          <BasicTable.Td>{item.progrsSeCd}</BasicTable.Td>
                          <BasicTable.Td>
                            <BasicButton
                              onClick={() => {
                                openPopup({
                                  url: localRegistration.url,
                                  windowName: localRegistration.windowName,
                                  windowFeatures:
                                    localRegistration.windowFeatures,
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
          </TableBox>
          <TableBox width={"100%"} height={"50%"} gap={1}>
            <Stack gap={1} width={"64%"} height={"100%"}>
              <GrayBox>
                <Typography>현장 허가 솔루션</Typography>
              </GrayBox>
              <TableBox.Inner>
                <CheckboxTable
                  data={localPermissionTableData}
                  selectedRows={localUseSelectedRows}
                  toggleRowsSelection={toggleLocalUseRowsSelection}
                >
                  <CheckboxTable.Thead>
                    <CheckboxTable.Tr>
                      <CheckboxTable.CheckboxTh />
                      <CheckboxTable.Th>ID</CheckboxTable.Th>
                      <CheckboxTable.Th>솔루션이름</CheckboxTable.Th>
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
                    {localPermissionTableData.map((item) => (
                      <CheckboxTable.Tr key={item.slutnId} id={item.slutnId}>
                        <CheckboxTable.CheckboxTd item={item} />
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
              <GrayBox>
                <BasicButton>새로고침</BasicButton>
              </GrayBox>
            </Stack>
            <Stack width={"2%"} bgcolor={"white"} justifyContent={"space-between"}>
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
            <Stack width={"34%"} height={"100%"} gap={1}>
              <GrayBox>
                <Typography>현장 미허가 솔루션</Typography>
              </GrayBox>
              <TableBox.Inner>
                <CheckboxTable
                  data={tableTestData}
                  selectedRows={localUnuseSelectedRows}
                  toggleRowsSelection={toggleLocalUnuseRowsSelection}
                >
                  <CheckboxTable.Thead>
                    <CheckboxTable.Tr>
                      <CheckboxTable.CheckboxTh />
                      <CheckboxTable.Th>솔루션ID</CheckboxTable.Th>
                      <CheckboxTable.Th>솔루션이름</CheckboxTable.Th>
                      <CheckboxTable.Th>구분</CheckboxTable.Th>
                    </CheckboxTable.Tr>
                  </CheckboxTable.Thead>

                  <CheckboxTable.Tbody>
                    {tableTestData.map((item) => (
                      <CheckboxTable.Tr key={item.id} id={item.id}>
                        <CheckboxTable.CheckboxTd item={item} />
                        <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                      </CheckboxTable.Tr>
                    ))}
                  </CheckboxTable.Tbody>
                </CheckboxTable>
              </TableBox.Inner>
              <GrayBox>
                <BasicButton>새로고침</BasicButton>
              </GrayBox>
            </Stack>
          </TableBox>
        </Stack>
      </Stack>
    </>
  );
}
