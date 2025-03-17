import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import GrayBox from "../../../components/Box/GrayBox";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
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
import { useMultiRowSelection } from "../../../hooks/useMultiRowSelection";
import MultipleCheckboxTable from "../../../components/Table/MultipleCheckboxTable";
import { Pagination } from "../../../components/Pagination";
import TableSelect from "../../../components/Select/TableSelect";
import { usePagination } from "../../../hooks/usePagination";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdInfoOutline } from "react-icons/md";
import { useTableSelect } from "../../../hooks/useTableSelect";
import {
  useGetBulkMsgList,
  useGetBulkSaveMsgList,
  useGetBulkTotalCnt,
  usePostBulkTmpList,
  usePostBulkChkTotalCnt,
  usePostBrd,
  useGetBrdMsg,
} from "../../../api/messageBulk";
import { useDeleteMsg, usePostMsg } from "../../../api/callMessage";
import { HiRefresh } from "react-icons/hi";
import useModal from "../../../hooks/useModal";
import { BasicDeleteConfirmModal } from "../../../components/Modal/modal/BasicDeleteConfirmModal";
import { useApiRes } from "../../../utils/useApiRes";
import { DeleteCompletedModal } from "../../../components/Modal/modal/DeleteCompletedModal";
import { Controller, useForm } from "react-hook-form";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import { useCrtfcList } from "../../../api/crtfc";
import { FileModal } from "../../../components/Modal/modal/FIleModal";
import { FailModal } from "../../../components/Modal/modal/FailModal";
import { BasicCompletedModl } from "../../../components/Modal/modal/BasicCompletedModl";
import { useSptStore } from "../../../stores/sptStore";
import Preview from "./popup/Preview";
import DeleteBtnInput from "../../../components/Input/DeleteBtnInput";
import { getFormattedDate } from "../../../utils/getFormattedDate";
import { getFormatTime } from "../../../utils/getFormatTime";
import TmpPreview from "./popup/TmpPreview";
import TelInput from "./popup/TelInput";
import { useAuthStore } from "../../../stores/authStore";
import { UpdateCompletedModal } from "../../../components/Modal/modal/UpdateCompletedModal";

