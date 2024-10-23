import React, { forwardRef } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ resize = "both", ...rest }, ref) => {
    return (
      <textarea
        ref={ref} // ref를 textarea에 전달
        {...rest} // 모든 속성을 textarea에 전달
        style={{
          width: "100%",
          height: "100%",
          resize: resize,
          borderWidth: 2,
          borderColor: "lightgray",
          borderRadius: "5px",
          outline: "none", // 포커스 시 외부 테두리 제거
        }}
      />
    );
  }
);

export default TextArea;
