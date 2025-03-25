import { ListItemButton, styled, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuType } from "../../types/menu";
import { useMenuStore } from "../../stores/menuStore";

const Menu = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active }) => ({
  backgroundColor: active ? "#009EFF" : "transparent",
  padding: "8px 8px 8px 23px",
  color: "white",
  marginTop: 1.3,
  "&:hover": {
    backgroundColor: active ? "#009EFF" : "transparent",
  },
}));

export default function MenuItem({ label, url, fold }: MenuType) {
  const navigate = useNavigate();
  const { addMenu } = useMenuStore();

  const onClick = () => {
    navigate(url);
    addMenu(label, url);
  };

  const location = useLocation();
  const isActive = url === location.pathname;

  return (
    // 사용 예시
    <Menu active={isActive} disableRipple onClick={onClick}>
      {!fold && (
        <Typography variant="body1" color="white" marginLeft={4.3}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 30 30"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "4px", verticalAlign: "middle" }}
          >
            <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"></path>
          </svg>
          {label}
        </Typography>
      )}
    </Menu>
  );
}
