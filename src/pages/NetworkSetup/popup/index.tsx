import { Box, Stack, Typography } from "@mui/material";
import { Select } from "../../../components/Select";
import useSelect from "../../../hooks/useSelect";
import { BasicButton } from "../../../components/Button";
import { useSiteList } from "../../../api/siteList";
import { useEffect, useState } from "react";
import { filterDataByValues } from "../../../utils/filterDataByValues";

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
  console.log("선택한 값:", selectValue);

  const onClick = () => {
    // 이 창을 닫는다.
    console.log(
      filterDataByValues({
        data: listData,
        key: "sptNo",
        values: ["3001", "3002"],
      })
    );
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
