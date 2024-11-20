import { Stack, Typography } from "@mui/material";
import CenteredBox from "../../../components/Box/CenteredBox";
import Calendar from "../../../components/Calendar/Calendar";
import { useState } from "react";
import { Select } from "../../../components/Select";
import { selectTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import useMultiInputValue from "../../../hooks/useMultiInputValue";
import CheckboxList from "../../../components/List/CheckboxList";
import { BasicButton } from "../../../components/Button";

export default function ConsultationSearch() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const { selectValue: s_0, handleChange: o_0 } = useSelect();

  const { inputRefs: checkListRef, getInputValues: getCheckedData } =
    useMultiInputValue();

  const checkList = [
    { id: "date", label: "상담일시" },
    { id: "type", label: "상담구분" },
    { id: "name", label: "고객이름" },
    { id: "contact", label: "상담전화" },
    { id: "mobile", label: "휴대전화" },
    { id: "phone", label: "일반전화" },
    { id: "address", label: "주소" },
    { id: "region", label: "관리지역" },
    { id: "notes", label: "특기사항" },
    { id: "consultant", label: "상담자" },
    { id: "customerInfo", label: "고객정보" },
    { id: "preferredSize", label: "희망평형" },
    { id: "advertisement", label: "광고매체" },
    { id: "depositType", label: "예금종류" },
    { id: "agreement", label: "수신동의" },
    { id: "customerType", label: "고객구분" },
    { id: "inquiry", label: "문의사항" },
    { id: "responsiveness", label: "호응도" },
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
          selectData={selectTestData}
          value={s_0}
          onChange={o_0}
          placeholder="받기"
        />
      </CenteredBox>
      <Stack>
        <CheckboxList
          data={checkList}
          refArray={checkListRef.current}
          dividerIds={["customerInfo"]}
        />
      </Stack>
      <CenteredBox justifyContent={"center"}>
        <BasicButton sx={{ width: "250px" }}>조회</BasicButton>
      </CenteredBox>
    </Stack>
  );
}
