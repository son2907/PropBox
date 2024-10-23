import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

interface SelectProps {
  selectData: { value: number; data: string }[];
  text?: string;
  defaultValue?: number;
  sx?: any;
}

export default function PSelect({
  selectData,
  text,
  defaultValue,
  ...rest
}: SelectProps) {
  const [value, setValue] = useState<string>(defaultValue?.toString() || "");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth sx={{ m: 1, width: "max-content" }} size="small">
      <InputLabel
        shrink={!!value}
        style={{ display: value ? "none" : "block" }}
        id="demo-select-small-label"
      >
        {text}
      </InputLabel>
      <Select
        {...rest}
        value={value}
        onChange={handleChange}
        placeholder="어쩌고"
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
