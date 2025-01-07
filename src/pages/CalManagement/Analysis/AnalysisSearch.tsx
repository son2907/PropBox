import { Stack, Typography } from "@mui/material";
import CenteredBox from "../../../components/Box/CenteredBox";
import Calendar from "../../../components/Calendar/Calendar";
import { useState } from "react";
import useSelect from "../../../hooks/useSelect";
import { Select } from "../../../components/Select";
import { selectTestData } from "../../../utils/testData";
import CheckboxList from "../../../components/List/CheckboxList";
import useMultiInputValue from "../../../hooks/useMultiInputValue";
import { BasicButton } from "../../../components/Button";

export default function AnalysisSearch() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectTestData, "value", "data");

  const { inputRefs } = useMultiInputValue();

  const checkboxListData = [
    { id: "id", label: "상담항목" },
    { id: "size", label: "희망평형" },
    { id: "advertisement", label: "광고매체" },
    { id: "depositType", label: "예금종류" },
    { id: "optIn", label: "수신동의" },
    { id: "customerType", label: "고객구분" },
    { id: "inquiry", label: "문의사항" },
    { id: "response", label: "호응도" },
    { id: "subscriptionRank", label: "청약순위" },
  ];

  return (
    <Stack width={"100%"} gap={2}>
      <CenteredBox gap={1}>
        <Calendar selectedDate={startDate} setSelectedDate={setStartDate} />
        <Typography>~</Typography>
        <Calendar selectedDate={endDate} setSelectedDate={setEndDate} />
      </CenteredBox>
      <CenteredBox gap={1}>
        <Typography>상담구분</Typography>
        <Select
          selectData={sd_0}
          value={s_0}
          onChange={o_0}
          placeholder="받기"
        />
      </CenteredBox>
      <CenteredBox gap={1}>
        <Typography marginRight={1.5}>주항목</Typography>
        <Select
          selectData={selectTestData}
          value={s_0}
          onChange={o_0}
          placeholder="일자"
        />
      </CenteredBox>
      <CheckboxList data={checkboxListData} refArray={inputRefs.current} />
      <CenteredBox justifyContent={"center"}>
        <BasicButton sx={{ width: "250px" }}>조회</BasicButton>
      </CenteredBox>
    </Stack>
  );
}
