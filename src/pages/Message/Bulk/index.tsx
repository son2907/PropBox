import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import GrayBox from "../../../components/Box/GrayBox";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import { tableTestData } from "../../../utils/testData";
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
import { useGetBulkMsgList } from "../../../api/messageBulk";
import { useDeleteMsg, useMsgList, usePostMsg } from "../../../api/callMessage";
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
import { WarningModal } from "../../../components/Modal/modal/WarningModal";
import { combineDateAndTime } from "../../../utils/combineDateAndTime";

export default function BulkMessage() {
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
  };

  const { register, control, getValues, watch } = useForm({
    defaultValues: defaultValues,
  });

  const fileRef = useRef<HTMLInputElement>(null); // 파일 담을 ref

  const [maxBytes, setMaxBytes] = useState<number>(80);

  const { selectedRow: ss_2, toggleRowSelection: tt_2 } =
    useSingleRowSelection();

  // 전송대상, 임시대상 탭
  const { value, handleChange: tabChange } = useTabs(0);

  const { selectedValue: msgType, handleRadioChange } = useRadioGroup("S"); // 초기값은 빈 문자열

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

  useDidMountEffect(() => {
    setMaxBytes(msgType === "S" ? 80 : 2000);
  }, [msgType]);

  // ----------------- API -----------------
  const { data: BulkMsgList } = useGetBulkMsgList(); // 전송대상 테이블 리스트
  console.log("BulkMsgList:", BulkMsgList);
  const { data: msgSaveList, refetch: refetchMsgSave } = useMsgList(); // 우측 메세지 리스트
  console.log("msgSaveList:", msgSaveList);
  const { data: numberList } = useCrtfcList({ cid: "" }); // 발신번호 리스트
  console.log("numberList:", numberList);

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

  const [fileNames, setFileNames] = useState<string>("");

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

  const { sptNo } = useSptStore();

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
          console.log("onSuccess:", res);
          const result = checkApiFail(res);
          if (result.data.message === "SUCCESS") {
            console.log("추가 성공:", res);
            openModal(BasicCompletedModl, {
              modalId: "complete",
              stack: false,
              onClose: () => closeModal,
            });
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

  // 문자 전송

  // 문자 전송
  const sendMsgBtn = () => {
    const file = fileRef.current?.files?.[0];

    if (!getValues("subject")) {
      openModal(WarningModal, {
        message: "제목이 누락되었습니다.",
        onClose: () => closeModal,
      });
      return;
    }

    const requestBody = {
      sptNo: sptNo,
      cstmrNo: "알 수 없음",
      smsKnd: msgType,
      subject: getValues("subject"),
      mssage: getValues("autoMessage"),
      trnsmitTxt: getValues("isReg")
        ? combineDateAndTime(date, selectedTime)
        : "", // 예약이 아닐 경우 공백으로
      adYn: getValues("isAd") ? "Y" : "N",
      mbtlNo: "모름",
      dsptchNo: dsptchNo,
    };

    const formData = new FormData();
    formData.append("param", JSON.stringify(requestBody)); // JSON 데이터를 string으로 추가
    if (file) formData.append("file", file);
    console.log("requestBody:", requestBody);

    // sendMsg(
    //   {
    //     body: formData,
    //   },
    //   {
    //     onSuccess: (res) => {
    //       console.log("onSuccess:", res);
    //       const result = checkApiFail(res);
    //       if (result.data.message === "SUCCESS") {
    //         console.log("전송 성공:", res);
    //         openModal(BasicCompletedModl, {
    //           modalId: "complete",
    //           stack: false,
    //           onClose: () => closeModal,
    //         });
    //       }
    //     },
    //     onError: (err) => {
    //       console.log("에러:", err);
    //       openModal(FailModal, {
    //         modalId: "apiFail",
    //         stack: false,
    //         onClose: () => closeModal,
    //       });
    //     },
    //   }
    // );
  };

  console.log("msgType:", msgType);

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
        <BasicButton onClick={sendMsgBtn}>문자발송</BasicButton>
      </GrayBox>

      <TableBox gap={2}>
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
          <Stack width={"100%"} height={"100%"} overflow={"auto"} gap={2}>
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
              {msgType == "M" ? <BasicButton>이미지 선택</BasicButton> : <></>}
            </Stack>

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
                  height="100px"
                  resize="none"
                  placeholder="자동문자 메시지를 입력해 주십시오."
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
              <BasicButton>복사하기</BasicButton>
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
                {/* 추후 시간 컴포넌트로 바꿔야함 */}
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
            <Controller
              name="macro"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  {...field}
                  height="180px"
                  resize="none"
                  placeholder="메세지를 입력하세요"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
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
              <BasicButton>대상 확인</BasicButton>
              <IconSquareButton color="primary">
                <HiRefresh />
              </IconSquareButton>
              <BasicButton>제외</BasicButton>
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
                            <BasicTable.Td>{item.name}</BasicTable.Td>
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
              count={msgSaveList?.data?.contents?.totalPage || 1}
              page={currentPage}
              onChange={onChangePage}
            />
            <TableSelect
              total={msgSaveList?.data?.contents?.totalCnt}
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
