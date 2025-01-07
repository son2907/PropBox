import { useRef } from "react";

export default function useMultiInputRefsObj() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return { inputRefs };
}

// <input
// defaultValue={item.id}
// ref={(el) => (inputRefs.current[index] = el)} // ref 배열에 각 input 연결
// />