export default function BulkMessage() {
  const tableData = [
    {
      text: "[이름]",
    },
    {
      text: "[휴대전화]",
    },
    {
      text: "[일반전화]",
    },
    {
      text: "[고객정보]",
    },
    {
      text: "[주소]",
    },
    {
      text: "[등록일시]",
    },
    {
      text: "[순번]",
    },
    {
      text: "[비고]",
    },
    {
      text: "[전송일]",
    },
  ];

  const [temporaryTable, setTemporaryTable] = useState<
    {
      mbtlNo: string;
      cstmrNm: string;
      sptNo: string;
      userNo: string;
      userId: string;
      sn: string;
      validMbtlNo: string;
      dplctYn: string;
    }[]
  >([]);

  const [totalData, setTotalData] = useState({
    totalCnt1: "0",
    totalCnt2: "0",
    totalCnt3: "0",
    totalCnt4: "0",
  });

  const [fileNames, setFileNames] = useState<string>("");
  const [maxBytes, setMaxBytes] = useState<number>(80);

  const defaultValues = {
    subject: "",
    autoMessage: "",
    rejectNumber: "",
    countMsg: "",
    interval: "",
    macro: "",
    isAd: false,
    isReg: false,
    isInterval: false,
    brd: "",
  };

  const autoMsgRef = useRef<HTMLTextAreaElement | null>(null);

  const { register, control, getValues, setValue, watch } = useForm({
    defaultValues: defaultValues,
  });

  const fileRef = useRef<HTMLInputElement>(null); // 파일 담을 ref

  // 전송대상, 임시대상 탭
  const { value, handleChange: tabChange } = useTabs(0);

  const { selectedValue: msgType, handleRadioChange } = useRadioGroup("S"); // 초기값은 빈 문자열
  const { sptNo } = useSptStore();

  const [date, setDate] = useState<Date>(new Date()); // 날짜
  const [selectedTime, setSelectedTime] = useState(Date.now()); // 시간
  const [writeMode, setWriteMode] = useState<boolean>(false); // 상단문구

  const {
    selectedRows: s_1,
    toggleRowsSelection: t_1,
    resetSelectedRows: rs_1,
  } = useMultiRowSelection(); // 선택 컬럼 클릭 여부
  const {
    selectedRows: s_2,
    toggleRowsSelection: t_2,
    resetSelectedRows: rs_2,
  } = useMultiRowSelection(); // 제외 컬럼 클릭 여부

  const { currentPage, onChangePage } = usePagination();

  const { countValues, selectValue: limit, handleChange } = useTableSelect();

  useDidMountEffect(() => {
    setMaxBytes(msgType === "S" ? 80 : 2000);
  }, [msgType]);

  // ----------------- API -----------------
  const { data: brdMsg, refetch: refetchBrd } = useGetBrdMsg({
    smsKnd: msgType,
  });
  const { mutate: postBrdMsg } = usePostBrd(); // 상단 알림 문구 수정
  const { data: BulkMsgList, refetch } = useGetBulkMsgList(); // 전송대상 테이블 리스트
  const { data: msgSaveList, refetch: refetchMsgSave } = useGetBulkSaveMsgList({
    page: currentPage,
    limit: limit,
  }); // 우측 메세지 리스트
  const { data: numberList } = useCrtfcList(); // 발신번호 리스트

  const { mutate: tmpList } = usePostBulkTmpList(); //  임시대상 - 임시대상 목록 (복붙데이터 input)
  const { mutate: totalCnt } = usePostBulkChkTotalCnt(); //전송대상 확정인원
  const { data: tmpTotalCnt } = useGetBulkTotalCnt(); // 임시대상 확정인원

  // 발신번호 목록
  const {
    selectListData: dsptchList,
    selectValue: dsptchNo,
    handleChange: changeDsptch,
  } = useSelect(
    numberList?.data?.contents,
    "cid",
    "cid",
    numberList?.data?.contents[0]?.cid
  );

  const { openModal, closeModal } = useModal();
  const checkApiFail = useApiRes();

  // 우측 메세지 목록 mutate

  // 메세지 저장
  const { mutate: postMsg } = usePostMsg();
  // 메세지 삭제
  const { mutate: deleteMsg } = useDeleteMsg();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileCount = Array.from(files).length;

      if (fileCount > 3) {
        openModal(FileModal, {
          modalId: "fileModal",
          stack: false,
          onClose: () => closeModal,
        });
      } else {
        // 파일 이름을 쉼표로 구분하여 저장
        const fileList = Array.from(files)
          .map((file) => file.name)
          .join(", ");
        setFileNames(fileList);
      }
    }
  };

  // 개별 메세지 삭제
  const onDelete = (saveNo: string) => {
    openModal(BasicDeleteConfirmModal, {
      modalId: "deleteCnslt",
      stack: false, //단일 모달 모드
      onClose: () => closeModal,
      onSubmit: () => {
        deleteMsg(
          { saveNo: saveNo },
          {
            onSuccess: (res) => {
              checkApiFail(res);
              if (res.data.message === "SUCCESS") {
                console.log("삭제 성공:", res);
                openModal(DeleteCompletedModal, {
                  stack: false,
                  onClose: () => closeModal,
                  onSubmit: () => closeModal,
                  modalId: "delete",
                });
                refetchMsgSave();
              }
            },
          }
        );
      },
    });
  };

  // 문자저장
  const onPostMsg = () => {
    postMsg(
      {
        body: {
          saveNo: "",
          sptNo: sptNo,
          commUseYn: "N",
          mssage: getValues("autoMessage"),
          advYn: getValues("isAd") ? "Y" : "N",
        },
      },
      {
        onSuccess: (res) => {
          const result = checkApiFail(res);
          if (result.data.message === "SUCCESS") {
            console.log("추가 성공:", res);
            openModal(BasicCompletedModl, {
              modalId: "complete",
              stack: false,
              onClose: () => closeModal,
            });
            refetchMsgSave();
          }
        },
        onError: (err) => {
          console.log("에러:", err);
          openModal(FailModal, {
            modalId: "apiFail",
            stack: false,
            onClose: () => closeModal,
          });
        },
      }
    );
  };

  // 대상확인
  const openPreview = ({ testYn, isTmp }) => {
    const msgData = {
      smsKnd: msgType,
      subject: getValues("subject"),
      mssage: getValues("autoMessage"),
      sptNo: sptNo,
      dsptchNo: dsptchNo,
      adYn: getValues("isAd") ? "Y" : "N",
      recptnDt: getFormattedDate(date),
      recptnTm: getFormatTime(selectedTime).slice(0, -3),
      sendDivYn: getValues("isInterval") ? "Y" : "N",
      sendDivCnt: getValues("isInterval") ? getValues("countMsg") : "",
      sendMinGap: getValues("isInterval") ? getValues("interval") : "",
      testYn: testYn ? "Y" : "N",
    };

    const formData = new FormData();
    const files = fileRef.current?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
    }

    const body = {
      sptNo: sptNo,
      groupNoList: Array.from(s_1),
      notGroupNoList: Array.from(s_2),
    };

    if (isTmp) {
      // 임시대상 - 문자 전송
      Object.assign(msgData, {
        list: temporaryTable.map((item) => ({
          mbtlNo: item.mbtlNo,
          cstmrNm: item.cstmrNm,
        })),
      });
      formData.append("param", JSON.stringify(msgData));

      openModal(TmpPreview, {
        msgData: formData,
      });
    } else {
      // 전송대상 - 문자 전송
      Object.assign(msgData, {
        grpList: Array.from(s_1),
        notGrpList: Array.from(s_2),
      });
      formData.append("param", JSON.stringify(msgData));
      openModal(Preview, {
        body: body,
        msgData: formData,
      });
    }
  };

  const onDeleteFile = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
      setFileNames("");
    }
  };

  // 매크로 테이블 클릭 시
  const onClickMacro = (value) => {
    if (autoMsgRef.current) {
      const cursorPosition = autoMsgRef.current.selectionStart;
      const currentValue = autoMsgRef.current.value;

      const before = currentValue.substring(0, cursorPosition);
      const after = currentValue.substring(cursorPosition);
      const newValue = before + value + after;

      setValue("autoMessage", newValue);
    }
  };

  // 복사하기 클릭 시
  const onClickClipboard = () => {
    if (autoMsgRef.current) {
      const value = getValues("rejectNumber");
      const cursorPosition = autoMsgRef.current.selectionStart;
      const currentValue = autoMsgRef.current.value;

      const before = currentValue.substring(0, cursorPosition);
      const after = currentValue.substring(cursorPosition);
      const newValue = before + value + after;

      setValue("autoMessage", newValue);
    }
  };

  // 엑셀 데이터 복사 붙여넣기
  const onClipboard = (e) => {
    const pasteData = e.clipboardData.getData("text");
    const rows = pasteData.split("\n");

    const parsedData = rows
      .map((row) => {
        const [mbtlNo, cstmrNm] = row.trim().split(/\s+/);
        return mbtlNo && cstmrNm ? { sptNo: sptNo, mbtlNo, cstmrNm } : null;
      })
      .filter(Boolean);

    tmpList(
      { body: parsedData },
      {
        onSuccess: (res) => {
          checkApiFail(res);
          if (res.data.message === "SUCCESS") {
            setTemporaryTable(res.data.contents);
          }
        },
      }
    );
  };

  // 실험발송
  const testMsg = () => {
    const msgData = {
      smsKnd: msgType,
      subject: getValues("subject"),
      mssage: getValues("autoMessage"),
      sptNo: sptNo,
      dsptchNo: dsptchNo,
      adYn: getValues("isAd") ? "Y" : "N",
      recptnDt: getFormattedDate(date),
      recptnTm: getFormatTime(selectedTime).slice(0, -3),
      sendDivYn: getValues("isInterval") ? "Y" : "N",
      sendDivCnt: getValues("isInterval") ? getValues("countMsg") : "",
      sendMinGap: getValues("isInterval") ? getValues("interval") : "",
      testYn: "Y",
      grpList: Array.from(s_1),
      notGrpList: Array.from(s_2),
    };

    const formData = new FormData();

    formData.append("param", JSON.stringify(msgData));
    const files = fileRef.current?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
    }

    openModal(TelInput, {
      onClose: () => closeModal,
      msgData: formData,
    });
  };

  const onDeleteGroup = () => {
    s_1.forEach((id) => {
      t_2(id);
    });
  };

  useEffect(() => {
    const body = {
      sptNo: sptNo,
      groupNoList: Array.from(s_1),
      notGroupNoList: Array.from(s_2),
    };

    totalCnt(
      {
        body: body,
      },
      {
        onSuccess: (res) => {
          if (res.data.code == 200) {
            setTotalData(res.data.contents);
          } else {
            setTotalData({
              totalCnt1: "0",
              totalCnt2: "0",
              totalCnt3: "0",
              totalCnt4: "0",
            });
          }
        },
      }
    );
  }, [s_1, s_2]);

  const onRefresh = () => {
    rs_1();
    rs_2();
    refetch();
  };

  const { loginId } = useAuthStore(["loginId"]);
  const onWriteBrd = () => {
    // 이미 수정상태일 경우, 수정함
    if (writeMode) {
      postBrdMsg(
        {
          body: {
            sptNo: sptNo,
            ntcnWords: getValues("brd"),
            smsKnd: msgType,
            userId: loginId,
          },
        },
        {
          onSuccess: (res) => {
            if (res.data.message === "SUCCESS") {
              openModal(UpdateCompletedModal, {
                stack: false,
                onClose: () => closeModal,
                onSubmit: () => closeModal,
                modalId: "delete",
              });
            }
            refetchBrd();
            setWriteMode(!writeMode);
          },
        }
      );
    } else {
      setValue("brd", brdMsg?.data?.contents?.ntcnWords || "");
      setWriteMode(!writeMode);
    }
  };

  useEffect(() => {
    setValue("brd", brdMsg?.data?.contents?.ntcnWords || "");
  }, [msgType]);

  return (
    <Stack width={"100%"} height={"100%"} gap={1}>
      <GrayBox gap={1} marginBottom={0}>
        {writeMode ? (
          <BasicInput {...register("brd")} fullWidth />
        ) : (
          <Typography color="error.main">
            {brdMsg?.data?.contents?.ntcnWords}
          </Typography>
        )}

        <IconSquareButton onClick={onWriteBrd}>
          <LuPencil />
        </IconSquareButton>
        <BasicButton sx={{ marginLeft: "auto" }}>
          <Typography onClick={testMsg}>실험발송</Typography>
        </BasicButton>
        <BasicButton
          onClick={() => openPreview({ testYn: false, isTmp: false })}
        >
          <Typography>문자발송</Typography>
        </BasicButton>
      </GrayBox>

      <TableBox gap={1}>
        <Stack
          minWidth={"400px"}
          maxWidth={"450px"}
          width={"100%"}
          height={"100%"}
          gap={1}
          border="1px solid #E5E5E5"
          borderRadius="8px"
          padding={2}
        >
          <Typography variant="h3">메시지 작성</Typography>
          <Stack width={"100%"} height={"100%"} overflow={"auto"} gap={1}>
            <Stack direction={"row"} alignItems={"center"}>
              {/* 라디오 그룹 */}
              <RadioGroup value={msgType} onChange={handleRadioChange} row>
                <FormControlLabel
                  value="S"
                  control={<Radio size="small" />}
                  label="SMS"
                />
                <FormControlLabel
                  value="L"
                  control={<Radio size="small" />}
                  label="LMS"
                />
                <FormControlLabel
                  value="M"
                  control={<Radio size="small" />}
                  label="MMS"
                />
              </RadioGroup>
              {msgType == "M" ? (
                <BasicButton
                  onClick={() => {
                    if (fileRef.current) {
                      fileRef.current.click(); // 파일 선택 창 열기
                    }
                  }}
                >
                  이미지 선택
                </BasicButton>
              ) : (
                <></>
              )}
              <input
                type="file"
                ref={fileRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept="image/*"
              />
            </Stack>
            {msgType == "M" ? (
              <DeleteBtnInput
                value={fileNames}
                btnfn={onDeleteFile}
                placeholder="첨부 파일 목록"
              />
            ) : (
              ""
            )}
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <Typography>제목</Typography>
              <BasicInput
                fullWidth
                placeholder="내용 입력"
                {...register("subject")}
              />
            </Stack>
            <Controller
              name="autoMessage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  {...field}
                  ref={autoMsgRef}
                  height="100px"
                  resize="none"
                  placeholder="대량문자 메시지를 입력해 주십시오."
                  maxBytes={maxBytes}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <Typography>발신번호</Typography>
              <Select
                selectData={dsptchList}
                value={dsptchNo}
                onChange={changeDsptch}
              />
              <IconButton sx={{ color: "root.mainBlue" }}>
                {/* react-icon 사이트에서 아이콘 찾아서 이용함 */}
                <IoSettingsOutline />
              </IconButton>
            </Stack>
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <FormControlLabel
                control={<Checkbox />}
                label="광고문자"
                {...register("isAd")}
              />

              <BasicInput
                disabled={!watch("isAd")}
                placeholder="수신 거부 번호"
                {...register("rejectNumber")}
              />
              <BasicButton onClick={onClickClipboard}>복사하기</BasicButton>
            </Stack>
            <Stack
              gap={1}
              marginBottom={1}
              direction={"row"}
              alignItems={"center"}
            >
              <FormControlLabel
                control={<Checkbox />}
                label="예약문자"
                {...register("isReg")}
              />
              <Stack width={"100%"} gap={1}>
                <Calendar selectedDate={date} setSelectedDate={setDate} />
                <TimePicker
                  time={selectedTime}
                  setSelectedTime={setSelectedTime}
                />
              </Stack>
            </Stack>
            <Stack gap={1} direction={"row"} alignItems={"center"}>
              <FormControlLabel
                control={<Checkbox />}
                label="분할전송"
                {...register("isInterval")}
              />
              <Stack gap={1}>
                <CenteredBox gap={1}>
                  <BasicInput
                    placeholder="1,000건"
                    sx={{ width: "150px" }}
                    {...register("countMsg")}
                  />
                  <Typography>건 단위로</Typography>
                </CenteredBox>
                <CenteredBox gap={1}>
                  <BasicInput
                    placeholder="1"
                    sx={{ width: "150px" }}
                    {...register("interval")}
                  />
                  <Typography>분 간격으로 발송합니다.</Typography>
                </CenteredBox>
              </Stack>
            </Stack>
            <Typography variant="h3">매크로</Typography>
            <TableBox width="100%" height="100%" overflow={"hidden"}>
              <TableBox.Inner width="100%" height="100%" overflow={"auto"}>
                <BasicTable data={tableData}>
                  <BasicTable.Th>매크로</BasicTable.Th>
                  <BasicTable.Tbody>
                    {tableData.map((item, index) => {
                      return (
                        <BasicTable.Tr
                          key={index}
                          onClick={() => {
                            onClickMacro(item.text);
                          }}
                        >
                          <BasicTable.Td>{item.text}</BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </TableBox>
          </Stack>
        </Stack>

        <Stack
          minWidth={"650px"}
          height={"100%"}
          gap={1}
          border="1px solid #E5E5E5"
          borderRadius="8px"
          padding={1.5}
        >
          <TabMenus value={value} handleChange={tabChange}>
            <TabMenus.Tab label="전송대상" />
            <TabMenus.Tab label="임시대상" />
          </TabMenus>
          <TabPanel value={value} index={0}>
            <CenteredBox justifyContent={"center"} gap={1} margin={1}>
              <BasicButton
                onClick={() => openPreview({ testYn: false, isTmp: false })}
              >
                대상확인
              </BasicButton>
              <IconSquareButton color="primary" onClick={onRefresh}>
                <HiRefresh />
              </IconSquareButton>
              <BasicButton onClick={onDeleteGroup}>제외</BasicButton>
            </CenteredBox>

            <TableBox>
              <TableBox.Inner>
                <MultipleCheckboxTable data={BulkMsgList?.data?.contents}>
                  <MultipleCheckboxTable.Th>전체</MultipleCheckboxTable.Th>
                  <MultipleCheckboxTable.Th>그룹명</MultipleCheckboxTable.Th>
                  <MultipleCheckboxTable.Th>인원수</MultipleCheckboxTable.Th>
                  <MultipleCheckboxTable.Th>제외</MultipleCheckboxTable.Th>

                  <MultipleCheckboxTable.Tbody>
                    {BulkMsgList?.data?.contents?.map((item) => {
                      const isDisabled =
                        s_1.has(item.groupNo) && s_2.has(item.groupNo); // s_1과 s_2에 동일한 id가 있을 때
                      return (
                        <MultipleCheckboxTable.Tr
                          key={item.groupNo}
                          id={item.groupNo}
                        >
                          <MultipleCheckboxTable.CheckboxTd
                            item={item}
                            selectedRows={s_1}
                            toggleRowsSelection={t_1}
                            keyName="groupNo"
                            disabled={isDisabled} // 조건에 따라 disabled 속성 추가
                          />
                          <MultipleCheckboxTable.Td>
                            {item.groupNm}
                          </MultipleCheckboxTable.Td>
                          <MultipleCheckboxTable.Td>
                            {item.cnt}
                          </MultipleCheckboxTable.Td>
                          <MultipleCheckboxTable.CheckboxTd
                            item={item}
                            selectedRows={s_2}
                            toggleRowsSelection={t_2}
                            keyName="groupNo"
                          />
                        </MultipleCheckboxTable.Tr>
                      );
                    })}
                  </MultipleCheckboxTable.Tbody>
                </MultipleCheckboxTable>
              </TableBox.Inner>
            </TableBox>
            <GrayBox height={"60px"} justifyContent={"center"} marginTop={1}>
              <Typography>확정 인원 : {totalData.totalCnt1 || 0}</Typography>
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
                <BasicButton
                  onClick={() => {
                    openPreview({ testYn: false, isTmp: true });
                  }}
                >
                  대상확인
                </BasicButton>
              </CenteredBox>

              <TableBox onPaste={onClipboard}>
                <TableBox.Inner>
                  <BasicTable data={temporaryTable}>
                    <BasicTable.Th>휴대전화</BasicTable.Th>
                    <BasicTable.Th>고객정보</BasicTable.Th>

                    <BasicTable.Tbody>
                      {temporaryTable.map((item, index) => {
                        // 배경색 설정
                        let backgroundColor = "transparent";
                        if (item.dplctYn == "Y") {
                          backgroundColor = "#CBE0FF"; // 중복: 파란색
                        } else if (item.validMbtlNo == "N") {
                          backgroundColor = "#FFA7A6"; // 형식 오류: 빨간색
                        }
                        return (
                          <BasicTable.Tr key={index}>
                            <BasicTable.Td style={{ backgroundColor }}>
                              {item.mbtlNo}
                            </BasicTable.Td>
                            <BasicTable.Td>{item.cstmrNm}</BasicTable.Td>
                          </BasicTable.Tr>
                        );
                      })}
                    </BasicTable.Tbody>
                  </BasicTable>
                </TableBox.Inner>
              </TableBox>
            </Stack>
            <GrayBox height={"60px"} justifyContent={"center"} marginTop={1}>
              <Typography>
                확정 인원 : {tmpTotalCnt?.data?.contents?.totalCnt}
              </Typography>
            </GrayBox>
          </TabPanel>
        </Stack>
        <Stack
          minWidth={"300px"}
          width={"100%"}
          height={"100%"}
          gap={1}
          border="1px solid #E5E5E5"
          borderRadius="8px"
          padding={2}
        >
          <CenteredBox gap={1} margin={1}>
            <Typography variant="h3">저장 메시지</Typography>
            <BasicButton sx={{ marginLeft: "auto" }} onClick={onPostMsg}>
              문자저장
            </BasicButton>
          </CenteredBox>
          <TableBox>
            <TableBox.Inner>
              <BasicTable data={msgSaveList?.data?.contents}>
                <BasicTable.Th> </BasicTable.Th>
                <BasicTable.Th> </BasicTable.Th>
                <BasicTable.Th>메시지</BasicTable.Th>
                <BasicTable.Th>삭제</BasicTable.Th>

                <BasicTable.Tbody>
                  {msgSaveList?.data?.contents?.map((item, index) => {
                    return (
                      <BasicTable.Tr key={index}>
                        <BasicTable.Td>{item.advTxt}</BasicTable.Td>
                        <BasicTable.Td>{item.advYn}</BasicTable.Td>
                        <BasicTable.Td>{item.mssage}</BasicTable.Td>
                        <BasicTable.Td>
                          <IconButton
                            color="error"
                            onClick={() => {
                              onDelete(item.saveNo);
                            }}
                          >
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
            <Pagination
              count={msgSaveList?.data?.totalPage || 1}
              page={currentPage}
              onChange={onChangePage}
            />
            <TableSelect
              total={msgSaveList?.data?.totalCnt}
              countValues={countValues}
              selectValue={limit}
              handleChange={handleChange}
            />
          </CenteredBox>
        </Stack>
      </TableBox>
    </Stack>
  );
}
