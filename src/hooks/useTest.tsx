import { useState } from "react";

// 데이터 객체의 key만 인자로 받도록 수정
export function useSingleRowData<T>(key: keyof T) {
  const [selectedRow, setSelectedRows] = useState<T | null>(null); // 전체 데이터 객체를 저장

  const toggleRowSelection = (item: T) => {
    setSelectedRows((prevSelected) => {
      // 기존에 선택된 아이템이 있다면, 선택을 해제
      if (prevSelected && prevSelected[key] === item[key]) {
        return null; // 선택 해제
      }
      return item; // 선택한 아이템 저장
    });
  };

  const resetSelection = () => {
    setSelectedRows(null); // 상태 초기화
  };

  return { selectedRow, toggleRowSelection, resetSelection };
}
