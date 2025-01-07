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
import { useEffect, useRef, useState } from "react";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import { TabType } from "../../../types/menu";
import { TbBookmark } from "react-icons/tb";
import { IoCallOutline } from "react-icons/io5";
import TextArea from "../../../components/TextArea/TextArea";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { openPopup } from "../../../utils/openPopup";
import PathConstants from "../../../routers/path";
import CenteredBox from "../../../components/Box/CenteredBox";
import {
  useAreaList,
  useCnsltDetail,
  useItemDetList,
  usePostCnsltInfo,
} from "../../../api/callCnslt";
import useMultiInputValue from "../../../hooks/useMultiInputValue";
import { useCnsltStore } from "../../../stores/CunsltStore";
import { filterDataByValues } from "../../../utils/filterDataByValues";
import { CnsltInfoRequestType } from "../../../types/TelList";

export default function InfoGroup({ tabType }: TabType) {
  // 좌측 테이블에서 일련의 데이터가 선택되면 -> cstmrNo && cnsltNo가 바인딩 됨
  // => zuStand에 넣어둠..
  // sptNo는 현장번호

  const testRefs = useRef<any>([]);

  const {
    inputRefs: topRefs,
    setInputValue: setTopValue,
    getInputValue: getTopValue,
  } = useMultiInputValue();

  const { data: areaList } = useAreaList();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [selectDetailItem, setDetailItem] = useState<string>("");

  const { cstmrNo, cnsltNo, type } = useCnsltStore();
  const { data: cunsltDetailList } = useCnsltDetail(cstmrNo, cnsltNo);
  const { data: itemDetList, refetch: itemDetListRefetch } = useItemDetList({
    itemNo: selectDetailItem ?? "",
  });

  const { toggleRowSelection, resetSelection } = useSingleRowSelection();

  const { selectListData, selectValue, handleChange } = useSelect(
    areaList?.data.contents,
    "areaNo", // 현장 번호
    "areaNm", // 현장명
    cunsltDetailList?.data.contents.areaNo
  );

  // const {mutate: postInfo} = usePostCnsltInfo();

  // const body :CnsltInfoRequestType = {

  // }

  // const postInfoFn = () => {
  //    postInfo(
  //      {
  //        body: testData,
  //      },
  //      {
  //        onSuccess: (res) => {
  //          console.log("메모 저장 성공:", res);
  //        },
  //        onError: (res) => {
  //          console.log("메모 저장 에러", res);
  //        },
  //      }
  //    );
  // }

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

  const refreshDetList = () => {
    if (!selectDetailItem) return null;
    itemDetListRefetch();
    resetSelection();
    testRefs.current = [];
  };

  useEffect(() => {
    if (!cunsltDetailList) {
      setDetailItem("");
      resetSelection();
      testRefs.current = [];
    }
  }, [cunsltDetailList]);

  console.log(
    "선택한 상담에 대한 데이터:",
    cunsltDetailList,
    "상세사항",
    itemDetList
  );

  const isToday = (date: Date): boolean => {
    const today = new Date();
    // 오늘 날짜와 selectedDate의 날짜 부분만 비교
    return today.toISOString().slice(0, 10) === date.toISOString().slice(0, 10);
  };

  const selectDetItem = (item: any) => {
    toggleRowSelection(item.detailNo);
    testRefs.current[item.itemNo] = {
      itemNo: item.itemNo,
      detailNo: item.detailNo,
      detailNm: item.detailNm,
    };
  };

  return (
    <>
      <Stack width={"100%"} height={"100%"}>
        {/* 상단 회색박스 ********************************************** */}
        <GrayBox height={"50px"} width={"100%"}>
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
            <BasicButton
              onClick={() => {
                const data = getTopValue();
                console.log("인풋 값:", data);
                testRefs.current.forEach((ref: any, index: any) => {
                  if (ref !== null) {
                    console.log(`testRefs.current[${index}]:`, ref);
                  }
                });
              }}
            >
              추가
            </BasicButton>
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
              <BasicInput
                key={cunsltDetailList?.data.contents.cnsltTelno}
                defaultValue={cunsltDetailList?.data.contents.cnsltTelno}
                ref={(el) => (topRefs.current[0] = el)}
              />
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
              <BasicInput
                key={cunsltDetailList?.data.contents.cstmrNm}
                defaultValue={cunsltDetailList?.data.contents.cstmrNm}
                ref={(el) => (topRefs.current[1] = el)}
              />
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
              <BasicInput
                key={cunsltDetailList?.data.contents.cstmrRmk}
                defaultValue={
                  type == "Y" ? cunsltDetailList?.data.contents.cstmrRmk : ""
                }
                ref={(el) => (topRefs.current[2] = el)}
              />
            </CenteredBox>
            <CenteredBox>
              <LabelTypo>휴대전화</LabelTypo>
              <BasicInput
                key={cunsltDetailList?.data.contents.mbtlNo}
                defaultValue={
                  type == "Y" ? cunsltDetailList?.data.contents.mbtlNo : ""
                }
                ref={(el) => (topRefs.current[3] = el)}
              />
              {tabType ? (
                <IconSquareButton>
                  <TbBookmark size={"1rem"} />
                </IconSquareButton>
              ) : null}
              <LabelTypo marginLeft={2}>일반전화</LabelTypo>
              <BasicInput
                key={cunsltDetailList?.data.contents.telNo}
                defaultValue={
                  type == "Y" ? cunsltDetailList?.data.contents.telNo : ""
                }
                ref={(el) => (topRefs.current[4] = el)}
              />
              {tabType ? (
                <IconSquareButton>
                  <IoCallOutline size={"1rem"} />
                </IconSquareButton>
              ) : null}
            </CenteredBox>
            <CenteredBox>
              <LabelTypo>주소</LabelTypo>
              <BasicInput
                sx={{ width: "500px" }}
                key={cunsltDetailList?.data.contents.addr}
                defaultValue={
                  type == "Y" ? cunsltDetailList?.data.contents.addr : ""
                }
                ref={(el) => (topRefs.current[5] = el)}
              />
            </CenteredBox>
            <CenteredBox>
              <LabelTypo>관리지역</LabelTypo>
              <Select
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
                  sx={{ width: "80px" }}
                  key={cunsltDetailList?.data.contents.complianceRate}
                  defaultValue={cunsltDetailList?.data.contents.complianceRate}
                />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>희망평형</LabelTypo>
                <BasicInput
                  sx={{ width: "80px" }}
                  key={cunsltDetailList?.data.contents.hopeBalance}
                  defaultValue={cunsltDetailList?.data.contents.hopeBalance}
                />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>상담횟수</LabelTypo>
                <BasicInput
                  sx={{ width: "80px" }}
                  key={cunsltDetailList?.data.contents.cnsltCnt}
                  defaultValue={cunsltDetailList?.data.contents.cnsltCnt}
                />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>수신동의</LabelTypo>
                <BasicInput
                  sx={{ width: "80px" }}
                  key={cunsltDetailList?.data.contents.rctnRejectXyn}
                  defaultValue={cunsltDetailList?.data.contents.rctnRejectXyn}
                />
              </CenteredBox>
            </GrayBox>
          </Stack>
        </Box>
      </Stack>

      {/* 상담항목, 세부항목 회색 인풋 영역 */}
      <Box display="flex" overflow="hidden" minHeight="600px" gap={1}>
        {/* 상담항목 세부항목 */}
        <GrayBox
          flexDirection={"column"}
          width={"50%"}
          height={"100%"}
          gap={1}
          overflow="auto"
        >
          {cunsltDetailList?.data.contents.itemList == undefined ? (
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
                  name={item.itemNo}
                  value={
                    testRefs.current[item.itemNo]?.detailNm ?? item.detailNm
                  }
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
          <BasicTable data={itemDetList?.data.contents}>
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
                      testRefs.current[item.itemNo]?.detailNo === item.detailNo
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
      <TextArea
        height="140px"
        key={cunsltDetailList?.data.contents.spcmnt}
        value={cunsltDetailList?.data.contents.spcmnt}
      />
      <GrayBox height={"40px"} marginTop={1} justifyContent={"flex-end"}>
        <BasicButton>저장</BasicButton>
      </GrayBox>
    </>
  );
}
