import { Box, Snackbar, Typography } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

type ToastType = {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  duration: number;
  toastClose: () => void;
  children: ReactNode;
};
export default function Toast({
  children,
  open,
  toastClose,
  duration,
  vertical = "bottom",
  horizontal = "right",
  ...rest
}: ToastType) {
  return createPortal(
    <SnackbarProvider maxSnack={1}>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={toastClose}
        anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      >
        <Box
          bgcolor="white"
          padding={2}
          boxShadow={3}
          maxWidth={350}
          zIndex={1300}
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
    <Typography variant="h4" noWrap minWidth={45} {...rest}>
      {children} :
    </Typography>
  );
};

const Content = ({ children, ...rest }: { children: ReactNode }) => {
  return (
    <Typography variant="bodyS" {...rest}>
      {children}
    </Typography>
  );
};

Toast.Row = Row;
Toast.InfoHeader = Header;
Toast.InfoContent = Content;
