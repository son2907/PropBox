import { Box, Stack, Typography } from "@mui/material";
import useTabs from "../../../hooks/useTabs";
import GrayBox from "../../../components/Box/GrayBox";
import { BiChevronRight } from "react-icons/bi";
import ButtonTab from "./components/ButtonTap";
import ConfigSetting from "./ConfigSettings";
import RegionRegistration from "./RegionRegistration";

export default function BasicInfo() {
  const { value, handleChange } = useTabs(1);

  // value = 현재 선택된 값
  // index = 버튼의 고윳값
  console.log(value);
  return (
    <>
      <Stack minWidth={"400px"} height={"100%"} gap={1}>
        <GrayBox justifyContent={"center"}>
          <Typography>기본정보</Typography>
        </GrayBox>
        <ButtonTab index={0} value={value} handleChange={handleChange}>
          <BiChevronRight />
          <Typography>상담항목설정</Typography>
        </ButtonTab>

        <ButtonTab index={1} value={value} handleChange={handleChange}>
          <BiChevronRight />
          <Typography>관리지역등록</Typography>
        </ButtonTab>
      </Stack>

      <Box
        display={"flex"}
        width={"calc(100% - 400px)"}
        height={"100%"}
        gap={1}
        marginLeft={1}
      >
        {value === 0 ? (
          <ConfigSetting />
        ) : value === 1 ? (
          <RegionRegistration />
        ) : null}
      </Box>
    </>
  );
}
