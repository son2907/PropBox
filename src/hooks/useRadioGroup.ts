import { useState } from "react";

export function useRadioGroup(initialValue: string) {
  const [selectedValue, setSelectedValue] = useState<string>(initialValue);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return {
    selectedValue,
    handleRadioChange,
  };
}
