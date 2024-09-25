import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MenuType } from "../../types/menu";

export default function MenuItem({ icon, label, url }: MenuType) {
  // 만일 isAble이 false면 클릭해도 아무 액션도 일어나지 않음
  // 클릭되면 ListItemButto의 백그라운드 색깔을 회색으로
  const navigate = useNavigate();
  const onClick = () => {
    navigate(url);
  };
  return (
    <ListItemButton sx={{ pl: 0 }} onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
}
