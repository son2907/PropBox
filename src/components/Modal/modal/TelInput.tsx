import { Stack, Typography } from "@mui/material";
import CenteredBox from "../../Box/CenteredBox";
import PhoneInput from "../../Input/PhoneInput";
import { useForm } from "react-hook-form";
import GrayBox from "../../Box/GrayBox";
import { BasicButton, IconButton } from "../../Button";
import ModalBox from "..";
import { IoMdClose } from "react-icons/io";

export default function TelInput({ onClose }: { onClose: () => void }) {
  const { register } = useForm({
    defaultValues: {
      number: "",
    },
  });

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
            {...register("number")}
            sx={{ marginLeft: "auto" }}
            fullWidth
          />
        </CenteredBox>
        <GrayBox>
          <BasicButton sx={{ marginLeft: "auto" }}>발송</BasicButton>
        </GrayBox>
      </Stack>
    </ModalBox>
  );
}
