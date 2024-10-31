import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface CenteredBoxProps extends BoxProps {
  children: ReactNode;
}

const CenteredBox = ({ children, ...rest }: CenteredBoxProps) => {
  return (
    <Box
      display="flex"
      height={"100%"}
      minHeight={0}
      alignItems="center" // 세로 기준 중앙 정렬
      {...rest}
    >
      {children}
    </Box>
  );
};

export default CenteredBox;
