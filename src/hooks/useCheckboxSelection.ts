import { useState } from "react";

// 커스텀 훅: 선택된 행 id 관리
export const useCheckboxSelection = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  return { selectedRows, toggleRowSelection };
};
