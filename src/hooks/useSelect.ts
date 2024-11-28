import { useState } from "react";
import { selectType } from "../types/Select";
import { SelectChangeEvent } from "@mui/material";

export default function useSelect(defaultValue?: selectType) {
  const [selectValue, setValue] = useState<selectType>(
    defaultValue?.toString() || ""
  );

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return { selectValue, handleChange };
}
