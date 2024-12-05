import { Box, Stack, Typography } from "@mui/material";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import { BasicButton } from "../../../components/Button";
import { useSiteList } from "../../../api/siteList";
import { useEffect, useState } from "react";
import { usePopupStore } from "../../../stores/popupStore";

export default function NetworkSetupPop() {
  const { data, isSuccess } = useSiteList();
  console.log(data?.data.contents);
  const [listData, setListData] = useState<any>([]);

  useEffect(() => {
    setListData(data?.data.contents);
  }, [data, isSuccess]);

  const { selectListData, selectValue, handleChange } = useSelect(
    listData,
    "sptNo",
    "sptNm"
  );

  const onClick = () => {
    const { closeAllPopups } = usePopupStore.getState();

    // 팝업 닫기
    closeAllPopups();

    // 원래 창으로 메시지 전송
    if (window.opener) {
      window.opener.location.href = "/"; // 부모 창을 Home으로 이동
    } else {
      console.warn(
        "원래 창이 없습니다. 팝업이 아닌 창에서 호출되었을 수 있습니다."
      );
    }
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
