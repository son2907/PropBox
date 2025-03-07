import React, { ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";

interface ModalBoxProps extends BoxProps {
  children: ReactNode;
}

export default function ModalBox({ children, ...rest }: ModalBoxProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 pointer-events-auto">
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // 중앙 정렬
          padding: "10px",
          textAlign: "center",
          backgroundColor: "primary.light",
          zIndex: 1300,
        }}
        {...rest}
      >
        {children}
      </Box>
    </div>
  );
}
