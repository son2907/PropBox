import { Box } from "@mui/material";
import { ReactNode } from "react";

interface TableBoxProps {
  width?: string;
  height?: string;
  children: ReactNode;
}
export default function TableBox({
  width = "100%",
  height = "100%",
  children,
}: TableBoxProps) {
  return (
    <Box display={"flex"} width={width} height={height} overflow={"hidden"}>
      {children}
    </Box>
  );
}

const InnerBox = ({
  width = "100%",
  height = "100%",
  children,
}: TableBoxProps) => {
  return (
    <Box width={width} height={height} overflow={"auto"}>
      {children}
    </Box>
  );
};

TableBox.Inner = InnerBox;
