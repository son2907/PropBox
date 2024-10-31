import { Typography, TypographyProps } from "@mui/material";

export default function LabelTypo({ children, ...rest }: TypographyProps) {
  return (
    <Typography {...rest} noWrap width={70} variant="bodyS" paddingRight={1}>
      {children}
    </Typography>
  );
}
