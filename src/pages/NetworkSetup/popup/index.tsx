import { Box, Stack, Typography } from "@mui/material";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import { BasicButton } from "../../../components/Button";
import { usePopupStore } from "../../../stores/popupStore";
import { useTelList } from "../../../api/telList";

export default function NetworkSetupPop() {
  const sptNo =
    JSON.parse(localStorage.getItem("selectedSite") || "[]")[0]?.sptNo || "";

  const { data } = useTelList(sptNo);

  console.log(data);

  const { selectListData, selectValue, handleChange } = useSelect(
    data?.data.contents,
    "telId",
    "tleno"
  );

  const onClick = () => {
    const { closeAllPopups } = usePopupStore.getState();

    // 팝업 닫기
    closeAllPopups();
    // 부모 창 닫기
    window.opener.close();
    // 현재 창 닫기
    window.close();
  };

  if (data?.data.result === "FAIL") {
    if (
      window.confirm(`${data.data.message}\n\n확인을 누르면 창이 닫힙니다.`)
    ) {
      window.close();
    }
  }

  return (
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
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <BasicButton onClick={onClick}>저장</BasicButton>
      </Box>
    </Stack>
  );
}
