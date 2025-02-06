import { Box, Stack, Typography } from "@mui/material";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import { BasicButton } from "../../../components/Button";
import { useTelList } from "../../../api/telList";
import { filterDataByValues } from "../../../utils/filterDataByValues";
import BlackButton from "../../../components/Button/BlackButton";
import { useTelStore } from "../../../stores/telStore";
import { useSptStore } from "../../../stores/sptStore";
import ModalBox from "../../../components/Modal";
import useModal from "../../../hooks/useModal";
import { useModalStore } from "../../../stores/modalStore";

export default function NetworkSetupPop() {
  const { sptNo } = useSptStore();

  const { data } = useTelList(sptNo);
  const { setTelInfo } = useTelStore();

  const { closeModal } = useModal();
  const { modals } = useModalStore();

  const { selectListData, selectValue, handleChange } = useSelect(
    data?.data.contents,
    "telId",
    "telno"
  );

  const onCancle = () => {
    setTelInfo("", "");
    closeModal(modals[modals.length - 1].key);
    window.location.replace("/");
  };

  const onSave = () => {
    if (selectValue) {
      const selectInfo = filterDataByValues({
        data: data?.data.contents,
        key: "telId",
        values: [selectValue],
      });
      setTelInfo(selectInfo[0].telId, selectInfo[0].telno);
    }
    modals.map((item) => {
      closeModal(item.key);
    });
    window.location.replace("/");
  };

  if (data?.data.result === "FAIL") {
    if (
      window.confirm(`${data.data.message}\n\n확인을 누르면 창이 닫힙니다.`)
    ) {
      window.close();
    }
  }

  return (
    <ModalBox>
      <Stack
        width={"100%"}
        height={"100%"}
        bgcolor={"primary.light"}
        gap={1}
        padding={2}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography noWrap marginRight={2}>
            장치 구분
          </Typography>
          <Select
            sx={{ minWidth: 200 }}
            value={selectValue}
            onChange={handleChange}
            placeholder="장치 선택"
            selectData={selectListData}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" marginTop={2} gap={1}>
          <BasicButton onClick={onCancle}>설정 안함</BasicButton>
          <BlackButton onClick={onSave}>저장</BlackButton>
        </Box>
      </Stack>
    </ModalBox>
  );
}
