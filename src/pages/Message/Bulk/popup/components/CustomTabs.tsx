import React, { ReactNode } from "react";
import { Tabs } from "@mui/material";

interface CustomTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  children: ReactNode;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  value,
  handleChange,
  children,
}) => {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      TabIndicatorProps={{
        style: {
          display: "none", // Hide the indicator
        },
      }}
      sx={{
        "& .MuiTab-root": {
          minWidth: "auto",
          padding: "12px 24px",
          border: "1px solid #d9d9d9",
          borderBottom: "none",
          borderRadius: "4px 4px 0 0",
          fontSize: "14px",
          color: "#333",
          textTransform: "none",
        },
        "& .MuiTab-root.Mui-selected": {
          backgroundColor: "root.borderPrimary",
          color: "#000",
          fontWeight: "bold",
        },
      }}
    >
      {children}
    </Tabs>
  );
};

export default CustomTabs;
