import { useRef } from "react";

// useRef를 사용하여 여러 input 요소를 관리하는 훅
// 테이블의 경우 클릭해도 ui 변경이 없는 체크박스 및 다중 input 그룹에 이용
export default function useMultiInputValue() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const getInputValues = () => {
    // inputRefs 배열의 모든 요소를 순회하여
    // 존재하는 input 요소의 value를 배열로 반환
    return inputRefs.current
      .filter((input) => input !== null) // null 값을 제외
      .map((input) => input!.value); // value를 추출하여 배열 생성
  };

  return { inputRefs, getInputValues };
}

// <input
// defaultValue={item.id}
// ref={(el) => (inputRefs.current[index] = el)} // ref 배열에 각 input 연결
// />
