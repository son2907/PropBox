import { useState } from "react";

// 테이블, 단일 행 클릭 관리
export function useSingleRowSelection() {
  const [selectedRow, setSelectedRow] = useState<string | number | null>(null);

  const toggleRowSelection = (id: string | number) => {
    setSelectedRow((prevSelected) => (prevSelected === id ? null : id));
  };

  return { selectedRow, toggleRowSelection };
}

// 아래와 같이 사용

//  <BasicTable.Tr
//   key={index}
//   isClicked={selectedRow === item.id}
//   onClick={() => toggleRowSelection(item.id)}
// >
