import * as React from "react";
import Switch from "@mui/material/Switch";
import { Box, FormGroup, Typography } from "@mui/material";
import styled from "@emotion/styled";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 38,
  height: 18,
  padding: 0,
  marginRight: 5,
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 5,
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#545F71", // 체크되었을 때 백그라운드 색상, 나중에 theme에 등록
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 9,
    height: 9,
    borderRadius: 6,
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

interface ToggleButtonProps {
  checked: boolean;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ToggleButton({
  checked,
  label,
  onChange,
}: ToggleButtonProps) {
  return (
    <FormGroup>
      <Box display="flex" alignItems="center">
        <CustomSwitch checked={checked} onChange={onChange} />
        <Typography>{label}</Typography>
      </Box>
    </FormGroup>
  );
}
