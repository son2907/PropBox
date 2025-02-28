import { Box, Stack, Typography } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import GrayBox from "../../../components/Box/GrayBox";
import SearchInput from "../../../components/Input/SearchInput";
import {
  BasicButton,
  IconButton,
  ToggleButton,
} from "../../../components/Button";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import { tableTestData, selectTestData } from "../../../utils/testData";
import SearchResult from "../../../components/Table/SearchResult";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import Calendar from "../../../components/Calendar/Calendar";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa6";
import CheckboxTable from "../../../components/Table/CheckboxTable";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicInput from "../../../components/Input/BasicInput";
import useToggleButtton from "../../../hooks/useToggleButton";
import TextArea from "../../../components/TextArea/TextArea";
import useModal from "../../../hooks/useModal";
import { useAuthStore } from "../../../stores/authStore";
import { getAllPhoneList, getPhoneDetail, getUserPhoneCount, getUserPhoneList, insertUserPhone, updatePhone, userUnsertPhone } from "../../../api/phoneManagement";
import { useForm } from "react-hook-form";
import { getDeviceSection, insertPhone } from "../../../api/networkSetup";
import { DeviceSectionListType } from "../../../types/networkSetup";
import { EmptyDataModal } from "../../../components/Modal/modal/EmptyDataModal";
import { InsertCompletedModal } from "../../../components/Modal/modal/InsertCompletedModal";
import PhoneInput from "../../../components/Input/PhoneInput";
import { PhoneDetailType, PhoneInsertType, PhoneUpdateType } from "../../../types/phoneManagement";
import { UpdateCompletedModal } from "../../../components/Modal/modal/UpdateCompletedModal";

