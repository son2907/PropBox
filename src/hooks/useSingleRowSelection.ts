import { useState } from "react";

// 테이블, 단일 행 클릭 관리
export function useSingleRowSelection() {
  const [selectedRow, setSelectedRows] = useState<Set<string>>(new Set());

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prevSelected) => {
      const newSelected = new Set<string>();
      if (prevSelected.has(id)) {
        // 선택된 ID가 이미 있으면 선택 해제 (빈 Set으로)
        return newSelected;
      }
      // 새 ID로 교체하여 단일 선택 유지
      newSelected.add(id);
      return newSelected;
    });
  };

  const resetSelection = () => {
    setSelectedRows(new Set()); // 상태 초기화
  };

  return { selectedRow, toggleRowSelection, resetSelection };
}

// 아래와 같이 사용

// <BasicTable.Tr
//   key={index}
//   isClicked={selectedRow.has(item.id)} // Set에서 선택 여부 확인
//   onClick={() => toggleRowSelection(item.id)} // 행 클릭 시 선택 토글
// >
