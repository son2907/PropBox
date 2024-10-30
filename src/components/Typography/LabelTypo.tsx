import { Typography } from "@mui/material";
import { PropsType } from "../../types";

export default function LabelTypo({ children, ...rest }: PropsType) {
  return (
    <Typography {...rest} noWrap width={70} variant="bodyS" paddingRight={1}>
      {children}
    </Typography>
  );
}
