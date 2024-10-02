import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

interface SelectProps {
  selectData: { value: number; data: string }[];
  text: string;
}

export default function PSelect({ selectData, text }: SelectProps) {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel
        id="demo-select-small-label"
        sx={{ backgroundColor: "white" }}
      >
        {text}
      </InputLabel>
      <Select value={value} label="Age" onChange={handleChange}>
        {selectData.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.data}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
