import React, { forwardRef, useEffect, useState } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: "none" | "both" | "horizontal" | "vertical";
  height?: string;
  maxBytes?: number;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  viewByte?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      resize = "both",
      height,
      maxBytes,
      value,
      onChange,
      viewByte = true,
      ...rest
    },
    ref
  ) => {
    const [currentBytes, setCurrentBytes] = useState(0);

    // 바이트 계산 및 상태 관리
    useEffect(() => {
      const initialText = value ?? "";
      setCurrentBytes(new Blob([initialText]).size);
    }, [value]);

    const handleInputChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const inputText = event.target.value;
      const byteSize = new Blob([inputText]).size;

      if (!maxBytes || byteSize <= maxBytes) {
        setCurrentBytes(byteSize);
        if (onChange) {
          onChange(event); // 정상적으로 onChange를 호출
        }
      } else {
        const truncatedText = truncateText(inputText, maxBytes);
        setCurrentBytes(new Blob([truncatedText]).size);
        event.preventDefault();
        if (onChange) {
          onChange({
            ...event,
            target: { ...event.target, value: truncatedText },
          });
        }
      }
    };

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
          value={value} // 상위에서 value가 전달됨
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
            paddingBottom: "20px",
            boxSizing: "border-box",
          }}
          onChange={handleInputChange} // onChange는 내부에서 처리됨
        />
        <div
          style={{
            display: viewByte ? "block" : "none",
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
