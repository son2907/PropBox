import { Stack, Typography } from "@mui/material";
import CenteredBox from "../../../components/Box/CenteredBox";
import Calendar from "../../../components/Calendar/Calendar";
import { useState } from "react";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import useMultiInputValue from "../../../hooks/useMultiInputValue";
import CheckboxList from "../../../components/List/CheckboxList";
import { BasicButton } from "../../../components/Button";
import { useGetOutItems } from "../../../api/dataManage";
import { useSptStore } from "../../../stores/sptStore";
import { getFormattedDate } from "../../../utils/getFormattedDate";

const selectCunsltList = [
  {
    value: "N",
    data: "받기",
  },
  {
    value: "Y",
    data: "걸기",
  },
  {
    value: "A",
    data: "전체",
  },
];
export default function ConsultationSearch({ searchCunlst }) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectCunsltList, "value", "data", "N");
  const { inputRefs: checkListRef } = useMultiInputValue();

  // 선택한 것의 id만 가져옴
  const getCheckedData = () =>
    checkListRef.current
      .filter(Boolean) // null 제거
      .filter((input) => input!.checked)
      .map((input) => input!.value);

  const { data: outItems } = useGetOutItems();
  const checkList =
    outItems?.data?.contents?.map(({ itemNo: id, itemNm: label }) => ({
      id,
      label,
    })) || [];

  const { sptNo } = useSptStore();

  const searchData = () => {
    const search = getCheckedData();
    console.log("search", search);
    if (search.length === 0) {
      alert("항목을 선택해주세요.");
      return;
    }

    const body = {
      sptNo: sptNo,
      fromDate: getFormattedDate(startDate),
      toDate: getFormattedDate(endDate),
      callYn: s_0,
      itemNos: search,
    };

    searchCunlst({ body });
  };

  return (
    <Stack width={"100%"} gap={2} height={"100%"}>
      <CenteredBox gap={1}>
        <Calendar selectedDate={startDate} setSelectedDate={setStartDate} />
        <Typography>~</Typography>
        <Calendar selectedDate={endDate} setSelectedDate={setEndDate} />
      </CenteredBox>
      <Stack gap={1} direction={"row"} alignItems={"center"} height={"5%"}>
        <Typography>상담구분</Typography>
        <Select
          selectData={sd_0}
          value={s_0}
          onChange={o_0}
          placeholder="받기"
        />
      </Stack>
      <Stack height={"60%"}>
        <CheckboxList
          data={checkList || []}
          refArray={checkListRef.current}
          dividerIds={["1"]}
        />
      </Stack>
      <Stack justifyContent={"center"} direction={"row"} alignItems={"center"}>
        <BasicButton sx={{ width: "250px" }} onClick={searchData}>
          조회
        </BasicButton>
      </Stack>
    </Stack>
  );
}
