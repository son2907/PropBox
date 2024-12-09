import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.7)", // 반투명 배경
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // 다른 컴포넌트 위에 표시
      }}
    >
      <CircularProgress />
    </Box>
  );
}
