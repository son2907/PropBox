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
  useDeleteCrtfc,
  useOkcertToken,
  usePostCrtfc,
  useSaveCrtfc,
} from "../../../../api/crtfc";
import { useForm } from "react-hook-form";
import useDidMountEffect from "../../../../hooks/useDidMountEffect";
import { useApiRes } from "../../../../utils/useApiRes";
import { filterDataByValues } from "../../../../utils/filterDataByValues";
import useModal from "../../../../hooks/useModal";
import { ConfirmMultipleDeletionModal } from "../../../../components/Modal/modal/ConfirmMultipleDeletionModal";
import { useSptStore } from "../../../../stores/sptStore";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface FormData {
  eno: string;
  cid: string;
  sj: string;
}

export default function RegisterSenerNumber() {
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  const { selectedValue: rv, handleRadioChange: srv } = useRadioGroup("Y");
  const { selectedValue: rv2, handleRadioChange: srv2 } = useRadioGroup("S");
  const { register, getValues, reset } = useForm({
    defaultValues: {
      eno: "",
      cid: "",
      sj: "",
    },
  });
  const checkApiFail = useApiRes();

  const { timeRemaining, startTimer, resetTimer, formatTime } =
    useCountdownTimer(600); // 10분(600초)로 타이머 설정

  const cid =
    JSON.parse(document.getElementById("cidValue")?.textContent || "{}")?.cid ||
    "";

  const onRerefresh = () => {
    reset();
  };
  const { sptNo } = useSptStore();

  const { data: crtfcListAPi, refetch: refetchCrtfc } = useCrtfcList({ cid }); // 테이블 리스트
  const { mutate: postCrtfc } = usePostCrtfc(); // 인증 요청
  const { mutate: saveCrtfc } = useSaveCrtfc(); // 발신번호 저장
  const { mutate: deleteCrtfc } = useDeleteCrtfc(); // 발신번호 삭제
  const { data: checkCrtfc, refetch } = useCrtfcCheck({
    eno: getValues("eno"),
    cid: getValues("cid"),
  }); // 인증번호 확인

  const { data: certToken, refetch: okCert } = useOkcertToken({
    returnUrl:
      "http://211.228.124.210:4080/call/consultation/register-sender-number",
  });

  // 인증 요청
  const onPostCrtfc = () => {
    startTimer();
    postCrtfc(
      {
        body: {
          cid: getValues("cid"),
          commUseYn: rv,
          sj: getValues("sj"),
          seCd: rv2,
        },
      },
      {
        onSuccess: (res) => {
          console.log("등록 응답:", res);
          checkApiFail(res);
        },
      }
    );
  };

  // 인증번호 확인
  const checkCrtfcBtn = () => {
    refetch();
  };

  // 발신 번호 저장
  const onSaveCrtfc = () => {
    saveCrtfc(
      {
        body: {
          sptNo: sptNo,
          cid: getValues("cid"),
          sj: getValues("sj"),
          eno: getValues("eno"),
          commUseYn: rv,
        },
      },
      {
        onSuccess: (res) => {
          console.log("저장 응답:", res);
          checkApiFail(res);
          refetchCrtfc();
        },
      }
    );
  };

  const { openModal, closeModal } = useModal();

  const onDeleteCrtfcs = () => {
    const data = filterDataByValues({
      data: crtfcListAPi?.data.contents,
      key: "cid",
      values: Array.from(selectedRows),
    });
    const itemCount = data.length;
    openModal(ConfirmMultipleDeletionModal, {
      modalId: "deleteCids",
      stack: false,
      itemCount,
      onClose: () => closeModal,
      onSubmit: () => {
        handleDelete(data);
      },
    });
  };

  const handleDelete = (data) => {
    data.map((item) => {
      deleteCrtfc(
        {
          body: {
            sptNo: sptNo,
            cid: item.cid,
          },
        },
        {
          onSuccess: (res) => {
            console.log("삭제 응답:", res);
            checkApiFail(res);
            refetchCrtfc();
          },
        }
      );
    });
  };

  useDidMountEffect(() => {
    if (checkCrtfc?.data.message == "SUCCESS") {
      resetTimer();
    }
  }, [checkCrtfc]);

  const onVertify = async () => {
    try {
      // 1. okCert() 함수를 호출하여 필요한 데이터 가져오기
      const res = await okCert();
      console.log("opCert 결과:", res);

      const mdlTkn = res?.data?.data?.contents?.mdlTkn;
      const rsltCd = res?.data?.data?.contents?.rsltCd;

      if (!mdlTkn || !rsltCd) {
        throw new Error("필수 데이터가 없습니다.");
      }

      const params = new URLSearchParams();
      params.append(
        "tc",
        "kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd"
      );
      params.append("cp_cd", rsltCd);
      params.append("mdl_tkn", mdlTkn);

      const response = await axios.post(
        "https://safe.ok-name.co.kr/CommonSvl",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=euc-kr", // 올바른 Content-Type 설정
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("인증 요청 중 오류 발생:", error);
      alert("인증 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const [mdl_tkn, setMdlTkn] = useState<string>("");
  const [cp_CD, setCpCd] = useState<string>("");

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    formRef.current?.submit();
  };

  useEffect(() => {
    console.log("결과:", certToken);
    if (certToken?.data.code == 200) {
      setMdlTkn(certToken.data.contents.mdlTkn);
      setCpCd(certToken.data.contents.rsltCd);
    }
  }, [certToken]);

  return (
    <Stack width={"100%"} height={"100%"}>
      <form
        action="https://safe.ok-name.co.kr/CommonSvl"
        method="post"
        ref={formRef}
      >
        <input type={"hidden"} name="mdl_tkn" defaultValue={mdl_tkn} />
        <input type={"hidden"} name="cp_cd" defaultValue={cp_CD} />
        <input
          type={"hidden"}
          name="tc"
          defaultValue={
            "kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd"
          }
        />
      </form>
      <div className="hidden" id="cidValue"></div>
      <GrayBox gap={1}>
        <BasicButton
          sx={{ marginRight: "auto" }}
          onClick={handleSubmit}
          type="submit"
        >
          본인인증
        </BasicButton>
        <BasicButton onClick={onRerefresh}>새로고침</BasicButton>
        <BasicButton onClick={onSaveCrtfc}>저장</BasicButton>
        <BasicButton onClick={onDeleteCrtfcs}>삭제</BasicButton>
      </GrayBox>
      <Box width="100%" height="100%" overflow={"hidden"} display={"flex"}>
        <TableBox width="50%">
          <TableBox.Inner>
            <CheckboxTable
              data={crtfcListAPi?.data.contents}
              selectedRows={selectedRows}
              toggleRowsSelection={toggleRowsSelection}
            >
              <CheckboxTable.Thead>
                <CheckboxTable.Tr>
                  <CheckboxTable.CheckboxTh keyName="cid" />
                  <CheckboxTable.Th>제목</CheckboxTable.Th>
                  <CheckboxTable.Th>발신번호</CheckboxTable.Th>
                  <CheckboxTable.Th>등록일</CheckboxTable.Th>
                </CheckboxTable.Tr>
              </CheckboxTable.Thead>
              <CheckboxTable.Tbody>
                {crtfcListAPi?.data.contents.map((item) => (
                  <CheckboxTable.Tr key={item.cid} id={item.cid}>
                    <CheckboxTable.CheckboxTd item={item} keyName="cid" />
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
                value="Y"
                control={<Radio size="small" />}
                label="공유"
              />
              <FormControlLabel
                value="N"
                control={<Radio size="small" />}
                label="나만사용"
              />
            </RadioGroup>
          </CenteredBox>
          <Typography>제목</Typography>
          <BasicInput {...register("sj")} />
          <CenteredBox width={"100%"} gap={2}>
            <Typography>인증방식</Typography>
            <RadioGroup value={rv2} onChange={srv2} row>
              <FormControlLabel
                value="S"
                control={<Radio size="small" />}
                label="SMS인증"
              />
              <FormControlLabel
                value="A"
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
            <BasicInput type="number" {...register("cid")} />
            <BasicButton type="button" onClick={onPostCrtfc}>
              인증요청
            </BasicButton>
          </CenteredBox>

          <Typography>인증번호</Typography>
          <CenteredBox gap={3}>
            <BasicInput type="number" {...register("eno")} />
            <BasicButton type="button" onClick={checkCrtfcBtn}>
              인증확인
            </BasicButton>
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
