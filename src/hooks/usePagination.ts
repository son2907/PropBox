import { useState } from "react";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지 변경 함수
  const onChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage); // 새로운 페이지 번호로 상태 업데이트
  };

  return {
    currentPage, // 현재 페이지 반환
    onChange, // 페이지 변경 함수 반환
  };
};
