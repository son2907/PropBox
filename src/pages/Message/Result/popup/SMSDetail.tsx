import { IconButton, Stack, Typography } from "@mui/material";
import CenteredBox from "../../../../components/Box/CenteredBox";
import TextArea from "../../../../components/TextArea/TextArea";
import ModalBox from "../../../../components/Modal";
import { IoMdClose } from "react-icons/io";
import { useMsgResultDetail } from "../../../../api/messageResult";

interface smsDetailProps {
  modalId: string;
  msgKnd: string;
  yyyyMm: string;
  idx: number;
  onClose: () => void;
}
export default function SMSDetail({
  msgKnd,
  yyyyMm,
  idx,
  onClose,
}: smsDetailProps) {
  const { data } = useMsgResultDetail({ msgKnd, yyyyMm, idx });

  return (
    <ModalBox width={"500px"}>
      <CenteredBox
        width="100%"
        height="50px"
        bgcolor={"modal.moadlBlueBg"}
        padding={2}
      >
        <Typography variant="h4">SMS 내역 자세히 보기</Typography>
        <IconButton onClick={onClose} sx={{ marginLeft: "auto" }}>
          <IoMdClose />
        </IconButton>
      </CenteredBox>
      <Stack
        width={"100%"}
        height={"100%"}
        bgcolor={"primary.light"}
        gap={2}
        padding={3}
        justifyContent={"center"}
      >
        <CenteredBox>
          <Typography minWidth={"100px"} variant="h5">
            공유
          </Typography>
          <Typography>{data?.data?.contents?.msgKnd}</Typography>
        </CenteredBox>
        <CenteredBox>
          <Typography minWidth={"100px"} variant="h5">
            결과
          </Typography>
          {/* 성공 파랑, 대기 주황, 실패 빨강 */}
          <Typography
            color={
              data?.data?.contents?.sendResult == "성공"
                ? "blue"
                : data?.data?.contents?.sendResult == "대기"
                  ? "yellow"
                  : "red"
            }
          >
            {data?.data?.contents?.sendResult}
          </Typography>
        </CenteredBox>
        <CenteredBox>
          <Typography minWidth={"100px"} variant="h5">
            비고
          </Typography>
          <TextArea
            height="80px"
            defaultValue={data?.data?.contents?.rmk}
            viewByte={false}
            disabled
          />
        </CenteredBox>
        <CenteredBox>
          <Typography minWidth={"100px"} variant="h5">
            전송일시
          </Typography>
          <Typography>{data?.data?.contents?.sendDate}</Typography>
        </CenteredBox>
        <CenteredBox>
          <Typography minWidth={"100px"} variant="h5">
            전송 확인 일시
          </Typography>
          <Typography>{data?.data?.contents?.rsltDate}</Typography>
        </CenteredBox>
        <CenteredBox>
          <Typography minWidth={"100px"} variant="h5">
            수신번호
          </Typography>
          <Typography>{data?.data?.contents?.mbtlNo}</Typography>
        </CenteredBox>
        <CenteredBox>
          <Typography minWidth={"100px"} variant="h5">
            발신번호
          </Typography>
          <Typography>{data?.data?.contents?.callback}</Typography>
        </CenteredBox>
        <CenteredBox>
          <Typography minWidth={"100px"} variant="h5">
            전송 메시지
          </Typography>
          <TextArea
            height="80px"
            defaultValue={data?.data?.contents?.msg}
            viewByte={false}
            disabled
          />
        </CenteredBox>
      </Stack>
    </ModalBox>
  );
}
