import { Stack, Typography } from "@mui/material";
import CenteredBox from "../../../components/Box/CenteredBox";
import Calendar from "../../../components/Calendar/Calendar";
import { useState } from "react";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import { BasicButton } from "../../../components/Button";
import {
  useGetCustItems,
  useGetCustItemsDetail,
} from "../../../api/dataManage";
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

export default function CustomerSearch({ searchCust }) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { data: custItems } = useGetCustItems();

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
    [
      { itemNo: "none", itemNm: "선택안함" },
      ...(custItems?.data?.contents?.contents || []),
    ],
    "itemNo",
    "itemNm",
    "none"
  );

  const { data: detailItems } = useGetCustItemsDetail({ itemNo: s_1 });

  const {
    selectListData: sd_2,
    selectValue: s_2,
    handleChange: o_2,
  } = useSelect(
    [
      { detailNo: "none", detailNm: "선택안함" },
      ...(detailItems?.data?.contents?.contents || []),
    ],
    "detailNo",
    "detailNm",
    "none"
  );

  const { sptNo } = useSptStore();

  const onSearch = () => {
    const body = {
      sptNo: sptNo,
      fromDate: getFormattedDate(startDate),
      toDate: getFormattedDate(endDate),
      callYn: s_0,
      itemNo: s_1 == "none" ? "" : s_1,
      detailNo: s_2 == "none" ? "" : s_2,
    };
    searchCust({ body });
  };
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
        <Typography>검색조건</Typography>
        <Select
          selectData={sd_1}
          value={s_1}
          onChange={o_1}
          placeholder="선택안함"
        />
      </CenteredBox>
      <CenteredBox gap={1}>
        <Typography>세부항목</Typography>
        <Select selectData={sd_2} value={s_2} onChange={o_2} />
      </CenteredBox>
      <CenteredBox justifyContent={"center"}>
        <BasicButton sx={{ width: "250px" }} onClick={onSearch}>
          조회
        </BasicButton>
      </CenteredBox>
    </Stack>
  );
}
