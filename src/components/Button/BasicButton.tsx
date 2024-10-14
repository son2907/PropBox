import { ReactNode } from "react";
import Button from ".";

interface BasicButtonProps {
  children: ReactNode;
}
// 회색 테두리, 검은 글씨
export default function BasicButton({ children, ...rest }: BasicButtonProps) {
  return (
    <Button variant="outlined" color="primary" {...rest}>
      {children}
    </Button>
  );
}
