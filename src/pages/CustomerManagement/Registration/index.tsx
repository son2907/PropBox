import { Box, Stack, Typography } from "@mui/material";
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
import { useState } from "react";

export default function Registration() {
  const { selectValue, handleChange } = useSelect();

  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  return (
    <>
      <Stack width={"70%"} height={"100%"} gap={1} marginBottom={1}>
        <GrayBox gap={2} justifyContent="space-between">
          <Stack direction="row" gap={1}>
            <SearchInput />
            <BasicButton sx={{ color: "root.mainBlue", border: 1 }}>SMS 전송</BasicButton>
          </Stack>
          <Stack direction="row" gap={1} >
            <BasicButton>그룹관리</BasicButton>
            <BasicButton>엑셀등록</BasicButton>
          </Stack>
          <Stack direction="row" gap={1}>
            <BasicButton>엑셀저장</BasicButton>
          </Stack>
        </GrayBox>
        <Stack width={"100%"} direction="row" spacing={1}>
          <Stack bgcolor={"white"} marginLeft={1} width={"100%"}>
            {/* GroupInfo에서 선택된 age를 받아옴 */}
            <GroupInfo onSelect={(age) => setSelectedAge(age)}/>
          </Stack>
          <Stack width={"100%"} bgcolor={"white"} marginLeft={1}>
            {/* 선택된 age를 CustomerInfo에 전달 */}
            <CustomerInfo selectedAge={selectedAge} />
          </Stack>
        </Stack>
      </Stack>
      <Stack width={"30%"} marginLeft={1}>
        {/* 상담항목 */}
        <GrayBox>
          <Typography fontSize={"20px"} fontWeight="bold">고객 정보</Typography>
        </GrayBox>
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
            flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
            justifyContent="flex-start" // 가로 방향 왼쪽 정렬
            width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
            gap={1}
          >
            <LabelTypo width={"100%"}>고객이름</LabelTypo>
            {/* height: 24px */}
            <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
          </Box>
          <Box
            display="flex"
            flexDirection="column" // 세로 방향 설정
            flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
            justifyContent="flex-start" // 가로 방향 왼쪽 정렬
            width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
            gap={1}
          >
            <LabelTypo width={"100%"}>휴대전화</LabelTypo>
            {/* height: 24px */}
            <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
          </Box>
          <Box
            display="flex"
            flexDirection="column" // 세로 방향 설정
            flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
            justifyContent="flex-start" // 가로 방향 왼쪽 정렬
            width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
            gap={1}
          >
            <LabelTypo width={"100%"}>일반전화</LabelTypo>
            {/* height: 24px */}
            <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
          </Box>
          <Box
            display="flex"
            flexDirection="column" // 세로 방향 설정
            flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
            justifyContent="flex-start" // 가로 방향 왼쪽 정렬
            width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
            gap={1}
          >
            <LabelTypo width={"100%"}>고객정보</LabelTypo>
            {/* height: 24px */}
            <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
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
            <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
          </Box>
          <Box
            display="flex"
            flexDirection="column" // 세로 방향 설정
            flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
            justifyContent="flex-start" // 가로 방향 왼쪽 정렬
            width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
            gap={1}
          >
            <LabelTypo width={"100%"}>관리지역</LabelTypo>
            {/* height: 24px */}
            <Select
              value={selectValue}
              onChange={handleChange}
              selectData={selectTestData}
              sx={{ width: "80%" }}
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
            <LabelTypo width={"100%"}>호응도</LabelTypo>
            {/* height: 24px */}
            <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
          </Box>
          <Box
            display="flex"
            flexDirection="column" // 세로 방향 설정
            flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
            justifyContent="flex-start" // 가로 방향 왼쪽 정렬
            width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
            gap={1}
          >
            <LabelTypo width={"100%"}>희망평형</LabelTypo>
            {/* height: 24px */}
            <BasicInput sx={{ minHeight: "24px", width: "60%" }} />
          </Box>
          <Box
            display="flex"
            flexDirection="column" // 세로 방향 설정
            flexGrow={1} // 전체 높이를 균등하게 나누기 위해 추가
            justifyContent="flex-start" // 가로 방향 왼쪽 정렬
            width="100%" // Box가 GrayBox의 전체 너비를 차지하도록 설정
            gap={1}
          >
            <LabelTypo width={"100%"}>특기사항</LabelTypo>
            {/* height: 24px */}
            <BasicInput sx={{ minHeight: "24px", width: "100%" }} />
          </Box>

          {Array.from({ length: 40 }).map((_, index) => (
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
              {/* height: 24px */}
              <BasicInput sx={{ minHeight: "24px" }} />
            </Box>
          ))}
        </GrayBox>
      </Stack>

    </>
  );
}
