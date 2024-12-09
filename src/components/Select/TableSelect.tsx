import { Box, Typography } from "@mui/material";
import { Select } from ".";
import useSelect from "../../hooks/useSelect";

interface TableSelectProps {
  total: number;
}

export default function TableSelect({ total }: TableSelectProps) {
  const selectData = [
    {
      value: 10,
      data: "10",
    },
    {
      value: 20,
      data: "20",
    },
    {
      value: 40,
      data: "40",
    },
    {
      value: 50,
      data: "50",
    },
  ];

  const { selectValue, handleChange } = useSelect(
    selectData,
    "value",
    "data",
    "10"
  );

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
        selectData={selectData}
      ></Select>
      <Typography>전체:{total}</Typography>
    </Box>
  );
}
