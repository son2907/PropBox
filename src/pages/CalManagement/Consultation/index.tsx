import { Box, Typography } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import CallTable from "./CallTable";
import Calendar from "../../../components/Calendar/Calendar";
import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { BasicButton } from "../../../components/Button";
import BasicInput from "../../../components/Input/BasicInput";
import { IoSearchOutline } from "react-icons/io5";
import IconSquareButton from "../../../components/Button/IconSquareButton";
import useSelect from "../../../hooks/useSelect";
import LabelTypo from "../../../components/Typography/LabelTypo";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import useTabs from "../../../hooks/useTabs";
import SelectorTabs from "../../../components/Tab/SelectorTabs";

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

  const { value, handleChange: tabChange } = useTabs(0);

  return (
    <Box display={"flex"} width={"100%"} height={"100%"}>
      {/* 좌측 전화받기/전화걸기, 통화콜/부재콜 테이블 */}
      <Box width={"30%"} minWidth={"350px"} marginRight={2}>
        <CallTable />
      </Box>

      {/* 중간 상담 정보  */}
      <Box width={"50%"} minWidth={"750px"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"100%"}
          height={"230px"}
        >
          {/* 상단 회색박스 ********************************************** */}
          <GrayBox height={"50px"} width={"100%"}>
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
          <Box
            display="flex"
            width={"100%"}
            height={"calc(100% - 50px)"}
            padding={0.8}
            paddingLeft={2}
          >
            {/* 왼쪽 */}
            <Box
              display="flex"
              flexDirection={"column"}
              width={"80%"}
              height={"100%"}
              gap={0.3}
            >
              <Box
                display="flex"
                alignItems="center" // 수직 중앙 정렬
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                height={0}
              >
                <LabelTypo>상담전화</LabelTypo>
                <BasicInput />
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
              </Box>
              <Box
                display="flex"
                alignItems="center" // 수직 중앙 정렬
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                height={0}
              >
                <LabelTypo>이름</LabelTypo>
                <BasicInput />
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
              </Box>
              <Box
                display="flex"
                alignItems="center" // 수직 중앙 정렬
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                height={0}
              >
                <LabelTypo>고객정보</LabelTypo>
                <BasicInput />
              </Box>
              <Box
                display="flex"
                alignItems="center" // 수직 중앙 정렬
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                height={0}
              >
                <LabelTypo>휴대전화</LabelTypo>
                <BasicInput />
                <LabelTypo marginLeft={2}>일반전화</LabelTypo>
                <BasicInput />
              </Box>
              <Box
                display="flex"
                alignItems="center" // 수직 중앙 정렬
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                height={0}
              >
                <LabelTypo>주소</LabelTypo>
                <BasicInput />
              </Box>
              <Box
                display="flex"
                alignItems="center" // 수직 중앙 정렬
                flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                height={0}
              >
                <LabelTypo>관리지역</LabelTypo>
                <BasicInput />
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
                height={"150px"}
                borderRadius={"8px"}
                marginTop={2}
                marginRight={2}
                gap={0.5}
              >
                <Box
                  display="flex"
                  alignItems="center" // 수직 중앙 정렬
                  flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                  height={0}
                >
                  <LabelTypo>호응도</LabelTypo>
                  <BasicInput sx={{ width: "50px" }} />
                </Box>
                <Box
                  display="flex"
                  alignItems="center" // 수직 중앙 정렬
                  flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                  height={0}
                >
                  <LabelTypo>희망평형</LabelTypo>
                  <BasicInput sx={{ width: "50px" }} />
                </Box>
                <Box
                  display="flex"
                  alignItems="center" // 수직 중앙 정렬
                  flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                  height={0}
                >
                  <LabelTypo>상담횟수</LabelTypo>
                  <BasicInput sx={{ width: "50px" }} />
                </Box>
                <Box
                  display="flex"
                  alignItems="center" // 수직 중앙 정렬
                  flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
                  height={0}
                >
                  <LabelTypo>수신동의</LabelTypo>
                  <BasicInput sx={{ width: "50px" }} />
                </Box>
              </GrayBox>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} width={"100%"} height="calc(100% - 400px)">
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
                <BasicInput sx={{ height: "25px" }} />
              </Box>
            ))}
          </GrayBox>
          <GrayBox flexDirection={"column"} width={"50%"} overflow="auto">
            <BasicTable data={tableTestData}>
              <BasicTable.Theader>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  세부항목
                  <BasicButton>새로고침</BasicButton>
                </div>
              </BasicTable.Theader>

              <BasicTable.Tbody>
                {Array.from({ length: 40 }).map((item, index) => {
                  return (
                    <BasicTable.Tr>
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
        <BasicInput sx={{ height: "60px" }} />
        <GrayBox height={"40px"} marginTop={1} justifyContent={"flex-end"}>
          <BasicButton>저장</BasicButton>
        </GrayBox>
      </Box>

      <Box width={"20%"} minWidth={"400px"} bgcolor={"white"} marginLeft={1}>
        <SelectorTabs value={value} handleChange={tabChange}>
          <SelectorTabs.Tab label="상담이력" disableRipple />
          <SelectorTabs.Tab label="메모" disableRipple />
        </SelectorTabs>
        <GrayBox
          justifyContent={"space-between"}
          marginTop={1}
          marginBottom={1}
        >
          메모장
          <BasicButton>저장</BasicButton>
        </GrayBox>
        <Box height={"calc(100% - 120px)"}>
          <BasicInput />
        </Box>
      </Box>
    </Box>
  );
}
