import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

// 커스텀 훅: useMultiSelect
export function useMultiSelect<T>(initialValue: T[] = []) {
  const [selectedValues, setSelectedValues] = useState<T[]>(initialValue);

  const handleSelectChange = (e: SelectChangeEvent<T[]>) => {
    const { value } = e.target;

    // value를 T[] 타입으로 변환
    setSelectedValues(Array.isArray(value) ? (value as T[]) : []);
  };

  return {
    selectedValues,
    handleSelectChange,
  };
}
