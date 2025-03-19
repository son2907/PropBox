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
import { useState } from "react";

interface FormData {
  eno: string;
  cid: string;
  sj: string;
}

export default function RegisterSenerNumber() {
  const { selectedRows, toggleRowsSelection } = useMultiRowSelection();

  const { selectedValue: rv, handleRadioChange: srv } = useRadioGroup("Y");
  const { selectedValue: rv2, handleRadioChange: srv2 } = useRadioGroup("S");
  const { register, handleSubmit, getValues, reset } = useForm<FormData>();
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

  const { refetch: okCert } = useOkcertToken({
    returnUrl:
      "http://211.228.124.210:4080/call/consultation/register-sender-number",
  });

  // 인증 요청
  const onPostCrtfc = (data: FormData) => {
    startTimer();
    postCrtfc(
      {
        body: {
          cid: data.cid,
          commUseYn: rv,
          sj: data.sj,
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
  const onSaveCrtfc = (data: FormData) => {
    saveCrtfc(
      {
        body: {
          sptNo: sptNo,
          cid: data.cid,
          sj: data.sj,
          eno: data.sj,
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

  const [mdl_tkn, setMdlTkn] = useState<string>("");
  const [cp_CD, setCpCd] = useState<string>("");

  const submit = async () => {
    const formData = {
      tc: "kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd",
      cp_cd: cp_CD,
      mdl_tkn: mdl_tkn,
      target_id: "",
    };
    try {
      const response = await fetch("https://safe.ok-name.co.kr/CommonSvl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      const popupUrl = `https://safe.ok-name.co.kr/CommonSvl?tc=kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd&cp_cd=${cp_CD}&mdl_tkn=${mdl_tkn}&target_id=`;
      window.open(popupUrl, "okcertPopup");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onVertify = () => {
    okCert().then((res) => {
      console.log("opCert결과:", res);
      const mdlTkn = res?.data?.data.contents.mdlTkn || "";
      const rsltCd = res?.data?.data.contents.rsltCd || "";
      setMdlTkn(mdlTkn);
      setCpCd(rsltCd);
      submit();
      // const popupUrl = `https://safe.ok-name.co.kr/CommonSvl?tc=kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd&cp_cd=${rsltCd}&mdl_tkn=${mdlTkn}&target_id=`;
      // window.open(popupUrl, "okcertPopup", "width=500,height=600");
    });
  };

  return (
    <Stack width={"100%"} height={"100%"}>
      <form action="https://safe.ok-name.co.kr/CommonSvl" method="post">
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
      <form>
        <div className="hidden" id="cidValue"></div>
        <GrayBox gap={1}>
          <BasicButton sx={{ marginRight: "auto" }} onClick={onVertify}>
            본인인증
          </BasicButton>
          <BasicButton onClick={onRerefresh}>새로고침</BasicButton>
          <BasicButton type="button" onClick={handleSubmit(onSaveCrtfc)}>
            저장
          </BasicButton>
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
              <BasicButton type="button" onClick={handleSubmit(onPostCrtfc)}>
                인증요청
              </BasicButton>
            </CenteredBox>

            <Typography>인증번호</Typography>
            <CenteredBox gap={3}>
              <BasicInput type="number" {...register("eno")} />
              <BasicButton type="button" onClick={handleSubmit(checkCrtfcBtn)}>
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
      </form>
    </Stack>
  );
}
