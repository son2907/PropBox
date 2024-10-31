import { Box, BoxProps } from "@mui/material";

export default function GrayBox({ children, ...rest }: BoxProps) {
  return (
    <Box
      {...rest}
      display={"flex"}
      alignItems={"center"}
      bgcolor={"primary.A100"}
      borderRadius={"5px"}
      width={"100%"}
      padding={1}
      paddingLeft={2}
    >
      {children}
    </Box>
  );
}
