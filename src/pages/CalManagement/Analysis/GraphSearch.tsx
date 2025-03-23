import { Stack, Typography } from "@mui/material";
import CenteredBox from "../../../components/Box/CenteredBox";
import Calendar from "../../../components/Calendar/Calendar";
import { Select } from "../../../components/Select";
import { BasicButton } from "../../../components/Button";
import { useState } from "react";
import useSelect from "../../../hooks/useSelect";
import { useGetGraphItems } from "../../../api/cnsultAnalysis";
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

export default function GraphSearch({ onSearchGraph }) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { data } = useGetGraphItems();

  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectCunsltList, "value", "data", "N");

  const {
    selectListData: sd_1,
    selectValue: s_1,
    handleChange: o_1,
  } = useSelect(
    data?.data?.contents,
    "itemNo",
    "itemNm",
    data?.data?.contents[0]?.itemNo
  );

  const onSearch = () => {
    onSearchGraph({
      fromDate: getFormattedDate(startDate),
      toDate: getFormattedDate(endDate),
      callYn: s_0,
      itemNo: s_1,
    });
  };

  return (
    <Stack width={"100%"} gap={3} height={"100%"}>
      <CenteredBox gap={1} marginTop={1}>
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
        <Typography>검색구분</Typography>
        <Select
          selectData={sd_1}
          value={s_1}
          onChange={o_1}
          placeholder="일자"
        />
      </CenteredBox>
      <CenteredBox justifyContent={"center"}>
        <BasicButton sx={{ width: "250px" }} onClick={onSearch}>
          조회
        </BasicButton>
      </CenteredBox>
    </Stack>
  );
}
