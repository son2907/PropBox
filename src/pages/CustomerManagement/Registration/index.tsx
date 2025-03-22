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
import React, { useEffect, useMemo, useState } from "react";
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
import { customerSingleDelete, customerSingleUpdate, getCumstomerList, getCustmoerDetailTop, getCustomerDetailBottom, getCustomerDetailList, getCustomerGroupHeaderList, getCustomerManagementArea } from "../../../api/CustomerManagement";
import { useAuthStore } from "../../../stores/authStore";
import { useSptStore } from "../../../stores/sptStore";
import { CustomerDetailListType, CustomerGroupListHeaderListType, CustomerManagementAreaType } from "../../../types/CustomerManagement";
import { object } from "yup";
import { useForm } from "react-hook-form";
import useModal from "../../../hooks/useModal";
import { UpdateCompletedModal } from "../../../components/Modal/modal/UpdateCompletedModal";
import { ConfirmDeleteModal } from "../../../components/Modal/modal/ConfirmDeleteModal";
import { EmptySelectModal } from "../../../components/Modal/modal/EmptySelectModal";

export default function Registration() {

  //모달
  const { openModal, closeModal } = useModal();

  //api를 호출하기위해 sptNo 불러오기
  const { sptNo } = useSptStore();

  //input들 초기값
  const [cstmrNm, setCstmrNm] = useState("");
  const [mbtlNo, setMbtlNo] = useState("");
  const [telNo, setTelNo] = useState("");
  const [cstmrRmk, setCstmrRmk] = useState("");
  const [addr, setAddr] = useState("");
  const [areaNm, setAreaNm] = useState("");
  const [headers, setHeaders] = useState<{ [key: string]: string }>({});
  //-------------------------왼쪽 테이블 조회
  // 왼쪽 테이블 페이징 기능
  const { currentPage, onChangePage } = usePagination();

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
  const { currentPage: detailCurrentPage, onChangePage: onChangePagedetail } = usePagination();

  const { countValues: c_1, selectValue: s_1, handleChange: h_1 } = useTableSelect();

  const [coustomerDetailReqData, setCoustomerDetailReqData] = useState({ sptNo: sptNo, groupNo: selectCustomerGroupNum, cstmrNm: searchQuery, page: detailCurrentPage, limit: s_1 })
  const { data: customerDetailList, refetch: refetchCustomerDetailList } = getCustomerDetailList(coustomerDetailReqData);
  const [customerDetailListData, setCustomerDetailListData] = useState<CustomerDetailListType[]>([]);

  const [category, setCategory] = useState("");

  useEffect(() => {
    console.log("그룹번호:", selectCustomerGroupNum);
    console.log("그룹데이터:", coustomerDetailReqData);
  }, [selectCustomerGroupNum]);

  //헤더 조회
  const [headerListReqData, setHeaderListReqData] = useState({ sptNo: sptNo, groupNo: selectCustomerGroupNum });
  const { data: customerGroupHeaderListData, refetch: refetchCustomerGroupHeaderListData } = getCustomerGroupHeaderList(headerListReqData);
  const [customerGroupHeaderList, setCustomerGroupHeaderList] = useState<CustomerGroupListHeaderListType>();

  //------------------------오른쪽 고객 정보 조회
  const { data: customerArea, refetch: refetchCustomerArea } = getCustomerManagementArea(sptNo);
  const [customerAreaData, setCustomerAreaData] = useState<CustomerManagementAreaType[]>([]);

  useEffect(() => {
    if (customerArea?.data.contents) {
      setCustomerAreaData(customerArea.data.contents);
    }
  }, [customerArea]);



  const [selectAreaNm, setSelectAreaNm] = useState("");
  const [selectAreaNo, setSelectAreaNo] = useState("");
  const [customerNum, setCustomerNum] = useState("")
  const [customerDetailReqData, setCustomerDetailReqData] = useState({ sptNo: sptNo, groupNo: selectCustomerGroupNum, cstmrNo: customerNum });
  const { data: customerDetailTop, refetch: refetchCustomerDetailTop } = getCustmoerDetailTop(customerDetailReqData);
  const { data: customerDetailBottom, refetch: refetchCustomerDetailBottom } = getCustomerDetailBottom(customerDetailReqData);
  const { selectedRow, toggleRowSelection } = useSingleRowSelection(); // 행 단일 선택, 배경색 변함

  //관리지역
  const { selectListData, selectValue, handleChange } = useSelect(
    useMemo(() => customerArea?.data.contents || [], [customerArea?.data.contents]),
    "areaNo", // 현장 번호
    "areaNm", // 현장명
  );

  const CustomerUpdateReqData = {
    body: {
      sptNo: sptNo,
      groupNo: selectCustomerGroupNum,
      cstmrNo: customerNum,
      cstmrNm: cstmrNm,
      mbtlNo: mbtlNo,
      telNo: telNo,
      addr: addr,
      hder01: headers.hder01 || "",
      hder02: headers.hder02 || "",
      hder03: headers.hder03 || "",
      hder04: headers.hder04 || "",
      hder05: headers.hder05 || "",
      hder06: headers.hder06 || "",
      hder07: headers.hder07 || "",
      hder08: headers.hder08 || "",
      hder09: headers.hder09 || "",
      hder10: headers.hder10 || ""
    }
  };

  const { mutate: customerUpdateAPI } = customerSingleUpdate();

  const [customerDeleteReqData, setCustomerDeleteReqData] = useState({ sptNo: sptNo, cstmrNo: customerNum });
  const { mutate: customerDeleteAPI } = customerSingleDelete();

  //기본일 경우 선택한 고객들
  const {
    selectedRows: nomalCustomerSelectedRows,
    toggleRowsSelection: toggleNomalCustomerRowsSelection,
  } = useMultiRowSelection();

  const {
    selectedRows: solutionCustomerSelectedRows,
    toggleRowsSelection: toggleSolutionCustomerRowsSelection,
  } = useMultiRowSelection();

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
    url: PathConstants.Customer.CustomerSmsSending,
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

    }));
    setHeaderListReqData((prev) => ({
      ...prev,
      sptNo: sptNo,
      groupNo: selectCustomerGroupNum,
    }));
    setCustomerNum(""); // groupNo가 변경될 때 customerNum 초기화
  }, [selectCustomerGroupNum]);

  useEffect(() => {
    setCoustomerDetailReqData((prev) => ({
      ...prev,
      sptNo: sptNo,
      cstmrNm: searchQuery,
      groupNo: selectCustomerGroupNum,
      page: detailCurrentPage,
      limit: s_1
    }));
  }, [detailCurrentPage, s_1])

  useEffect(() => {
    if (customerGroupHeaderListData?.data.contents) {
      setCustomerGroupHeaderList(customerGroupHeaderListData.data.contents);
    }
  }, [customerGroupHeaderListData]);

  useEffect(() => {
    if (customerNum) {
      setCustomerDetailReqData((prev) => ({
        ...prev,
        groupNo: selectCustomerGroupNum,
        cstmrNo: customerNum
      }));

      // customerNum 변경 시 두 개의 API를 호출
      //refetchCustomerDetailTop();
      refetchCustomerDetailBottom();
    }
  }, [customerNum]); // 의존성 배열에 customerNum 추가


  useEffect(() => {
    if (customerDetailTop?.data.contents) {
      setMbtlNo(customerDetailTop.data.contents.mbtlNo);
      setTelNo(customerDetailTop.data.contents.telNo);
      setCstmrRmk(customerDetailTop.data.contents.cstmrRmk);
      setAddr(customerDetailTop.data.contents.addr);
      setCstmrNm(customerDetailTop.data.contents.cstmrNm);
      setAreaNm(customerDetailTop.data.contents.addr);
    } else {
      setMbtlNo("");
      setTelNo("");
      setCstmrRmk("");
      setAddr("");
      setCstmrNm("");
    }
  }, [customerDetailTop]); // customerGroupHeaderList 변경 시 초기화

  useEffect(() => {
    if (customerDetailList?.data.contents) {
      setCustomerDetailListData(customerDetailList.data.contents);
    }
  }, [customerDetailList])

  // 특정 입력값 변경 핸들러
  const handleInputChange = (key: string, value: string) => {
    setHeaders((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdate = () => {
    if (selectCustomerGroupNum || customerNum) {
      console.log("수정 데이터 확인:", CustomerUpdateReqData);
      customerUpdateAPI(CustomerUpdateReqData, {
        onSuccess: (response) => {
          if (response.data.result === "SUCCESS") {
            console.log("수정완");
            updateCompletedModal();
          }
        }
      })
    }
  };

  //
  const handleSelectCustomer = (sptNo: string, groupNo: string) => {
    const customerList = Array.from(solutionCustomerSelectedRows).map((rowId) => {
      const selectedItem = customerDetailListData.find(
        (item) => item.cstmrNo === rowId
      );
      return {
        custmNo: selectedItem?.cstmrNo || "",
        //customerNm: selectedItem?.cstmrNm || "",
      };
    });

    console.log("고객번호 확인", customerList);
    localStorage.setItem("selectedCstmrNos", JSON.stringify(customerList));

    if (selectCustomerGroupNum && customerList) {
      openPopup({
        url: `${smsSendPopup.url}?sptNo=${sptNo}&groupNo=${groupNo}`,
        windowName: smsSendPopup.windowName,
        windowFeatures: smsSendPopup.windowFeatures,
      });
    } else {
      emptySelectionModal();
    }
  }

  const updateCompletedModal = () => {
    openModal(UpdateCompletedModal, {
      modalId: "UpdateCompletedModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.location.reload();
      },
    });
  };

  useEffect(() => {
    if (customerDetailBottom) {
      console.log("아래 데이터 확인", customerDetailBottom.data.contents);
    }
  }, [customerDetailBottom]);

  const confirmDeleteModal = (sptNo: string, cstmrNo: string) => {
    openModal(ConfirmDeleteModal, {
      modalId: "Delete",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        handleDelete(sptNo, cstmrNo); // 저장된 userSelectRow를 사용하여 삭제
      },
    });
  };

  const handleDelete = (sptNo: string, cstmrNo: string) => {
    const reqData = { sptNo, cstmrNo };

    console.log("삭제 데이터 확인:", reqData);

    if (sptNo || cstmrNo) {
      customerDeleteAPI(reqData, {
        onSuccess: (response) => {
          if (response.data.result === "SUCCESS") {
            console.log("response.data", response.data);
            refetchCustomerDetailList(); // 성공 시 목록 새로고침
          }
        },
        onError: (error) => {
          console.error("그룹 삭제 실패:", error);
        }
      });
    } else {
      //선택된 그룹 또는 고객이 없을경우
      emptySelectionModal();
    };
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
                  onClick={() => { handleSelectCustomer(sptNo, selectCustomerGroupNum) }}
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
                        data={customerDetailList?.data?.contents || []}
                        selectedRows={solutionCustomerSelectedRows}
                        toggleRowsSelection={toggleSolutionCustomerRowsSelection}
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
                            <CheckboxTable.Th>상세보기</CheckboxTable.Th>
                          </CheckboxTable.Tr>
                        </CheckboxTable.Thead>

                        <CheckboxTable.Tbody>
                          {(customerDetailList?.data?.contents || []).map((item) => (
                            <CheckboxTable.Tr key={item.cstmrNo} id={item.cstmrNo}>
                              <CheckboxTable.CheckboxTd item={item} keyName="cstmrNo" />
                              <CheckboxTable.Td>{item.cstmrNm}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.mbtlNo}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.telNo}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.cstmrRmk}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.addr}</CheckboxTable.Td>
                              <CheckboxTable.Td>{item.regDtm}</CheckboxTable.Td>
                              <CheckboxTable.Td>
                                <BasicButton onClick={() => {
                                  setCustomerNum(item.cstmrNo);
                                  //console.log("선택한 고객번호:",item.cstmrNo);
                                }}>
                                  상세보기
                                </BasicButton>
                              </CheckboxTable.Td>
                            </CheckboxTable.Tr>
                          ))}
                        </CheckboxTable.Tbody>
                      </CheckboxTable>
                    </TableBox.Inner>
                    <GrayBox gap={1} justifyContent={"space-between"}>
                      <Pagination
                        count={customerDetailList?.data?.totalPage || 1}
                        page={detailCurrentPage}
                        onChange={onChangePagedetail}
                      />
                      <TableSelect
                        total={customerDetailList?.data?.totalCnt || 0}
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
                        data={customerDetailList?.data?.contents || []}
                        selectedRows={solutionCustomerSelectedRows}
                        toggleRowsSelection={toggleSolutionCustomerRowsSelection}

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
                            <CheckboxTable.Th style={{ minWidth: "100px" }}>상세보기</CheckboxTable.Th>
                          </CheckboxTable.Tr>
                        </CheckboxTable.Thead>
                        <CheckboxTable.Tbody>
                          {(customerDetailList?.data?.contents || []).map((item) => (
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
                              <CheckboxTable.Td>
                                <BasicButton
                                  onClick={() => {
                                    setCustomerNum(item.cstmrNo);
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
                    <GrayBox gap={1} justifyContent={"space-between"}>
                      <Pagination
                        count={customerDetailList?.data?.totalPage || 1}
                        page={detailCurrentPage}
                        onChange={onChangePagedetail}
                      />
                      <TableSelect
                        total={customerDetailList?.data?.totalCnt || 0}
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
          <Stack width={"20%"} height={"100%"} overflow={"auto"}>
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
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>고객이름</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput
                      sx={{ minHeight: "24px", width: "60%" }}
                      value={cstmrNm ?? ""}
                    />
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
                    <BasicInput
                      sx={{ minHeight: "24px", width: "60%" }}
                      value={mbtlNo ?? ""}
                    />
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
                    <BasicInput
                      sx={{ minHeight: "24px", width: "60%" }}
                      value={telNo ?? ""}
                    />
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
                    <BasicInput sx={{ minHeight: "24px", width: "100%" }} value={cstmrRmk ?? ""} />
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
                    <BasicInput sx={{ minHeight: "24px", width: "100%" }} value={addr ?? ""} />
                  </Box>
                  {customerDetailBottom?.data &&
                    customerGroupHeaderList &&
                    Object.keys(customerGroupHeaderList) // customerGroupHeaderList의 hder01~hder10 순서대로 가져옴
                      .filter((key) => key.startsWith("hder"))
                      .map((key, index) => (
                        <Box
                          key={index}
                          display="flex"
                          flexDirection="column"
                          flexGrow={1}
                          justifyContent="flex-start"
                          width="100%"
                          gap={1}
                        >
                          <LabelTypo>{customerGroupHeaderList[key] || key}</LabelTypo> {/* LabelTypo에 헤더명 출력 */}
                          <BasicInput
                            sx={{ minHeight: "24px" }}
                            value={headers[key] ? headers[key] : customerDetailBottom.data.contents[0][key] || ""} // 해당 hder 값이 없으면 빈 문자열
                            onChange={(e) => handleInputChange(key, e.target.value)}
                          />
                        </Box>
                      ))}
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
                </GrayBox>
              </>
            ) : (
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
                    justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                    width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                    gap={1}
                  >
                    <LabelTypo width={"100%"}>고객이름</LabelTypo>
                    {/* height: 24px */}
                    <BasicInput
                      sx={{ minHeight: "24px", width: "60%" }}
                      value={cstmrNm ?? ""}
                    />
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
                    <BasicInput sx={{ minHeight: "24px", width: "60%" }} value={mbtlNo ?? ""} />
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
                    <BasicInput sx={{ minHeight: "24px", width: "60%" }} value={telNo ?? ""} />
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
                    <BasicInput sx={{ minHeight: "24px", width: "100%" }} value={cstmrRmk ?? ""} />
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
                    <BasicInput sx={{ minHeight: "24px", width: "100%" }} value={addr ?? ""} />
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
                      onChange={(e) => {
                        const newValue = e.target.value; // 선택된 값 (areaNm)

                        handleChange(e); // selectValue 상태 업데이트 (useSelect 훅 내부에서 처리)

                        const selectedOption = customerAreaData.find(
                          (item) => item.areaNm === newValue
                        ); // 선택된 옵션 객체

                        if (selectedOption) {
                          console.log(`관리지역 변경: ${selectedOption.areaNo}`); // 콘솔 출력
                          setSelectAreaNm(selectedOption.areaNm); // 선택한 지역명 상태 저장
                          setSelectAreaNo(selectedOption.areaNo); // 선택한 지역번호 상태 저장
                        }
                      }}
                      selectData={customerAreaData.map((item) => ({
                        value: item.areaNm, // 실제 선택 값
                        data: item.areaNm, // 기존 label 대신 data 사용
                      }))}
                      sx={{
                        "& .MuiSelect-select": {
                          backgroundColor: "primary.light",
                        },
                      }}
                      placeholder={areaNm || ""}
                    />
                  </Box>
                  {customerDetailBottom?.data.contents.map((item, index) => (
                    <Box
                      key={index}
                      display="flex"
                      flexDirection="column"
                      flexGrow={1}
                      justifyContent="flex-start"
                      width="100%"
                      gap={1}
                    >
                      <LabelTypo>{item.itemNm}</LabelTypo>
                      <BasicInput sx={{ minHeight: "24px" }} value={item.detailNm} readOnly />
                    </Box>
                  ))}
                </GrayBox>
              </>
            )}
            {category === "기본" ? (
              <GrayBox width={"100%"}>
                <Stack direction={"row"} width={"100%"} gap={1} justifyContent={"end"}>
                  <BasicButton>추가</BasicButton>
                  <BasicButton onClick={handleUpdate}>저장</BasicButton>
                  <BasicButton onClick={() => confirmDeleteModal(sptNo, customerNum)}>삭제</BasicButton>
                </Stack>
              </GrayBox>
            ) : (
              <></>
            )}
          </Stack>
        </TableBox>
      </Stack>
    </>
  );
}
