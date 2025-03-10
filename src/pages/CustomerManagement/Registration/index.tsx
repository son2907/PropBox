import { Box, Stack, Typography, useEventCallback } from "@mui/material";
import GroupInfo from "./GroupInfo";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import { BasicButton } from "../../../components/Button";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicInput from "../../../components/Input/BasicInput";
import { Select } from "../../../components/Select";
import { selectTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import CustomerInfo from "./CustomerInfo";
import React, { useEffect, useState } from "react";
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { Pagination } from "../../../components/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import TableSelect from "../../../components/Select/TableSelect";
import { useTableSelect } from "../../../hooks/useTableSelect";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import { getCumstomerList, getCustomerDetailList, getCustomerGroupHeaderList } from "../../../api/CustomerManagement";
import { useAuthStore } from "../../../stores/authStore";
import { useSptStore } from "../../../stores/sptStore";
import { CustomerGroupListHeaderListType } from "../../../types/CustomerManagement";

export default function Registration() {

  //api를 호출하기위해 sptNo 불러오기
  const { sptNo } = useSptStore();

  //-------------------------왼쪽 테이블 조회
  // 왼쪽 테이블 페이징 기능
  const [currentPage, setCurrentPage] = React.useState(1);
  const onChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
    console.log(`현재 페이지: ${newPage}`); // 콘솔에 현재 페이지 출력
  };

  const { countValues: c_0, selectValue: s_0, handleChange: h_0 } = useTableSelect();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    setSearchQuery(searchInput); // 검색어 업데이트
    //console.log("검색 실행:", searchQuery);
    // 검색 로직 추가 (API 호출)
  };

  const [customerListReqData, setCustomerListReqData] = useState({ sptNo: sptNo, cstmrNm: searchQuery, page: currentPage, limit: s_0 });
  const { data: customerList, refetch: refetchCustomerList } = getCumstomerList(customerListReqData);
  const [selectCustomerGroupNum, setSelectCustomerGroupNum] = useState("");

  useEffect(() => {
    setCustomerListReqData((prev) => ({
      ...prev,
      sptNo: sptNo,
      cstmrNm: searchQuery,
    }))
  }, [searchQuery, currentPage,]);

  //---------------------------오른쪽 테이블 조회
  //오른쪽 테이블 페이징 기능
  const [detailCurrentPage, setDetailCurrentPage] = React.useState(1);
  const onChangePagedetail = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
    console.log(`현재 페이지: ${newPage}`); // 콘솔에 현재 페이지 출력
  };

  const { countValues: c_1, selectValue: s_1, handleChange: h_1 } = useTableSelect();

  const [coustomerDetailReqData, setCoustomerDetailReqData] = useState({ sptNo: sptNo, groupNo: selectCustomerGroupNum, cstmrNm: searchQuery, page: detailCurrentPage, limit: s_1 })
  const { data: customerDetail, refetch: refetchCustomerDetail } = getCustomerDetailList(coustomerDetailReqData);

  const [category, setCategory] = useState("");

  //헤더 조회
  const [headerListReqData, setHeaderListReqData] = useState({ sptNo: sptNo, groupNo: selectCustomerGroupNum });
  const { data: customerGroupHeaderListData, refetch: refetchCustomerGroupHeaderListData } = getCustomerGroupHeaderList(headerListReqData);
  const [customerGroupHeaderList, setCustomerGroupHeaderList] = useState<CustomerGroupListHeaderListType>();

  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );
  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함

  const { selectedRows, toggleRowsSelection } = useMultiRowSelection(); // 체크박스는 보통 여러개가 가능하므로 useMultiRowSelection 권장

  //엑셀업로드 팝업 오픈
  const uploadRegistration = {
    url: PathConstants.Customer.RegistrationUpload,
    windowName: "고객엑셀등록",
    windowFeatures: "width=1200,height=500,scrollbars=yes,resizable=yes",
  };

  //고객 그룹관리 팝업 오픈
  const GroupManagement = {
    url: PathConstants.Customer.CustomerGroupManagement,
    windowName: "고객그룹관리",
    windowFeatures: "width=1066,height=1000,scrollbars=yes,resizable=yes",
  };

  //sms전송 팝업
  const smsSendPopup = {
    url: PathConstants.Call.SmsSending,
    windowFeatures: "width=1000,height=700,scrollbars=yes,resizable=yes",
    windowName: "sms 전송",
  }

  useEffect(() => {
    console.log("고객 리스트 확인:", customerList?.data.contents);
  }, [customerList]);

  useEffect(() => {
    setCoustomerDetailReqData((prev) => ({
      ...prev,
      sptNo: sptNo,
      cstmrNm: searchQuery,
      groupNo: selectCustomerGroupNum,

    }))
  }, [selectCustomerGroupNum]);

  useEffect(() => {
    setHeaderListReqData((prev) => ({
      ...prev,
      sptNo: sptNo,
      groupNo: selectCustomerGroupNum,
    }));
  }, [selectCustomerGroupNum]);

  useEffect(() => {
    if (customerGroupHeaderListData?.data.contents) {
      setCustomerGroupHeaderList(customerGroupHeaderListData.data.contents);
    }
  }, [customerGroupHeaderListData]);

  return (
    <>
      <Stack width={"100%"} height={"100%"} gap={1} marginBottom={1}>
        <TableBox gap={1}>
          <Stack width={"80%"} height={"100%"} gap={1}>
            <GrayBox gap={2} justifyContent="space-between">
              <Stack direction="row" gap={1}>
                <SearchInput
                  placeholder="검색"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)} // 검색어 입력값 업데이트
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearch(); // 검색 실행 함수 호출
                    }
                  }}
                />
                <BasicButton sx={{ color: "root.mainBlue", border: 1 }}
                  onClick={() => {
                    openPopup({
                      url: smsSendPopup.url,
                      windowName: smsSendPopup.windowName,
                      windowFeatures: smsSendPopup.windowFeatures,
                    });
                  }}
                >
                  SMS 전송
                </BasicButton>
              </Stack>
              <Stack direction="row" gap={1}>
                <BasicButton
                  onClick={() => {
                    openPopup({
                      url: GroupManagement.url,
                      windowName: GroupManagement.windowName,
                      windowFeatures: GroupManagement.windowFeatures,
                    });
                  }}
                >
                  그룹관리
                </BasicButton>
                <BasicButton
                  onClick={() => {
                    openPopup({
                      url: uploadRegistration.url,
                      windowName: uploadRegistration.windowName,
                      windowFeatures: uploadRegistration.windowFeatures,
                    });
                  }}
                >
                  엑셀등록
                </BasicButton>
              </Stack>
              <Stack direction="row" gap={1}>
                <BasicButton>엑셀저장</BasicButton>
              </Stack>
            </GrayBox>
            <TableBox gap={1} width={"100%"} height={"95%"}>
              <Stack width={"30%"} height={"100%"} gap={1}>
                <TableBox.Inner>
                  <BasicTable data={customerList?.data?.contents || []}>
                    <BasicTable.Th>구분</BasicTable.Th>
                    <BasicTable.Th>그룹명칭</BasicTable.Th>
                    <BasicTable.Th>등록건수</BasicTable.Th>
                    <BasicTable.Tbody>
                      {(customerList?.data?.contents || []).map((item, index) => {
                        return (
                          <BasicTable.Tr
                            key={index}
                            isClicked={selectCustomerGroupNum === item.groupNo}
                            onClick={() => {
                              if (selectCustomerGroupNum === item.groupNo) {
                                setSelectCustomerGroupNum("");
                                setCategory("");
                              } else {
                                setSelectCustomerGroupNum(item.groupNo);
                                setCategory(item.seNm);
                              }
                            }}
                          >
                            <BasicTable.Td>{item.seNm}</BasicTable.Td>
                            <BasicTable.Td>{item.groupNm}</BasicTable.Td>
                            <BasicTable.Td>{item.groupCnt}</BasicTable.Td>
                          </BasicTable.Tr>
                        );
                      })}
                    </BasicTable.Tbody>
                  </BasicTable>
                </TableBox.Inner>
                <GrayBox gap={1} justifyContent={"space-between"}>
                  <Pagination
                    count={customerList?.data.totalPage || 1}
                    page={currentPage}
                    onChange={onChangePage}
                  />
                  <TableSelect
                    total={customerList?.data.totalCnt || 0}
                    countValues={c_0}
                    selectValue={s_0}
                    handleChange={h_0}
                  />
                </GrayBox>
              </Stack>
              <Stack width={"70%"} height={"100%"} gap={1}>
                {category === "솔루션" ? (
                  <>
                    <TableBox.Inner>
                      <CheckboxTable
                        data={customerDetail?.data?.contents || []}
                        selectedRows={selectedRows}
                        toggleRowsSelection={toggleRowsSelection}
                      >
                        <CheckboxTable.Thead>
                          <CheckboxTable.Tr>
                            <CheckboxTable.CheckboxTh keyName="cstmrNo" />
                            <CheckboxTable.Th>이름</CheckboxTable.Th>
                            <CheckboxTable.Th>휴대전화</CheckboxTable.Th>
                            <CheckboxTable.Th>일반전화</CheckboxTable.Th>
                            <CheckboxTable.Th>고객정보</CheckboxTable.Th>
                            <CheckboxTable.Th>주소</CheckboxTable.Th>
                            <CheckboxTable.Th>등록일자</CheckboxTable.Th>
                          </CheckboxTable.Tr>
                        </CheckboxTable.Thead>

                        <CheckboxTable.Tbody>
                          {(customerDetail?.data?.contents || []).map((item) => (
                            <CheckboxTable.Tr key={item.cstmrNo} id={item.cstmrNo}>
                              <CheckboxTable.CheckboxTd item={item} keyName="cstmrNo" />
                              <CheckboxTable.Td>{item.cstmrNm}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.mbtlNo}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.telNo}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.cstmrRmk}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.addr}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.regDtm}</CheckboxTable.Td>
                            </CheckboxTable.Tr>
                          ))}
                        </CheckboxTable.Tbody>
                      </CheckboxTable>
                    </TableBox.Inner>
                    <GrayBox gap={1} justifyContent={"space-between"}>
                      <Pagination
                        count={customerDetail?.data?.totalPage || 1}
                        page={detailCurrentPage}
                        onChange={onChangePagedetail}
                      />
                      <TableSelect
                        total={customerDetail?.data?.totalCnt || 0}
                        countValues={c_1}
                        selectValue={s_1}
                        handleChange={h_1}
                      />
                    </GrayBox>
                  </>
                ) : (
                  <>
                    <TableBox.Inner style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                      <CheckboxTable
                        data={customerDetail?.data?.contents || []}
                        selectedRows={selectedRows}
                        toggleRowsSelection={toggleRowsSelection}

                      >
                        <CheckboxTable.Thead>
                          <CheckboxTable.Tr>
                            <CheckboxTable.CheckboxTh keyName="cstmrNo" />
                            <CheckboxTable.Th style={{ minWidth: "120px" }}>이름</CheckboxTable.Th>
                            <CheckboxTable.Th style={{ minWidth: "150px" }}>휴대전화</CheckboxTable.Th>
                            <CheckboxTable.Th style={{ minWidth: "150px" }}>일반전화</CheckboxTable.Th>
                            <CheckboxTable.Th style={{ minWidth: "200px" }}>고객정보</CheckboxTable.Th>
                            <CheckboxTable.Th style={{ minWidth: "200px" }}>주소</CheckboxTable.Th>
                            <CheckboxTable.Th style={{ minWidth: "200px" }}>등록일자</CheckboxTable.Th>
                            {customerGroupHeaderList &&
                              Object.keys(customerGroupHeaderList)
                                .filter((key) => key.startsWith("hder")) // "hder01" ~ "hder10" 필터링
                                .map((key, index) => (
                                  <CheckboxTable.Th key={index} style={{ minWidth: "200px" }}>
                                    {customerGroupHeaderList[key as keyof CustomerGroupListHeaderListType]}
                                  </CheckboxTable.Th>
                                ))}
                          </CheckboxTable.Tr>
                        </CheckboxTable.Thead>
                        <CheckboxTable.Tbody>
                          {(customerDetail?.data?.contents || []).map((item) => (
                            <CheckboxTable.Tr key={item.cstmrNo} id={item.cstmrNo}>
                              <CheckboxTable.CheckboxTd item={item} keyName="cstmrNo" />
                              <CheckboxTable.Td>{item.cstmrNm}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.mbtlNo}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.telNo}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.cstmrRmk}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.addr}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.regDtm}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.hder01}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.hder02}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.hder03}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.hder04}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.hder05}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.hder06}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.hder07}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.hder08}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.hder09}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.hder10}</CheckboxTable.Td>
                            </CheckboxTable.Tr>
                          ))}
                        </CheckboxTable.Tbody>
                      </CheckboxTable>
                    </TableBox.Inner>
                    <GrayBox gap={1} justifyContent={"space-between"}>
                      <Pagination
                        count={customerDetail?.data?.totalPage || 1}
                        page={currentPage}
                        onChange={onChangePage}
                      />
                      <TableSelect
                        total={customerDetail?.data?.totalCnt || 0}
                        countValues={c_1}
                        selectValue={s_1}
                        handleChange={h_1}
                      />
                    </GrayBox>
                  </>
                )}
              </Stack>
            </TableBox>
          </Stack>
          <Stack width={"20%"} height={"100%"} gap={1}>
            <GrayBox>
              <Typography fontSize={"20px"} fontWeight="bold">
                고객 정보
              </Typography>
            </GrayBox>
            {category === "기본" ? (
              <>
                <GrayBox
                  flexDirection={"column"}
                  width={"100%"}
                  height={"100%"}
                  gap={1}
                  overflow="auto"
                  alignItems="start"
                >
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>고객이름</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>휴대전화</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>일반전화</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>고객정보</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>주소</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>관리지역</LabelTypo>
                    {/* height: 24px */}
                    <Select
                      value={selectValue}
                      onChange={handleChange}
                      selectData={selectListData}
                      sx={{ width: "80%" }}
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
                    <LabelTypo width={"100%"}>호응도</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>희망평형</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>특기사항</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
                  </Box>

                  {/* {Array.from({ length: 40 }).map((_, index) => (
                    <Box
                      key={index}
                      display="flex"
                      flexDirection="column" // 세로 방향 설정
                      flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                      justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                      width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                      gap={1}
                    >
                      <LabelTypo>기본정보</LabelTypo>
                      <BasicInput sx={{ minHeight: "24px" }} />
                    </Box>
                  ))} */}
                  {Array.from({ length: 40 }).map((_, index) => (
                    <Box
                      key={index}
                      display="flex"
                      flexDirection="column" // 세로 방향 설정
                      flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                      justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                      width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                      gap={1}
                    >
                      <LabelTypo>기본정보</LabelTypo>
                      {/* height: 24px */}
                      <BasicInput sx={{ minHeight: "24px" }} />
                    </Box>
                  ))}
                </GrayBox>
              </>
            ) : (

              <>
                <GrayBox
                  flexDirection={"column"}
                  width={"100%"}
                  height={"100%"}
                  gap={1}
                  //overflow="auto"
                  alignItems="start"
                >
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>고객이름</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>휴대전화</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>일반전화</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>고객정보</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>주소</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>관리지역</LabelTypo>
                    {/* height: 24px */}
                    <Select
                      value={selectValue}
                      onChange={handleChange}
                      selectData={selectListData}
                      sx={{ width: "80%" }}
                    />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>상담사</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>희망평형</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>광고매체</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>예금종류</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
                  </Box>
                  {/* {Array.from({ length: 40 }).map((_, index) => (
                  <Box
                    key={index}
                    display="flex"
                    flexDirection="column" // 세로 방향 설정
                    flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo>예금종류</LabelTypo>
                    
                    <BasicInput sx={{ minHeight: "24px" }} />
                  </Box>
                ))} */}
                </GrayBox>
              </>
            )}

          </Stack>
        </TableBox>
      </Stack>
    </>
  );
}
