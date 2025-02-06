import React, { ReactNode } from "react";
import { Box, Stack } from "@mui/material";

export default function ModalBox({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 pointer-events-auto">
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // 중앙 정렬
          padding: "10px",
          width: "400px",
          textAlign: "center",
          backgroundColor: "primary.light",
          zIndex: 1300, // MUI의 기본 모달 z-index
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Stack>{children}</Stack>
        </Box>
      </Box>
    </div>
  );
}
