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
import { useEffect, useMemo, useRef, useState } from "react";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import { IoSettingsOutline } from "react-icons/io5";
import Calendar from "../../../components/Calendar/Calendar";
import TimeInputGroup from "./components/TimeInputGroup";
import useMultiInputValue from "../../../hooks/useMultiInputValue";
import TableBox from "../../../components/Box/TableBox";
import BasicTable from "../../../components/Table/BasicTable";
import BasicInput from "../../../components/Input/BasicInput";
import useToggleButtton from "../../../hooks/useToggleButton";
import { useRadioGroup } from "../../../hooks/useRadioGroup";
import {
  API,
  useDeleteSmsTel,
  useGetCommonCode,
  useGetSmsBase,
  useGetSmsMng,
  useGetSmsTelList,
  usePostSmsAutoSave,
  usePostSmsTel,
  usePutSmsTel,
  useSendTestMsg,
  useSendTestMsgYn,
} from "../../../api/messageAuto";
import { useCrtfcList } from "../../../api/crtfc";
import { Controller, useForm } from "react-hook-form";
import { convertBrToNewLine } from "../../../utils/convertBrToNewLine";
import { useSingleRowData } from "../../../hooks/useTest";
import useModal from "../../../hooks/useModal";
import TelInput from "../../../components/Modal/modal/TelInput";
import PhoneInput from "../../../components/Input/PhoneInput";
import { SmsTelList } from "../../../types/messageAuto";
import { useSptStore } from "../../../stores/sptStore";
import { useAuthStore } from "../../../stores/authStore";
import { useApiRes } from "../../../utils/useApiRes";
import { BasicCompletedModl } from "../../../components/Modal/modal/BasicCompletedModl";
import { MultipleDeleteModal } from "../../../components/Modal/modal/MultipleDeleteModal";
import { useQueries } from "@tanstack/react-query";
import { getFormattedDate } from "../../../utils/getFormattedDate";

const autoKey = "1008005";
const yKey = "1008010";
const nKey = "1008015";
const noneKey = "1008020";

