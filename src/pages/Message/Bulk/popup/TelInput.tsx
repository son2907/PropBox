import { Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { UseMutateFunction } from "@tanstack/react-query";
import { useSptStore } from "../../../../stores/sptStore";
import { useApiRes } from "../../../../utils/useApiRes";
import useModal from "../../../../hooks/useModal";
import { BasicCompletedModl } from "../../../../components/Modal/modal/BasicCompletedModl";
import ModalBox from "../../../../components/Modal";
import CenteredBox from "../../../../components/Box/CenteredBox";
import { BasicButton, IconButton } from "../../../../components/Button";
import PhoneInput from "../../../../components/Input/PhoneInput";
import GrayBox from "../../../../components/Box/GrayBox";

interface TelInputType {
  body: {
    smsKnd: string;
    subject: string;
    mssage: string;
    sptNo: string;
    dsptchNo: string;
    adYn: string;
    recptnDt: string;
    recptnTm: string;
    sendDivYn: string;
    sendDivCnt: string;
    sendMinGap: string;
    testYn: string;
    mbtlNo: string;
    grpList: string[];
    notGrpList: string[];
  };
  onClose: () => void;
}
export default function TelInput({ body, onClose }: TelInputType) {
  const { register, getValues } = useForm({
    defaultValues: {
      mbtlNo: "",
    },
  });

  const checkApiFail = useApiRes();
  const { openModal, closeModal } = useModal();

  const onSend = () => {
    // mutate(
    //   {
    //     body: body,
    //   },
    //   {
    //     onSuccess: (res) => {
    //       console.log("발송 결과:", res);
    //       const result = checkApiFail(res);
    //       if (result.data.message === "SUCCESS") {
    //         console.log("발송 성공:", res);
    //         openModal(BasicCompletedModl, {
    //           modalId: "complete",
    //           stack: false,
    //           onClose: () => closeModal,
    //         });
    //       }
    //     },
    //   }
    // );
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
