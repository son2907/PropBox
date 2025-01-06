import { useRef } from "react";

export default function useMultiInputValue() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 값 설정 함수 (특정 인덱스에 대한 값 설정)
  const setInputValue = (index: number, value: string) => {
    const input = inputRefs.current[index];
    if (input) {
      input.value = value;
    }
  };

  // 값 가져오기 함수 (매개변수가 있으면 특정 인덱스 값, 없으면 모든 값)
  const getInputValue = (index?: number) => {
    if (index !== undefined) {
      const input = inputRefs.current[index];
      return input ? input.value : "";
    } else {
      return inputRefs.current
        .filter((input) => input !== null)
        .map((input) => input!.value);
    }
  };

  return { inputRefs, setInputValue, getInputValue };
}

// <input
// defaultValue={item.id}
// ref={(el) => (inputRefs.current[index] = el)} // ref 배열에 각 input 연결
// />
