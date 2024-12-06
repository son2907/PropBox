import { Box, Stack, Typography } from "@mui/material";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import { BasicButton } from "../../../components/Button";
import { useSiteList } from "../../../api/siteList";
import { useEffect, useState } from "react";
import { usePopupStore } from "../../../stores/popupStore";

export default function NetworkSetupPop() {
  const { data, isSuccess } = useSiteList();

  const [listData, setListData] = useState<any>([]);

  useEffect(() => {
    setListData(data?.data.contents);
    console.log("useEffect");
  }, [data, isSuccess]);

  const { selectListData, selectValue, handleChange } = useSelect(
    listData,
    "sptNo",
    "sptNm"
  );

  console.log("선택한 값:", selectValue);

  const onClick = () => {
    const { closeAllPopups } = usePopupStore.getState();

    // 팝업 닫기
    closeAllPopups();
    // 부모 창 닫기
    window.opener.close();
    // 현재 창 닫기
    window.close();
  };

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
