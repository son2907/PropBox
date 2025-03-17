import { Box, BoxProps } from "@mui/material";

interface TabPanelProps extends BoxProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      height={"100%"}
      sx={{
        flex: 1,
        display: value === index ? "flex" : "none",
        flexDirection: "column",
        overflow: "hidden",
        gap: 1,
      }}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}
