import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import {
  BasicButton,
  IconButton,
  ToggleButton,
} from "../../../components/Button";
import CenteredBox from "../../../components/Box/CenteredBox";
import TextArea from "../../../components/TextArea/TextArea";
import { useRef, useState } from "react";
import { Select } from "../../../components/Select";
import { selectTestData, tableTestData } from "../../../utils/testData";
import useSelect from "../../../hooks/useSelect";
import { IoSettingsOutline } from "react-icons/io5";
import Calendar from "../../../components/Calendar/Calendar";
import TimeInputGroup from "./components/TimeInputGroup";
import useMultiInputValue from "../../../hooks/useMultiInputValue";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import BasicInput from "../../../components/Input/BasicInput";
import useToggleButtton from "../../../hooks/useToggleButton";
import { openPopup } from "../../../utils/openPopup";
import PathConstants from "../../../routers/path";
import { useRadioGroup } from "../../../hooks/useRadioGroup";

export default function AutoMessage() {
  // 이 ref를 통해 textArea에 입력된 값에 접근할 수 있음
  const tRef1 = useRef<HTMLTextAreaElement>(null); // textArea에 연결해 줄 ref
  const tRef2 = useRef<HTMLTextAreaElement>(null); // textArea에 연결해 줄 ref2

  // Basicinput에 연결할 ref, 값은 bRef1.current?.value 에 들어있습니다.
  const bRef1 = useRef<HTMLInputElement>(null); //
  const bRef2 = useRef<HTMLInputElement>(null); // HTMLInputElement로 타입 지정

  // 시작 날짜
  const [startDate, setStartDate] = useState<Date>(new Date());
  // 끝 날짜
  const [endDate, setEndDate] = useState<Date>(new Date());

  // 체크박스 그룹에 연결할 ref 배열
  const { inputRefs } = useMultiInputValue();

  // 체크된 데이터 가져옴
  // const handleSubmit = () => {
  //   const checkedValues = getInputValues().filter((value) => {
  //     // 체크된 항목만 필터링
  //     const input = inputRefs.current.find((ref) => ref?.value === value);
  //     return input?.checked;
  //   });

  //   console.log("Selected Times:", checkedValues); // 선택된 시간 출력
  // };

  // select 쓸땐 useSelect 같이 쓴다고 생각하면 됨
  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectTestData, "value", "data"); //   수신동의 고객 select
  const {
    selectListData: sd_1,
    selectValue: s_1,
    handleChange: o_1,
  } = useSelect(selectTestData, "value", "data");

  // BasicTable에 연결할 한 행만 선택 가능하게 하는거(BasicTable 수정을 해야겐네요..)
  const { selectedRow, toggleRowSelection } = useSingleRowSelection();

  // 토글에 쓰이는거, defaultValue로 초기 클릭 여부 선택 가능
  const { toggle: receive, onChange: receiveToggle } = useToggleButtton({
    defaultValue: true,
  });

  const { toggle: out, onChange: outToggle } = useToggleButtton({
    defaultValue: true,
  });

  const { toggle: none, onChange: noneToggle } = useToggleButtton({
    defaultValue: true,
  });

  const { selectedValue: radioValue, handleRadioChange: setRadioValue } =
    useRadioGroup(""); // 초기값은 빈 문자열
  const { selectedValue: radioValue2, handleRadioChange: setRadioValue2 } =
    useRadioGroup(""); // 초기값은 빈 문자열
  const { selectedValue: radioValue3, handleRadioChange: setRadioValue3 } =
    useRadioGroup(""); // 초기값은 빈 문자열

  const smsPopuppInfo = {
    url: PathConstants.Message.PhoneNumber,
    windowName: "전화번호 입력",
    windowFeatures: "width=400,height=150,scrollbars=yes,resizable=no",
  };

  return (
    // 그냥 <> 로 시작하면 만든것들이 가로로 쌓임
    // 이유 : layout 폴더의 Content 내에 이 페이지가 들어가는데
    // Box display 가 부모이기 때문
    // 그러니 세로로 쌓고싶으면 Stack을 써야함
    <>
      <Stack width={"100%"} height={"100%"} gap={1}>
        {/* 회색 박스 내 오른쪽 정렬된 버튼들 */}
        {/* GrayBox안에 있는 아이템, 즉 버튼 사이에 일정 간격을 주고 싶으면 gap을 쓴다 */}
        <GrayBox gap={1}>
          {/* 가장 왼쪽 버튼에 marginLeft:"auto를 준다." */}
          <BasicButton sx={{ marginLeft: "auto" }}>
            불법스팸 방지관련법
          </BasicButton>
          <BasicButton>저장</BasicButton>
        </GrayBox>

        {/* 내부에 테이블이 들어간, 맨 윗 display:flex 박스를 추가로 사용할 때에는 */}
        {/* 아래에서 TableBox를 써도 엿을 먹이기 때문에 */}
        {/* display="flex" 이되 overflow={"hidden"} 를 작성해 주어야 함 */}
        {/* 근데 이게 TableBox랑 똑같이 생겨서 이 자리에 TableBox 써도 됨 */}
        <TableBox gap={2} marginTop={1}>
          {/*  가장 왼쪽의 '자동문자 발송메세지' 영역 */}
          {/* width를 적절한 %값으로 주되 무한정 줄어들지 않도록 minWidth로 px를 준다(적당히) */}
          <Stack width={"30%"} minWidth={"350px"} height={"100%"} gap={5}>
            {/* 자동문자 발송메세지 */}
            <Stack gap={1} margin={1}>
              {/* 세로 기준 중앙 정렬 되어 있는 가로로 배치된 아이템들은 */}
              {/* 편하게 CenteredBox를 쓰면 됨  */}

              <CenteredBox>
                <Typography variant="h3">자동문자 발송메시지</Typography>
                <BasicButton sx={{ marginLeft: "auto" }}>
                  기본메시지
                </BasicButton>
              </CenteredBox>
              <TextArea
                height="100px"
                resize="none"
                ref={tRef1}
                placeholder="자동문자 메시지를 입력하세요"
              />
            </Stack>
            {/* 발신번호 */}
            <Stack gap={2} margin={1}>
              <Typography variant="h3">발신번호</Typography>
              {/* 가로배치 */}
              <CenteredBox>
                <Select
                  selectData={selectTestData}
                  value={s_0}
                  onChange={o_0}
                />
                {/* 아이콘만 있는건 아이콘 버튼, 컬러는 팔레트에서 쓰되 회색이면 걍두고 파랑이면 root.mainBlue하면 됨 */}

                <IconButton sx={{ color: "root.mainBlue" }}>
                  {/* react-icon 사이트에서 아이콘 찾아서 이용함 */}
                  <IoSettingsOutline />
                </IconButton>
                <BasicButton>실험발송</BasicButton>
                {/*  */}
              </CenteredBox>
            </Stack>
            {/* 발송일시 */}
            <Stack gap={2} margin={1}>
              <Typography variant="h3">발송일시</Typography>
              <CenteredBox gap={1}>
                <Typography>기간</Typography>
                {/* 캘린더 시작 ~ 끝 날짜 이거 너무 자주나와서 복붙해두면 편함 */}
                <Calendar
                  selectedDate={startDate}
                  setSelectedDate={setStartDate}
                />
                <Typography>~</Typography>
                <Calendar selectedDate={endDate} setSelectedDate={setEndDate} />
              </CenteredBox>
              <CenteredBox gap={2}>
                <Stack width={"10%"}>
                  <Typography>시간</Typography>
                </Stack>
                <Stack width={"90%"}>
                  <TimeInputGroup
                    times={[9, 13, 17]}
                    inputRefs={inputRefs}
                    startIndex={0} // 배열 시작 인덱스
                  />
                  <TimeInputGroup
                    times={[10, 14, 18]}
                    inputRefs={inputRefs}
                    startIndex={3} // 다음 그룹의 시작 인덱스
                  />
                  <TimeInputGroup
                    times={[11, 15, 19]}
                    inputRefs={inputRefs}
                    startIndex={6}
                  />
                  <TimeInputGroup
                    times={[12, 16, 20]}
                    inputRefs={inputRefs}
                    startIndex={9}
                  />
                </Stack>
              </CenteredBox>

              {/* <button onClick={handleSubmit}>테스트 버튼</button> */}
            </Stack>

            <Stack gap={2} margin={1}>
              <Typography variant="h3">매크로</Typography>
              <TextArea
                height="100px"
                resize="none"
                ref={tRef2}
                placeholder="매크로를 입력하세요"
              />
            </Stack>
          </Stack>

          {/* 중앙 테이블 영역 */}
          <Stack width={"30%"} minWidth={"350px"} height={"100%"} gap={2}>
            <TableBox height="80%">
              <TableBox.Inner>
                <BasicTable data={tableTestData}>
                  <BasicTable.Th>이름</BasicTable.Th>
                  <BasicTable.Th>상담전화</BasicTable.Th>
                  <BasicTable.Th>상담일시</BasicTable.Th>
                  <BasicTable.Tbody>
                    {tableTestData.map((item, index) => {
                      return (
                        <BasicTable.Tr
                          key={index}
                          isClicked={selectedRow.has(item.id)}
                          onClick={() => toggleRowSelection(item.id)}
                        >
                          <BasicTable.Td>{item.name}</BasicTable.Td>
                          <BasicTable.Td>{item.age}</BasicTable.Td>
                          <BasicTable.Td>{item.job}</BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </TableBox>
            <GrayBox height={"20%"}>
              <Stack gap={1} width={"100%"}>
                <CenteredBox gap={1}>
                  <Typography variant="h3">발송대상</Typography>
                  <BasicButton sx={{ marginLeft: "auto" }}>
                    새로고침
                  </BasicButton>
                  <BasicButton>저장</BasicButton>
                  <BasicButton>삭제</BasicButton>
                </CenteredBox>
                <Typography>휴대전화</Typography>
                <BasicInput ref={bRef1} />
                <Typography>고객정보</Typography>
                <BasicInput ref={bRef2} />
              </Stack>
            </GrayBox>
          </Stack>

          {/* 오른쪽 수신동의 고객 확인 문자 영역 */}
          <Stack width={"40%"} minWidth={"400px"} height={"100%"} gap={2}>
            <Typography variant="h3">수신동의 고객 확인 문자</Typography>
            {/* 수신 동의 고객 */}
            <ToggleButton
              checked={receive}
              onChange={receiveToggle}
              label="수신 동의 고객"
            />
            <CenteredBox gap={1}>
              <Select
                sx={{ width: "200px" }}
                selectData={selectTestData}
                value={s_1}
                onChange={o_1}
              />
              <BasicButton
                sx={{ marginLeft: "auto" }}
                onClick={() => {
                  openPopup(smsPopuppInfo);
                }}
              >
                실험발송
              </BasicButton>
              <BasicButton>기본메시지</BasicButton>
            </CenteredBox>
            <TextArea resize="none" height="200px" />
            <CenteredBox>
              <RadioGroup value={radioValue} onChange={setRadioValue} row>
                <FormControlLabel
                  value="sms"
                  control={<Radio size="small" />}
                  label="SMS"
                />
                <FormControlLabel
                  value="lms"
                  control={<Radio size="small" />}
                  label="LMS"
                />
              </RadioGroup>
            </CenteredBox>

            {/* 수신 거부 고객 */}

            <ToggleButton
              checked={out}
              onChange={outToggle}
              label="수신 거부 고객"
            />
            <CenteredBox gap={1}>
              <Select
                sx={{ width: "200px" }}
                selectData={selectTestData}
                value={s_1}
                onChange={o_1}
              />
              <BasicButton
                sx={{ marginLeft: "auto" }}
                onClick={() => {
                  openPopup(smsPopuppInfo);
                }}
              >
                실험발송
              </BasicButton>
              <BasicButton>기본메시지</BasicButton>
            </CenteredBox>
            <TextArea resize="none" height="200px" />
            <CenteredBox>
              <RadioGroup value={radioValue2} onChange={setRadioValue2} row>
                <FormControlLabel
                  value="sms"
                  control={<Radio size="small" />}
                  label="SMS"
                />
                <FormControlLabel
                  value="lms"
                  control={<Radio size="small" />}
                  label="LMS"
                />
              </RadioGroup>
            </CenteredBox>

            {/* 미응답 고객 */}

            <ToggleButton
              checked={none}
              onChange={noneToggle}
              label="미응답 고객"
            />
            <CenteredBox gap={1}>
              <Select
                sx={{ width: "200px" }}
                selectData={selectTestData}
                value={s_1}
                onChange={o_1}
              />
              <BasicButton
                sx={{ marginLeft: "auto" }}
                onClick={() => {
                  openPopup(smsPopuppInfo);
                }}
              >
                실험발송
              </BasicButton>
              <BasicButton>기본메시지</BasicButton>
            </CenteredBox>
            <TextArea resize="none" height="200px" />
            <CenteredBox>
              <RadioGroup value={radioValue3} onChange={setRadioValue3} row>
                <FormControlLabel
                  value="sms"
                  control={<Radio size="small" />}
                  label="SMS"
                />
                <FormControlLabel
                  value="lms"
                  control={<Radio size="small" />}
                  label="LMS"
                />
              </RadioGroup>
            </CenteredBox>
          </Stack>
        </TableBox>
      </Stack>
    </>
  );
}
