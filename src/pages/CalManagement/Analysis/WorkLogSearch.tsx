import { SelectChangeEvent, Stack, Typography } from "@mui/material";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import { selectTestData } from "../../../utils/testData";
import CenteredBox from "../../../components/Box/CenteredBox";
import BasicInput from "../../../components/Input/BasicInput";
import { selectType } from "../../../types/Select";
import { ReactNode, useState } from "react";
import TextArea from "../../../components/TextArea/TextArea";
import { BasicButton } from "../../../components/Button";
import Calendar from "../../../components/Calendar/Calendar";

export default function WorkLogSearch() {
  const { selectValue: s_0, handleChange: o_0 } = useSelect();

  const { selectValue: s_1, handleChange: o_1 } = useSelect();
  const { selectValue: s_2, handleChange: o_2 } = useSelect();

  const { selectValue: s_3, handleChange: o_3 } = useSelect();
  const { selectValue: s_4, handleChange: o_4 } = useSelect();

  const { selectValue: s_5, handleChange: o_5 } = useSelect();
  const { selectValue: s_6, handleChange: o_6 } = useSelect();

  const { selectValue: s_7, handleChange: o_7 } = useSelect();

  const f_staticsInfo = [
    {
      selectData: selectTestData,
      value: s_1,
      onChange: o_1,
      placeholder: "희망평형",
    },
  ];

  const s_staticsInfo = [
    {
      selectData: selectTestData,
      value: s_2,
      onChange: o_2,
      placeholder: "희망평형",
    },
    {
      selectData: selectTestData,
      value: s_3,
      onChange: o_3,
      placeholder: "청약순위",
    },
  ];

  const t_staticsInfo = [
    {
      selectData: selectTestData,
      value: s_4,
      onChange: o_4,
      placeholder: "희망평형",
    },
    {
      selectData: selectTestData,
      value: s_5,
      onChange: o_5,
      placeholder: "호응도",
    },
  ];

  const fo_staticsInfo = [
    {
      selectData: selectTestData,
      value: s_6,
      onChange: o_6,
      placeholder: "관리지역",
    },
  ];

  const fi_staticsInfo = [
    {
      selectData: selectTestData,
      value: s_7,
      onChange: o_7,
      placeholder: "광고매체",
    },
  ];
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <Stack width={"100%"} gap={2}>
      <CenteredBox gap={1}>
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <BasicButton> 이전 </BasicButton>
        <BasicButton> 이후 </BasicButton>
      </CenteredBox>
      <CenteredBox gap={1}>
        <Typography noWrap>상담구분</Typography>
        <Select
          selectData={selectTestData}
          value={s_0}
          onChange={o_0}
          placeholder="받기"
        />
      </CenteredBox>
      <CenteredBox gap={1}>
        <Typography>산정 기준</Typography>
        <label className="whitespace-nowrap">
          <input type="radio" name="searchType" id="type" />
          <Typography>건수별</Typography>
        </label>
        <label className="whitespace-nowrap">
          <input type="radio" name="searchType" id="type" />
          <Typography>고객별</Typography>
        </label>
      </CenteredBox>
      {/* 통계1 */}
      <Statistics
        title="통계 1"
        note="1. 상담건수 통계자료"
        selectInfo={f_staticsInfo}
      />
      {/* 통계2 */}
      <Statistics
        title="통계 2"
        note="2. 청약순위 별 상담현황"
        selectInfo={s_staticsInfo}
      />
      {/* 통계3 */}
      <Statistics
        title="통계 3"
        note="3. 고객 반응도"
        selectInfo={t_staticsInfo}
      />
      {/* 통계4 */}
      <Statistics
        title="통계 4"
        note="4. 지역별 상담현황"
        selectInfo={fo_staticsInfo}
      />
      {/* 통계5 */}
      <Statistics
        title="통계 5"
        note="5. 광고매체"
        selectInfo={fi_staticsInfo}
      />

      {/* 특기사항 */}
      <CenteredBox gap={1}>
        <Typography>특기사항</Typography>
        <TextArea height="100px" resize="none" />
      </CenteredBox>
      {/* 조회 조건 저장 */}
      <CenteredBox justifyContent={"center"} gap={1}>
        <input type="checkbox" />
        <Typography>조회 조건 저장</Typography>
        <BasicButton>불러오기</BasicButton>
      </CenteredBox>
      <CenteredBox justifyContent={"center"}>
        <BasicButton sx={{ width: "150px" }}>조회</BasicButton>
      </CenteredBox>
    </Stack>
  );
}

// 통계 아이템

interface SelectInfo {
  selectData: { value: number; data: string }[]; // value와 data를 가진 객체 배열
  value: selectType; // 선택된 값
  onChange: (e: SelectChangeEvent) => void;
  placeholder?: string;
}

interface StatisticsProps {
  title: string; // 제목
  note: string; // 노트 또는 입력값
  selectInfo: SelectInfo[]; // Select 컴포넌트에 필요한 정보
  children?: ReactNode;
}

const Statistics = ({ title, note, selectInfo, children }: StatisticsProps) => {
  return (
    <CenteredBox gap={2} margin={1}>
      <Typography>{title}</Typography>
      <Stack width={"100%"} gap={1}>
        <BasicInput value={note} fullWidth />
        {selectInfo.map((item) => {
          return (
            <Select
              selectData={item.selectData}
              value={item.value}
              onChange={item.onChange}
              placeholder={item.placeholder}
            />
          );
        })}
        {children}
      </Stack>
    </CenteredBox>
  );
};
