import { Box, BoxProps } from "@mui/material";

export default function GrayBox({ children, ...rest }: BoxProps) {
  return (
    <Box
      {...rest}
      display={"flex"}
      alignItems={"center"}
      bgcolor={"primary.A100"}
      padding={1.2}
      paddingLeft={2}
    >
      {children}
    </Box>
  );
}
