import { forwardRef } from "react";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";

interface InputProps extends OutlinedInputProps {
  placeholder?: string;
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;  // 더블클릭 이벤트 타입 추가
}

const BasicInput = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder = "", onDoubleClick, ...rest }, ref) => {

    const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (onDoubleClick) {
        onDoubleClick(event);  // 부모 컴포넌트에서 전달된 onDoubleClick 호출
      }
      // 추가 로직을 여기에 넣을 수 있습니다.
      console.log("Input was double clicked!");  // 예시: 콘솔에 로그 출력
    };

    return (
      <OutlinedInput
        {...rest}
        size="small"
        placeholder={placeholder}
        inputRef={ref}
        sx={{
          backgroundColor: "white",
          ...(rest.sx || {}),
        }}
        onDoubleClick={handleDoubleClick}  // 더블클릭 이벤트 연결
      />
    );
  }
);

export default BasicInput;
