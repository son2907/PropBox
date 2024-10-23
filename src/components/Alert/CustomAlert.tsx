import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { renderChild } from "../../utils/renderChild";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Close 아이콘

export default function CustomAlert({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return ReactDOM.createPortal(
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)", // 20% opacity의 검은색 배경
        zIndex: 1200, // CustomAlert의 zIndex보다 낮은 값
      }}
    >
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
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "#E5E5E5",
            }} // 오른쪽 위에 위치
            onClick={onClose} // 닫기 버튼 클릭 시 onClose 호출
          >
            <CloseIcon />
          </IconButton>
          {renderChild(children, CustomAlert.Title)}
          {renderChild(children, CustomAlert.Content)}
          {renderChild(children, CustomAlert.ButtonZone)}
        </Box>
      </Box>
    </Box>,
    document.getElementById("alert")!
  );
}

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <Typography variant="h4" padding={1} paddingTop={3}>
      {children}
    </Typography>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  return (
    <Typography variant="bodySS" color="gray">
      {children}
    </Typography>
  );
};

const ButtonZone = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "10px",
        gap: "10px",
      }}
    >
      {children}
    </Box>
  );
};

CustomAlert.Title = Title;
CustomAlert.Content = Content;
CustomAlert.ButtonZone = ButtonZone;
