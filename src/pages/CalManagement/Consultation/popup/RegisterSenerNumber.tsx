import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import GrayBox from "../../../../components/Box/GrayBox";
import { BasicButton } from "../../../../components/Button";
import TableBox from "../../../../components/Box/TableBox";
import CheckboxTable from "../../../../components/Table/CheckboxTable";
import { useMultiRowSelection } from "../../../../hooks/useMultiRowSelection";
import CenteredBox from "../../../../components/Box/CenteredBox";
import { useRadioGroup } from "../../../../hooks/useRadioGroup";
import BasicInput from "../../../../components/Input/BasicInput";
import { MdInfoOutline } from "react-icons/md";
import useCountdownTimer from "../../../../hooks/useCountdownTimer ";
import {
  useCrtfcCheck,
  useCrtfcList,
  usePostCrtfc,
} from "../../../../api/crtfc";
import { useEffect, useRef } from "react";

export default function RegisterSenerNumber() {
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  const { selectedValue: rv, handleRadioChange: srv } = useRadioGroup("onlyMe");

  const { selectedValue: rv2, handleRadioChange: srv2 } = useRadioGroup("ars");

  const { timeRemaining, startTimer, resetTimer, formatTime } =
    useCountdownTimer(600); // 10분(600초)로 타이머 설정

  const cid = (() => {
    try {
      return (
        JSON.parse(document.getElementById("cidValue")?.textContent || "{}")
          .cid || ""
      );
    } catch (e) {
      return "";
    }
  })();

  console.log("cid:", cid);
  const { data: crtfcListAPi } = useCrtfcList({ cid });
  console.log("데이터:", crtfcListAPi);
  console.log("선택:", selectedRows);

  const onRerefresh = () => {
    window.location.reload();
  };

  const enoRef = useRef<HTMLInputElement>(null);
  const cidRef = useRef<HTMLInputElement>(null);

  // 인증 요청
  const { mutate: postCrtfc } = usePostCrtfc();
  const { data: checkCrtfc, refetch } = useCrtfcCheck({
    eno: enoRef.current?.value,
    cid: cid || cidRef.current?.value,
  });

  const reqRfc = () => {
    startTimer();

    postCrtfc(
      {
        body: {
          cid: "01056393818",
          userNo: "1",
          commUseYn: "Y",
          sj: "제목",
          seCd: "S",
          eno: "",
          uid: "",
          callId: "sysmaster",
          resultCode: "",
        },
      },
      {
        onSuccess: (res) => {
          console.log("등록 응답:", res);
          // checkApiFail(res);
          // refetchDet();
        },
      }
    );
  };

  const checkCrtfcBtn = () => {
    refetch();
  };

  useEffect(() => {
    if (checkCrtfc?.data.message == "SUCCESS") {
      console.log("인증 성공");
      resetTimer();
    }
  }, [checkCrtfc]);

  console.log("인증 확인:::", checkCrtfc);

  return (
    <Stack width={"100%"} height={"100%"}>
      <div className="hidden" id="cidValue"></div>
      <GrayBox gap={1}>
        <BasicButton sx={{ marginRight: "auto" }}>본인인증</BasicButton>
        <BasicButton onClick={onRerefresh}>새로고침</BasicButton>
        <BasicButton>저장</BasicButton>
        <BasicButton>삭제</BasicButton>
      </GrayBox>
      <Box width="100%" height="100%" overflow={"hidden"} display={"flex"}>
        <TableBox width="50%">
          <TableBox.Inner>
            <CheckboxTable
              data={crtfcListAPi?.data.contents || []}
              selectedRows={selectedRows}
              toggleRowsSelection={toggleRowsSelection}
            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh keyName="eno" />
                  <CheckboxTable.Th>제목</CheckboxTable.Th>
                  <CheckboxTable.Th>발신번호</CheckboxTable.Th>
                  <CheckboxTable.Th>등록일</CheckboxTable.Th>
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>
              <CheckboxTable.Tbody>
                {crtfcListAPi?.data.contents.map((item) => (
                  <CheckboxTable.Tr key={item.cid} id={item.cid}>
                    <CheckboxTable.CheckboxTd item={item} keyName="eno" />
                    <CheckboxTable.Td>{item.sj}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.cid}</CheckboxTable.Td>
                    <CheckboxTable.Td>{item.regDtm}</CheckboxTable.Td>
                  </CheckboxTable.Tr>
                ))}
              </CheckboxTable.Tbody>
            </CheckboxTable>
          </TableBox.Inner>
        </TableBox>
        <Stack width={"50%"} bgcolor={"white"} padding={2} gap={1}>
          <CenteredBox width={"100%"} gap={2}>
            <Typography>공유</Typography>
            <RadioGroup value={rv} onChange={srv} row>
              <FormControlLabel
                value="everyone"
                control={<Radio size="small" />}
                label="공유"
              />
              <FormControlLabel
                value="onlyMe"
                control={<Radio size="small" />}
                label="나만사용"
              />
            </RadioGroup>
          </CenteredBox>
          <Typography>제목</Typography>
          <BasicInput />
          <CenteredBox width={"100%"} gap={2}>
            <Typography>인증방식</Typography>
            <RadioGroup value={rv2} onChange={srv2} row>
              <FormControlLabel
                value="sms"
                control={<Radio size="small" />}
                label="SMS인증"
              />
              <FormControlLabel
                value="ars"
                control={<Radio size="small" />}
                label="ARS인증"
              />
            </RadioGroup>
          </CenteredBox>
          <BasicInput
            disabled
            startAdornment={<MdInfoOutline />}
            value={`  '-'와 지역 번호를 제외하고 입력하세요.`}
            sx={{ bgcolor: "#EEF2F5" }}
          />
          <Typography>발신번호</Typography>
          <CenteredBox gap={3}>
            <BasicInput type="number" ref={cidRef} />
            <BasicButton onClick={reqRfc}>인증요청</BasicButton>
          </CenteredBox>

          <Typography>인증번호</Typography>
          <CenteredBox gap={3}>
            <BasicInput type="number" ref={enoRef} />
            <BasicButton onClick={checkCrtfcBtn}>인증확인</BasicButton>
          </CenteredBox>

          <CenteredBox gap={3}>
            <Typography>유효시간</Typography>
            <Typography color="primary.main">
              {checkCrtfc?.data.result === "SUCCESS"
                ? "인증이 완료되었습니다."
                : formatTime(timeRemaining)}
            </Typography>
          </CenteredBox>
        </Stack>
      </Box>
    </Stack>
  );
}
