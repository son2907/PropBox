import { Box } from "@mui/material";
import { Select } from ".";

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

  return (
    <Box
      style={{
        display: "inline-flex",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      보여줄 항목 수 <Select defaultValue={10} selectData={selectData}></Select>{" "}
      전체:{total}
    </Box>
  );
}
