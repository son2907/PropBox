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
import { useMemo, useRef, useState } from "react";
import BasicInput from "../../../../components/Input/BasicInput";
import TextArea from "../../../../components/TextArea/TextArea";
import { Select } from "../../../../components/Select";
import { tableTestData } from "../../../../utils/testData";
import useSelect from "../../../../hooks/useSelect";
import CenteredBox from "../../../../components/Box/CenteredBox";
import { IoSettingsOutline } from "react-icons/io5";
import Calendar from "../../../../components/Calendar/Calendar";
import { useRadioGroup } from "../../../../hooks/useRadioGroup";
import { openPopup } from "../../../../utils/openPopup";
import PathConstants from "../../../../routers/path";
import useModal from "../../../../hooks/useModal";
import { FileModal } from "../../../../components/layout/modal/FIleModal";
import {
  useGetCidList,
  useMsgList,
  useMsgOneList,
  useRejectAd,
} from "../../../../api/callMessage";
import { useForm } from "react-hook-form";
import BasicTable from "../../../../components/Table/BasicTable";
import { useSingleRowData } from "../../../../hooks/useTest";

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
  const { selectedRow: sr, toggleRowSelection: tr } =
    useSingleRowData("saveNo");

  // <------------------------ api 최초 데이터 로드 ------------------------>
  // 발신번호 목록
  const { data: crtfcListAPi } = useGetCidList();
  // 광고문자의 수신 거부 번호
  const { data: rejectAd, refetch: refetchAd } = useRejectAd();
  // 우측 상단 테이블
  const { data: msgList } = useMsgList();

  // 우측 하단 테이블
  const { data: msgDetList } = useMsgOneList({ saveNo: sr?.saveNo });
  console.log("상단 테이블:", msgList);
  console.log("상세 테이블:", msgDetList);

  // 초깃값
  const defaultValues = useMemo(
    () => ({
      sj: "",
      content: "",
      regYn: true,
      interval: false,
      consume: "60",
      intervalTime: "0.5",
      doAd: false,
      adString: "",
    }),
    []
  );

  const { register } = useForm<Register>({ defaultValues });
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { selectedValue: radioValue, handleRadioChange: setRadioValue } =
    useRadioGroup("sms");

  const { selectedValue: radioValue2, handleRadioChange: setRadioValue2 } =
    useRadioGroup("");

  const [fileNames, setFileNames] = useState<string>("");
  const { openModal, closeModal } = useModal();

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

  const onDeleteFile = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setFileNames("");
    }
  };

  console.log("선택한 값:", selectValue);
  return (
    <Box padding={2} bgcolor={"white"} height={"100%"} width={"100%"}>
      <GrayBox height="40px">
        <BasicButton sx={{ marginLeft: "auto" }}>전송</BasicButton>
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
            <BasicInput placeholder="내용 입력" />
            <TextArea height="150px" resize="none" maxBytes={80} />

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
              <Box width={"78%"}>
                <Calendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </Box>
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
                <input type="checkbox" {...register("doAd")} />
                <Typography>광고문자</Typography>
              </label>
              <BasicInput sx={{ width: "100%" }} {...register("adString")} />
              <BasicButton
                onClick={() => {
                  refetchAd();
                }}
              >
                번호 삽입
              </BasicButton>
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
            <BasicButton sx={{ marginLeft: "auto" }}>
              현재 메시지 저장
            </BasicButton>
            <BasicButton>삭제</BasicButton>
          </CenteredBox>
          <Box height={"35%"} width={"100%"} overflow={"auto"}>
            <BasicTable data={msgList?.data.contents}>
              <BasicTable.Th>메시지</BasicTable.Th>
              <BasicTable.Th> </BasicTable.Th>
              <BasicTable.Th> </BasicTable.Th>
              <BasicTable.Th>구분</BasicTable.Th>

              <BasicTable.Tbody>
                {msgList?.data.contents.map((item) => (
                  <BasicTable.Tr
                    key={item.saveNo}
                    isClicked={sr?.saveNo === item.saveNo}
                    onClick={() => tr(item)}
                  >
                    <BasicTable.Td>{item.saveNo}</BasicTable.Td>
                    <BasicTable.Td>{item.mssage}</BasicTable.Td>
                    <BasicTable.Td>{item.sptNo}</BasicTable.Td>
                    <BasicTable.Td>{item.userNo}</BasicTable.Td>
                  </BasicTable.Tr>
                ))}
              </BasicTable.Tbody>
            </BasicTable>
          </Box>

          <CenteredBox padding={2} gap={1}>
            <Typography fontWeight={"bold"}>매크로</Typography>
          </CenteredBox>
          <Box height={"30%"} width={"100%"} overflow={"auto"}>
            <BasicTable data={tableTestData}>
              <BasicTable.Th>매크로</BasicTable.Th>
              <BasicTable.Th>실제 변환 예제</BasicTable.Th>
              <BasicTable.Tbody>
                {tableTestData.map((item) => (
                  <BasicTable.Tr key={item.id} id={item.id}>
                    <BasicTable.Td>{item.name}</BasicTable.Td>
                    <BasicTable.Td>{item.name}</BasicTable.Td>
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
