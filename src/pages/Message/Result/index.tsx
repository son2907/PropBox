import { Box, Stack } from "@mui/material";
import GrayBox from "../../../components/Box/GrayBox";
import Calendar from "../../../components/Calendar/Calendar";
import { useState } from "react";
import { BasicButton } from "../../../components/Button";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa6";
import { LuArrowRightLeft } from "react-icons/lu";
import SearchInput from "../../../components/Input/SearchInput";
import TableBox from "../../../components/Box/TableBox";
import { useSingleRowSelection } from "../../../hooks/useSingleRowSelection";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
import CenteredBox from "../../../components/Box/CenteredBox";
import { Pagination } from "../../../components/Pagination";
import TableSelect from "../../../components/Select/TableSelect";
import { usePagination } from "../../../hooks/usePagination";
import RangeCalendar from "../../../components/Calendar/RangeCalendar";
import PathConstants from "../../../routers/path";
import { openPopup } from "../../../utils/openPopup";
import { useTableSelect } from "../../../hooks/useTableSelect";
import {
  useMsgResult,
  useMsgResultDetail,
  useMsgResultDetailList,
} from "../../../api/messageResult";
import { useSptStore } from "../../../stores/sptStore";
import { getFormattedDate } from "../../../utils/getFormattedDate";
import { useSingleRowData } from "../../../hooks/useTest";

