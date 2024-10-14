import { ReactNode } from "react";
import Button from ".";

interface GrayButtonProps {
  children: ReactNode;
}
// 회색 배경, 검은 글씨
export default function GrayButton({ children, ...rest }: GrayButtonProps) {
  return (
    <Button variant="contained" color="primary" {...rest}>
      {children}
    </Button>
  );
}
