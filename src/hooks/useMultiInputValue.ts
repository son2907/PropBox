import { useRef } from "react";

// useRef를 사용하여 여러 input 요소를 관리하는 훅
// 테이블의 경우 클릭해도 ui 변경이 없는 체크박스에 이용
export default function useMultiInputValue() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const getInputValues = () => {
    inputRefs.current.forEach((input, index) => {
      if (input) {
        console.log(`Input ${index} value:`, input.value, input.checked);
      }
    });
  };

  return { inputRefs, getInputValues };
}