export default function AutoMessage() {
  const defaultValues = {
    autoMessage: "",
    macro: "",
    mbtlNo: "",
    cstmrNm: "",
    Ymessage: "",
    Nmessage: "",
    noneMessage: "",
  };
  const [smsSeCd, setSmsSeCd] = useState<string>("");

  const { register, reset, control, getValues, setValue } = useForm({
    defaultValues: defaultValues,
  });

  const { sptNo } = useSptStore();

  // 시작 날짜
  const [startDate, setStartDate] = useState<Date>(new Date());
  // 끝 날짜
  const [endDate, setEndDate] = useState<Date>(new Date());

  // 체크박스 그룹에 연결할 ref 배열
  const { inputRefs } = useMultiInputValue();

  const getCheckedValues = () => {
    return inputRefs.current
      .filter((input) => input !== null && input.checked)
      .map((input) => input!.value);
  };

  const { selectedRow, toggleRowSelection, resetSelection } =
    useSingleRowData<SmsTelList>("mbtlNo");

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
    useRadioGroup("S");
  const { selectedValue: radioValue2, handleRadioChange: setRadioValue2 } =
    useRadioGroup("S");
  const { selectedValue: radioValue3, handleRadioChange: setRadioValue3 } =
    useRadioGroup("S");

  // <------------------------------- API ------------------------------->

  const { data: basicMessage, refetch: basicRefetch } = useGetSmsBase({
    smsSeCd: smsSeCd,
  }); // 자동문자 기본 메세지
  const { data: numberList } = useCrtfcList({ cid: "" }); // 발신번호 리스트
  const { data: autoGet } = useGetSmsMng(); // 자동문자 발송 조회
  const { data: smstelList, refetch: refetchTelList } = useGetSmsTelList(); // 발송대상 목록
  const { data: commonCode } = useGetCommonCode({ upCd: "1009000" });

  const { mutate: postSmsTel } = usePostSmsTel();
  const { mutate: putSmsTel } = usePutSmsTel();
  const { mutate: deleteSmsTel } = useDeleteSmsTel();
  const { mutate: saveAll } = usePostSmsAutoSave();

  const { mutate: testMsg } = useSendTestMsg();
  const { mutate: testYnMsg } = useSendTestMsgYn();

  const { loginId } = useAuthStore(["loginId"]);

  const checkApiFail = useApiRes();

  // 시간
  const {
    selectListData: sd_1,
    selectValue: s_1,
    handleChange: o_1,
  } = useSelect(commonCode?.data?.contents, "cd", "cdNm", "1009005");

  const {
    selectListData: sd_2,
    selectValue: s_2,
    handleChange: o_2,
  } = useSelect(commonCode?.data?.contents, "cd", "cdNm", "1009005");

  const {
    selectListData: sd_3,
    selectValue: s_3,
    handleChange: o_3,
  } = useSelect(commonCode?.data?.contents, "cd", "cdNm", "1009005");

  // 발신번호 목록
  const {
    selectListData: sd_0,
    selectValue: dsptchNo,
    handleChange: o_0,
  } = useSelect(
    numberList?.data?.contents,
    "cid",
    "cid",
    numberList?.data?.contents[0].cid
  );

  // 새로고침
  const refresh = () => {
    refetchTelList();
    setValue("mbtlNo", "");
    setValue("cstmrNm", "");
    resetSelection();
  };

  // 등록
  const onPost = () => {
    postSmsTel(
      {
        body: {
          sptNo: sptNo,
          userId: loginId,
          mbtlNo: getValues("mbtlNo"),
          cstmrNm: getValues("cstmrNm"),
        },
      },
      {
        onSuccess: (res) => {
          console.log("업로드 결과:", res);
          const result = checkApiFail(res);
          if (result.data.message === "SUCCESS") {
            console.log("업로드 성공:", res);
            openModal(BasicCompletedModl, {
              modalId: "excelComplete",
              stack: true,
              onClose: () => closeModal,
            });
            refresh();
          }
        },
      }
    );
  };

  // // 수정
  const onPut = () => {
    if (!selectedRow) return;
    putSmsTel(
      {
        body: {
          sptNo: sptNo,
          userId: loginId,
          mbtlNo: getValues("mbtlNo"),
          cstmrNm: getValues("cstmrNm"),
          recptnNo: selectedRow.recptnNo,
        },
      },
      {
        onSuccess: (res) => {
          console.log("수정 결과:", res);
          const result = checkApiFail(res);
          if (result.data.message === "SUCCESS") {
            console.log("수정 성공:", res);
            openModal(BasicCompletedModl, {
              modalId: "excelComplete",
              stack: true,
              onClose: () => closeModal,
            });
            refresh();
          }
        },
      }
    );
  };

  const onClickSave = () => {
    if (selectedRow) {
      onPut();
    } else {
      onPost();
    }
  };

  // 삭제
  const onDelete = () => {
    if (!selectedRow) return;
    openModal(MultipleDeleteModal, {
      number: 1,
      stack: true,
      onClose: () => closeModal,
      onSubmit: () => {
        deleteSmsTel(
          {
            body: {
              sptNo: sptNo,
              userId: loginId,
              recptnNo: selectedRow.recptnNo,
            },
          },
          {
            onSuccess: (res) => {
              console.log("삭제 결과:", res);
              const result = checkApiFail(res);
              if (result.data.message === "SUCCESS") {
                console.log("삭제 성공:", res);
                openModal(BasicCompletedModl, {
                  modalId: "deleteComplete",
                  stack: true,
                  onClose: () => closeModal,
                });
                refresh();
              }
            },
          }
        );
      },
    });
  };

  const onClickAutoBasic = (smsSeCd) => {
    basicRefetch();
    setSmsSeCd(smsSeCd);
  };

  //  <------------------ 페이지 로드 시 정보 바인딩 ------------------>
  const enable = useRef(true);
  const smsSeCdList = [autoKey, yKey, nKey, noneKey];
  const [resetValues, setResetValues] = useState({});

  const mySmsQuery = useQueries({
    queries: smsSeCdList.map((smsSeCd) => ({
      queryKey: ["/api/smsbass/auto", smsSeCd],
      queryFn: () => API.getSmsBase({ smsSeCd }),
      enable: enable.current,
    })),
  });

  const responses = useMemo(() => {
    return mySmsQuery.map((query) => query.data?.data);
  }, [mySmsQuery]);

  useEffect(() => {
    if (!responses[0]) return;
    if (!enable.current) return;
    if (responses[0]) {
      enable.current = false;

      const findMessage = (responses, key) => {
        return convertBrToNewLine(
          responses.find((item) => item?.contents.smsSeCd === key)?.contents
            .mssage || ""
        );
      };

      const autoMessage = findMessage(responses, autoKey);
      const Ymessage = findMessage(responses, yKey);
      const Nmessage = findMessage(responses, nKey);
      const noneMessage = findMessage(responses, noneKey);

      setResetValues({
        autoMessage,
        Ymessage,
        Nmessage,
        noneMessage,
      });
    }
  }, [responses, enable, reset]);

  useEffect(() => {
    reset({ ...getValues(), ...resetValues });
  }, [resetValues]);

  //  <------------------------------------------------------>

  // 기본메시지 버튼을 클릭했을 때 query 호출
  useEffect(() => {
    if (!smsSeCd) return;

    const message = convertBrToNewLine(
      basicMessage?.data?.contents?.mssage || ""
    );

    const updatedValues = {
      autoKey: { autoMessage: message },
      yKey: { Ymessage: message },
      nKey: { Nmessage: message },
      noneKey: { noneMessage: message },
    };

    reset({ ...getValues(), ...updatedValues[smsSeCd] });
  }, [smsSeCd, basicMessage]);

  // 매크로 데이터가 불러져오면 매크로 정보만 바인딩 함
  useEffect(() => {
    if (autoGet?.data.contents) {
      setValue("macro", convertBrToNewLine(autoGet.data.contents.mssage));
    }
  }, [autoGet]);

  useEffect(() => {
    if (!selectedRow) {
      setValue("mbtlNo", "");
      setValue("cstmrNm", "");
      return;
    }

    setValue("mbtlNo", selectedRow.mbtlNo);
    setValue("cstmrNm", selectedRow.cstmrNm);
  }, [selectedRow]);

  const { openModal, closeModal } = useModal();

  const openTelModal = ({ smsKnd, mssage, isYnMsg }) => {
    openModal(TelInput, {
      stack: true, //단일 모달 모드
      onClose: () => closeModal,
      smsKnd: smsKnd,
      mssage: mssage,
      trnsmitTxt: "",
      dsptchNo: dsptchNo,
      mutate: isYnMsg ? testYnMsg : testMsg,
    });
  };

  const onSaveAll = () => {
    const checkedValues = getCheckedValues().filter((value) => {
      const input = inputRefs.current.find((ref) => ref?.value === value);
      return input?.checked;
    });

    const smsTMZonList = checkedValues.map((item) => ({
      sptNo: sptNo,
      tmZon: item,
    }));

    const body = {
      sptNo: sptNo,
      mssage: getValues("autoMessage").replace(/\n/g, "<br>"),
      dsptchNo: dsptchNo,
      dsptchBgnde: getFormattedDate(startDate),
      dsptchEndde: getFormattedDate(endDate),
      userId: loginId,
      smsBassList: [
        {
          sptNo: sptNo,
          smsSeCd: yKey,
          smsKnd: radioValue,
          mssage: getValues("Ymessage").replace(/\n/g, "<br>"),
          recptnTm: receive ? s_1 : "",
          useYn: receive ? "Y" : "N",
          userId: loginId,
        },
        {
          sptNo: sptNo,
          smsSeCd: nKey,
          smsKnd: radioValue2,
          mssage: getValues("Nmessage").replace(/\n/g, "<br>"),
          recptnTm: out ? s_2 : "",
          useYn: out ? "Y" : "N",
          userId: loginId,
        },
        {
          sptNo: sptNo,
          smsSeCd: noneKey,
          smsKnd: radioValue3,
          mssage: getValues("noneMessage").replace(/\n/g, "<br>"),
          recptnTm: none ? s_3 : "",
          useYn: none ? "Y" : "N",
          userId: loginId,
        },
      ],
      smsTMZonList: smsTMZonList,
    };

    saveAll(
      {
        body: body,
      },
      {
        onSuccess: (res) => {
          console.log("저장 결과:", res);
          const result = checkApiFail(res);
          if (result.data.message === "SUCCESS") {
            console.log("저장 성공:", res);
            openModal(BasicCompletedModl, {
              modalId: "complete",
              stack: true,
              onClose: () => closeModal,
            });
            refresh();
          }
        },
      }
    );
  };

  return (
    <>
      <Stack width={"100%"} height={"100%"} gap={1}>
        <GrayBox gap={1}>
          <BasicButton sx={{ marginLeft: "auto" }}>
            불법스팸 방지관련법
          </BasicButton>
          <BasicButton onClick={onSaveAll}>저장</BasicButton>
        </GrayBox>

        <TableBox gap={2} marginTop={1}>
          <Stack
            width={"30%"}
            minWidth={"350px"}
            height={"100%"}
            gap={5}
            border="1px solid #E5E5E5"
            borderRadius="8px"
            padding={2}
          >
            {/* 자동문자 발송메세지 */}
            <Stack gap={1} margin={1}>
              <CenteredBox>
                <Typography variant="h3">자동문자 발송메시지</Typography>
                <BasicButton
                  sx={{ marginLeft: "auto" }}
                  onClick={() => {
                    onClickAutoBasic("1008005");
                  }}
                >
                  기본메시지
                </BasicButton>
              </CenteredBox>
              <Controller
                name="autoMessage"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextArea
                    {...field}
                    maxBytes={80}
                    height="130px"
                    resize="none"
                    placeholder="자동문자 메시지를 입력하세요"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
            </Stack>
            {/* 발신번호 */}
            <Stack gap={2} margin={1}>
              <Typography variant="h3">발신번호</Typography>
              <CenteredBox>
                <Select selectData={sd_0} value={dsptchNo} onChange={o_0} />
                <IconButton sx={{ color: "root.mainBlue" }}>
                  <IoSettingsOutline />
                </IconButton>
                <BasicButton
                  onClick={() => {
                    openTelModal({
                      mssage: getValues("autoMessage"),
                      smsKnd: "S",
                      isYnMsg: false,
                    });
                  }}
                >
                  실험발송
                </BasicButton>
              </CenteredBox>
            </Stack>
            {/* 발송일시 */}
            <Stack gap={2} margin={1}>
              <Typography variant="h3">발송일시</Typography>
              <CenteredBox gap={1}>
                <Typography>기간</Typography>
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
            </Stack>

            <Stack gap={2} margin={1}>
              <Typography variant="h3">매크로</Typography>
              <Controller
                name="macro"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextArea
                    {...field}
                    height="130px"
                    resize="none"
                    placeholder="매크로를 입력하세요"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
            </Stack>
          </Stack>

          {/* 중앙 테이블 영역 */}
          <Stack
            width={"30%"}
            minWidth={"350px"}
            height={"100%"}
            gap={2}
            border="1px solid #E5E5E5"
            borderRadius="8px"
          >
            <TableBox height="80%">
              <TableBox.Inner>
                <BasicTable data={smstelList?.data?.contents}>
                  <BasicTable.Th radius>휴대전화</BasicTable.Th>
                  <BasicTable.Th radius>고객정보</BasicTable.Th>
                  <BasicTable.Tbody>
                    {smstelList?.data?.contents?.map((item, index) => {
                      return (
                        <BasicTable.Tr
                          key={index}
                          isClicked={selectedRow?.mbtlNo === item.mbtlNo}
                          onClick={() => toggleRowSelection(item)}
                        >
                          <BasicTable.Td>{item.mbtlNo}</BasicTable.Td>
                          <BasicTable.Td>{item.cstmrNm}</BasicTable.Td>
                        </BasicTable.Tr>
                      );
                    })}
                  </BasicTable.Tbody>
                </BasicTable>
              </TableBox.Inner>
            </TableBox>
            <GrayBox
              height={"30%"}
              border="1px solid #E5E5E5"
              borderRadius="8px"
            >
              <Stack gap={1} width={"100%"}>
                <CenteredBox gap={1}>
                  <Typography variant="h3">발송대상</Typography>
                  <BasicButton sx={{ marginLeft: "auto" }} onClick={refresh}>
                    새로고침
                  </BasicButton>
                  <BasicButton onClick={onClickSave}>저장</BasicButton>
                  <BasicButton onClick={onDelete}>삭제</BasicButton>
                </CenteredBox>
                <Typography>휴대전화</Typography>
                <PhoneInput {...register("mbtlNo")} />
                <Typography>고객정보</Typography>
                <BasicInput {...register("cstmrNm")} />
              </Stack>
            </GrayBox>
          </Stack>

          {/* 오른쪽 수신동의 고객 확인 문자 영역 */}
          <Stack
            width={"40%"}
            minWidth={"400px"}
            height={"100%"}
            gap={2}
            border="1px solid #E5E5E5"
            borderRadius="8px"
            paddingLeft={2}
            paddingRight={2}
          >
            <Typography variant="h3" marginTop={3} marginBottom={3}>
              수신동의 고객 확인 문자
            </Typography>
            {/* 수신 동의 고객 */}
            <ToggleButton
              checked={receive}
              onChange={receiveToggle}
              label="수신 동의 고객"
            />
            <CenteredBox gap={1}>
              <Select
                sx={{ width: "200px" }}
                selectData={sd_1}
                value={s_1}
                onChange={o_1}
                disabled={!receive}
              />
              <BasicButton
                sx={{ marginLeft: "auto" }}
                onClick={() => {
                  openTelModal({
                    smsKnd: radioValue,
                    mssage: getValues("Ymessage"),
                    isYnMsg: true,
                  });
                }}
              >
                실험발송
              </BasicButton>
              <BasicButton
                onClick={() => {
                  onClickAutoBasic("1008010");
                }}
              >
                기본메시지
              </BasicButton>
            </CenteredBox>
            <Controller
              name="Ymessage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  {...field}
                  height="100px"
                  resize="none"
                  placeholder="메세지를 입력하세요"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <CenteredBox>
              <RadioGroup value={radioValue} onChange={setRadioValue} row>
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
                selectData={sd_2}
                value={s_2}
                onChange={o_2}
                disabled={!out}
              />
              <BasicButton
                sx={{ marginLeft: "auto" }}
                onClick={() => {
                  openTelModal({
                    smsKnd: radioValue2,
                    mssage: getValues("Nmessage"),
                    isYnMsg: true,
                  });
                }}
              >
                실험발송
              </BasicButton>
              <BasicButton
                onClick={() => {
                  onClickAutoBasic("1008015");
                }}
              >
                기본메시지
              </BasicButton>
            </CenteredBox>
            <Controller
              name="Nmessage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  {...field}
                  height="100px"
                  resize="none"
                  placeholder="메세지를 입력하세요"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <CenteredBox>
              <RadioGroup value={radioValue2} onChange={setRadioValue2} row>
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
                selectData={sd_3}
                value={s_3}
                onChange={o_3}
                disabled={!none}
              />
              <BasicButton
                sx={{ marginLeft: "auto" }}
                onClick={() => {
                  openTelModal({
                    smsKnd: radioValue3,
                    mssage: getValues("noneMessage"),
                    isYnMsg: true,
                  });
                }}
              >
                실험발송
              </BasicButton>
              <BasicButton
                onClick={() => {
                  onClickAutoBasic("1008020");
                }}
              >
                기본메시지
              </BasicButton>
            </CenteredBox>
            <Controller
              name="noneMessage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  {...field}
                  height="100px"
                  resize="none"
                  placeholder="메세지를 입력하세요"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              )}
            />
            <CenteredBox>
              <RadioGroup value={radioValue3} onChange={setRadioValue3} row>
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
              </RadioGroup>
            </CenteredBox>
          </Stack>
        </TableBox>
      </Stack>
    </>
  );
}
