import { Box, BoxProps, Snackbar, Typography } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

type ToastType = BoxProps & {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  // duration?: number;
  toastClose: () => void;
  children: ReactNode;
};
export default function Toast({
  children,
  open,
  toastClose,
  // duration,
  vertical = "bottom",
  horizontal = "right",
  ...rest
}: ToastType) {
  return createPortal(
    <SnackbarProvider maxSnack={1}>
      <Snackbar
        open={open}
        // autoHideDuration={duration}
        onClose={(event, reason) => {
          // 외부 클릭 시 스낵바를 닫지 않도록 처리
          if (reason === "clickaway") {
            return; // 클릭 외에는 닫지 않음
          }
          toastClose(); // 클릭 외에는 스낵바 닫기
        }}
        anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
        disableWindowBlurListener
      >
        <Box
          bgcolor="rgba(0, 0, 0, 0.8)"
          padding={2}
          boxShadow={3}
          width={400}
          zIndex={1300}
          borderRadius={"8px"}
          sx={{ cursor: "pointer" }}
          {...rest}
        >
          {children}
        </Box>
      </Snackbar>
    </SnackbarProvider>,
    document.getElementById("toast")!
  );
}

const Row = ({ children, ...rest }: { children: ReactNode }) => {
  return (
    <Box display="flex" gap={1} padding={1} {...rest}>
      {children}
    </Box>
  );
};

const Header = ({ children, ...rest }: { children: ReactNode }) => {
  return (
    <Typography variant="h4" noWrap width={70} color={"white"} {...rest}>
      {children} :
    </Typography>
  );
};

const Content = ({ children, ...rest }: { children: ReactNode }) => {
  return (
    <Typography
      variant="bodyS"
      color={"white"}
      noWrap={false}
      whiteSpace={"normal"}
      {...rest}
    >
      {children}
    </Typography>
  );
};

Toast.Row = Row;
Toast.InfoHeader = Header;
Toast.InfoContent = Content;
