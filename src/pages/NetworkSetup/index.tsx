import { Box, Stack } from "@mui/material";
import GrayBox from "../../components/Box/GrayBox";
import SearchInput from "../../components/Input/SearchInput";
import { BasicButton, IconButton } from "../../components/Button";
import TableBox from "../../components/Box/TableBox";
import BasicTable from "../../components/Table/BasicTable";
import { useSingleRowSelection } from "../../hooks/useSingleRowSelection";
import { useMultiRowSelection } from "../../hooks/useMultiRowSelection";
import { tableTestData, selectTestData } from "../../utils/testData";
import SearchResult from "../../components/Table/SearchResult";
import { Select } from "../../components/Select";
import useSelect from "../../hooks/useSelect";
import Calendar from "../../components/Calendar/Calendar";
import { useEffect, useRef, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa6";
import CheckboxTable from "../../components/Table/CheckboxTable";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import PathConstants from "../../routers/path";
import { openPopup } from "../../utils/openPopup";
import CenteredBox from "../../components/Box/CenteredBox";
import TableSelect from "../../components/Select/TableSelect";
import { getComapnyLocalList, getDeviceSection, getMemberLocalList, getMemNonPermissionList, getMemPermissionPhoneList, getSptNonPermissionPhoneList, getSptPermissionPhoneList, getUserCompanyList, sptNonPermissionPhone, sptPermissionPhone } from "../../api/networkSetup";
import { CompanyLocalListType, DeviceSectionListType, SptPermissionPhoneListType, UserCompanyListType } from "../../types/networkSetup";
import useModal from "../../hooks/useModal";
import { useAuthStore } from "../../stores/authStore";
import { string } from "yup";

export default function NetworkSetup() {
  //모달
  const { openModal, closeModal } = useModal();

  //api 호출을 위한 id호출
  const { loginId } = useAuthStore(["loginId"]);

  const datePicker2 = useRef(false);
  const datePicker6 = useRef(false);

  //날짜 형식 재정의
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const [searchQuery, setSearchQuery] = useState({ userNo: "", cmpNm: "" });
  const [userNo, setUserNo] = useState("");  //사용자 번호 검색
  const [cmpNm, setCmpNm] = useState("");
  const [sptNm, setSptNm] = useState("");
  //장치구분
  const { data: deviceSection, refetch: refetchDeviceSection } = getDeviceSection();
  const [deviceSectionData, setDeviceSection] = useState<DeviceSectionListType[]>([]);
  //3번테이블 상단 장치 구분
  const { selectListData, selectValue, handleChange } = useSelect(
    deviceSectionData,
    "commnSeNo",
    "commnSeNm"
  );
  const [deviceSectionDataKey, setDeviceSectionDataKey] = useState("");
  const [deviceSectionDataValue, setDeviceSectionDataValue] = useState("");
  //4번테이블 상단 장치 구분
  const { selectValue: s_1, handleChange: o_1 } = useSelect(
    deviceSectionData,
    "commnSeNo",
    "commnSeNm"
  );
  const [deviceSectionDataKey_4, setDeviceSectionDataKey_4] = useState("");
  const [deviceSectionDataValue_4, setDeviceSectionDataValue_4] = useState("");

  //6번 테이블 상단 장치구분
  const { selectValue: selectValue_6, handleChange: handleChange_6 } = useSelect(
    deviceSectionData,
    "commnSeNo",
    "commnSeNm"
  );
  const [deviceSectionDataKey_6, setDeviceSectionDataKey_6] = useState("");
  const [deviceSectionDataValue_6, setDeviceSectionDataValue_6] = useState("");

  //7번 테이블 상단 장치구분
  const { selectValue: selectValue_7, handleChange: handleChange_7 } = useSelect(
    deviceSectionData,
    "commnSeNo",
    "commnSeNm"
  );
  const [deviceSectionDataKey_7, setDeviceSectionDataKey_7] = useState("");
  const [deviceSectionDataValue_7, setDeviceSectionDataValue_7] = useState("");

  // const { selectListData: deviceListData, selectValue: deviceListValue, handleChange: deviceListChange } = useSelect(
  //   deviceSectionData,
  //   "commnSeNo",
  //   "commnSeNm"
  // );

  //1번 테이블 - 목록 조회
  const { data: userCompanyList, isSuccess: isUserCompanyList } = getUserCompanyList(searchQuery);
  const [userCompanyListData, setUserCompanyListData] = useState<UserCompanyListType[]>([]);
  const [selectUserNo, setSelectUserNo] = useState("");  //선택한 사용자 번호

  //2번 테이블 - 현장 및 회사 목록 조회
  const [companyLocalSearch, setCompanyLocalSearch] = useState({ userNo: "", sptNm: "" });
  const { data: companyLocalList, refetch: companyLocalListRefetch } = getComapnyLocalList(companyLocalSearch)
  const [companyLocalListData, setCompanyLocalListData] = useState<CompanyLocalListType[]>([]);
  const [selectSptNo, setSelectSptNo] = useState("");

  //3번 테이블 - 현장에 할당된 전화기 목록
  const [sptPermissionPhonereqData, setSptPermissionPhonereqData] = useState({ sptNo: "", cntrctBgnde: "", commnSeNo: "" });
  const { data: sptPermissionPhoneList, refetch: setSptPermissionPhoneList } = getSptPermissionPhoneList(sptPermissionPhonereqData);
  const [sptPermissionPhoneListData, setSptPermissionPhoneListData] = useState<SptPermissionPhoneListType[]>([]);

  //4번 테이블 조회
  const [nonPermissionPhoneNo, setNonPermissionPhoneNo] = useState("");
  const [sptNonPermissionReqData, setSptNonPermissionReqData] = useState({ userNo: "", commnSeNo: "", telNo: "" });
  const { data: sptNonPermissionPhoneList, refetch: refetchSptNonPermissionPhoneList } = getSptNonPermissionPhoneList(sptNonPermissionReqData);

  //5번 테이블 - 회사와 구성원 조회
  const [memberName, setMemeberName] = useState("");
  const [searchQueryMem, setSearchQueryMem] = useState({ userNo: "", constntNm: "" });
  const { data: memberLocalList, refetch: refetchMemberLocalList } = getMemberLocalList(searchQueryMem);
  const [selectMemberNo, setSelectMemberNo] = useState("");
  const [idx, setIdx] = useState("");

  //6번 테이블 - 구성원에게 할당된 전화기 조회
  const [memPermissionPhoneReqData, setMemPermissionPhoneReqData] = useState({ userNo: "", commnSeNo: "", telNo: "" });
  const { data: memPermissionPhoneListData, refetch: refetchMemPermissionPhoneListData } = getMemPermissionPhoneList(memPermissionPhoneReqData);

  //7번 테이블 - 구성원에게 미할당된 전화기 조회
  const [memNonPermissionPhoneNo, setMemNonPermissionPhoneNo] = useState("");
  const [memNonPermissionPhoneReqData, setMemNonPermissionPhoneReqData] = useState({ sptNo: "", commnSeNo: "", telNo: "" });
  const { data: memNonPermissionPhoneData, refetch: refetchMemNonPermissionPhoneData } = getMemNonPermissionList(memNonPermissionPhoneReqData);

  //4번테이블 -> 3번테이블 전화기 등록
  const sptPermissionPhoneAPI = sptPermissionPhone();
  //3번 테이블 -> 4번 테이블 전화기 삭제
  const sptNonPermissionPhoneAPI = sptNonPermissionPhone();

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

  // 회사 리스트 - 선택 상태 관리
  const {
    selectedRow: companySelectedRow,
    toggleRowSelection: toggleCompanyRowSelection,
  } = useSingleRowSelection();

  // 3번 테이블 row선택택
  const {
    selectedRows: sptPermissionSelectedRows,
    toggleRowsSelection: toggleSptPermissionRowsSelection,
  } = useMultiRowSelection();

  //4번 테이블 row 선택
  const {
    selectedRows: sptNonPermissionPhoneRews,
    toggleRowsSelection: togglesptNonPermissionPhone,
  } = useMultiRowSelection();

  //6번 테이블 row 선택
  const {
    selectedRow: memPermissionPhoneRews,
    toggleRowSelection: togglememPermissionPhone,
  } = useSingleRowSelection();


  // 현장 미허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: localUnuseSelectedRows,
    toggleRowsSelection: toggleLocalUnuseRowsSelection,
  } = useMultiRowSelection();


  const [date, setDate] = useState<Date>(new Date());
  const [date6, setDate6] = useState<Date>(new Date());

  //전화기 추가 팝업
  const phoneAddPopup = {
    url: PathConstants.System.PhoneAdd,
    windowName: "전화기 추가",
    windowFeatures: "width=500,height=290,scrollbars=yes,resizable=yes",
  };

  const handleSearch = () => {
    setSearchQuery((prev) => ({
      ...prev,
      userNo: userNo,
      cmpNm: cmpNm
    }));
  };

  const handleNonPermissionPhoneNoSearch = () => {
    setSptNonPermissionReqData((prev) => ({
      ...prev,
      userNo: selectUserNo,
      commnSeNo: deviceSectionDataKey_4 ? deviceSectionDataKey_4 : "",
      telNo: nonPermissionPhoneNo
    }))
  };

  const handleCmpLocalSearch = () => {
    setCompanyLocalSearch((prev) => ({
      ...prev,
      userNo: selectUserNo,
      sptNm: sptNm
    }));
  };

  //7번 테이블 검색
  const handleMemNonPermissionSearch = () => {
    //7번 테이블 출력
    setMemNonPermissionPhoneReqData((prev) => ({
      ...prev,
      sptNo: selectSptNo,
      commnSeNo: deviceSectionDataKey_7 ? deviceSectionDataKey_7 : "", // datePicker 값에 따라 설정
      telNo: memNonPermissionPhoneNo
    }));
  }

  // 날짜 변경 핸들러
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    datePicker2.current = true; // 날짜가 한 번이라도 변경되면 true로 설정
  };
  const handleDateChange6 = (newDate: Date) => {
    setDate6(newDate);
    datePicker6.current = true; // 날짜가 한 번이라도 변경되면 true로 설정
  };


  //1번 테이블에서 사용자 선택시
  useEffect(() => {
    //2번테이블블
    setCompanyLocalSearch((prev) => ({
      ...prev,
      userNo: selectUserNo,
      sptNm: sptNm
    }));
    //5번 테이블
    setSearchQueryMem((prev) => ({
      ...prev,
      userNo: selectUserNo,
      constntNm: memberName || ""
    }));
    //4번 테이블
    setSptNonPermissionReqData((prev) => ({
      ...prev,
      userNo: selectUserNo,
      commnSeNo: deviceSectionDataKey_4 ? deviceSectionDataKey_4 : "",
      telNo: nonPermissionPhoneNo ? nonPermissionPhoneNo : ""
    }));
    setSelectSptNo("");
  }, [selectUserNo]);

  //2번테이블 현장 선택시
  useEffect(() => {
    //3번테이블 출력력
    setSptPermissionPhonereqData((prev) => ({
      ...prev,
      sptNo: selectSptNo,
      cntrctBgnde: datePicker2.current ? formatDate(date) : "", // datePicker 값에 따라 설정
      commnSeNo: deviceSectionDataKey
    }));

    //7번 테이블 출력
    setMemNonPermissionPhoneReqData((prev) => ({
      ...prev,
      sptNo: selectSptNo,
      commnSeNo: deviceSectionDataKey_7 ? deviceSectionDataKey_7 : "", // datePicker 값에 따라 설정
      telNo: memNonPermissionPhoneNo
    }));
  }, [selectSptNo]);

  //3번 테이블 구분 필터링
  useEffect(() => {
    setSptPermissionPhonereqData((prev) => ({
      ...prev,
      sptNo: selectSptNo,
      cntrctBgnde: datePicker2.current ? formatDate(date) : "", // datePicker 값에 따라 설정
      commnSeNo: deviceSectionDataKey
    }));
  }, [deviceSectionDataKey, date]);
  useEffect(() => {
    if (sptPermissionPhoneList?.data?.contents) {
      setSptPermissionPhoneListData(sptPermissionPhoneList.data.contents)
    }
  }, [sptPermissionPhoneList])

  //4번 테이블 전화번호 검색
  useEffect(() => {
    setSptNonPermissionReqData((prev) => ({
      ...prev,
      userNo: selectUserNo,
      commnSeNo: deviceSectionDataKey_4 ? deviceSectionDataKey_4 : "",
      telNo: nonPermissionPhoneNo
    }))
  }, [deviceSectionDataKey_4]);

  useEffect(() => {
    if (deviceSection?.data?.contents) {
      setDeviceSection(deviceSection.data.contents);
    }
  }, [deviceSection]);

  const handleCompanyMemberSearch = () => {
    setSearchQueryMem((prev) => ({
      ...prev,
      userNo: selectUserNo,
      constntNm: memberName
    }));
  };

  //4->3 전화기 등록
  const handleSptPermissionPhone = () => {
    const selectedData = Array.from(sptNonPermissionPhoneRews).map(
      (selectedId: string) => {
        const selectedItem = sptNonPermissionPhoneList?.data?.contents.find(
          (item) => item.telId === selectedId
        );
        return {
          sptNo: selectSptNo,
          telId: selectedItem?.telId || "",
          cntrctBgnde: "",
          cntrctEndde: "",
          userId: loginId || "",
        };
      }
    );

    console.log("보낼데이터 확인: ", selectedData);

    sptPermissionPhoneAPI.mutate(
      {
        body: selectedData,
      },
      {
        onSuccess: (response) => {
          if (response.data.result === "SUCCESS") {
            console.log("response.data", response.data);
            setSptPermissionPhoneList();
            refetchSptNonPermissionPhoneList();
          }
        }
      }
    )
  };

  const handleSptNonPermissionPhone = () => {
    const selectedData = Array.from(sptPermissionSelectedRows).map(
      (selectedId: string) => {
        const selectedItem = sptPermissionPhoneList?.data?.contents.find(
          (item) => item.telId === selectedId
        );
        return {
          sptNo: selectedItem?.sptNo || "",
          telId: selectedItem?.telId || "",
          userId: loginId || ""
        };
      }
    );
    console.log("3->4로 보낼데이터 확인:", selectedData);

    sptNonPermissionPhoneAPI.mutate(
      { body: selectedData },
      {
        onSuccess: (response) => {
          if (response.data.result === "SUCCESS") {
            console.log("response.data", response.data);
            setSptPermissionPhoneList();
            refetchSptNonPermissionPhoneList();
          }
        }
      }
    )
  };



   //날짜 변경될 때마다 콘솔 출력
   useEffect(() => {
     console.log("현재 선택된:", selectMemberNo);
   }, [selectMemberNo]);

  // 이전 날짜로 이동
  const handlePrevDate = () => {
    datePicker2.current = true;
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };
  const handlePrevDate6 = () => {
    datePicker6.current = true;
    setDate6((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  // 이후 날짜로 이동
  const handleNextDate = () => {
    datePicker2.current = true;
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };
  const handleNextDate6 = () => {
    datePicker6.current = true;
    setDate6((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };

  // 오늘 날짜로 설정
  const handleToday = () => {
    datePicker2.current = true;
    setDate(new Date());
  };
  const handleToday6 = () => {
    datePicker6.current = true;
    setDate6(new Date());
  };

  return (
    <>
      <Stack width={"100%"} height={"100%"} gap={1}>
        <GrayBox gap={2} justifyContent={"space-between"}>
          <Stack direction={"row"} gap={1}>
            <SearchInput
              placeholder={"사용자번호 검색"}
              value={userNo}
              onChange={(e) => setUserNo(e.target.value)} // 검색어 입력값 업데이트
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(); // 검색 실행 함수 호출
                }
              }}
            />
            <SearchInput
              placeholder={"회사이름 검색"}
              value={cmpNm}
              onChange={(e) => setCmpNm(e.target.value)} // 검색어 입력값 업데이트
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(); // 검색 실행 함수 호출
                }
              }}
            />
          </Stack>
          <BasicButton
            onClick={() => {
              openPopup({
                url: phoneAddPopup.url,
                windowName: phoneAddPopup.windowName,
                windowFeatures: phoneAddPopup.windowFeatures,
              });
            }}
          >
            전화기추가
          </BasicButton>
        </GrayBox>
        <TableBox gap={1}>
          <Stack width={"20%"} height={"100%"}>
            <TableBox.Inner>
              {/* 1번 테이블 */}
              <BasicTable data={userCompanyList?.data.contents || []}>
                <BasicTable.Th>사용자번호</BasicTable.Th>
                <BasicTable.Th>회사이름</BasicTable.Th>
                <BasicTable.Th>전화기수</BasicTable.Th>
                <BasicTable.Tbody>
                  {(userCompanyList?.data.contents || []).map((item, index) => {
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
                        <BasicTable.Td>{item.userNo}</BasicTable.Td>
                        <BasicTable.Td>{item.cmpNm}</BasicTable.Td>
                        <BasicTable.Td>{item.telCnt}</BasicTable.Td>
                      </BasicTable.Tr>
                    );
                  })}
                </BasicTable.Tbody>
              </BasicTable>
            </TableBox.Inner>
            <CenteredBox justifyContent={"start"}>
              <SearchResult total={userCompanyList?.data.totalCnt || 0} />
            </CenteredBox>
          </Stack>
          <Stack width={"80%"} height={"100%"} gap={1}>
            <TableBox width={"100%"} height={"50%"} gap={1}>
              <Stack width={"20%"} height={"100%"} gap={1} borderBottom={2} borderColor={"primary.A100"}>
                <SearchInput
                  placeholder="현장명 검색"
                  sx={{ width: "200px", height: "40px" }}
                  value={sptNm}
                  onChange={(e) => setSptNm(e.target.value)} // 검색어 입력값 업데이트
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleCmpLocalSearch(); // 검색 실행 함수 호출
                    }
                  }}
                ></SearchInput>
                <TableBox.Inner>
                  {/* 2번 테이블 */}
                  <BasicTable data={companyLocalList?.data.contents || []}>
                    <BasicTable.Th>회사이름</BasicTable.Th>
                    <BasicTable.Th>현장이름</BasicTable.Th>
                    <BasicTable.Th>전화기수</BasicTable.Th>
                    <BasicTable.Tbody>
                      {(companyLocalList?.data.contents || []).map((item, index) => {
                        return (
                          <BasicTable.Tr
                            key={index}
                            isClicked={selectSptNo === item.sptNo}
                            onClick={() => {
                              if (selectSptNo === item.sptNo) {
                                setSelectSptNo("");
                              } else {
                                setSelectSptNo(item.sptNo);
                              }
                            }}
                          >
                            <BasicTable.Td>{item.cmpnm}</BasicTable.Td>
                            <BasicTable.Td>{item.sptNm}</BasicTable.Td>
                            <BasicTable.Td>{item.telCnt}</BasicTable.Td>
                          </BasicTable.Tr>
                        );
                      })}
                    </BasicTable.Tbody>
                  </BasicTable>
                </TableBox.Inner>
              </Stack>
              <TableBox width={"80%"} height={"100%"} gap={1}>
                <Stack width={"50%"} height={"100%"}>
                  <GrayBox
                    width={"100%"}
                    height={"40px"}
                    sx={{ direction: "row" }}
                    gap={1}
                    padding={1}
                  >
                    <Select
                      sx={{ width: "150px" }}
                      value={selectValue} // 선택한 값 유지
                      onChange={(e) => {
                        const newValue = e.target.value; // 선택된 값 (commnSeNm)
                        const selectedOption = deviceSectionData.find(
                          (item) => item.commnSeNm === newValue
                        );

                        if (selectedOption) {
                          console.log("구분값 변경:", selectedOption.commnSeNm);
                          console.log(`구분값 키 변경: ${selectedOption.commnSeNo}`); // cd 콘솔 출력
                          setDeviceSectionDataKey(selectedOption.commnSeNo);
                          setDeviceSectionDataValue(selectedOption.commnSeNm);
                          handleChange(e); // selectValue를 업데이트
                        }
                      }}
                      selectData={deviceSectionData.map((item) => ({
                        value: item.commnSeNm,
                        data: item.commnSeNm,
                      }))}
                      placeholder={"항목선택"}
                    />
                    <Box width={"125px"} >
                      <Calendar selectedDate={date} setSelectedDate={handleDateChange} width={"100px"} />
                    </Box>
                    <BasicButton onClick={handlePrevDate}>
                      <MdArrowBackIos />
                      이전
                    </BasicButton>
                    <BasicButton onClick={handleNextDate}>
                      <MdArrowForwardIos />
                      이후
                    </BasicButton>
                    <BasicButton onClick={handleToday}>
                      <FaArrowDown />
                      오늘
                    </BasicButton>
                  </GrayBox>
                  <Stack width={"100%"} height={"100%"} overflow={"auto"} justifyContent={"space-between"}>
                    {/* 3번 테이블 */}
                    <TableBox.Inner>
                      <CheckboxTable
                        data={sptPermissionPhoneList?.data?.contents || []}
                        selectedRows={sptPermissionSelectedRows}
                        toggleRowsSelection={toggleSptPermissionRowsSelection}
                      >
                        <CheckboxTable.Thead>
                          <CheckboxTable.Tr>
                            <CheckboxTable.CheckboxTh keyName="telId" />
                            <CheckboxTable.Th>구분</CheckboxTable.Th>
                            <CheckboxTable.Th>전화번호</CheckboxTable.Th>
                            <CheckboxTable.Th>시작일</CheckboxTable.Th>
                            <CheckboxTable.Th>종료일</CheckboxTable.Th>
                          </CheckboxTable.Tr>
                        </CheckboxTable.Thead>

                        <CheckboxTable.Tbody>
                          {(sptPermissionPhoneList?.data?.contents || []).map((item) => (
                            <CheckboxTable.Tr key={item.telId} id={item.telId}>
                              <CheckboxTable.CheckboxTd
                                item={item}
                                keyName="telId"
                              />
                              <CheckboxTable.Td>{item.commnSeNm}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.telNo}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.cntrctBgnde}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.cntrctEndde}</CheckboxTable.Td>
                            </CheckboxTable.Tr>
                          ))}
                        </CheckboxTable.Tbody>
                      </CheckboxTable>
                    </TableBox.Inner>
                    <SearchResult total={sptPermissionPhoneList?.data?.totalCnt || 0} />
                  </Stack>
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
                    onClick={handleSptPermissionPhone}
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
                    onClick={handleSptNonPermissionPhone}
                  >
                    <BiChevronRight size={"24px"} />
                  </BasicButton>
                </Stack>
                <Stack width={"50%"} height={"100%"}>
                  <GrayBox width={"100%"}>
                    <Stack gap={1} direction={"row"}>
                      <Select
                        sx={{ width: "200px" }}
                        value={s_1} // 선택한 값 유지
                        onChange={(e) => {
                          const newValue = e.target.value; // 선택된 값 (commnSeNm)
                          const selectedOption = deviceSectionData.find(
                            (item) => item.commnSeNm === newValue
                          );

                          if (selectedOption) {
                            console.log("4구분값 변경:", selectedOption.commnSeNm);
                            console.log(`4구분값 키 변경: ${selectedOption.commnSeNo}`); // cd 콘솔 출력
                            setDeviceSectionDataKey_4(selectedOption.commnSeNo);
                            setDeviceSectionDataValue_4(selectedOption.commnSeNm);
                            o_1(e); // selectValue를 업데이트
                          }
                        }}
                        selectData={deviceSectionData.map((item) => ({
                          value: item.commnSeNm,
                          data: item.commnSeNm,
                        }))}
                        placeholder={"항목선택"}
                      // selectData={selectTestData}
                      // value={s_1}
                      // onChange={o_1}
                      />
                      <SearchInput
                        value={nonPermissionPhoneNo}
                        onChange={(e) => setNonPermissionPhoneNo(e.target.value)} // 검색어 입력값 업데이트
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleNonPermissionPhoneNoSearch(); // 검색 실행 함수 호출
                          }
                        }}
                        placeholder={"전화번호검색색"}
                      />
                    </Stack>
                  </GrayBox>
                  {/* 4번 테이블 */}
                  <TableBox.Inner>
                    <CheckboxTable
                      data={sptNonPermissionPhoneList?.data.contents || []}
                      selectedRows={sptNonPermissionPhoneRews}
                      toggleRowsSelection={togglesptNonPermissionPhone}
                    >
                      <CheckboxTable.Thead>
                        <CheckboxTable.Tr>
                          <CheckboxTable.CheckboxTh keyName="telId" />
                          <CheckboxTable.Th>구분</CheckboxTable.Th>
                          <CheckboxTable.Th>전화번호</CheckboxTable.Th>
                          <CheckboxTable.Th>할당여부</CheckboxTable.Th>
                          <CheckboxTable.Th>할당된현장명</CheckboxTable.Th>
                        </CheckboxTable.Tr>
                      </CheckboxTable.Thead>

                      <CheckboxTable.Tbody>
                        {(sptNonPermissionPhoneList?.data.contents || []).map((item) => (
                          <CheckboxTable.Tr key={item.telId} id={item.telId}>
                            <CheckboxTable.CheckboxTd
                              item={item}
                              keyName="telId"
                            />
                            <CheckboxTable.Td>{item.commnSeNm}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.telNo}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.sptYn}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.sptNm}</CheckboxTable.Td>
                          </CheckboxTable.Tr>
                        ))}
                      </CheckboxTable.Tbody>
                    </CheckboxTable>
                  </TableBox.Inner>
                  <SearchResult total={sptNonPermissionPhoneList?.data.totalCnt || 0} />
                </Stack>
              </TableBox>
            </TableBox>
            <TableBox width={"100%"} height={"50%"} gap={1}>
              <Stack width={"20%"} height={"100%"} gap={1}>
                <SearchInput
                  placeholder="구성원이름 검색"
                  sx={{ width: "200px", height: "40px" }}
                  value={memberName}
                  onChange={(e) => setMemeberName(e.target.value)} // 검색어 입력값 업데이트
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleCompanyMemberSearch(); // 검색 실행 함수 호출
                    }
                  }}
                ></SearchInput>
                {/* 5번 테이블 */}
                <TableBox.Inner>
                  <BasicTable data={memberLocalList?.data.contents || []}>
                    <BasicTable.Th>회사이름</BasicTable.Th>
                    <BasicTable.Th>현장이름</BasicTable.Th>
                    <BasicTable.Th>구성원이름</BasicTable.Th>
                    <BasicTable.Tbody>
                      {(memberLocalList?.data.contents || []).map((item, index) => {
                        return (
                          <BasicTable.Tr
                            key={index}
                            isClicked={idx === item.constntNo}
                            onClick={() => {
                              if (idx === item.constntNo) {
                                setIdx(""); // 선택 해제
                                setSelectMemberNo(""); // 선택 해제 시 userNo도 초기화
                              } else {
                                setIdx(item.constntNo); // 새로운 idx 선택
                                setSelectMemberNo(item.constntNo); // 선택한 idx에 해당하는 userNo 저장
                              }
                            }}
                          >
                            <BasicTable.Td>{item.cmpnm}</BasicTable.Td>
                            <BasicTable.Td>{item.sptNm}</BasicTable.Td>
                            <BasicTable.Td>{item.constntNm}</BasicTable.Td>
                          </BasicTable.Tr>
                        );
                      })}
                    </BasicTable.Tbody>
                  </BasicTable>
                </TableBox.Inner>
              </Stack>
              <TableBox width={"80%"} height={"100%"} gap={1}>
                <Stack width={"50%"} height={"100%"}>
                  <GrayBox
                    width={"100%"}
                    height={"40px"}
                    sx={{ direction: "row" }}
                    gap={1}
                    padding={1}
                  >
                    <Select
                      sx={{ width: "150px" }}
                      value={selectValue_6} // 선택한 값 유지
                      onChange={(e) => {
                        const newValue = e.target.value; // 선택된 값 (commnSeNm)
                        const selectedOption = deviceSectionData.find(
                          (item) => item.commnSeNm === newValue
                        );

                        if (selectedOption) {
                          console.log("구분값 변경:", selectedOption.commnSeNm);
                          console.log(`구분값 키 변경: ${selectedOption.commnSeNo}`); // cd 콘솔 출력
                          setDeviceSectionDataKey_6(selectedOption.commnSeNo);
                          setDeviceSectionDataValue_6(selectedOption.commnSeNm);
                          handleChange_6(e); // selectValue를 업데이트
                        }
                      }}
                      selectData={deviceSectionData.map((item) => ({
                        value: item.commnSeNm,
                        data: item.commnSeNm,
                      }))}
                      placeholder={"항목선택"}
                    />
                    <Box width={"125px"}>
                      <Calendar selectedDate={date6} setSelectedDate={handleDateChange6} />
                    </Box>
                    <BasicButton onClick={handlePrevDate6}>
                      <MdArrowBackIos />
                      이전
                    </BasicButton>
                    <BasicButton onClick={handleNextDate6}>
                      <MdArrowForwardIos />
                      이후
                    </BasicButton>
                    <BasicButton onClick={handleToday6}>
                      <FaArrowDown />
                      오늘
                    </BasicButton>
                  </GrayBox>
                  {/* 6번 테이블 */}
                  <TableBox.Inner>
                    <BasicTable data={memPermissionPhoneListData?.data.contents || []}>
                      <BasicTable.Th>사용자ID</BasicTable.Th>
                      <BasicTable.Th>사용자이름</BasicTable.Th>

                      <BasicTable.Tbody>
                        {(memPermissionPhoneListData?.data.contents || []).map((item, index) => {
                          return (
                            <BasicTable.Tr
                              key={index}
                              isClicked={memPermissionPhoneRews.has(item.telId)}
                              onClick={() => togglememPermissionPhone(item.telId)}
                            >
                              <BasicTable.Td>{item.userNo}</BasicTable.Td>
                              <BasicTable.Td>{item.commnSeNm}</BasicTable.Td>
                            </BasicTable.Tr>
                          );
                        })}
                      </BasicTable.Tbody>
                    </BasicTable>
                  </TableBox.Inner>
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
                    <BiChevronRight size={"24px"} />
                  </BasicButton>
                </Stack>
                <Stack width={"50%"} height={"100%"}>
                  <GrayBox width={"100%"}>
                    <Stack gap={1} direction={"row"}>
                      <Select
                        sx={{ width: "200px" }}
                        value={selectValue_7}
                        onChange={(e) => {
                          const newValue = e.target.value; // 선택된 값 (commnSeNm)
                          const selectedOption = deviceSectionData.find(
                            (item) => item.commnSeNm === newValue
                          );
                          if (selectedOption) {
                            console.log("4구분값 변경:", selectedOption.commnSeNm);
                            console.log(`4구분값 키 변경: ${selectedOption.commnSeNo}`); // cd 콘솔 출력
                            setDeviceSectionDataKey_7(selectedOption.commnSeNo);
                            setDeviceSectionDataValue_7(selectedOption.commnSeNm);
                            handleChange_7(e); // selectValue를 업데이트
                          }
                        }}
                        selectData={deviceSectionData.map((item) => ({
                          value: item.commnSeNm,
                          data: item.commnSeNm,
                        }))}
                        placeholder={"항목선택"}
                      />
                      <SearchInput
                        value={memNonPermissionPhoneNo}
                        onChange={(e) => setMemNonPermissionPhoneNo(e.target.value)} // 검색어 입력값 업데이트
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleMemNonPermissionSearch(); // 검색 실행 함수 호출
                          }
                        }}
                        placeholder={"전화번호 검색"}
                      />
                    </Stack>
                  </GrayBox>
                  {/* 7번 테이블 */}
                  <TableBox.Inner>
                    <BasicTable data={memNonPermissionPhoneData?.data?.contents || []}>
                      <BasicTable.Th>구분</BasicTable.Th>
                      <BasicTable.Th>전화번호</BasicTable.Th>
                      <BasicTable.Th>할당여부</BasicTable.Th>
                      <BasicTable.Th>할당된현장이름</BasicTable.Th>
                      <BasicTable.Tbody>
                        {(memNonPermissionPhoneData?.data?.contents || []).map((item, index) => {
                          return (
                            <BasicTable.Tr
                              key={index}
                              isClicked={userSelectedRow.has(item.telId)}
                              onClick={() => toggleUserRowSelection(item.telId)}
                            >
                              <BasicTable.Td>{item.commnSeNm}</BasicTable.Td>
                              <BasicTable.Td>{item.telNo}</BasicTable.Td>
                              <BasicTable.Td>{item.constntYN}</BasicTable.Td>
                              <BasicTable.Td>{item.sptNo}</BasicTable.Td>
                            </BasicTable.Tr>
                          );
                        })}
                      </BasicTable.Tbody>
                    </BasicTable>
                  </TableBox.Inner>
                  <SearchResult total={memNonPermissionPhoneData?.data.totalCnt || 0} />
                </Stack>
              </TableBox>
            </TableBox>
          </Stack>
        </TableBox>
      </Stack>
    </>
  );
}
