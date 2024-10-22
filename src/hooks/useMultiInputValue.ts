import { useRef } from "react";

// useRef를 사용하여 여러 input 요소를 관리하는 훅
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
