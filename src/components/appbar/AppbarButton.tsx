import { Button } from "@mui/material";
import Connection from "../../assets/svg/connection.svg";
import UnConnection from "../../assets/svg/lostConnection.svg";

interface CallButtonProps {
  state: boolean;
  text: string;
}
export default function AppbarButton({ state, text }: CallButtonProps) {
  // 전달받은 state 에 따라 아이템을
  console.log(state);
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: state
          ? "appbar.appbarItemColorGreen"
          : "appbar.appbarItemColorRed",
        color: "appbar.appbarItemTextColor",
        padding: "7px 20px 7px 20px",
        borderRadius: 2,
        fontSize: "14px",
      }}
    >
      <img
        src={state ? Connection : UnConnection}
        style={{ paddingRight: "8px" }}
      />
      {text}
    </Button>
  );
}
