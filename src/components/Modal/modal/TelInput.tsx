import { Stack, Typography } from "@mui/material";
import CenteredBox from "../../Box/CenteredBox";
import PhoneInput from "../../Input/PhoneInput";
import { useForm } from "react-hook-form";
import GrayBox from "../../Box/GrayBox";
import { BasicButton, IconButton } from "../../Button";
import ModalBox from "..";
import { IoMdClose } from "react-icons/io";
import { useSendTestMsg } from "../../../api/messageAuto";
import { useSptStore } from "../../../stores/sptStore";
import useModal from "../../../hooks/useModal";
import { BasicCompletedModl } from "./BasicCompletedModl";
import { useApiRes } from "../../../utils/useApiRes";

interface TelInputType {
  onClose: () => void;
  smsKnd: string;
  mssage: string;
  trnsmitTxt: string;
  dsptchNo: string;
}
export default function TelInput({
  smsKnd,
  mssage,
  trnsmitTxt,
  dsptchNo,
  onClose,
}: TelInputType) {
  const { register, getValues } = useForm({
    defaultValues: {
      mbtlNo: "",
    },
  });

  const { mutate: sendTestMsg } = useSendTestMsg();
  const { sptNo } = useSptStore();
  const checkApiFail = useApiRes();
  const { openModal, closeModal } = useModal();

  const onSend = () => {
    const param = {
      sptNo: sptNo,
      smsKnd: smsKnd,
      mssage: mssage,
      trnsmitTxt: trnsmitTxt,
      mbtlNo: getValues("mbtlNo"),
      dsptchNo: dsptchNo,
    };

    sendTestMsg(
      {
        body: {
          param,
        },
      },
      {
        onSuccess: (res) => {
          console.log("발송 결과:", res);
          const result = checkApiFail(res);
          if (result.data.message === "SUCCESS") {
            console.log("발송 성공:", res);
            openModal(BasicCompletedModl, {
              modalId: "complete",
              stack: false,
              onClose: () => closeModal,
            });
          }
        },
      }
    );
  };

  return (
    <ModalBox width={"500px"}>
      <CenteredBox
        width="100%"
        height="50px"
        bgcolor={"modal.moadlBlueBg"}
        padding={2}
      >
        <Typography variant="h4">실험 발송 전화번호 입력</Typography>
        <IconButton onClick={onClose} sx={{ marginLeft: "auto" }}>
          <IoMdClose />
        </IconButton>
      </CenteredBox>
      <Stack width={"100%"} bgcolor={"primary.light"}>
        <CenteredBox width={"100%"} padding={4} gap={4}>
          <Typography variant="h5">전화번호</Typography>
          <PhoneInput
            {...register("mbtlNo")}
            sx={{ marginLeft: "auto" }}
            fullWidth
          />
        </CenteredBox>
        <GrayBox>
          <BasicButton sx={{ marginLeft: "auto" }} onClick={onSend}>
            발송
          </BasicButton>
        </GrayBox>
      </Stack>
    </ModalBox>
  );
}
