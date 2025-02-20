import { useState } from "react";

// 테이블, 복수 행 클릭 관리
export function useMultiRowSelection() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const toggleRowsSelection = (id: string) => {
    setSelectedRows((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  // 선택된 행 초기화
  const resetSelectedRows = () => {
    setSelectedRows(new Set());
  };

  return { selectedRows, toggleRowsSelection, resetSelectedRows };
}

//아래와 같이 사용

// <BasicTable.Tr
//   key={index}
//   isClicked={selectedRows.has(item.id)}
//   onClick={() => toggleRowsSelection(item.id)}
// >
