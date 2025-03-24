import { ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MenuType } from "../../types/menu";
import { useMenuStore } from "../../stores/menuStore";

export default function MenuItem({ label, url, fold }: MenuType) {
  const navigate = useNavigate();
  const { addMenu } = useMenuStore();

  const onClick = () => {
    navigate(url);
    addMenu(label, url);
  };
  return (
    <ListItemButton
      sx={{
        pl: 7,
        paddingBottom: 0.5,
        paddingTop: 0.5,
        display: fold ? "none" : "flex", // fold가 true일 때 숨김
      }}
      onClick={onClick}
    >
      {!fold && <ListItemText primary={label} />}
    </ListItemButton>
  );
}
