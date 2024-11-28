import React, { forwardRef, useState } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: "none" | "both" | "horizontal" | "vertical";
  height?: string;
  maxBytes?: number; // maxBytes 속성
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ resize = "both", height, maxBytes, ...rest }, ref) => {
    const [currentBytes, setCurrentBytes] = useState(0);
    const [text, setText] = useState(""); // 현재 텍스트 상태 관리

    const handleInputChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const inputText = event.target.value;
      const byteSize = new Blob([inputText]).size; // 입력 값의 바이트 크기 계산

      if (!maxBytes || byteSize <= maxBytes) {
        // 바이트 제한 이내면 그대로 입력
        setText(inputText);
        setCurrentBytes(byteSize);
        if (rest.onChange) {
          rest.onChange(event);
        }
      } else if (maxBytes) {
        // 초과한 경우 텍스트를 잘라서 상태에 반영
        const truncatedText = truncateText(inputText, maxBytes);
        setText(truncatedText);
        setCurrentBytes(new Blob([truncatedText]).size);
        event.preventDefault();
      }
    };

    // 텍스트를 바이트 단위로 자르는 함수
    const truncateText = (input: string, maxBytes: number) => {
      let byteSize = 0;
      let result = "";

      for (const char of input) {
        const charSize = new Blob([char]).size;
        if (byteSize + charSize > maxBytes) break;
        byteSize += charSize;
        result += char;
      }

      return result;
    };

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: height ? height : "100%",
        }}
      >
        <textarea
          ref={ref}
          value={text} // 관리된 텍스트 상태를 textarea에 연결
          {...rest}
          style={{
            width: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            height: height ? height : "100%",
            resize: resize,
            borderWidth: 2,
            borderColor: "lightgray",
            borderRadius: "5px",
            outline: "none",
            paddingBottom: "20px", // 하단 공간 확보
            boxSizing: "border-box",
          }}
          onChange={handleInputChange} // 입력 변경 이벤트 처리
        />
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            right: "10px",
            fontSize: "0.85rem",
            color: "gray",
          }}
        >
          {maxBytes
            ? `${currentBytes}/${maxBytes} Bytes`
            : `${currentBytes} Bytes`}
        </div>
      </div>
    );
  }
);

export default TextArea;
