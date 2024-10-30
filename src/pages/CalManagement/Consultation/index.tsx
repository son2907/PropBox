import { Box, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import CallTable from "./CallTable";
import Calendar from "../../../components/Calendar/Calendar";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { BasicButton, IconButton } from "../../../components/Button";
import BasicInput from "../../../components/Input/BasicInput";
import { IoSearchOutline } from "react-icons/io5";
import IconSquareButton from "../../../components/Button/IconSquareButton";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import CenteredBox from "../../../components/Box/CenteredBox";
import LabelTypo from "../../../components/Typography/LabelTypo";

const testData = [
  {
    value: 1,
    data: "대구 수성구 센터",
  },
  {
    value: 2,
    data: "대구 OO구 센터2",
  },
  {
    value: 3,
    data: "대구 OO구 센터3",
  },
  {
    value: 4,
    data: "대구 OO구 센터4",
  },
];

export default function CallConsultation() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { selectValue, handleChange } = useSelect();

  return (
    <Box display={"flex"} width={"100%"} height={"100%"} overflow={"hidden"}>
      {/* 좌측 전화받기/전화걸기, 통화콜/부재콜 테이블 */}
      <Box width={"30%"} minWidth={"350px"} marginRight={2}>
        <CallTable />
      </Box>

      {/* 중간 상담 정보  */}
      <Box width={"50%"} minWidth={"750px"} height={"100%"}>
        <GrayBox>
          {/* 왼쪽 상담일자 그룹 */}
          <Box display="flex" alignItems="center">
            <LabelTypo>상담일자</LabelTypo>
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <Typography variant="bodySS" color="error.main" paddingLeft={2}>
              <MdInfoOutline />
              현재 날짜가 아닙니다.
            </Typography>
          </Box>

          {/* 오른쪽 버튼 그룹 */}
          <Box display="flex" gap={1} marginLeft="auto">
            <BasicButton>상담현황</BasicButton>
            <BasicButton>추가</BasicButton>
            <BasicButton>삭제</BasicButton>
            <BasicButton>문자</BasicButton>
          </Box>
        </GrayBox>
        {/* 인풋 그룹 */}
        <Box display={"flex"} width={"100%"}>
          <Box display={"flex"} width={"80%"}>
            {/* 왼쪽 */}
            <Box marginTop={1} display="flex" flexDirection="column" gap={0.5}>
              <CenteredBox>
                <LabelTypo>상담전화</LabelTypo>
                <BasicInput sx={{ height: "25px" }} />
                <IconSquareButton
                  sx={{
                    border: "1px solid #D9D9D9",
                    borderRadius: "5px",
                    padding: "4px",
                    marginLeft: "5px",
                    height: "25px",
                    width: "25px",
                  }}
                >
                  <IoSearchOutline size={"1em"} />
                </IconSquareButton>
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>이름</LabelTypo>
                <BasicInput sx={{ height: "25px" }} />
                <IconSquareButton
                  sx={{
                    border: "1px solid #D9D9D9",
                    borderRadius: "5px",
                    padding: "4px",
                    marginLeft: "5px",
                    height: "25px",
                    width: "25px",
                  }}
                >
                  <IoSearchOutline size={"1em"} />
                </IconSquareButton>
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>고객정보</LabelTypo>
                <BasicInput sx={{ height: "25px" }} />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>휴대전화</LabelTypo>
                <BasicInput sx={{ height: "25px" }} />
                <LabelTypo marginLeft={2}>일반전화</LabelTypo>
                <BasicInput sx={{ height: "25px" }} />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>주소</LabelTypo>
                <BasicInput sx={{ height: "25px" }} />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>관리지역</LabelTypo>
                <Select
                  sx={{ width: "205px", height: "25px" }}
                  placeholder=""
                  selectData={testData}
                  value={selectValue}
                  onChange={handleChange}
                />
              </CenteredBox>
            </Box>
          </Box>
          {/* 오른쪽 */}
          <Box display={"flex"} width={"24%"}>
            <GrayBox
              flexDirection={"column"}
              justifyContent={"center"}
              width={"100%"}
              height={"150px"}
              borderRadius={"8px"}
              marginTop={2}
              marginRight={2}
              gap={0.5}
            >
              <CenteredBox>
                <LabelTypo>호응도</LabelTypo>
                <BasicInput sx={{ width: "60px", height: "25px" }} />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>희망평형</LabelTypo>
                <BasicInput sx={{ width: "60px", height: "25px" }} />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>상담횟수</LabelTypo>
                <BasicInput sx={{ width: "60px", height: "25px" }} />
              </CenteredBox>
              <CenteredBox>
                <LabelTypo>수신동의</LabelTypo>
                <BasicInput sx={{ width: "60px", height: "25px" }} />
              </CenteredBox>
            </GrayBox>
          </Box>
        </Box>

        <Box display={"flex"} width={"100%"} height={"100%"} marginTop={1}>
          <GrayBox flexDirection={"column"} width={"50%"}>
            하나
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
            <BasicInput sx={{ height: "25px" }} />
          </GrayBox>
          <GrayBox flexDirection={"column"} width={"50%"}>
            둘
          </GrayBox>
        </Box>
      </Box>
      <Box width={"20%"} minWidth={"400px"} bgcolor={"violet"}>
        <div>상담이력 메모 탭메뉴</div>
        <div>회색 배경 메모장 저장버튼</div>
        <div>그냥 인풋 큰거</div>
      </Box>
    </Box>
  );
}