export default function ResultMessage() {
  const [date, setDate] = useState<Date>(new Date());

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  // 이전 날짜 이동
  const handlePrevDate = () => {
    setStartDate(new Date(startDate.setDate(startDate.getDate() - 1)));
  };
  const handleNextDate = () => {
    setStartDate(new Date(startDate.setDate(startDate.getDate() + 1)));
  };

  const handleDateToday = () => {
    setDate(new Date());
  };

  const { selectedRow: ts_1, toggleRowSelection: tt_1 } =
    useSingleRowSelection();

  // const { selectedRow: ts_1, toggleRowSelection: tt_1 } =
  // useSingleRowData('');

  const { selectedRow: ts_2, toggleRowSelection: tt_2 } =
    useSingleRowSelection();
  const { currentPage: resultPage, onChangePage: resultPageC } =
    usePagination();
  const { currentPage: c_2, onChangePage: cc_2 } = usePagination();

  const [range, setRange] = useState<boolean>(false);

  const popupInfo = {
    url: PathConstants.Message.SMSDetail,
    windowName: "SMS 내역 자세히 보기",
  };

  const onClickDetailBtn = () => {
    openPopup(popupInfo);
  };

  const { countValues, selectValue, handleChange } = useTableSelect();
  const { sptNo } = useSptStore();

  const { data: msgList } = useMsgResult({
    sptNo: sptNo,
    // fromDate: getFormattedDate(startDate),
    fromDate: "20250201",
    page: resultPage,
    limit: selectValue,
  });
  const { data: detailList } = useMsgResultDetailList({
    sptNo: sptNo,
    msgKnd: "S",
    sendGroup: "20250212040552",
    limit: 1000,
    page: 1,
  });

  console.log("msgList:", msgList);
  console.log("detailList:", detailList);

  return (
    <Stack width={"100%"} height={"100%"} gap={1}>
      {/* 기간 버튼 클릭 여부에 따라 ui가 달라짐 */}
      <GrayBox gap={1}>
        {range ? (
          <>
            <Box>
              <RangeCalendar
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </Box>
            <BasicButton
              onClick={() => {
                setRange(!range);
              }}
            >
              <LuArrowRightLeft />
              일별
            </BasicButton>
            <SearchInput />
            <BasicButton sx={{ marginLeft: "auto" }}>새로고침</BasicButton>
            <BasicButton onClick={onClickDetailBtn}>상세보기</BasicButton>
            <BasicButton>예약삭제</BasicButton>
            <BasicButton>엑셀저장</BasicButton>
          </>
        ) : (
          <>
            <Box>
              <Calendar selectedDate={date} setSelectedDate={setDate} />
            </Box>
            <BasicButton>
              <MdArrowBackIos />
              이전
            </BasicButton>
            <BasicButton>
              <MdArrowForwardIos />
              이후
            </BasicButton>
            <BasicButton>
              <FaArrowDown />
              오늘
            </BasicButton>
            <BasicButton
              onClick={(e) => {
                setRange(!range);
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <LuArrowRightLeft />
              기간
            </BasicButton>
            <SearchInput />
            <BasicButton sx={{ marginLeft: "auto" }} onClick={onClickDetailBtn}>
              상세보기
            </BasicButton>
            <BasicButton>엑셀 다운로드</BasicButton>
          </>
        )}
      </GrayBox>
      <TableBox gap={1}>
        <Stack
          width={"60%"}
          height={"100%"}
          border="1px solid #E5E5E5"
          borderRadius="8px"
        >
          <TableBox.Inner>
            <BasicTable data={tableTestData}>
              <BasicTable.Th>전송그룹</BasicTable.Th>
              <BasicTable.Th>전송건수</BasicTable.Th>
              <BasicTable.Th>대기(예약)</BasicTable.Th>
              <BasicTable.Th>성공</BasicTable.Th>
              <BasicTable.Th>실패</BasicTable.Th>
              <BasicTable.Th>SMS</BasicTable.Th>
              <BasicTable.Th>LMS</BasicTable.Th>
              <BasicTable.Th>전송메시지</BasicTable.Th>
              <BasicTable.Th>예약취소</BasicTable.Th>

              <BasicTable.Tbody>
                {tableTestData.map((item, index) => {
                  return (
                    <BasicTable.Tr
                      key={index}
                      isClicked={ts_1.has(item.id)}
                      onClick={() => tt_1(item.id)}
                    >
                      <BasicTable.Td>{item.name}</BasicTable.Td>
                      <BasicTable.Td>{item.age}</BasicTable.Td>
                      <BasicTable.Td>{item.age}</BasicTable.Td>
                      <BasicTable.Td>{item.name}</BasicTable.Td>
                      <BasicTable.Td>{item.age}</BasicTable.Td>
                      <BasicTable.Td>{item.age}</BasicTable.Td>
                      <BasicTable.Td>{item.name}</BasicTable.Td>
                      <BasicTable.Td>{item.age}</BasicTable.Td>
                      <BasicTable.Td>
                        <BasicButton sx={{ borderColor: "error.main" }}>
                          예약취소
                        </BasicButton>
                      </BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
          <CenteredBox justifyContent={"space-between"} padding={1}>
            <Pagination count={25} page={resultPage} onChange={resultPageC} />
            <TableSelect
              total={100}
              countValues={countValues}
              selectValue={selectValue}
              handleChange={handleChange}
            />
          </CenteredBox>
        </Stack>

        <Stack
          width={"40%"}
          height={"100%"}
          border="1px solid #E5E5E5"
          borderRadius="8px"
        >
          <TableBox.Inner>
            <BasicTable data={tableTestData}>
              <BasicTable.Th>전송시간</BasicTable.Th>
              <BasicTable.Th>전송결과</BasicTable.Th>
              <BasicTable.Th>전송번호</BasicTable.Th>

              <BasicTable.Tbody>
                {tableTestData.map((item, index) => {
                  return (
                    <BasicTable.Tr
                      key={index}
                      isClicked={ts_2.has(item.id)}
                      onClick={() => tt_2(item.id)}
                    >
                      <BasicTable.Td
                      // style={{
                      //   color: item.name == "John Doe" ? "red" : "black",
                      // }}
                      >
                        {item.name}
                      </BasicTable.Td>
                      <BasicTable.Td>{item.age}</BasicTable.Td>
                      <BasicTable.Td>{item.age}</BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
          <CenteredBox justifyContent={"space-between"} padding={1}>
            <Pagination count={25} page={c_2} onChange={cc_2} />
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
