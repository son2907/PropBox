import { Box, Stack, Typography } from "@mui/material";
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
import BasicTable from "../../../components/Table/BasicTable";
import CenteredBox from "../../../components/Box/CenteredBox";
import { Pagination } from "../../../components/Pagination";
import TableSelect from "../../../components/Select/TableSelect";
import { usePagination } from "../../../hooks/usePagination";
import RangeCalendar from "../../../components/Calendar/RangeCalendar";
import { useTableSelect } from "../../../hooks/useTableSelect";
import {
  useDeleteMsg,
  useMsgResult,
  useMsgResultDetailExcel,
  useMsgResultDetailList,
  useMsgResultExcel,
} from "../../../api/messageResult";
import { useSptStore } from "../../../stores/sptStore";
import { getFormattedDate } from "../../../utils/getFormattedDate";
import { useSingleRowData } from "../../../hooks/useTest";
import { useForm } from "react-hook-form";
import {
  ResultDetailListType,
  ResultMSgType,
} from "../../../types/messageResult";
import useModal from "../../../hooks/useModal";
import { BasicDeleteConfirmModal } from "../../../components/Modal/modal/BasicDeleteConfirmModal";
import { useApiRes } from "../../../utils/useApiRes";
import SMSDetail from "./popup/SMSDetail";
import { Excel } from "./popup/Excel";
import { ExcelAlert } from "./popup/ExcelAlert";
import useDidMountEffect from "../../../hooks/useDidMountEffect";

