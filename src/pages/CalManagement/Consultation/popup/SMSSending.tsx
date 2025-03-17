import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { BasicButton, IconButton } from "../../../../components/Button";
import GrayBox from "../../../../components/Box/GrayBox";
import DeleteBtnInput from "../../../../components/Input/DeleteBtnInput";
import { useEffect, useMemo, useRef, useState } from "react";
import BasicInput from "../../../../components/Input/BasicInput";
import TextArea from "../../../../components/TextArea/TextArea";
import { Select } from "../../../../components/Select";
import useSelect from "../../../../hooks/useSelect";
import CenteredBox from "../../../../components/Box/CenteredBox";
import { IoSettingsOutline } from "react-icons/io5";
import Calendar from "../../../../components/Calendar/Calendar";
import { useRadioGroup } from "../../../../hooks/useRadioGroup";
import { openPopup } from "../../../../utils/openPopup";
import PathConstants from "../../../../routers/path";
import useModal from "../../../../hooks/useModal";
import { FileModal } from "../../../../components/Modal/modal/FIleModal";
import {
  useDeleteMsg,
  useGetCidList,
  useMacroList,
  useMsgList,
  usePostMsg,
  useRejectAd,
  useSendMsg,
} from "../../../../api/callMessage";
import { useForm } from "react-hook-form";
import BasicTable from "../../../../components/Table/BasicTable";
import { useSingleRowData } from "../../../../hooks/useTest";
import { MsgSaveItem } from "../../../../types/callCnslt";
import { useSptStore } from "../../../../stores/sptStore";
import { useApiRes } from "../../../../utils/useApiRes";
import { BasicCompletedModl } from "../../../../components/Modal/modal/BasicCompletedModl";
import { FailModal } from "../../../../components/Modal/modal/FailModal";
import { BasicDeleteConfirmModal } from "../../../../components/Modal/modal/BasicDeleteConfirmModal";

import TimePicker from "../../../../components/TimePicker";
import { getFormatTime } from "../../../../utils/getFormatTime";
import { WarningModal } from "../../../../components/Modal/modal/WarningModal";

interface Register {
  sj: string;
  content: string;
  regYn: boolean;
  interval: boolean;
  consume: string;
  intervalTime: string;
  doAd: boolean;
  adString: string;
}

