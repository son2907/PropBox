import { Box, Stack, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import LabelTypo from "../../../components/Typography/LabelTypo";
import { BasicButton } from "../../../components/Button";
import BasicInput from "../../../components/Input/BasicInput";
import BasicTable from "../../../components/Table/BasicTable";
import { IoSearchOutline } from "react-icons/io5";
import IconSquareButton from "../../../components/Button/IconSquareButton";
import Calendar from "../../../components/Calendar/Calendar";
import { MdInfoOutline } from "react-icons/md";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import { TabType } from "../../../types/menu";
import { MdPhoneAndroid } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import TextArea from "../../../components/TextArea/TextArea";
import { openPopup } from "../../../utils/openPopup";
import PathConstants from "../../../routers/path";
import CenteredBox from "../../../components/Box/CenteredBox";
import {
  useAreaList,
  useCnsltDetail,
  useCnsltItem,
  useItemDetList,
  usePostCnsltInfo,
  useTelCnsltList,
} from "../../../api/callCnslt";
import { useCnsltStore } from "../../../stores/CunsltStore";
import { CnsltInfoRequestType } from "../../../types/callCnslt";
import { useForm } from "react-hook-form";
import { getFormattedDate } from "../../../utils/getFormattedDate";
import { useAuthStore } from "../../../stores/authStore";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import getItemByStorageOne from "../../../utils/getItemByStorageOne";
import { useStorageStore } from "../../../hooks/useStorageStore";
import { useTelStore } from "../../../stores/telStore";
import { useApiRes } from "../../../utils/useApiRes";
import useModal from "../../../hooks/useModal";
import { FailModal } from "../../../components/layout/modal/FailModal";
import { BasicCompletedModl } from "../../../components/layout/modal/BasicCompletedModl";
import { testInfoGroupdata } from "../../../utils/testData";

export default function InfoGroup({ tabType }: TabType) {
  // 로그인 아이디
  const { loginId } = useAuthStore(["loginId"]);
  // telId값
  const telStore = useStorageStore(useTelStore, "selectedTel");
  // 검색 조건 (왼쪽 테이블에서 선택한 한 행)
  const { cstmrNo, cnsltNo, callYn, trsmYn } = useCnsltStore();

  console.log(
    "검색 조건 cstmrNo :",
    cstmrNo,
    "cnsltNo",
    cnsltNo,
    "callYn",
    callYn,
    "trsmYn",
    trsmYn
  );

  // 상담 일자
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 선택한 상담 항목
  const [selectDetailItem, setDetailItem] = useState<string>("");

  // <========================= GET API =========================>

  // 지역 리스트 api
  const { data: areaList } = useAreaList();

  // 전체 데이터 (상담 전화~상담항목 목록) api
  const { data: cunsltDetailList, refetch: cnsltDetailRefetch } =
    useCnsltDetail(cstmrNo, cnsltNo, trsmYn);

  // 선택한 상담 항목 목록에 대한 상세항목 api
  const { data: itemDetList, refetch: itemDetListRefetch } = useItemDetList({
    itemNo: selectDetailItem ?? "",
  });

  //상담항목 조회
  const { data: cnsltItemData, refetch: cnsltItemRefetch } = useCnsltItem("0", "0");

  const { refetch: cnsltReftech } = useTelCnsltList(callYn, trsmYn);

  // 선택한 세부 사항
  const [detailInfo, setDetailInfo] = useState<any[]>([{}]);

  // 초깃값
  const defaultValue = useMemo(
    () => ({
      cnsltTelno: "",
      cstmrNm: "",
      cstmrRmk: "",
      mbtlNo: "",
      telNo: "",
      addr: "",
      complianceRate: "",
      hopeBalance: "",
      cnsltCnt: "",
      rctnRejectXyn: "",
      spcmnt: "",
      areaNo: "",
    }),
    []
  );

  // input 할당 useForm
  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: defaultValue,
  });

  // 관리지역 select
  const { selectListData, selectValue, handleChange } = useSelect(
    useMemo(() => areaList?.data.contents || [], [areaList?.data.contents]),
    "areaNo", // 현장 번호
    "areaNm", // 현장명
    cunsltDetailList?.data?.contents?.areaNo ?? ""
  );

  // <======================= 검색 팝업창에서 데이터 수신 =======================>

  const [message, setMessage] = useState<object>();

  const handleMessage = useCallback(
    (event) => {
      if (event.origin !== window.location.origin) {
        return;
      }
      if (
        event.data &&
        JSON.stringify(event.data) !== JSON.stringify(message)
      ) {
        setMessage(event.data);
      }
    },
    [message]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [handleMessage]);

  useEffect(() => {
    if (message && Object.keys(message).length > 0) {
      console.log("Received message:", message);
      reset({ ...message });
    }
  }, [message, reset]);

  //왼쪽테이블 선택안해도 보여야해서 추가
  useEffect(() => {
    cnsltItemRefetch(); // 강제로 API 호출
  }, [cnsltItemRefetch]);

  // <========================= Popup Constance =========================>

  const searchPopupInfo = useMemo(
    () => ({
      url: PathConstants.Call.SearchCustomer,
      windowName: "고객 검색",
    }),
    []
  );
  const statusPopupInfo = useMemo(
    () => ({
      url: PathConstants.Call.ConsultationStatus,
      windowFeatures: "width=600px,height=468px,scrollbars=yes,resizable=yes",
      windowName: "상담 현황",
    }),
    []
  );

  const smsPopupInfo = useMemo(
    () => ({
      url: PathConstants.Call.SmsSending,
      windowFeatures: "width=1000,height=700,scrollbars=yes,resizable=yes",
      windowName: "sms 전송",
    }),
    []
  );

  // 날짜비교
  const isToday = useCallback((date: Date): boolean => {
    const today = new Date();
    return today.toISOString().slice(0, 10) === date.toISOString().slice(0, 10);
  }, []);

  // 상세항목 테이블 클릭
  const selectDetItem = useCallback((item: any) => {
    setDetailInfo((prev) => {
      const updatedArray = [...prev];
      updatedArray[item.itemNo] = {
        itemNo: item.itemNo,
        detailNo: item.detailNo,
        detailNm: item.detailNm,
      };
      return updatedArray;
    });
  }, []);

  // 세부항목 새로고침 버튼
  const refreshDetList = useCallback(() => {
    if (!selectDetailItem) return null;
    itemDetListRefetch();
    cnsltDetailRefetch();
    setDetailInfo([{}]);
  }, [selectDetailItem, itemDetListRefetch, cnsltDetailRefetch]);

  // phone / 전화 버튼
  const onCall = ({ type }: { type: string }) => {
    reset({
      cnsltTelno: type == "Mbt" ? getValues("mbtlNo") : getValues("telNo"),
    });
  };

  // api 재호출 또는 항목 선택 해제 시 데이터 비움
  useDidMountEffect(() => {
    if (trsmYn == "W") {
      reset({
        cstmrNm: cnsltNo,
      });
      return;
    }
    if (cunsltDetailList?.data?.contents) {
      reset({ ...cunsltDetailList.data.contents });
    } else {
      reset(defaultValue);
      setDetailItem("");
      setDetailInfo([{}]);
    }
  }, [cunsltDetailList, cnsltNo]);

  // 모달 hook
  const { openModal, closeModal } = useModal();

  // <========================= 저장 버튼 =========================>

  const { mutate: postInfo } = usePostCnsltInfo();
  const checkApiFail = useApiRes();

  const onSubmit = useCallback(
    (data: any) => {
      console.log("상담 아이템 데이터:", callYn, trsmYn);
      const data_1 = cunsltDetailList?.data.contents;
      const spt = getItemByStorageOne("selectedSite")?.sptNo;
      const telCnsltCnList = detailInfo
        .filter((item) => item && Object.keys(item).length > 0)
        .map(({ itemNo, detailNo }) => ({ itemNo, detailNo }));

      const isWorUn = trsmYn == "W" || !data_1 ? true : false; // 대기 고객이거나 신규 고객 trsmYn:통화여부(Y:통화, N:부재, W:대기)
      console.log("ISWORUN:::", isWorUn);
      console.log("telStore::::", telStore);
      const body: CnsltInfoRequestType = {
        sptNo: spt,
        cstmrNo: isWorUn ? "0" : data_1.cstmrNo,
        cnsltNo: !isToday(selectedDate) || isWorUn ? "0" : data_1.cnsltNo,
        cnsltnt: isWorUn ? "" : data_1.cnsltnt,
        cnsltDt: getFormattedDate(selectedDate),
        telId: isWorUn ? (telStore.telId || "0") : (data_1.telId !=="" ? data_1.telId : "0"),
        cnsltTelno: data.cnsltTelno,
        cstmrNm: data.cstmrNm,
        mbtlNo: data.mbtlNo,
        telNo: data.telNo,
        cstmrRmk: data.cstmrRmk,
        addr: data.addr,
        areaNo: selectValue,
        spcmnt: data.spcmnt,
        callYn: callYn || "",
        trsmYn: trsmYn || "",
        legacySlutnId: isWorUn ? "CS0001" : "TM0001",
        userId: loginId || "",
        telCnsltCnList: telCnsltCnList,
        ...(trsmYn == "W" && { waitCstmrNo: cstmrNo }),
      };

      console.log("보내는 정보:", body);
      postInfo(
        {
          body: body,
        },
        {
          onSuccess: (res) => {
            console.log("onSuccess:", res);
            const result = checkApiFail(res);
            if (result.data.message === "SUCCESS") {
              console.log("저장 또는 수정 성공:", res);
              openModal(BasicCompletedModl, {
                modalId: "complete",
                stack: false,
                onClose: () => closeModal,
              });
              cnsltReftech();
              itemDetListRefetch();
              cnsltDetailRefetch();
            }
          },
          onError: (err) => {
            console.log("에러:", err);
            openModal(FailModal, {
              modalId: "apiFail",
              stack: false,
              onClose: () => closeModal,
            });
          },
        }
      );
    },
    [
      cunsltDetailList,
      detailInfo,
      callYn,
      trsmYn,
      loginId,
      selectValue,
      selectedDate,
      telStore.telId,
      postInfo,
      checkApiFail,
      openModal,
      closeModal,
      itemDetListRefetch,
      cnsltDetailRefetch,
      cnsltReftech,
      cstmrNo,
      isToday,
    ]
  );

  

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Stack width={"100%"} height={"50%"} paddingBottom={1}>
          {/* 상단 회색박스 ********************************************** */}
          <GrayBox height={"50px"} width={"100%"} marginBottom={1}>
            <LabelTypo>상담일자</LabelTypo>
            <Box width={"250px"}>
              <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </Box>
            <Typography variant="bodySS" color="error.main" paddingLeft={2}>
              {!isToday(selectedDate) ? (
                <>
                  <MdInfoOutline /> 오늘 날짜가 아닙니다.
                </>
              ) : (
                ""
              )}
            </Typography>

            {/* 오른쪽 버튼 그룹 */}
            <Box display="flex" gap={1} marginLeft="auto">
              <BasicButton
                onClick={() => {
                  openPopup(statusPopupInfo);
                }}
              >
                상담현황
              </BasicButton>
              <BasicButton
                onClick={() => {
                  window.location.reload();
                }}
              >
                추가
              </BasicButton>
              <BasicButton>삭제</BasicButton>
              <BasicButton
                onClick={() => {
                  openPopup(smsPopupInfo);
                }}
              >
                문자
              </BasicButton>
            </Box>
          </GrayBox>
          <Box display="flex" width={"100%"} padding={0.8} paddingLeft={2}>
            {/* 왼쪽 */}
            <Stack width={"80%"} gap={1}>
              <CenteredBox>
                <LabelTypo>
                  <Typography color="error.main">*</Typography>
                  상담전화
                </LabelTypo>
                <BasicInput {...register("cnsltTelno")} />
                <IconSquareButton
                  tabIndex={-1}
                  onClick={() => {
                    openPopup(searchPopupInfo);
                  }}
                >
                  <IoSearchOutline size={"1em"} />
                </IconSquareButton>
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>
                  <Typography color="error.main">*</Typography>
                  이름
                </LabelTypo>
                <BasicInput {...register("cstmrNm")} />
                <IconSquareButton
                  tabIndex={-1}
                  onClick={() => {
                    openPopup(searchPopupInfo);
                  }}
                >
                  <IoSearchOutline size={"1em"} />
                </IconSquareButton>
                {tabType ? (
                  <>
                    <input type="checkbox" />
                    <Typography>부재콜</Typography>
                  </>
                ) : null}
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>고객정보</LabelTypo>
                <BasicInput {...register("cstmrRmk")} />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>휴대전화</LabelTypo>
                <BasicInput {...register("mbtlNo")} />
                {tabType ? (
                  <IconSquareButton
                    onClick={() => {
                      onCall({ type: "Mbt" });
                    }}
                  >
                    <MdPhoneAndroid size={"1rem"} />
                  </IconSquareButton>
                ) : null}
                <LabelTypo marginLeft={2}>일반전화</LabelTypo>
                <BasicInput {...register("telNo")} />
                {tabType ? (
                  <IconSquareButton
                    onClick={() => {
                      onCall({ type: "tel" });
                    }}
                  >
                    <IoCallOutline size={"1rem"} />
                  </IconSquareButton>
                ) : null}
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>주소</LabelTypo>
                <BasicInput sx={{ width: "500px" }} {...register("addr")} />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>관리지역</LabelTypo>
                <Select
                  defaultValue={selectValue}
                  value={selectValue}
                  onChange={handleChange}
                  selectData={selectListData}
                  sx={{ width: "204px" }}
                />
              </CenteredBox>
            </Stack>

            {/* 오른쪽 */}
            <Stack width={"20%"}>
              <GrayBox
                flexDirection={"column"}
                justifyContent={"center"}
                width={"100%"}
                height={"200px"}
                borderRadius={"8px"}
                marginTop={2}
                marginRight={2}
                gap={0.5}
              >
                <CenteredBox>
                  <LabelTypo>호응도</LabelTypo>
                  <BasicInput
                    sx={{ width: "60px" }}
                    {...register("complianceRate")}
                  />
                </CenteredBox>
                <CenteredBox>
                  <LabelTypo>희망평형</LabelTypo>
                  <BasicInput
                    sx={{ width: "60px" }}
                    {...register("hopeBalance")}
                  />
                </CenteredBox>
                <CenteredBox>
                  <LabelTypo>상담횟수</LabelTypo>
                  <BasicInput
                    sx={{ width: "60px" }}
                    {...register("cnsltCnt")}
                  />
                </CenteredBox>
                <CenteredBox>
                  <LabelTypo>수신동의</LabelTypo>
                  <BasicInput
                    sx={{ width: "60px" }}
                    {...register("rctnRejectXyn")}
                  />
                </CenteredBox>
              </GrayBox>
            </Stack>
          </Box>
        </Stack>

        {/* 상담항목, 세부항목 회색 인풋 영역 */}
        <Box display="flex" overflow="hidden" height={"100%"} gap={1}>
          {/* 상담항목 세부항목 */}
          <GrayBox
            flexDirection={"column"}
            width={"50%"}
            height={"100%"}
            gap={1}
            overflow="auto"
          >
            {!cunsltDetailList?.data?.contents?.itemList?.length ? (
              cnsltItemData?.data.contents.map((item: any) => (
                <Box
                  key={item.itemNo}
                  display="flex"
                  alignItems="center" // 수직 중앙 정렬
                  flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                  onClick={() => {
                    setDetailItem(item.itemNo);
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <Typography width={150}>{item.itemNm}</Typography>
                  <BasicInput
                    sx={{ minHeight: "24px" }}
                    value={detailInfo[item.itemNo]?.detailNm ?? item.detailNm}
                    readOnly
                  />
                </Box>
              ))
            ) : (
              cunsltDetailList?.data.contents.itemList.map((item: any) => (
                <Box
                  key={item.itemNo}
                  display="flex"
                  alignItems="center" // 수직 중앙 정렬
                  flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                  onClick={() => {
                    setDetailItem(item.itemNo);
                  }}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <Typography width={150}>{item.itemNm}</Typography>
                  <BasicInput
                    sx={{ minHeight: "24px" }}
                    value={detailInfo[item.itemNo]?.detailNm ?? item.detailNm}
                    readOnly
                  />
                </Box>
              ))
            )}
            {/* {cnsltItemData?.data.contents.map((item: any, index: any) => (
              <Box
                key={index}
                display="flex"
                alignItems="center" // 수직 중앙 정렬
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                onClick={() => {
                  setDetailItem(item.itemNo);
                }}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Typography width={150}>{item.itemNm}</Typography>
                <BasicInput
                  sx={{ minHeight: "24px" }}
                  value={detailInfo[item.itemNo]?.detailNm ?? item.detailNm}
                  readOnly
                />
              </Box>
            ))} */}
          </GrayBox>
          <Box
            flexDirection={"column"}
            width={"50%"}
            height={"100%"}
            overflow="auto"
          >
            <BasicTable data={itemDetList?.data.contents ?? []}>
              <BasicTable.Th>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  세부항목
                  <BasicButton onClick={refreshDetList}>새로고침</BasicButton>
                </Box>
              </BasicTable.Th>
              <BasicTable.Tbody>
                {(itemDetList?.data?.contents || []).map(
                  (item: any, index: any) => {
                    return (
                      <BasicTable.Tr
                        key={index}
                        isClicked={
                          detailInfo[item.itemNo]?.detailNo === item.detailNo
                        }
                        onClick={() => {
                          selectDetItem(item);
                        }}
                      >
                        <BasicTable.Td>{item.detailNm}</BasicTable.Td>
                      </BasicTable.Tr>
                    );
                  }
                )}
              </BasicTable.Tbody>
            </BasicTable>
          </Box>
        </Box>
        <GrayBox height={"40px"} marginTop={1} marginBlock={1}>
          특기사항
        </GrayBox>
        <TextArea height="140px" {...register("spcmnt")} />
        <GrayBox height={"40px"} marginTop={1} justifyContent={"flex-end"}>
          <BasicButton type="submit">저장</BasicButton>
        </GrayBox>
      </form>
    </>
  );
}
