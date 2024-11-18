import { useState } from "react";

export default function useTabs(initialValue?: number) {
  const [value, setValue] = useState<number>(initialValue ?? 0); // 초기값을 직접 받도록 수정

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return { value, handleChange };
}
