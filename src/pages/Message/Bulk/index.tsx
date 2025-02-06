import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GrayBox from "../../../components/Box/GrayBox";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { selectTestData, tableTestData } from "../../../utils/testData";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import TabMenus from "../../../components/Tab/TabMenus";
import useTabs from "../../../hooks/useTabs";
import TabPanel from "../../../components/Tab/TabPanel";
import IconSquareButton from "../../../components/Button/IconSquareButton";
import { LuPencil } from "react-icons/lu";
import { BasicButton, IconButton } from "../../../components/Button";
import CenteredBox from "../../../components/Box/CenteredBox";
import BasicInput from "../../../components/Input/BasicInput";
import TextArea from "../../../components/TextArea/TextArea";
import { Select } from "../../../components/Select";
import { IoSettingsOutline } from "react-icons/io5";
import useSelect from "../../../hooks/useSelect";
import { useRadioGroup } from "../../../hooks/useRadioGroup";
import Calendar from "../../../components/Calendar/Calendar";
import TimePicker from "../../../components/TimePicker";
// import { combineDateAndTime } from "../../../utils/combineDateAndTime";
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import MultipleCheckboxTable from "../../../components/Table/MultipleCheckboxTable";
// import { getCommonIds } from "../../../utils/getCommonIds";
import { Pagination } from "../../../components/Pagination";
import TableSelect from "../../../components/Select/TableSelect";
import { usePagination } from "../../../hooks/usePagination";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";
import { useTableSelect } from "../../../hooks/useTableSelect";