export default function ResultMessage() {
  const [date, setDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [range, setRange] = useState<boolean>(false);

  const defaultValues = {
    mbtlNo: "",
  };
  const { register, watch, getValues } = useForm({
    defaultValues: defaultValues,
  });

  const { openModal, closeModal } = useModal();
  const { countValues, selectValue, handleChange } = useTableSelect();
  const { sptNo } = useSptStore();

  const { selectedRow: selectResult, toggleRowSelection: selectResultFun } =
    useSingleRowData<ResultMSgType>("idx");

  const { selectedRow: selectDetail, toggleRowSelection: selectDetailFun } =
    useSingleRowData<ResultDetailListType>("idx");

  const { currentPage: resultPage, onChangePage: resultPageC } =
    usePagination();

  const { currentPage: detailPage, onChangePage: detailPageC } =
    usePagination();

  const checkApiFail = useApiRes();

  const handlePrevDate = () => {
    setStartDate(new Date(date.setDate(date.getDate() - 1)));
  };
  const handleNextDate = () => {
    setStartDate(new Date(date.setDate(date.getDate() + 1)));
  };

  const handleDateToday = () => {
    setDate(new Date());
  };

  const onClickDetailBtn = () => {
    if (!selectDetail) return;
    openModal(SMSDetail, {
      modalId: "detailModal",
      msgKnd: selectDetail.msgKnd,
      yyyyMm: selectDetail.yyyyMm,
      idx: selectDetail.idx,
      onClose: () => closeModal("detailModal"),
    });
  };

  const { data: msgList, refetch: msgResultRefetch } = useMsgResult({
    sptNo: sptNo,
    fromDate: range ? getFormattedDate(startDate) : getFormattedDate(date),
    page: resultPage,
    limit: selectValue,
    ...(range ? { toDate: getFormattedDate(endDate) } : {}),
    mbtlNo: watch("mbtlNo"),
  });

  const { data: detailList } = useMsgResultDetailList({
    sptNo: sptNo,
    msgKnd: selectResult?.msgKnd ?? "",
    sendGroup: selectResult?.sendGroup ?? "",
    limit: 50,
    page: 1,
  });

  const { mutate: deleteMsg } = useDeleteMsg();

  const { refetch: msgResultExcel } = useMsgResultExcel({
    sptNo: sptNo,
    fromDate: range ? getFormattedDate(startDate) : getFormattedDate(date),
    ...(range ? { toDate: getFormattedDate(endDate) } : {}),
    mbtlNo: getValues("mbtlNo"),
  });

  const { refetch: msgDetailExcel } = useMsgResultDetailExcel({
    sptNo: sptNo,
    msgKnd: selectResult?.msgKnd ?? "",
    sendGroup: selectResult?.sendGroup ?? "",
  });

  const onDelete = ({ msgKnd, sendGroup }) => {
    openModal(BasicDeleteConfirmModal, {
      modalId: "deleteResult",
      stack: false,
      onClose: () => closeModal,
      onSubmit: () => {
        deleteMsg(
          {
            sptNo: sptNo,
            msgKnd: msgKnd,
            sendGroup: sendGroup,
          },
          {
            onSuccess: (res) => {
              console.log("삭제 응답:", res);
              checkApiFail(res);
              msgResultRefetch();
            },
          }
        );
      },
    });
  };

  const onExcel = () => {
    openModal(Excel, {
      onResult: () => {
        msgResultExcel();
      },
      onDetail: () => {
        if (!selectResult) {
          openModal(ExcelAlert, {
            onClose: () => closeModal,
          });
          return;
        }
        msgDetailExcel();
      },
      onClose: () => closeModal,
    });
  };

  useDidMountEffect(() => {
    resultPageC(undefined, 1);
  }, [selectValue]);

  useDidMountEffect(() => {
    resultPageC(undefined, 1);
  }, [selectValue]);

  return (
    <Stack width={"100%"} height={"100%"} gap={1}>
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
            <BasicButton onClick={handlePrevDate}>
              <MdArrowBackIos />
              이전
            </BasicButton>
            <BasicButton onClick={handleNextDate}>
              <MdArrowForwardIos />
              이후
            </BasicButton>
            <BasicButton onClick={handleDateToday}>
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
            <SearchInput {...register("mbtlNo")} />
            <BasicButton sx={{ marginLeft: "auto" }} onClick={onClickDetailBtn}>
              상세보기
            </BasicButton>
            <BasicButton onClick={onExcel}>엑셀 다운로드</BasicButton>
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
            <BasicTable data={msgList?.data?.contents}>
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
                {msgList?.data?.contents?.map((item, index) => {
                  return (
                    <BasicTable.Tr
                      key={index}
                      isClicked={selectResult?.idx === item.idx}
                      onClick={() => selectResultFun(item)}
                    >
                      <BasicTable.Td>{item.sendGroup}</BasicTable.Td>
                      <BasicTable.Td>{item.sendCnt}</BasicTable.Td>
                      <BasicTable.Td>{item.waitCnt}</BasicTable.Td>
                      <BasicTable.Td>{item.succCnt}</BasicTable.Td>
                      <BasicTable.Td>{item.failCnt}</BasicTable.Td>
                      <BasicTable.Td>{item.smsCnt}</BasicTable.Td>
                      <BasicTable.Td>{item.lmsCnt}</BasicTable.Td>
                      <BasicTable.Td>{item.msg}</BasicTable.Td>
                      <BasicTable.Td>
                        <BasicButton
                          sx={{ borderColor: "error.main" }}
                          onClick={() => {
                            onDelete({
                              msgKnd: item.msgKnd,
                              sendGroup: item.sendGroup,
                            });
                          }}
                        >
                          <Typography>예약취소</Typography>
                        </BasicButton>
                      </BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
          <CenteredBox justifyContent={"space-between"} padding={1}>
            <Pagination
              count={msgList?.data?.totalPage || 1}
              page={resultPage}
              onChange={resultPageC}
            />
            <TableSelect
              total={msgList?.data?.totalCnt}
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
            <BasicTable data={detailList?.data?.contents}>
              <BasicTable.Th>전송시간</BasicTable.Th>
              <BasicTable.Th>전송결과</BasicTable.Th>
              <BasicTable.Th>전송번호</BasicTable.Th>

              <BasicTable.Tbody>
                {detailList?.data?.contents?.map((item, index) => {
                  return (
                    <BasicTable.Tr
                      key={index}
                      isClicked={selectDetail?.idx === item.idx}
                      onClick={() => selectDetailFun(item)}
                    >
                      <BasicTable.Td>{item.sendDate}</BasicTable.Td>
                      <BasicTable.Td
                        style={{
                          color:
                            item.sendResult == "성공"
                              ? "blue"
                              : item.sendResult == "대기"
                                ? "yellow"
                                : "red",
                        }}
                      >
                        {item.sendResult}
                      </BasicTable.Td>
                      <BasicTable.Td>{item.mbtlNo}</BasicTable.Td>
                    </BasicTable.Tr>
                  );
                })}
              </BasicTable.Tbody>
            </BasicTable>
          </TableBox.Inner>
          <CenteredBox justifyContent={"space-between"} padding={1}>
            <Pagination
              count={detailList?.data?.totalPage || 1}
              page={detailPage}
              onChange={detailPageC}
            />
            <Typography>전체 : {detailList?.data?.totalCnt || 0}</Typography>
          </CenteredBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}
