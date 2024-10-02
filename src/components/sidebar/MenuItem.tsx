import { ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MenuType } from "../../types/menu";

export default function MenuItem({ label, url, fold }: MenuType) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(url);
  };
  return (
    <ListItemButton sx={{ pl: 7 }} onClick={onClick}>
      {!fold && <ListItemText primary={label} />}
    </ListItemButton>
  );
}
