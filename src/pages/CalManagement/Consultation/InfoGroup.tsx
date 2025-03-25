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
import { useStorageStore } from "../../../hooks/useStorageStore";
import { useTelStore } from "../../../stores/telStore";
import { useApiRes } from "../../../utils/useApiRes";
import useModal from "../../../hooks/useModal";
import { FailModal } from "../../../components/Modal/modal/FailModal";
import { BasicCompletedModl } from "../../../components/Modal/modal/BasicCompletedModl";
import { sendMessage, useWebSocket } from "../../../routers/guard/soketFn";
import { WebSocketContext } from "../../../routers/guard/SoketGuard";
import { getKoreanTime } from "../../../utils/getKoreanTime";
import { useSptStore } from "../../../stores/sptStore";
import PhoneInput from "../../../components/Input/PhoneInput";
import NoneBorderInput from "../../../components/Input/NoneBorderInput";

export default function InfoGroup({
  tabType,
  selectedDate,
  setSelectedDate,
}: TabType & { selectedDate: Date; setSelectedDate: (date: Date) => void }) {
  const [smsPopup, setSmsPopup] = useState<any>();
  // 웹소켓
  const webSocket = useWebSocket(WebSocketContext);

  // 로그인 아이디
  const { loginId } = useAuthStore(["loginId"]);
  // telId값
  const telStore = useStorageStore(useTelStore, "selectedTel");
  // 검색 조건 (왼쪽 테이블에서 선택한 한 행)
  const {
    fromSocket,
    cstmrNo,
    cnsltNo,
    cstmrNm,
    mbtlNo,
    telNo,
    cnsltTelno,
    callYn,
    trsmYn,
    socketInfo,
    socketCallYn,
    socketTrsmYn,
    clear,
  } = useCnsltStore();

  // 상담 일자
  //const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
  const { data: cnsltItemData } = useCnsltItem("0", "0");
  const { refetch: cnsltReftech } = useTelCnsltList(callYn, trsmYn);

  // 선택한 세부 사항
  const [detailInfo, setDetailInfo] = useState<any[]>([{}]);
  const { sptNo } = useSptStore();

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

  const [isMissedCall, setIsMissedCall] = useState(false); //부재콜 체크박스

  const handleMissedCallChange = (event) => {
    setIsMissedCall(event.target.checked);
  };

  // 관리지역 select
  const { selectListData, selectValue, handleChange } = useSelect(
    useMemo(() => areaList?.data.contents || [], [areaList?.data.contents]),
    "areaNo", // 현장 번호
    "areaNm", // 현장명
    cunsltDetailList?.data?.contents?.areaNo ?? ""
  );

  // <======================= 검색 팝업창에서 데이터 수신 =======================>

  const [message, setMessage] = useState<object>();

  const handleMessage = (event) => {
    if (event.origin !== window.location.origin) {
      return;
    }
    if (event.data.source == "react-devtools-bridge") return;
    if (event.data && JSON.stringify(event.data) !== JSON.stringify(message)) {
      setMessage(event.data);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (message && Object.keys(message).length > 0) {
      console.log("Received message:", message);
      reset({ ...message });
    }
  }, [message, reset]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "REQUEST_INITIAL_DATA") {
        // 초기 데이터 요청 시 메시지 전송
        smsPopup.postMessage(
          {
            message: {
              cstmrNo: cstmrNo,
              cnsltTelno: cnsltTelno || getValues("cnsltTelno") || "",
            },
          },
          "*"
        );
      }
    };

    window.addEventListener("message", handleMessage);

    if (smsPopup) {
      smsPopup.postMessage(
        { message: { cstmrNo: cstmrNo, cnsltTelno: cnsltTelno } },
        "*"
      );
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [cstmrNo, cnsltTelno, smsPopup]);

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
    if (type == "Mbt") {
      const number = getValues("mbtlNo");
      reset({ cnsltTelno: number });
      const message = {
        messageType: "DIAL",
        timestampUTC: getKoreanTime(),
        counterpart: number,
      };
      sendMessage({
        webSocket: { current: webSocket },
        message: message,
      });
    } else {
      const number = getValues("telNo");
      reset({ cnsltTelno: number });
      const message = {
        messageType: "DIAL",
        timestampUTC: getKoreanTime(),
        counterpart: number,
      };
      sendMessage({
        webSocket: { current: webSocket },
        message: message,
      });
    }
  };

  // api 재호출 시 데이터 비움
  useDidMountEffect(() => {
    if (fromSocket) return;
    if (cunsltDetailList?.data?.contents && !fromSocket) {
      reset({
        ...cunsltDetailList.data.contents,
      });
    } else {
      reset(defaultValue);
      setDetailItem("");
      setDetailInfo([{}]);
    }
  }, [cunsltDetailList, cnsltItemData, fromSocket]);

  // 웹소켓 반응에 따라 데이터 바인딩
  useEffect(() => {
    if (fromSocket) {
      console.log("socketInfo:", socketInfo);
      reset({ ...socketInfo });
      return;
    }
    if (trsmYn == "W") {
      reset({
        cstmrNm,
        cnsltTelno: "",
        mbtlNo: mbtlNo,
        telNo: telNo,
        cstmrRmk: "",
        addr: "",
        complianceRate: "",
        hopeBalance: "",
        cnsltCnt: "",
        rctnRejectXyn: "",
        spcmnt: "",
        areaNo: "",
      });
    }
  }, [
    reset,
    cstmrNm,
    cnsltTelno,
    mbtlNo,
    telNo,
    fromSocket,
    socketInfo,
    trsmYn,
  ]);

  // 모달 hook
  const { openModal, closeModal } = useModal();

  // <========================= 저장 버튼 =========================>

  const { mutate: postInfo } = usePostCnsltInfo();
  const checkApiFail = useApiRes();

  const onSubmit = useCallback(
    (data: any) => {
      const data_1 = cunsltDetailList?.data.contents;
      const telCnsltCnList = detailInfo
        .filter((item) => item && Object.keys(item).length > 0)
        .map(({ itemNo, detailNo }) => ({ itemNo, detailNo }));

      const isWorUn = trsmYn == "W" || !data_1 ? true : false; // 대기 고객이거나 신규 고객 trsmYn:통화여부(Y:통화, N:부재, W:대기)

      const body: CnsltInfoRequestType = {
        sptNo: sptNo,
        cstmrNo: isWorUn ? "0" : data_1.cstmrNo,
        cnsltNo: fromSocket
          ? cnsltNo
          : !isToday(selectedDate) || isWorUn
            ? "0"
            : data_1.cnsltNo,
        cnsltnt: isWorUn ? "" : data_1.cnsltnt,
        cnsltDt: getFormattedDate(selectedDate),
        telId: isWorUn
          ? telStore.telId || "0"
          : data_1.telId !== ""
            ? data_1.telId
            : "0",
        cnsltTelno: data.cnsltTelno, // 입력값
        cstmrNm: data.cstmrNm, // 입력값
        mbtlNo: data.mbtlNo, // 입력값
        telNo: data.telNo, // 입력값
        cstmrRmk: data.cstmrRmk, // 입력값
        addr: data.addr, // 입력값
        areaNo: selectValue, // 입력값
        spcmnt: data.spcmnt, // 입력값
        callYn: fromSocket ? socketCallYn || "" : callYn || "",
        trsmYn: isMissedCall
          ? "N"
          : fromSocket
            ? socketTrsmYn || ""
            : trsmYn || "",
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
      clear();
    },
    [
      cunsltDetailList,
      detailInfo,
      callYn,
      trsmYn,
      loginId,
      selectValue,
      selectedDate,
      telStore,
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
        <Stack
          width={"100%"}
          height={"33%"}
          paddingBottom={1}
          bgcolor={"#E1F1FF"}
        >
          {/* 상단 회색박스 ********************************************** */}
          <GrayBox
            height={"50px"}
            width={"100%"}
            marginBottom={1}
            borderRadius={0}
          >
            <LabelTypo fontSize={"16px"}>상담일자</LabelTypo>
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
                sx={{ fontSize: "16px" }}
              >
                상담현황
              </BasicButton>
              <BasicButton
                onClick={() => {
                  window.location.reload();
                }}
                sx={{ fontSize: "16px" }}
              >
                추가
              </BasicButton>
              <BasicButton sx={{ fontSize: "16px" }}>삭제</BasicButton>
              <BasicButton
                onClick={() => {
                  const popup = openPopup(smsPopupInfo);
                  setSmsPopup(popup);
                }}
                sx={{ fontSize: "16px" }}
              >
                문자
              </BasicButton>
            </Box>
          </GrayBox>
          <Box display="flex" width={"100%"} padding={0.8} paddingLeft={2}>
            {/* 왼쪽 */}
            <Stack width={"80%"} gap={0.2}>
              <CenteredBox>
                <LabelTypo fontSize={"16px"}>
                  <Typography color="error.main">*</Typography>
                  상담전화
                </LabelTypo>
                <PhoneInput
                  {...register("cnsltTelno")}
                  sx={{ fontSize: "16px", height: "30px" }}
                />
                <IconSquareButton
                  tabIndex={-1}
                  onClick={() => {
                    openPopup(searchPopupInfo);
                  }}
                >
                  <IoSearchOutline size={"14px"} />
                </IconSquareButton>
              </CenteredBox>
              <CenteredBox>
                <LabelTypo fontSize={"16px"}>
                  <Typography color="error.main">*</Typography>
                  이름
                </LabelTypo>
                <BasicInput
                  {...register("cstmrNm")}
                  sx={{ fontSize: "16px", height: "30px" }}
                />
                <IconSquareButton
                  tabIndex={-1}
                  onClick={() => {
                    openPopup(searchPopupInfo);
                  }}
                >
                  <IoSearchOutline size={"14px"} />
                </IconSquareButton>
                {tabType ? (
                  <>
                    <input
                      type="checkbox"
                      checked={isMissedCall}
                      onChange={handleMissedCallChange}
                    />
                    <Typography>부재콜</Typography>
                  </>
                ) : null}
              </CenteredBox>
              <CenteredBox>
                <LabelTypo fontSize={"16px"}>고객정보</LabelTypo>
                <BasicInput
                  {...register("cstmrRmk")}
                  sx={{ fontSize: "16px", height: "30px" }}
                />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo fontSize={"16px"}>휴대전화</LabelTypo>
                <PhoneInput
                  {...register("mbtlNo")}
                  sx={{ fontSize: "16px", height: "30px" }}
                />
                {tabType ? (
                  <IconSquareButton
                    tabIndex={-1}
                    onClick={() => {
                      onCall({ type: "Mbt" });
                    }}
                  >
                    <MdPhoneAndroid size={"14px"} />
                  </IconSquareButton>
                ) : null}
                <LabelTypo marginLeft={2} fontSize={"16px"}>
                  일반전화
                </LabelTypo>
                <PhoneInput
                  {...register("telNo")}
                  sx={{ fontSize: "16px", height: "30px" }}
                />
                {tabType ? (
                  <IconSquareButton
                    tabIndex={-1}
                    onClick={() => {
                      onCall({ type: "tel" });
                    }}
                  >
                    <IoCallOutline size={"14px"} />
                  </IconSquareButton>
                ) : null}
              </CenteredBox>
              <CenteredBox>
                <LabelTypo fontSize={"16px"}>주소</LabelTypo>
                <BasicInput
                  sx={{ width: "500px", height: "30px" }}
                  {...register("addr")}
                />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo fontSize={"16px"}>관리지역</LabelTypo>
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
            <Stack width={"35%"}>
              <Stack
                flexDirection={"column"}
                justifyContent={"center"}
                width={"100%"}
                height={"180px"}
                borderRadius={"8px"}
                marginTop={2}
                marginRight={2}
                padding={1}
                gap={0.5}
                alignItems={"flex-start"} // 왼쪽 정렬 추가
                bgcolor={"primary.A100"}
              >
                <CenteredBox style={{ justifyContent: "flex-start" }}>
                  <LabelTypo fontSize={"16px"}>호응도</LabelTypo>
                  <NoneBorderInput
                    sx={{ width: "200px" }}
                    {...register("complianceRate")}
                  />
                </CenteredBox>
                <CenteredBox>
                  <LabelTypo fontSize={"16px"}>희망평형</LabelTypo>
                  <NoneBorderInput
                    sx={{ width: "200px" }}
                    {...register("hopeBalance")}
                  />
                </CenteredBox>
                <CenteredBox>
                  <LabelTypo fontSize={"16px"}>상담횟수</LabelTypo>
                  <NoneBorderInput
                    sx={{ width: "200px" }}
                    {...register("cnsltCnt")}
                  />
                </CenteredBox>
                <CenteredBox>
                  <LabelTypo fontSize={"16px"}>수신동의</LabelTypo>
                  <NoneBorderInput
                    sx={{ width: "200px" }}
                    {...register("rctnRejectXyn")}
                  />
                </CenteredBox>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        {/* 상담항목, 세부항목 회색 인풋 영역 */}
        <Box
          display="flex"
          overflow="hidden"
          height={"100%"}
          gap={1}
          margin={1}
        >
          <Stack width={"100%"} height={"100%"} gap={1}>
            <GrayBox height={"50px"}>
              <Typography
                width={"28%"}
                fontSize={"16px"}
                variant="h5"
                marginRight={20}
              >
                상담항목
              </Typography>
              <Typography fontSize={"16px"} width={"100%"} variant="h5">
                선택값
              </Typography>
              {/* <BasicButton onClick={refreshDetList}>새로고침</BasicButton> */}
            </GrayBox>
            {/* 상담항목 세부항목 */}
            <GrayBox
              flexDirection={"column"}
              width={"100%"}
              height={"100%"}
              gap={1}
              overflow="auto"
              justifyContent={"start"}
              alignContent={"start"}
            >
              {cnsltItemData?.data.contents.map((item: any, index: number) => (
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
                  width={"100%"}
                >
                  <Typography width={"20%"} sx={{ fontSize: "16px" }}>
                    {item.itemNm}
                  </Typography>
                  <NoneBorderInput
                    sx={{
                      minHeight: "24px",
                      minWidth: "80%",
                    }}
                    value={
                      detailInfo[item.itemNo]?.detailNm ??
                      cunsltDetailList?.data?.contents?.itemList?.[index]
                        ?.detailNm ??
                      "" // 기본값 설정
                    }
                    readOnly
                  />
                </Box>
              ))}
            </GrayBox>
          </Stack>

          <Box
            flexDirection={"column"}
            width={"100%"}
            height={"100%"}
            overflow="auto"
          >
            <GrayBox>
              <Typography variant="h5" marginRight={"auto"} fontSize={"16px"}>
                세부항목
              </Typography>
              <BasicButton onClick={refreshDetList}>새로고침</BasicButton>
            </GrayBox>
            <BasicTable data={itemDetList?.data.contents}>
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
        <GrayBox
          height={"20%"}
          borderRadius={0}
          sx={{ fontSize: "16px" }}
          gap={2}
        >
          <Typography>특기사항</Typography>
          <TextArea height="100%" {...register("spcmnt")} />
          <BasicButton type="submit" sx={{ fontSize: "16px" }}>
            저장
          </BasicButton>
        </GrayBox>
      </form>
    </>
  );
}
