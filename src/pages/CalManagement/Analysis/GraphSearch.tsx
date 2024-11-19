import { Stack, Typography } from "@mui/material";
import CenteredBox from "../../../components/Box/CenteredBox";
import Calendar from "../../../components/Calendar/Calendar";
import { Select } from "../../../components/Select";
import { BasicButton } from "../../../components/Button";
import { useState } from "react";
import useSelect from "../../../hooks/useSelect";
import { selectTestData } from "../../../utils/testData";

export default function GraphSearch() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { selectValue: s_0, handleChange: o_0 } = useSelect();

  return (
    <Stack width={"100%"} gap={3}>
      <CenteredBox gap={1} marginTop={1}>
        <Calendar selectedDate={startDate} setSelectedDate={setStartDate} />
        <Typography>~</Typography>
        <Calendar selectedDate={endDate} setSelectedDate={setEndDate} />
      </CenteredBox>
      <CenteredBox gap={1}>
        <Typography>상담구분</Typography>
        <Select
          selectData={selectTestData}
          value={s_0}
          onChange={o_0}
          placeholder="받기"
        />
      </CenteredBox>
      <CenteredBox gap={1}>
        <Typography>검색구분</Typography>
        <Select
          selectData={selectTestData}
          value={s_0}
          onChange={o_0}
          placeholder="일자"
        />
      </CenteredBox>
      <CenteredBox justifyContent={"center"}>
        <BasicButton sx={{ width: "250px" }}>조회</BasicButton>
      </CenteredBox>
    </Stack>
  );
}
