import { ReactNode, useState } from "react";
import { BasicButton, IconButton } from "../../../components/Button";
import { LiaMapMarkerSolid } from "react-icons/lia";
import { Typography } from "@mui/material";

export default function SiteBtn({ children }: { children: ReactNode }) {
  const [click, setClick] = useState(false);

  return (
    <BasicButton
      onClick={() => {
        setClick(!click);
      }}
      sx={{
        borderColor: click ? "#9492F4" : "primary",
      }}
    >
      <IconButton sx={{ color: "#22005E" }}>
        <LiaMapMarkerSolid />
      </IconButton>
      <Typography color="#22005E"> {children} </Typography>
    </BasicButton>
  );
}
