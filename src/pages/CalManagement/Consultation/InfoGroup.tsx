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
import { useState } from "react";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import { TabType } from "../../../types/menu";
import { TbBookmark } from "react-icons/tb";
import { IoCallOutline } from "react-icons/io5";
import TextArea from "../../../components/TextArea/TextArea";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import { openPopup } from "../../../utils/openPopup";
import PathConstants from "../../../routers/path";

export default function InfoGroup({ tabType }: TabType) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { selectValue, handleChange } = useSelect();

  // 테이블 선택 조건이 없으므로 다중선택 ui 적용
  const { selectedRow, toggleRowSelection } = useSingleRowSelection();

  const url = PathConstants.Call.SearchCustomer; // 팝업으로 열 페이지의 URL
  const windowName = "고객 검색"; // 팝업 창 이름

  return (
    <>
      <Stack marginBottom={1}>
        {/* 상단 회색박스 ********************************************** */}
        <GrayBox height={"50px"} width={"100%"}>
          <LabelTypo>상담일자</LabelTypo>
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <Typography variant="bodySS" color="error.main" paddingLeft={2}>
            <MdInfoOutline />
            현재 날짜가 아닙니다.
          </Typography>

          {/* 오른쪽 버튼 그룹 */}
          <Box display="flex" gap={1} marginLeft="auto">
            <BasicButton>상담현황</BasicButton>
            <BasicButton>추가</BasicButton>
            <BasicButton>삭제</BasicButton>
            <BasicButton>문자</BasicButton>
          </Box>
        </GrayBox>
        <Box
          display="flex"
          width={"100%"}
          height={"100%"}
          padding={0.8}
          paddingLeft={2}
        >
          {/* 왼쪽 */}
          <Box display="flex" flexDirection={"column"} width={"80%"} gap={0.7}>
            <Box display="flex" alignItems="center">
              <LabelTypo>
                <span className="text-red-500">*</span>
                상담전화
              </LabelTypo>
              <BasicInput />
              <IconSquareButton
                onClick={() => {
                  openPopup({
                    url,
                    windowName,
                  });
                }}
              >
                <IoSearchOutline size={"1em"} />
              </IconSquareButton>
            </Box>
            <Box display="flex" alignItems="center">
              <LabelTypo>
                <span className="text-red-500">*</span>이름
              </LabelTypo>
              <BasicInput />
              <IconSquareButton>
                <IoSearchOutline size={"1em"} />
              </IconSquareButton>
              {tabType ? (
                <>
                  <input type="checkbox" />
                  <Typography>부재콜</Typography>
                </>
              ) : null}
            </Box>
            <Box display="flex" alignItems="center">
              <LabelTypo>고객정보</LabelTypo>
              <BasicInput />
            </Box>
            <Box display="flex" alignItems="center">
              <LabelTypo>휴대전화</LabelTypo>
              <BasicInput />
              {tabType ? (
                <IconSquareButton>
                  <TbBookmark size={"1rem"} />
                </IconSquareButton>
              ) : null}
              <LabelTypo marginLeft={2}>일반전화</LabelTypo>
              <BasicInput />
              {tabType ? (
                <IconSquareButton>
                  <IoCallOutline size={"1rem"} />
                </IconSquareButton>
              ) : null}
            </Box>
            <Box display="flex" alignItems="center">
              <LabelTypo>주소</LabelTypo>
              <BasicInput sx={{ width: "500px" }} />
            </Box>
            <Box display="flex" alignItems="center">
              <LabelTypo>관리지역</LabelTypo>
              <Select
                value={selectValue}
                onChange={handleChange}
                selectData={selectTestData}
                sx={{ width: "204px" }}
              />
            </Box>
          </Box>

          {/* 오른쪽 */}
          <Box
            width={"20%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
          >
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
              <Box
                display="flex"
                alignItems="center" // 수직 중앙 정렬
              >
                <LabelTypo>호응도</LabelTypo>
                <BasicInput sx={{ width: "80px" }} />
              </Box>
              <Box
                display="flex"
                alignItems="center" // 수직 중앙 정렬
              >
                <LabelTypo>희망평형</LabelTypo>
                <BasicInput sx={{ width: "80px" }} />
              </Box>
              <Box
                display="flex"
                alignItems="center" // 수직 중앙 정렬
              >
                <LabelTypo>상담횟수</LabelTypo>
                <BasicInput sx={{ width: "80px" }} />
              </Box>
              <Box
                display="flex"
                alignItems="center" // 수직 중앙 정렬
              >
                <LabelTypo>수신동의</LabelTypo>
                <BasicInput sx={{ width: "80px" }} />
              </Box>
            </GrayBox>
          </Box>
        </Box>
      </Stack>

      {/* 상담항목, 세부항목 회색 인풋 영역 */}
      {/* 테이블을 감쌀 때 아래 Box 사용 */}
      <Box display="flex" overflow="hidden" maxHeight="600px">
        {/* 상담항목 세부항목 */}
        <GrayBox
          flexDirection={"column"}
          width={"50%"}
          height={"100%"}
          gap={1}
          overflow="auto"
        >
          {Array.from({ length: 40 }).map((_, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center" // 수직 중앙 정렬
              flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
            >
              <LabelTypo>수신동의</LabelTypo>
              {/* height: 24px */}
              <BasicInput sx={{ minHeight: "24px" }} />
            </Box>
          ))}
        </GrayBox>
        <GrayBox flexDirection={"column"} width={"50%"} overflow="auto">
          <BasicTable data={tableTestData}>
            <BasicTable.Theader>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                세부항목
                <BasicButton>새로고침</BasicButton>
              </Box>
            </BasicTable.Theader>

            <BasicTable.Tbody>
              {tableTestData.map((item, index) => {
                return (
                  <BasicTable.Tr
                    key={index}
                    isClicked={selectedRow === item.id}
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
      <TextArea height="300px" />
      <GrayBox height={"40px"} marginTop={1} justifyContent={"flex-end"}>
        <BasicButton>저장</BasicButton>
      </GrayBox>
    </>
  );
}
