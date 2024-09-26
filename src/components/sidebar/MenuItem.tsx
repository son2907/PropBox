import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MenuType } from "../../types/menu";

interface MenuProps extends MenuType {
  fold: boolean;
}
export default function MenuItem({ label, url, fold }: MenuProps) {
  // 만일 isAble이 false면 클릭해도 아무 액션도 일어나지 않음
  // 클릭되면 ListItemButto의 백그라운드 색깔을 회색으로
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