export default function SMSSending() {
  const [custmrNo, setCustmrNo] = useState<any>("");
  const [cnsltTelno, setCnsltTelno] = useState<any>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { selectedRow: sr, toggleRowSelection: tr } =
    useSingleRowData<MsgSaveItem>("saveNo"); // 윗쪽 테이블 선택한 데이터

  // <------------------------ api 최초 데이터 로드 ------------------------>
  // 발신번호 목록
  const { data: crtfcListAPi } = useGetCidList();
  // 광고문자의 수신 거부 번호
  const { data: rejectAd } = useRejectAd();
  // 우측 상단 테이블
  const { data: msgList, refetch: msgListRefetch } = useMsgList();
  // 매크로 테이블
  const { data: macroList } = useMacroList({ cstmrNo: custmrNo });
  // 메세지 저장
  const { mutate: postMsg } = usePostMsg();
  // 메세지 삭제
  const { mutate: deleteMsg } = useDeleteMsg();
  // 메세지 전송
  const { mutate: sendMsg } = useSendMsg();

  useEffect(() => {
    window.opener.postMessage({ type: "REQUEST_INITIAL_DATA" }, "*");

    const receiveMessage = (event: MessageEvent) => {
      console.log("응답:", event.data);
      if (
        event.data &&
        typeof event.data === "object" &&
        "message" in event.data
      ) {
        const { message } = event.data;
        if (message && "cstmrNo" in message) {
          setCustmrNo(message.cstmrNo);
        }
        if (message && "cnsltTelno" in message) {
          setCnsltTelno(message.cnsltTelno);
        }
      }
    };

    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, []);

  // 초깃값
  const defaultValues = useMemo(
    () => ({
      sj: "",
      content: "",
      regYn: false,
      interval: false,
      consume: "60",
      intervalTime: "0.5",
      doAd: false,
      adString: "",
    }),
    []
  );

  useEffect(() => {
    reset({ adString: rejectAd?.data.contents });
  }, [rejectAd]);

  const { register, reset, getValues, setValue } = useForm<Register>({
    defaultValues,
  });
  const inputRef = useRef<HTMLInputElement>(null); // 파일 담을 ref

  const popup = {
    url: PathConstants.Message.Preview,
    windowName: "전송대상 미리보기",
  };

  const preview = () => {
    openPopup(popup);
  };

  const { selectListData, selectValue, handleChange } = useSelect(
    crtfcListAPi?.data.contents,
    "cid",
    "cid"
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); //날짜
  const [selectedTime, setSelectedTime] = useState(Date.now()); // 시간

  const {
    selectedValue: radioValue,
    handleRadioChange: setRadioValue,
    setSelectedValue: setDirectRadioValue,
  } = useRadioGroup("S");

  const { selectedValue: radioValue2, handleRadioChange: setRadioValue2 } =
    useRadioGroup("");

  const [fileNames, setFileNames] = useState<string>("");
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (inputRef.current?.files?.length) {
      setDirectRadioValue("M"); // 파일이 하나라도 있으면 MMS
    }
  }, [inputRef.current?.files]);

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

  const { sptNo, sptNm } = useSptStore();
  const checkApiFail = useApiRes();

  // 추가
  const onPostMsg = () => {
    if (!textAreaRef.current?.value) return;
    postMsg(
      {
        body: {
          saveNo: "",
          sptNo: sptNo,
          commUseYn: "N",
          mssage: textAreaRef?.current?.value || "",
          advYn: getValues("doAd") ? "Y" : "N",
          advTxt: getValues("adString"),
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
          msgListRefetch();
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

  //문자 삭제
  const onDeleteMsg = () => {
    if (!sr?.saveNo) return;

    openModal(BasicDeleteConfirmModal, {
      modalId: "deleteMsg",
      stack: false, //단일 모달 모드
      onClose: () => closeModal,
      onSubmit: () => {
        deleteMsg(
          { saveNo: sr?.saveNo },
          {
            onSuccess: (res) => {
              console.log("삭제:", res);
              const result = checkApiFail(res);
              if (result.data.message === "SUCCESS") {
                console.log("삭제 성공:", res);
                openModal(BasicCompletedModl, {
                  modalId: "complete",
                  stack: false,
                  onClose: () => closeModal,
                });
              }
              msgListRefetch();
              if (!textAreaRef.current) return;
              textAreaRef.current.value = "";
            },
          }
        );
      },
    });
  };

  console.log(
    `${selectedDate.toISOString().split("T")[0]} ${getFormatTime(selectedTime)}`
  );

  // 문자 전송
  const sendMsgBtn = () => {
    const file = inputRef.current?.files?.[0];
    if (!selectValue) {
      openModal(WarningModal, {
        message: "발신번호를 선택하십시오.",
        onClose: () => closeModal,
      });
      return;
    }

    if (!custmrNo || !cnsltTelno) {
      openModal(WarningModal, {
        message: "문자를 전송할 고객 정보가 선택되지 않았습니다.",
        onClose: () => closeModal,
      });
      return;
    }

    if (!getValues("sj")) {
      openModal(WarningModal, {
        message: "제목이 누락되었습니다.",
        onClose: () => closeModal,
      });
      return;
    }

    if (!textAreaRef?.current?.value) {
      openModal(WarningModal, {
        message: "내용이 없습니다.",
        onClose: () => closeModal,
      });
      return;
    }

    const requestBody = {
      sptNo: sptNo,
      cstmrNo: custmrNo,
      smsKnd: radioValue,
      subject: getValues("sj"),
      mssage: textAreaRef?.current?.value || "",
      trnsmitTxt: getValues("regYn")
        ? `${selectedDate.toISOString().split("T")[0]} ${getFormatTime(selectedTime)}`
        : "", // 예약이 아닐 경우 공백으로
      adYn: getValues("doAd") ? "Y" : "N",
      mbtlNo: cnsltTelno,
      dsptchNo: selectValue,
    };

    const formData = new FormData();
    formData.append("param", JSON.stringify(requestBody));
    if (file) formData.append("file", file);

    sendMsg(
      {
        body: formData,
      },
      {
        onSuccess: (res) => {
          console.log("onSuccess:", res);
          const result = checkApiFail(res);
          if (result.data.message === "SUCCESS") {
            console.log("전송 성공:", res);
            openModal(BasicCompletedModl, {
              modalId: "complete",
              stack: false,
              onClose: () => closeModal,
            });
          }
          msgListRefetch();
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

  const onDeleteFile = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setFileNames("");
    }
  };

  const onAdBtn = () => {
    if (textAreaRef.current && getValues("doAd")) {
      const currentValue = textAreaRef.current.value;
      textAreaRef.current.value =
        "(광고)" +
        `[${sptNm}] ` +
        currentValue +
        " 무료 수신 거부:" +
        getValues("adString");
    }
  };

  const onClickMacro = (value) => {
    if (textAreaRef.current) {
      const cursorPosition = textAreaRef.current.selectionStart;
      const currentValue = textAreaRef.current.value;

      const before = currentValue.substring(0, cursorPosition); // 커서 앞 텍스트
      const after = currentValue.substring(cursorPosition); // 커서 뒤 텍스트
      const newValue = before + value + after;

      textAreaRef.current.value = newValue;
    }
  };

  const onClickMasterTable = (item) => {
    tr(item);
    if (textAreaRef.current) {
      textAreaRef.current.value = item.mssage;
    }
  };

  return (
    <Box padding={2} bgcolor={"white"} height={"100%"} width={"100%"}>
      <GrayBox height="40px">
        <BasicButton sx={{ marginLeft: "auto" }} onClick={sendMsgBtn}>
          전송
        </BasicButton>
      </GrayBox>
      {/* 라디오 버튼 그룹 */}
      <Box display={"flex"} width={"100%"} height={"100%"} marginTop={1}>
        <Box
          display={"flex"}
          width="45%"
          minWidth={"401px"}
          height="calc(100% - 50px)"
        >
          <Stack overflow={"hidden"} marginTop={1} gap={1}>
            <Box display={"flex"} alignItems="center">
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
                <FormControlLabel
                  value="M"
                  control={<Radio size="small" />}
                  label="MMS"
                />
              </RadioGroup>

              <BasicButton
                sx={{ marginLeft: "auto" }}
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.click(); // 파일 선택 창 열기
                  }
                }}
              >
                이미지 선택
              </BasicButton>
            </Box>
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept="image/*"
            />
            <DeleteBtnInput value={fileNames} btnfn={onDeleteFile} />
            {/* 제목 */}
            <Typography display={"inline"}>제목</Typography>
            <BasicInput placeholder="내용 입력" {...register("sj")} />
            <TextArea
              height="150px"
              resize="none"
              maxBytes={80}
              ref={textAreaRef}
            />

            <CenteredBox gap={1}>
              <Typography display="inline" marginRight={2} noWrap>
                발신번호
              </Typography>
              <Select
                value={selectValue}
                selectData={selectListData}
                onChange={handleChange}
                sx={{ width: "250px" }}
              />
              <IconButton
                onClick={() => {
                  openPopup({
                    url: PathConstants.Call.RegisterSenderNumber,
                    windowName: "발신번호 등록",
                    windowFeatures:
                      "width=830,height=480,scrollbars=yes,resizable=yes",
                  });
                }}
                color="primary"
              >
                <IoSettingsOutline />
              </IconButton>
            </CenteredBox>
            <CenteredBox justifyContent={"space-between"}>
              <Typography>전송 대상 : 1명</Typography>
              <Typography> 수신 거부 대상 1명</Typography>
              <Typography> 확정 대상: 1명</Typography>
              <BasicButton onClick={preview}>미리보기</BasicButton>
            </CenteredBox>
            <CenteredBox gap={1}>
              <input type="checkbox" {...register("regYn")} />
              <Typography noWrap display="inline">
                예약전송
              </Typography>
              <Box width={"78%"} gap={1}>
                <Calendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </Box>
              <TimePicker
                time={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            </CenteredBox>
            <CenteredBox>
              <input type="checkbox" {...register("interval")} />
              <Typography noWrap display="inline">
                인터발
              </Typography>
              <Stack width={"50%"} marginLeft={10} gap={1}>
                <RadioGroup
                  value={radioValue2}
                  onChange={setRadioValue2}
                  sx={{ gap: 1 }}
                >
                  <CenteredBox>
                    <FormControlLabel
                      value="duration"
                      control={<Radio size="small" />}
                      label="소요"
                    />
                    <BasicInput
                      sx={{ width: "100px" }}
                      {...register("consume")}
                      disabled
                    />
                    <Typography display="inline" marginLeft={1}>
                      분
                    </Typography>
                  </CenteredBox>
                  <CenteredBox>
                    <FormControlLabel
                      value="interval"
                      control={<Radio size="small" />}
                      label="간격"
                    />
                    <BasicInput
                      sx={{ width: "100px" }}
                      {...register("intervalTime")}
                      disabled
                    />
                    <Typography display="inline" marginLeft={1}>
                      초
                    </Typography>
                  </CenteredBox>
                </RadioGroup>
              </Stack>
            </CenteredBox>
            <CenteredBox gap={1}>
              <label className="whitespace-nowrap">
                <input
                  type="checkbox"
                  {...register("doAd")}
                  onChange={(e) => {
                    setValue("doAd", e.target.checked);
                    onAdBtn(); // 체크박스 상태 변경 시 실행될 함수
                  }}
                />
                <Typography>광고문자</Typography>
              </label>
              <BasicInput sx={{ width: "100%" }} {...register("adString")} />
            </CenteredBox>
          </Stack>
        </Box>
        <Box
          width={"100%"}
          height={"100%"}
          marginLeft={1}
          borderLeft={1}
          borderColor="root.borderPrimary"
          padding={1.5}
        >
          <GrayBox height="40px">
            ● 하단의 메세지를 클릭하면 좌측 메세지 창에 표시됨
          </GrayBox>
          <CenteredBox padding={2} gap={1}>
            <Typography fontWeight={"bold"}>저장 메시지</Typography>
            <BasicButton sx={{ marginLeft: "auto" }} onClick={onPostMsg}>
              현재 메시지 저장
            </BasicButton>
            <BasicButton onClick={onDeleteMsg}>삭제</BasicButton>
          </CenteredBox>
          <Box height={"35%"} width={"100%"} overflow={"auto"}>
            <BasicTable data={msgList?.data?.contents}>
              <BasicTable.Th>메시지</BasicTable.Th>

              <BasicTable.Th> </BasicTable.Th>
              <BasicTable.Th> </BasicTable.Th>
              <BasicTable.Th>구분</BasicTable.Th>

              <BasicTable.Tbody>
                {msgList?.data?.contents?.map((item) => (
                  <BasicTable.Tr
                    key={item.saveNo}
                    isClicked={sr?.saveNo === item.saveNo}
                    onClick={() => {
                      onClickMasterTable(item);
                    }}
                  >
                    <BasicTable.Td>{item.saveNo}</BasicTable.Td>
                    <BasicTable.Td>{item.mssage}</BasicTable.Td>
                    <BasicTable.Td>{item.advTxt}</BasicTable.Td>
                    <BasicTable.Td>{item.commUse}</BasicTable.Td>
                  </BasicTable.Tr>
                ))}
              </BasicTable.Tbody>
            </BasicTable>
          </Box>

          <CenteredBox padding={2} gap={1}>
            <Typography fontWeight={"bold"}>매크로</Typography>
          </CenteredBox>
          <Box height={"30%"} width={"100%"} overflow={"auto"}>
            <BasicTable data={macroList?.data?.contents}>
              <BasicTable.Th>매크로</BasicTable.Th>
              <BasicTable.Th>실제 변환 예제</BasicTable.Th>
              <BasicTable.Tbody>
                {macroList?.data?.contents?.map((item, index) => (
                  <BasicTable.Tr
                    key={index}
                    onDoubleClick={() => {
                      onClickMacro(item.macroDesc);
                    }}
                  >
                    <BasicTable.Td>{item.macroNm}</BasicTable.Td>
                    <BasicTable.Td>{item.macroDesc}</BasicTable.Td>
                  </BasicTable.Tr>
                ))}
              </BasicTable.Tbody>
            </BasicTable>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
