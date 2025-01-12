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
import { useState } from "react";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import { TabType } from "../../../types/menu";
import { TbBookmark } from "react-icons/tb";
import { IoCallOutline } from "react-icons/io5";
import TextArea from "../../../components/TextArea/TextArea";
import { openPopup } from "../../../utils/openPopup";
import PathConstants from "../../../routers/path";
import CenteredBox from "../../../components/Box/CenteredBox";
import {
  useAreaList,
  useCnsltDetail,
  useItemDetList,
  usePostCnsltInfo,
} from "../../../api/callCnslt";
import { useCnsltStore } from "../../../stores/CunsltStore";
import { CnsltInfoRequestType } from "../../../types/callCnslt";
import { useForm } from "react-hook-form";
import { getFormattedDate } from "../../../utils/getFormattedDate";
import { useAuthStore } from "../../../stores/authStore";
import useDidMountEffect from "../../../hooks/useDidMountEffect";

export default function InfoGroup({ tabType }: TabType) {
  // 로그인 아이디
  const { loginId } = useAuthStore(["loginId"]);

  // 검색 조건 (왼쪽 테이블에서 선택한 한 행)
  const { cstmrNo, cnsltNo, callYn, trsmYn } = useCnsltStore();

  // 상담 일자
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // 선택한 상담 항목
  const [selectDetailItem, setDetailItem] = useState<string>("");

  // <========================= GET API =========================>

  // 지역 리스트 api
  const { data: areaList } = useAreaList();

  // 전체 데이터 (상담 전화~상담항목 목록) api
  const { data: cunsltDetailList } = useCnsltDetail(cstmrNo, cnsltNo);

  // 선택한 상담 항목 목록에 대한 상세항목 api
  const { data: itemDetList, refetch: itemDetListRefetch } = useItemDetList({
    itemNo: selectDetailItem ?? "",
  });
  // 선택한 세부 사항
  const [detailInfo, setDetailInfo] = useState<any[]>([{}]);

  // 초깃값
  const defaultValue = {
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
  };

  // input 할당 useForm
  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultValue,
  });

  // 관리지역 select
  const { selectListData, selectValue, handleChange } = useSelect(
    areaList?.data.contents || [],
    "areaNo", // 현장 번호
    "areaNm", // 현장명
    cunsltDetailList?.data?.contents?.areaNo ?? ""
  );

  // <========================= Popup =========================>

  const searchPopupInfo = {
    url: PathConstants.Call.SearchCustomer,
    windowName: "고객 검색",
  };

  const statusPopupInfo = {
    url: PathConstants.Call.ConsultationStatus,
    windowName: "상담 현황",
  };

  const smsPopupInfo = {
    url: PathConstants.Call.SmsSending,
    windowFeatures: "width=1000,height=700,scrollbars=yes,resizable=yes",
    windowName: "sms 전송",
  };

  console.log(
    "선택한 상담에 대한 데이터:",
    cunsltDetailList,
    "상세사항",
    itemDetList
  );

  // 날짜비교
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return today.toISOString().slice(0, 10) === date.toISOString().slice(0, 10);
  };

  // 상세항목 테이블 클릭
  const selectDetItem = (item: any) => {
    setDetailInfo((prev) => {
      const updatedArray = [...prev];
      updatedArray[item.itemNo] = {
        itemNo: item.itemNo,
        detailNo: item.detailNo,
        detailNm: item.detailNm,
      };
      return updatedArray;
    });
  };

  // 세부항목 새로고침 버튼
  const refreshDetList = () => {
    if (!selectDetailItem) return null;
    itemDetListRefetch();
    setDetailInfo([{}]);
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

  // <========================= POST =========================>

  const { mutate: postInfo } = usePostCnsltInfo();

  const onSubmit = (data: any) => {
    const data_1 = cunsltDetailList?.data.contents;
    const telCnsltCnList = detailInfo
      .filter((item) => Object.keys(item).length > 0) // 빈 객체가 아닌 경우만 필터링
      .map(({ itemNo, detailNo }) => ({ itemNo, detailNo }));

    // console.log("잠만:", telCnsltCnList);
    const body: CnsltInfoRequestType = {
      sptNo: data_1.sptNo,
      cstmrNo: data_1.cstmrNo,
      cnsltNo: isToday(selectedDate) ? data_1.cnsltNo : "",
      cnsltnt: data_1.cnsltnt,
      cnsltDt: getFormattedDate(selectedDate),
      telId: data_1.telId,
      cnsltTelno: data.cnsltTelno,
      cstmrNm: data.cstmrNm,
      mbtlNo: data.mbtlNo,
      telNo: data.telNo,
      cstmrRmk: data.cstmrRmk,
      addr: data.addr,
      areaNo: selectValue,
      spcmnt: data.spcmnt,
      callYn: callYn,
      trsmYn: trsmYn,
      legacySlutnId: trsmYn == "W" ? "CS0001" : "TM0001",
      userId: loginId,
      telCnsltCnList: telCnsltCnList,
      ...(data_1.waitCstmrNo && { waitCstmrNo: data_1.waitCstmrNo }),
    };

    console.log("보낼 데이터:", body);

    postInfo(
      {
        body: body,
      },
      {
        onSuccess: (res) => {
          console.log("유저 정보 저장 성공:", res);
        },
        onError: (res) => {
          console.log("유저 정보 저장 에러", res);
        },
      }
    );
  };

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
                  openPopup({
                    url: statusPopupInfo.url,
                    windowName: statusPopupInfo.windowName,
                  });
                }}
              >
                상담현황
              </BasicButton>
              <BasicButton type="submit">추가</BasicButton>
              <BasicButton>삭제</BasicButton>
              <BasicButton
                onClick={() => {
                  openPopup({
                    url: smsPopupInfo.url,
                    windowFeatures: smsPopupInfo.windowFeatures,
                    windowName: smsPopupInfo.windowName,
                  });
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
                  onClick={() => {
                    openPopup({
                      url: searchPopupInfo.url,
                      windowName: searchPopupInfo.windowName,
                    });
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
                <IconSquareButton>
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
                  <IconSquareButton>
                    <TbBookmark size={"1rem"} />
                  </IconSquareButton>
                ) : null}
                <LabelTypo marginLeft={2}>일반전화</LabelTypo>
                <BasicInput {...register("telNo")} />
                {tabType ? (
                  <IconSquareButton>
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
              <Typography>
                조회할 정보가 없습니다. 왼쪽 테이블에서 조회할 항목을
                선택해주세요.
              </Typography>
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
                {itemDetList?.data.contents.map((item: any, index: any) => {
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
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </Box>
        </Box>
        <GrayBox height={"40px"} marginTop={1} marginBlock={1}>
          특기사항
        </GrayBox>
        <TextArea height="140px" {...register("spcmnt")} />
        <GrayBox height={"40px"} marginTop={1} justifyContent={"flex-end"}>
          <BasicButton>저장</BasicButton>
        </GrayBox>
      </form>
    </>
  );
}
