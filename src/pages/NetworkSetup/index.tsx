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
import { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa6";
import CheckboxTable from "../../components/Table/CheckboxTable";
import { BiChevronLeft } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import PathConstants from "../../routers/path";
import { openPopup } from "../../utils/openPopup";
import CenteredBox from "../../components/Box/CenteredBox";
import TableSelect from "../../components/Select/TableSelect";
import { getComapnyLocalList, getMemberLocalList, getUserCompanyList } from "../../api/networkSetup";
import { CompanyLocalListType, UserCompanyListType } from "../../types/networkSetup";

export default function NetworkSetup() {

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

  //목록 조회 - 1번 테이블
  const { data: userCompanyList, isSuccess: isUserCompanyList } = getUserCompanyList(searchQuery);
  const [userCompanyListData, setUserCompanyListData] = useState<UserCompanyListType[]>([]);
  const [selectUserNo, setSelectUserNo] = useState("");  //선택한 사용자 번호

  //현장 및 회사 목록 조회
  const [companyLocalSearch, setCompanyLocalSearch] = useState({ userNo: "", sptNm: "" });
  const { data: companyLocalList, refetch: companyLocalListRefetch } = getComapnyLocalList(companyLocalSearch)
  const [companyLocalListData, setCompanyLocalListData] = useState<CompanyLocalListType[]>([]);

  //회사와 구성원 조회
  const [companyName, setCompanyName] = useState("");
  const [searchQueryMem, setSearchQueryMem] = useState({userNo: "", constntNm: ""});
  const { data : memberLocalList,  refetch: refetchMemberLocalList} = getMemberLocalList(searchQueryMem);

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

  // 현장 허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: useSelectedRows,
    toggleRowsSelection: toggleUseRowsSelection,
  } = useMultiRowSelection();

  // 현장 미허가 솔루션 - 선택 상태 관리
  const {
    selectedRows: localUnuseSelectedRows,
    toggleRowsSelection: toggleLocalUnuseRowsSelection,
  } = useMultiRowSelection();

  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );
  const [date, setDate] = useState<Date>(new Date());

  //   수신동의 고객 select
  const { selectValue: s_1, handleChange: o_1 } = useSelect(
    selectTestData,
    "value",
    "data"
  );

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

  const handleCmpLocalSearch = () => {
    setCompanyLocalSearch((prev) => ({
      ...prev,
      userNo: selectUserNo,
      sptNm: sptNm
    }));
  };

  useEffect(() => {
    setCompanyLocalSearch((prev) => ({
      ...prev,
      userNo: selectUserNo,
      sptNm: sptNm
    }));
  }, [selectUserNo,sptNm]);

  const handleCompanyMemberSearch = () => {
    setSearchQueryMem((prev) => ({
      ...prev,
      userNo: selectUserNo,
      constntNm: companyName
    }));
  };

  useEffect(() => {
    setSearchQueryMem((prev) => ({
      ...prev,
      userNo: selectUserNo,
      constntNm: companyName || ""
    }));
  },[selectUserNo]);

  // 날짜 변경될 때마다 콘솔 출력
  useEffect(() => {
    console.log("현재 선택된 날짜:", formatDate(date));
  }, [date]);

  // 이전 날짜로 이동
  const handlePrevDate = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  // 이후 날짜로 이동
  const handleNextDate = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };

  // 오늘 날짜로 설정
  const handleToday = () => {
    setDate(new Date());
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
                {/* <BasicTable.Th>등록일자</BasicTable.Th> */}
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
                        {/* <BasicTable.Td>{item.hireDate}</BasicTable.Td> */}
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
                            isClicked={localSelectedRow.has(item.userNo)}
                            onClick={() => toggleLocalRowSelection(item.userNo)}
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
                    <Box width={"200px"}>
                      <Calendar selectedDate={date} setSelectedDate={setDate} />
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
                  <Stack width={"100%"} height={"100"} overflow={"auto"}>
                    {/* 3번 테이블 */}
                    <TableBox.Inner>
                      <CheckboxTable
                        data={tableTestData}
                        selectedRows={useSelectedRows}
                        toggleRowsSelection={toggleUseRowsSelection}
                      >
                        <CheckboxTable.Thead>
                          <CheckboxTable.Tr>
                            <CheckboxTable.CheckboxTh keyName="id" />
                            <CheckboxTable.Th>구분</CheckboxTable.Th>
                            <CheckboxTable.Th>전화번호</CheckboxTable.Th>
                            <CheckboxTable.Th>시작일</CheckboxTable.Th>
                            <CheckboxTable.Th>종료일</CheckboxTable.Th>
                            <CheckboxTable.Th>삭제</CheckboxTable.Th>
                          </CheckboxTable.Tr>
                        </CheckboxTable.Thead>

                        <CheckboxTable.Tbody>
                          {tableTestData.map((item) => (
                            <CheckboxTable.Tr key={item.id} id={item.id}>
                              <CheckboxTable.CheckboxTd
                                item={item}
                                keyName="id"
                              />
                              <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                              <CheckboxTable.Td>
                                <IconButton color="error">
                                  <RiDeleteBinLine />
                                </IconButton>
                              </CheckboxTable.Td>
                            </CheckboxTable.Tr>
                          ))}
                        </CheckboxTable.Tbody>
                      </CheckboxTable>
                    </TableBox.Inner>
                    <SearchResult total={100} />
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
                <Stack width={"50%"} height={"100%"}>
                  <GrayBox width={"100%"}>
                    <Stack gap={1} direction={"row"}>
                      <Select
                        sx={{ width: "200px" }}
                        selectData={selectTestData}
                        value={s_1}
                        onChange={o_1}
                      />
                      <SearchInput></SearchInput>
                    </Stack>
                  </GrayBox>
                  {/* 4번 테이블 */}
                  <TableBox.Inner>
                    <CheckboxTable
                      data={tableTestData}
                      selectedRows={useSelectedRows}
                      toggleRowsSelection={toggleUseRowsSelection}
                    >
                      <CheckboxTable.Thead>
                        <CheckboxTable.Tr>
                          <CheckboxTable.CheckboxTh keyName="id" />
                          <CheckboxTable.Th>구분</CheckboxTable.Th>
                          <CheckboxTable.Th>전화번호</CheckboxTable.Th>
                          <CheckboxTable.Th>할당여부</CheckboxTable.Th>
                          <CheckboxTable.Th>할당된현장명</CheckboxTable.Th>
                        </CheckboxTable.Tr>
                      </CheckboxTable.Thead>

                      <CheckboxTable.Tbody>
                        {tableTestData.map((item) => (
                          <CheckboxTable.Tr key={item.id} id={item.id}>
                            <CheckboxTable.CheckboxTd
                              item={item}
                              keyName="id"
                            />
                            <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                          </CheckboxTable.Tr>
                        ))}
                      </CheckboxTable.Tbody>
                    </CheckboxTable>
                  </TableBox.Inner>
                  <SearchResult total={100} />
                </Stack>
              </TableBox>
            </TableBox>
            <TableBox width={"100%"} height={"50%"} gap={1}>
              <Stack width={"20%"} height={"100%"} gap={1}>
                <SearchInput
                  placeholder="회사이름 검색"
                  sx={{ width: "200px", height: "40px" }}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)} // 검색어 입력값 업데이트
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
                            isClicked={companySelectedRow.has(item.userNo)}
                            onClick={() => toggleCompanyRowSelection(item.userNo)}
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
                    <Box width={"200px"}>
                      <Calendar selectedDate={date} setSelectedDate={setDate} />
                    </Box>
                    <BasicButton>
                      <MdArrowBackIos />
                      이전
                    </BasicButton>
                    <BasicButton>
                      <MdArrowForwardIos />
                      이후
                    </BasicButton>
                    <BasicButton>
                      <FaArrowDown />
                      오늘
                    </BasicButton>
                  </GrayBox>
                  {/* 6번 테이블 */}
                  <TableBox.Inner>
                    <CheckboxTable
                      data={tableTestData}
                      selectedRows={useSelectedRows}
                      toggleRowsSelection={toggleUseRowsSelection}
                    >
                      <CheckboxTable.Thead>
                        <CheckboxTable.Tr>
                          <CheckboxTable.CheckboxTh keyName="id" />
                          <CheckboxTable.Th>구분</CheckboxTable.Th>
                          <CheckboxTable.Th>전화번호</CheckboxTable.Th>
                          <CheckboxTable.Th>할당여부</CheckboxTable.Th>
                          <CheckboxTable.Th>할당된현장명</CheckboxTable.Th>
                        </CheckboxTable.Tr>
                      </CheckboxTable.Thead>

                      <CheckboxTable.Tbody>
                        {tableTestData.map((item) => (
                          <CheckboxTable.Tr key={item.id} id={item.id}>
                            <CheckboxTable.CheckboxTd
                              item={item}
                              keyName="id"
                            />
                            <CheckboxTable.Td>{item.name}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.phone}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                            <CheckboxTable.Td>{item.job}</CheckboxTable.Td>
                          </CheckboxTable.Tr>
                        ))}
                      </CheckboxTable.Tbody>
                    </CheckboxTable>
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
                    <BiChevronLeft size={"24px"} />
                  </BasicButton>
                </Stack>
                <Stack width={"50%"} height={"100%"}>
                  <GrayBox width={"100%"}>
                    <Stack gap={1} direction={"row"}>
                      <Select
                        sx={{ width: "200px" }}
                        selectData={selectTestData}
                        value={s_1}
                        onChange={o_1}
                      />
                      <SearchInput></SearchInput>
                    </Stack>
                  </GrayBox>
                  {/* 7번 테이블 */}
                  <TableBox.Inner>
                    <BasicTable data={tableTestData}>
                      <BasicTable.Th>구분</BasicTable.Th>
                      <BasicTable.Th>전화번호</BasicTable.Th>
                      <BasicTable.Th>할당여부</BasicTable.Th>
                      <BasicTable.Th>할당된현장이름</BasicTable.Th>
                      <BasicTable.Tbody>
                        {tableTestData.map((item, index) => {
                          return (
                            <BasicTable.Tr
                              key={index}
                              isClicked={userSelectedRow.has(item.id)}
                              onClick={() => toggleUserRowSelection(item.id)}
                            >
                              <BasicTable.Td>{item.phone}</BasicTable.Td>
                              <BasicTable.Td>{item.name}</BasicTable.Td>
                              <BasicTable.Td>{item.hireDate}</BasicTable.Td>
                              <BasicTable.Td>{item.age}</BasicTable.Td>
                            </BasicTable.Tr>
                          );
                        })}
                      </BasicTable.Tbody>
                    </BasicTable>
                  </TableBox.Inner>
                  <SearchResult total={100} />
                </Stack>
              </TableBox>
            </TableBox>
          </Stack>
        </TableBox>
      </Stack>
    </>
  );
}
