import { Box, Typography } from "@mui/material";
import { Select } from ".";

export default function TableSelect({
  countValues,
  selectValue,
  handleChange,
  total,
}) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        textAlign: "center",
        gap: 1,
      }}
    >
      <Typography>보여줄 항목 수</Typography>
      <Select
        value={selectValue}
        onChange={handleChange}
        selectData={countValues}
        sx={{ height: "2rem" }}
      ></Select>
      <Typography>전체:{total}</Typography>
    </Box>
  );
}
