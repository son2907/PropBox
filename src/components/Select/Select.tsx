import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

interface SelectProps {
  selectData: { value: number; data: string }[];
}

export default function PSelect({ selectData }: SelectProps) {
  const [value, setValue] = useState<string>(selectData[0].value.toString());

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Age</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label="Age"
        onChange={handleChange}
      >
        {selectData.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.data}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
