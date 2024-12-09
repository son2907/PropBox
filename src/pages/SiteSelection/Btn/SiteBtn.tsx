import { ReactNode } from "react";
import { BasicButton } from "../../../components/Button";
import { LiaMapMarkerSolid } from "react-icons/lia";
import { Typography } from "@mui/material";

interface BtnProps {
  children: ReactNode;
  selected: boolean; // 선택 상태
  onClick: () => void;
}

export default function SiteBtn({
  children,
  selected,
  onClick,
  ...rest
}: BtnProps) {
  return (
    <BasicButton
      sx={{
        borderColor: selected ? "#9492F4" : "primary",
        width: "100%",
        gap: 1,
        padding: 3,
      }}
      {...rest}
      onClick={onClick}
    >
      <LiaMapMarkerSolid color="#22005E" size={20} />
      <Typography color="#22005E">{children}</Typography>
    </BasicButton>
  );
}