export default function PhoneSetting() {

  //모달
  const { openModal, closeModal } = useModal();

  //api 호출을 위한 id호출
  const { loginId } = useAuthStore(["loginId"]);

  //추가인지 수정인지 state관리
  const [isUpdate, setIsUpdate] = useState(false);

  // 할당된 전화기 선택
  const {
    selectedRows: userPhoneSelectedRows,
    toggleRowsSelection: toggleuserPhoneRowsSelection,
  } = useMultiRowSelection();

  // 미할당된 전화기 선택
  const {
    selectedRows: unsertedPhoneSelectedRows,
    toggleRowsSelection: toggleunsertedPhoneRowsSelection,
  } = useMultiRowSelection();

  const [date, setDate] = useState<Date>(new Date());

  //사용자이름 검색
  const [searchQuery, setSearchQuery] = useState({ userNm: "" });
  const [userName, setUserName] = useState("");
  const { data: userPhoneCount, refetch: refetchUserPhoneCount } = getUserPhoneCount(searchQuery);
  const [selectUserNo, setSelectUserNo] = useState("");  //선택한 사용자 번호

  //선택된 사용자 전화기 리스트
  const { data: userPhoneList, refetch: refetchUserPhoneList } = getUserPhoneList(selectUserNo);

  //모든 전화기 리스트
  const [searchPhone, setSearchPhone] = useState("");
  const { data: allPhoneList, refetch: refetchAllPhoneList } = getAllPhoneList(searchPhone);

  //상세보기 선택
  const [selectDetailNo, setSelectDetailNo] = useState("");
  const { data: phoneDetail, refetch: refetchPhoneDetail } = getPhoneDetail(selectDetailNo);

  //장치구분
  const { data: deviceSection, refetch: refetchDeviceSection } =
    getDeviceSection();
  const [deviceSectionData, setDeviceSection] = useState<
    DeviceSectionListType[]
  >([]);
  const [deviceSectionDataKey, setDeviceSectionDataKey] = useState("");
  const [deviceSectionDataValue, setDeviceSectionDataValue] = useState("");

  const { selectListData, selectValue, handleChange } = useSelect(
    deviceSectionData,
    "commnSeNo",
    "commnSeNm"
  );

  //초기값
  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      telno: "",
      commnSeNo: "",
      lxtnNo: "",
      id: "",
      pwdNo: "",
      rmk: "",
    },
  });

  useEffect(() => {
    console.log("값 확인", selectDetailNo);
  }, [selectDetailNo]);

  //전화기 추가 api
  //const { mutate: insertPhoneAPI } = insertPhone();
  const insertPhoneAPI = insertPhone();
  //전화기 수정
  const updatePhoneAPI = updatePhone();

  //사용자에게 전화기 할당
  const insertUserPhoneAPI = insertUserPhone();

  const handleUserInsertPhone = () => {
    const selectData = Array.from(unsertedPhoneSelectedRows).map(
      (selectedId: string) => {
        const selectedItem = allPhoneList?.data.contents.find(
          (item) => item.telId === selectedId
        );
        return {
          userNo: selectUserNo,
          userNm: "",
          telId: selectedItem?.telId || "",
          cntrctBgnde: "",
          cntrctEndde: "",
          useYn: "",
          delYn: "",
          userId: loginId
        }
      }
    );

    console.log("할당시키기 전 보낼 데이터 확인:", selectData);

    insertUserPhoneAPI.mutate(
      { body: selectData },
      {
        onSuccess: (response) => {
          if (response.data.message === "SUCCESS") {
            refetchAllPhoneList();
            refetchUserPhoneList();
          }
        }
      }
    )
  };

  //전화기 회수
  const userUnsertPhoneAPI = userUnsertPhone();

  //사용자에게서 전화기 회수
  const handleUserUnsertPhone = () => {
    const selectData = Array.from(userPhoneSelectedRows).map(
      (selectedId: string) => {
        const selectedItem = userPhoneList?.data.contents.find(
          (item) => item.telId === selectedId
        );
        return {
          userNo: selectedItem?.userNo || "",
          telId: selectedItem?.telId || "",
        }
      }
    );

    console.log("사용자에게서 제외시키기위안 데이터 확인:", selectData);

    userUnsertPhoneAPI.mutate(
      { body: selectData },
      {
        onSuccess: (response) => {
          if (response.data.message === "SUCCESS") {
            refetchAllPhoneList();
            refetchUserPhoneList();
          }
        }
      }
    )
  };




  //   수신동의 고객 select
  const {
    selectListData: sd_1,
    selectValue: s_1,
    handleChange: o_1,
  } = useSelect(selectTestData, "value", "data");

  // 이 ref를 통해 textArea에 입력된 값에 접근할 수 있음
  const tRef1 = useRef<HTMLTextAreaElement>(null); // textArea에 연결해 줄 ref

  // 토글에 쓰이는거, defaultValue로 초기 클릭 여부 선택 가능
  const { toggle: receive, onChange: receiveToggle } = useToggleButtton({
    defaultValue: true,
  });

  //전화기 추가 팝업
  const phoneAddPopup = {
    url: PathConstants.System.PhoneAdd,
    windowName: "전화기 추가",
    windowFeatures: "width=500,height=500,scrollbars=yes,resizable=yes",
  };

  const handleSearch = () => {
    setSearchQuery((prev) => ({
      ...prev,
      userNm: userName,
    }));
  };

  //추가
  const handleAdd = () => {
    reset({
      telno: "",
      commnSeNo: "",
      lxtnNo: "",
      id: "",
      pwdNo: "",
      rmk: "",
    });
    setDeviceSectionDataKey("");
    setDeviceSectionDataValue("");
    setIsUpdate(false);
  };


  useEffect(() => {
    if (deviceSection?.data?.contents) {
      setDeviceSection(deviceSection.data.contents);
    }
  }, [deviceSection]);


  //모달
  const emptyDataModal = () => {
    openModal(EmptyDataModal, {
      modalId: "EmptyDataModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => closeModal,
    });
  };

  const insertCompletedModal = () => {
    openModal(InsertCompletedModal, {
      modalId: "InsertCompletedModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
        // 이전 창 새로 고침
        window.location.reload();
      },
    });
  };

  const updateCompletedModal = () => {
    openModal(UpdateCompletedModal, {
      modalId: "UpdateCompletedModal",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        window.close();
        // 이전 창 새로 고침
        if (window.opener) {
          window.opener.location.reload();
        }
      },
    });
  };

  useEffect(() => {
    if (phoneDetail?.data.contents) {
      console.log("상세값 확인 : ", phoneDetail.data.contents);
      setDeviceSectionDataKey(phoneDetail.data.contents.commnSeNo);
      setDeviceSectionDataValue(phoneDetail.data.contents.commnSeNm);
      reset({
        telno: phoneDetail?.data?.contents?.telno,
        lxtnNo: phoneDetail?.data?.contents?.lxtnNo,
        id: phoneDetail?.data?.contents?.id,
        pwdNo: phoneDetail.data.contents.pwdNo,
        rmk: phoneDetail.data.contents.rmk,
      });
    }
  }, [phoneDetail]);

  //저장 누르면 실행 = 저장 또는 수정
  const onSubmit = useCallback((data: any) => {
    
    console.log("업데이트입니까:", isUpdate); // 최신 값 출력 확인

    const inertPhoneReqData: PhoneInsertType = {
      telno: getValues("telno") || "",
      commnSeNo: deviceSectionDataKey,
      lxtnNo: getValues("lxtnNo") || "",
      id: getValues("id") || "",
      pwdNo: getValues("pwdNo"),
      rmk: getValues("rmk") || "",
      userId: loginId || "",
    };

    const updatePhoneReqData: PhoneUpdateType = {
      telId: selectDetailNo,
      telno: getValues("telno") || "",
      commnSeNo: deviceSectionDataKey,
      commnSeNm: deviceSectionDataValue,
      lxtnNo: getValues("lxtnNo") || "",
      id: getValues("id") || "",
      pwdNo: getValues("pwdNo"),
      useYn: "",
      rmk: getValues("rmk") || "",
      userId: loginId || "",
    }

    if (isUpdate === true) {
      console.log("수정 보낼 데이터 확인 : ", updatePhoneReqData);
      if (!data.telno || !data.lxtnNo || !data.id || !data.pwdNo) {
        emptyDataModal();
        return;
      } else {
        updatePhoneAPI.mutate(
          { body: updatePhoneReqData },
          {
            onSuccess: (response) => {
              if (response.data.message === "SUCCESS") {
                updateCompletedModal();
              }
            },
          }
        );
        return;
      };
    } else if(isUpdate === false) {
      console.log("보낼 데이터 확인 : ", inertPhoneReqData);
      if (!data.telno || !data.lxtnNo || !data.id || !data.pwdNo) {
        emptyDataModal();
      } else {
        //console.log("보낼 데이터 확인 : ", inertPhoneReqData);
        insertPhoneAPI.mutate(
          { body: inertPhoneReqData },
          {
            onSuccess: (response) => {
              if (response.data.message === "SUCCESS") {
                insertCompletedModal();
              }
            },
          }
        );
      }
    }

  }, [isUpdate,deviceSectionDataKey,deviceSectionDataValue]);

  return (
    <form style={{ height: "100%", width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Stack width={"100%"} height={"100%"} gap={1}>
        <GrayBox>
          <SearchInput
            placeholder={"사용자이름 검색"}
            value={userName}
            onChange={(e) => setUserName(e.target.value)} // 검색어 입력값 업데이트
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch(); // 검색 실행 함수 호출
              }
            }}
          />
        </GrayBox>
        <TableBox width={"100%"} gap={1}>
          <Stack overflow={"auto"} width={"20%"} height={"100%"}>
            <TableBox.Inner>
              <BasicTable data={userPhoneCount?.data.contents || []}>
                <BasicTable.Th>사용자이름</BasicTable.Th>
                <BasicTable.Th>사용자번호</BasicTable.Th>
                <BasicTable.Th>전화기수</BasicTable.Th>
                <BasicTable.Tbody>
                  {(userPhoneCount?.data.contents || []).map((item, index) => {
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
                        <BasicTable.Td>{item.userNm}</BasicTable.Td>
                        <BasicTable.Td>{item.userNo}</BasicTable.Td>
                        <BasicTable.Td>{item.telCnt}</BasicTable.Td>
                      </BasicTable.Tr>
                    );
                  })}
                </BasicTable.Tbody>
              </BasicTable>
            </TableBox.Inner>
          </Stack>
          <Stack width={"38%"} overflow={"auto"} height={"100%"}>
            <TableBox.Inner>
              <CheckboxTable
                data={userPhoneList?.data.contents || []}
                selectedRows={userPhoneSelectedRows}
                toggleRowsSelection={toggleuserPhoneRowsSelection}
              >
                <CheckboxTable.Thead>
                  <CheckboxTable.Tr>
                    <CheckboxTable.CheckboxTh keyName="telId" />
                    <CheckboxTable.Th>전화기ID</CheckboxTable.Th>
                    <CheckboxTable.Th>전화기이름</CheckboxTable.Th>
                    <CheckboxTable.Th>아이디</CheckboxTable.Th>
                    <CheckboxTable.Th>비밀번호</CheckboxTable.Th>
                    <CheckboxTable.Th>전화번호</CheckboxTable.Th>
                  </CheckboxTable.Tr>
                </CheckboxTable.Thead>

                <CheckboxTable.Tbody>
                  {(userPhoneList?.data.contents || []).map((item) => (
                    <CheckboxTable.Tr key={item.telId} id={item.telId}>
                      <CheckboxTable.CheckboxTd
                        item={item}
                        keyName="telId"
                      />
                      <CheckboxTable.Td>{item.telId}</CheckboxTable.Td>
                      <CheckboxTable.Td>{item.commnSeNm}</CheckboxTable.Td>
                      <CheckboxTable.Td>{item.id}</CheckboxTable.Td>
                      <CheckboxTable.Td>{item.pwdNo}</CheckboxTable.Td>
                      <CheckboxTable.Td>{item.telNo}</CheckboxTable.Td>
                    </CheckboxTable.Tr>
                  ))}
                </CheckboxTable.Tbody>
              </CheckboxTable>
            </TableBox.Inner>
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
              onClick={handleUserInsertPhone}
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
              onClick={handleUserUnsertPhone}
            >
              <BiChevronRight size={"24px"} />
            </BasicButton>
          </Stack>
          <Stack width={"38%"} height={"100%"} gap={1}>
            <Stack width={"100%"} height={"60%"} overflow={"auto"}>
              <TableBox.Inner>
                <CheckboxTable
                  data={allPhoneList?.data.contents || []}
                  selectedRows={unsertedPhoneSelectedRows}
                  toggleRowsSelection={toggleunsertedPhoneRowsSelection}
                >
                  <CheckboxTable.Thead>
                    <CheckboxTable.Tr>
                      <CheckboxTable.CheckboxTh keyName="telId" />
                      <CheckboxTable.Th>전화기ID</CheckboxTable.Th>
                      <CheckboxTable.Th>전화기이름</CheckboxTable.Th>
                      <CheckboxTable.Th>아이디</CheckboxTable.Th>
                      <CheckboxTable.Th>비밀번호</CheckboxTable.Th>
                      <CheckboxTable.Th>전화번호</CheckboxTable.Th>
                      <CheckboxTable.Th>상세보기</CheckboxTable.Th>
                    </CheckboxTable.Tr>
                  </CheckboxTable.Thead>
                  <CheckboxTable.Tbody>
                    {(allPhoneList?.data.contents || []).map((item) => (
                      <CheckboxTable.Tr key={item.telId} id={item.telId}>
                        <CheckboxTable.CheckboxTd
                          item={item}
                          keyName="telId"
                        />
                        <CheckboxTable.Td>{item.telId}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.commnSeNm}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.id}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.pwdNo}</CheckboxTable.Td>
                        <CheckboxTable.Td>{item.telNo}</CheckboxTable.Td>
                        <CheckboxTable.Td>
                          <BasicButton onClick={() => {
                            setSelectDetailNo(item.telId ?? "");
                            setIsUpdate(true);
                          }}>상세보기</BasicButton>
                        </CheckboxTable.Td>
                      </CheckboxTable.Tr>
                    ))}
                  </CheckboxTable.Tbody>
                </CheckboxTable>
              </TableBox.Inner>
            </Stack>
            <Stack width={"100%"} height={"40%"}>
              <GrayBox width={"100%"} height={"100%"} overflow={"auto"} flexDirection={"column"}>
                <Box justifyContent={"start"} width={"100%"} marginBottom={1}>
                  <Typography fontSize={"24px"} fontWeight={"bold"}>
                    상세정보
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column" // 세로 방향 설정
                  flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                  justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                  width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                  gap={1}
                >
                  <LabelTypo width={"100%"}>내선번호</LabelTypo>
                  {/* height: 24px */}
                  <BasicInput
                    sx={{ minHeight: "24px", width: "60%" }}
                    {...register("lxtnNo")}
                  />
                  {/* <ToggleButton
                    checked={isUse}
                    onChange={(e) => {
                      const newValue = e.target.checked; // Toggle 버튼의 변경된 값
                      setIsUse(newValue); // solutionIsUes 상태 업데이트
                      console.log("IsUes 값 변경:", newValue); // 콘솔 출력
                    }}
                    label=""
                  /> */}
                </Box>
                <Box
                  display="flex"
                  flexDirection="column" // 세로 방향 설정
                  flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                  justifyContent="flex-start" // 가로 방향 왼쪽 정렬
                  width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
                  gap={1}
                >
                  <LabelTypo width={"100%"}>전화기이름</LabelTypo>
                  {/* height: 24px */}
                  <Select
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
                    sx={{
                      width: "60%",
                      "& .MuiSelect-select": {
                        backgroundColor: "primary.light", // 선택 박스만 흰색으로
                      },
                    }}
                    placeholder={deviceSectionDataValue ? deviceSectionDataValue : "항목 선택"}
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
                  <LabelTypo width={"100%"}>아이디</LabelTypo>
                  {/* height: 24px */}
                  <BasicInput
                    {...register("id")}
                    sx={{ minHeight: "24px", width: "60%" }}
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
                  <LabelTypo width={"100%"}>비밀번호</LabelTypo>
                  {/* height: 24px */}
                  <BasicInput
                    {...register("pwdNo")}
                    sx={{ minHeight: "24px", width: "60%" }}
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
                  <LabelTypo width={"100%"}>전화번호</LabelTypo>
                  {/* height: 24px */}
                  <PhoneInput
                    {...register("telno")}
                    sx={{ minHeight: "24px", width: "60%" }}
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
                    {...register("rmk")}
                    sx={{ minHeight: "24px", width: "100%" }}
                  />
                </Box>
                <Stack direction={"row"} gap={1} justifyContent={"end"} alignContent={"end"} marginTop={1} width={"100%"}>
                  <BasicButton onClick={handleAdd}>추가</BasicButton>
                  <BasicButton type="submit">저장</BasicButton>
                  <BasicButton > 삭제 </BasicButton>
                </Stack>
              </GrayBox>
            </Stack>
          </Stack>
        </TableBox>
      </Stack>
    </form>
  );
}
