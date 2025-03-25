import { Box, BoxProps } from "@mui/material";

export default function GrayBox({ children, ...rest }: BoxProps) {
  return (
    <Box
      // borderRadius={"5px"}
      {...rest}
      display={"flex"}
      alignItems={"center"}
      bgcolor={"primary.A100"}
      width={"100%"}
      padding={1}
      paddingLeft={2}
    >
      {children}
    </Box>
  );
}
