import { Box, Stack, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import LabelTypo from "../../../components/Typography/LabelTypo";
import { BasicButton } from "../../../components/Button";
import BasicInput from "../../../components/Input/BasicInput";
import BasicTable from "../../../components/Table/BasicTable";
import { selectTestData, tableTestData } from "../../../utils/testData";
import { IoSearchOutline } from "react-icons/io5";
import IconSquareButton from "../../../components/Button/IconSquareButton";
import Calendar from "../../../components/Calendar/Calendar";
import { MdInfoOutline } from "react-icons/md";
import { useEffect, useState } from "react";
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
import { useCnsltDetail } from "../../../api/callCnslt";
import useMultiInputValue from "../../../hooks/useMultiInputValue";
import { useCnsltStore } from "../../../stores/CunsltStore";

export default function InfoGroup({ tabType }: TabType) {
  // 좌측 테이블에서 일련의 데이터가 선택되면 -> cstmrNo && cnsltNo가 바인딩 됨
  // => zuStand에 넣어둠..
  // sptNo는 현장번호

  const { inputRefs, getInputValues } = useMultiInputValue();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { selectListData, selectValue, handleChange } = useSelect(
    selectTestData,
    "value",
    "data"
  );

  const { cstmrNo, cnsltNo } = useCnsltStore();
  const { data: cunsltDetailList } = useCnsltDetail(cstmrNo, cnsltNo);
  const { type } = useCnsltStore(); // 통화, 부재, 대기 타입

  // 선택한 고객 한명에 대한 정보
  const [cnsltDetail, setcnsltDetail] = useState<any>([]);

  useEffect(() => {
    if (cunsltDetailList) {
      console.log("선택한 고객의 detail api 조회 데이터:", cunsltDetailList);
      setcnsltDetail(cunsltDetailList.data.contents);
    } else {
      setcnsltDetail([]);
    }
  }, [cstmrNo, cnsltNo, cunsltDetailList]);

  // 테이블 선택 조건이 없으므로 다중선택 ui 적용
  const { selectedRow, toggleRowSelection } = useSingleRowSelection();

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
            <MdInfoOutline />
            현재 날짜가 아닙니다.
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
            <BasicButton>추가</BasicButton>
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
                ref={(el) => (inputRefs.current[100] = el)}
                key={cnsltDetail.cnsltTelno}
                defaultValue={cnsltDetail.cnsltTelno}
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
                key={cnsltDetail.cstmrNm}
                defaultValue={cnsltDetail.cstmrNm}
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
                key={cnsltDetail.cstmrRmk}
                defaultValue={type == "Y" ? cnsltDetail.cstmrRmk : ""}
              />
            </CenteredBox>
            <CenteredBox>
              <LabelTypo>휴대전화</LabelTypo>
              <BasicInput
                key={cnsltDetail.mbtlNo}
                defaultValue={type == "Y" ? cnsltDetail.mbtlNo : ""}
              />
              {tabType ? (
                <IconSquareButton>
                  <TbBookmark size={"1rem"} />
                </IconSquareButton>
              ) : null}
              <LabelTypo marginLeft={2}>일반전화</LabelTypo>
              <BasicInput
                key={cnsltDetail.telNo}
                defaultValue={type == "Y" ? cnsltDetail.telNo : ""}
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
                key={cnsltDetail.addr}
                defaultValue={type == "Y" ? cnsltDetail.addr : ""}
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
                  key={cnsltDetail.complianceRate}
                  defaultValue={cnsltDetail.complianceRate}
                />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>희망평형</LabelTypo>
                <BasicInput
                  sx={{ width: "80px" }}
                  key={cnsltDetail.hopeBalance}
                  defaultValue={cnsltDetail.hopeBalance}
                />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>상담횟수</LabelTypo>
                <BasicInput
                  sx={{ width: "80px" }}
                  key={cnsltDetail.hopeBalance}
                  defaultValue={cnsltDetail.hopeBalance}
                />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>수신동의</LabelTypo>
                <BasicInput
                  sx={{ width: "80px" }}
                  key={cnsltDetail.rctnRejectXyn}
                  defaultValue={cnsltDetail.rctnRejectXyn}
                />
              </CenteredBox>
            </GrayBox>
          </Stack>
        </Box>
      </Stack>

      {/* 상담항목, 세부항목 회색 인풋 영역 */}
      <Box display="flex" overflow="hidden" maxHeight="600px">
        {/* 상담항목 세부항목 */}
        <GrayBox
          flexDirection={"column"}
          width={"50%"}
          height={"100%"}
          gap={1}
          overflow="auto"
        >
          {cnsltDetail.itemList == undefined ? (
            <Typography>
              조회할 정보가 없습니다. 왼쪽 테이블에서 조회할 항목을
              선택해주세요.
            </Typography>
          ) : (
            cnsltDetail.itemList.map((item: any, index: number) => (
              <Box
                key={item.itemNo}
                display="flex"
                alignItems="center" // 수직 중앙 정렬
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
              >
                <LabelTypo>{item.itemNm}</LabelTypo>
                {/* height: 24px */}
                <BasicInput
                  sx={{ minHeight: "24px" }}
                  ref={(el) => (inputRefs.current[index] = el)}
                  defaultValue={item.detailNm}
                />
              </Box>
            ))
          )}
        </GrayBox>
        <GrayBox flexDirection={"column"} width={"50%"} overflow="auto">
          <BasicTable data={tableTestData}>
            <BasicTable.Th>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                세부항목
                <BasicButton>새로고침</BasicButton>
              </Box>
            </BasicTable.Th>

            <BasicTable.Tbody>
              {tableTestData.map((item, index) => {
                return (
                  <BasicTable.Tr
                    key={index}
                    isClicked={selectedRow.has(item.id)}
                    onClick={() => toggleRowSelection(item.id)}
                  >
                    <BasicTable.Td>데이터만</BasicTable.Td>
                  </BasicTable.Tr>
                );
              })}
            </BasicTable.Tbody>
          </BasicTable>
        </GrayBox>
      </Box>
      <GrayBox height={"40px"} marginTop={1} marginBlock={1}>
        특기사항
      </GrayBox>
      {/* <BasicInput sx={{ height: "60px" }} /> */}
      <TextArea height="140px" />
      <GrayBox height={"40px"} marginTop={1} justifyContent={"flex-end"}>
        <BasicButton>저장</BasicButton>
      </GrayBox>
    </>
  );
}
