import { Box, Typography } from "@mui/material";
import { Select } from "../../components/Select";
import useSelect from "../../hooks/useSelect";
import { BasicButton } from "../../components/Button";

const testData = [
  {
    value: 1,
    data: "장치하나",
  },
  {
    value: 2,
    data: "장치둘",
  },
  {
    value: 3,
    data: "장치셋",
  },
  {
    value: 4,
    data: "장치넷",
  },
];

export default function NetworkSetup() {
  const { selectValue, handleChange } = useSelect();

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography noWrap marginRight={2}>
          장치 구분
        </Typography>
        <Select
          sx={{ minWidth: 200 }}
          value={selectValue}
          onChange={handleChange}
          placeholder="장치 선택"
          selectData={testData}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <BasicButton>저장</BasicButton>
      </Box>
    </Box>
  );
}
