import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { renderChild } from "../../utils/renderChild";

export default function BasicAlert({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "10%",
        left: "50%",
        transform: "translate(-50%, -50%)", // 중앙 정렬
        padding: "10px",
        width: "450px",
        backgroundColor: "primary.light",
        border: "1px solid lightgray",
        zIndex: 1300, // MUI의 기본 모달 z-index
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" paddingLeft={3} paddingTop={2} paddingBottom={2}>
        PROPBOX
      </Typography>
      <Box paddingLeft={3} paddingBottom={2}>
        {renderChild(children, BasicAlert.Content)}
      </Box>
      {renderChild(children, BasicAlert.ButtonZone)}
    </Box>
  );
}

const Content = ({ children }: { children: ReactNode }) => {
  return <Typography variant="bodyS">{children}</Typography>;
};

const ButtonZone = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      paddingLeft={3}
      display="flex"
      gap={1}
      justifyContent="flex-end"
      width="100%"
    >
      {children}
    </Box>
  );
};

BasicAlert.Content = Content;
BasicAlert.ButtonZone = ButtonZone;
