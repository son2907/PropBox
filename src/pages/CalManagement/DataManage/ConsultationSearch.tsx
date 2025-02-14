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
  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectTestData, "value", "data");
  const { inputRefs: checkListRef } = useMultiInputValue();

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

  // 외부에서 체크 여부를 확인하는 함수
  const getCheckedData = () => {
    return checkListRef.current
      .filter((input) => input !== null) // null 값 제외
      .map((input) => ({
        value: input!.value,
        checked: input!.checked, // 체크 여부 확인
      }));
  };

  return (
    <Stack width={"100%"} gap={2} height={"80%"}>
      <Stack gap={1} direction={"row"} height={"5%"}>
        <Calendar selectedDate={startDate} setSelectedDate={setStartDate} />
        <Typography>~</Typography>
        <Calendar selectedDate={endDate} setSelectedDate={setEndDate} />
      </Stack>
      <Stack gap={1} direction={"row"} alignItems={"center"} height={"5%"}>
        <Typography>상담구분</Typography>
        <Select
          selectData={sd_0}
          value={s_0}
          onChange={o_0}
          placeholder="받기"
        />
      </Stack>
      <Stack height={"90%"}>
        <CheckboxList
          data={checkList}
          refArray={checkListRef.current}
          dividerIds={["customerInfo"]}
        />
      </Stack>
      <Stack justifyContent={"center"} direction={"row"} alignItems={"center"}>
        <BasicButton
          sx={{ width: "250px" }}
          onClick={() => {
            console.log(getCheckedData());
          }}
        >
          조회
        </BasicButton>
      </Stack>
    </Stack>
  );
}