export default function BulkMessage() {
  // BasicTable에 연결할 한 행만 선택 가능하게 하는거(BasicTable 수정을 해야겐네요..)
  const { selectedRow, toggleRowSelection } = useSingleRowSelection();
  const { selectedRow: ss_2, toggleRowSelection: tt_2 } =
    useSingleRowSelection();

  // 전송대상, 임시대상 탭
  const { value, handleChange: tabChange } = useTabs(0);

  // select
  const {
    selectListData: sd_0,
    selectValue: s_0,
    handleChange: o_0,
  } = useSelect(selectTestData, "value", "data");
  const { selectedValue, handleRadioChange } = useRadioGroup(""); // 초기값은 빈 문자열

  const [date, setDate] = useState<Date>(new Date()); // 날짜
  const [selectedTime, setSelectedTime] = useState(Date.now()); // 시간
  console.log(selectedTime);

  // const isoDateTime = combineDateAndTime(date, selectedTime); // 시간과 날짜를 조합함

  const { selectedRows: s_1, toggleRowsSelection: t_1 } =
    useMultiRowSelection(); // 선택 컬럼 클릭 여부
  const { selectedRows: s_2, toggleRowsSelection: t_2 } =
    useMultiRowSelection(); // 제외 컬럼 클릭 여부

  const { currentPage, onChangePage } = usePagination();

  // console.log(getCommonIds(s_1, s_2));
  const popup = {
    url: PathConstants.Message.Preview,
    windowName: "전송대상 미리보기",
  };

  const { countValues, selectValue, handleChange } = useTableSelect();

  return (
    <Stack width={"100%"} height={"100%"} gap={1}>
      <GrayBox gap={1} marginBottom={2}>
        <Typography color="error.main">
          SMS(단문) 발송 시 URL 주소가 포함될 경우 SKT는 통신사 정책에 의해
          문자가 스팸처리 됩니다.(KT, LG는 무관함)
        </Typography>
        <IconSquareButton>
          <LuPencil />
        </IconSquareButton>
        <BasicButton
          sx={{ marginLeft: "auto" }}
          onClick={() => {
            openPopup(popup);
          }}
        >
          실험발송
        </BasicButton>
        <BasicButton>문자발송</BasicButton>
      </GrayBox>

      <TableBox gap={2}>
        <Stack width={"30%"} minWidth={"450px"} height={"100%"} gap={2}>
          <Typography variant="h3">메시지 작성</Typography>
          <CenteredBox>
            {/* 라디오 그룹 */}
            <RadioGroup value={selectedValue} onChange={handleRadioChange} row>
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
              <FormControlLabel
                value="mms"
                control={<Radio size="small" />}
                label="MMS"
              />
            </RadioGroup>
            <BasicButton>이미지 선택</BasicButton>
          </CenteredBox>

          <CenteredBox gap={1}>
            <Typography>제목</Typography>
            <BasicInput fullWidth placeholder="내용 입력" />
          </CenteredBox>

          <TextArea
            resize="none"
            height="100px"
            placeholder="자동문자 메시지를 입력해 주십시오."
          />

          <CenteredBox gap={1}>
            <Typography>발신번호</Typography>
            <Select selectData={sd_0} value={s_0} onChange={o_0} />
            <IconButton sx={{ color: "root.mainBlue" }}>
              {/* react-icon 사이트에서 아이콘 찾아서 이용함 */}
              <IoSettingsOutline />
            </IconButton>
          </CenteredBox>

          <CenteredBox gap={1}>
            <FormControlLabel control={<Checkbox />} label="광고문자" />
            <BasicInput placeholder="수신 거부 번호" />
            <BasicButton>복사하기</BasicButton>
          </CenteredBox>
          <CenteredBox gap={1} marginBottom={1}>
            <FormControlLabel control={<Checkbox />} label="예약문자" />
            <Stack width={"100%"} gap={1}>
              <Calendar selectedDate={date} setSelectedDate={setDate} />
              {/* 추후 시간 컴포넌트로 바꿔야함 */}
              <TimePicker
                time={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            </Stack>
          </CenteredBox>

          <CenteredBox gap={1}>
            <FormControlLabel control={<Checkbox />} label="분할전송" />
            <Stack gap={1}>
              <CenteredBox gap={1}>
                <BasicInput placeholder="1,000건" sx={{ width: "150px" }} />
                <Typography>건 단위로</Typography>
              </CenteredBox>
              <CenteredBox gap={1}>
                <BasicInput placeholder="1" sx={{ width: "150px" }} />
                <Typography>분 간격으로 발송합니다.</Typography>
              </CenteredBox>
            </Stack>
          </CenteredBox>

          <Typography variant="h3">매크로</Typography>
          <TextArea resize="none" height="300px" />
        </Stack>

        <Stack width={"30%"} minWidth={"350px"} height={"100%"} gap={1}>
          <TabMenus value={value} handleChange={tabChange}>
            <TabMenus.Tab label="전송대상" />
            <TabMenus.Tab label="임시대상" />
          </TabMenus>
          <TabPanel value={value} index={0}>
            <CenteredBox justifyContent={"center"} gap={1} margin={1}>
              <BasicButton>전체</BasicButton>
              <BasicButton>대상 확인</BasicButton>
              <BasicButton>제외</BasicButton>
            </CenteredBox>

            <TableBox>
              <TableBox.Inner>
                <MultipleCheckboxTable data={tableTestData}>
                  <MultipleCheckboxTable.Th>전체</MultipleCheckboxTable.Th>
                  <MultipleCheckboxTable.Th>그룹명</MultipleCheckboxTable.Th>
                  <MultipleCheckboxTable.Th>인원수</MultipleCheckboxTable.Th>
                  <MultipleCheckboxTable.Th>제외</MultipleCheckboxTable.Th>

                  <MultipleCheckboxTable.Tbody>
                    {tableTestData.map((item) => {
                      const isDisabled = s_1.has(item.id) && s_2.has(item.id); // s_1과 s_2에 동일한 id가 있을 때
                      return (
                        <MultipleCheckboxTable.Tr key={item.id} id={item.id}>
                          <MultipleCheckboxTable.CheckboxTd
                            item={item}
                            selectedRows={s_1}
                            toggleRowsSelection={t_1}
                            disabled={isDisabled} // 조건에 따라 disabled 속성 추가
                          />
                          <MultipleCheckboxTable.Td>
                            {item.name}
                          </MultipleCheckboxTable.Td>
                          <MultipleCheckboxTable.Td>
                            {item.name}
                          </MultipleCheckboxTable.Td>
                          <MultipleCheckboxTable.CheckboxTd
                            item={item}
                            selectedRows={s_2}
                            toggleRowsSelection={t_2}
                          />
                        </MultipleCheckboxTable.Tr>
                      );
                    })}
                  </MultipleCheckboxTable.Tbody>
                </MultipleCheckboxTable>
              </TableBox.Inner>
            </TableBox>
            <GrayBox height={"60px"} justifyContent={"center"} marginTop={1}>
              <Typography>확정 인원 : 20명</Typography>
            </GrayBox>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Stack gap={3} width={"100%"} height={"100%"}>
              <GrayBox>
                <Typography>
                  <MdInfoOutline /> Ctrl + V 를 하여 엑셀 데이터 붙이기
                </Typography>
              </GrayBox>
              <CenteredBox justifyContent={"center"} gap={1}>
                <Box
                  width={"50px"}
                  height={"100%"}
                  bgcolor={"root.lightBlue"}
                  borderRadius={1}
                />
                <Typography>중복</Typography>
                <Box
                  width={"50px"}
                  height={"100%"}
                  bgcolor={"error.light"}
                  borderRadius={1}
                />
                <Typography>형식오류</Typography>
                <BasicButton>대상확인</BasicButton>
              </CenteredBox>

              <TableBox>
                <TableBox.Inner>
                  <BasicTable data={tableTestData}>
                    <BasicTable.Th>휴대전화</BasicTable.Th>
                    <BasicTable.Th>고객정보</BasicTable.Th>

                    <BasicTable.Tbody>
                      {tableTestData.map((item, index) => {
                        return (
                          <BasicTable.Tr
                            key={index}
                            isClicked={ss_2.has(item.id)}
                            onClick={() => tt_2(item.id)}
                          >
                            <BasicTable.Td
                            // 아래와 같이 조건에 따라 배경색을 다르게 줌,
                            // 중복 여부는 api에서 판단하여 item에 넣어 보내줌
                            // style={{
                            //   backgroundColor: selectedRow.has(item.id)
                            //     ? "red"
                            //     : "white",
                            // }}
                            >
                              {item.name}
                            </BasicTable.Td>
                            <BasicTable.Td>{item.age}</BasicTable.Td>
                          </BasicTable.Tr>
                        );
                      })}
                    </BasicTable.Tbody>
                  </BasicTable>
                </TableBox.Inner>
              </TableBox>
            </Stack>
          </TabPanel>
        </Stack>
        <Stack width={"40%"} minWidth={"650px"} height={"100%"} gap={1}>
          <CenteredBox gap={1} margin={1}>
            <Typography variant="h3">저장 메시지</Typography>
            <BasicButton sx={{ marginLeft: "auto" }}>문자 저장</BasicButton>
          </CenteredBox>
          <TableBox>
            <TableBox.Inner>
              <BasicTable data={tableTestData}>
                <BasicTable.Th> </BasicTable.Th>
                <BasicTable.Th> </BasicTable.Th>
                <BasicTable.Th>메시지</BasicTable.Th>
                <BasicTable.Th>삭제</BasicTable.Th>

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
                        <BasicTable.Td>
                          <IconButton color="error">
                            <RiDeleteBinLine />
                          </IconButton>
                        </BasicTable.Td>
                      </BasicTable.Tr>
                    );
                  })}
                </BasicTable.Tbody>
              </BasicTable>
            </TableBox.Inner>
          </TableBox>
          <CenteredBox
            gap={3}
            marginBottom={1}
            marginRight={2}
            justifyContent={"space-between"}
          >
            <Pagination count={25} page={currentPage} onChange={onChangePage} />
            <TableSelect
              total={100}
              countValues={countValues}
              selectValue={selectValue}
              handleChange={handleChange}
            />
          </CenteredBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}
