import { Button, ButtonProps } from "@mui/material";
import Connection from "../../assets/svg/connection.svg";
import UnConnection from "../../assets/svg/lostConnection.svg";
import { useState } from "react";
import { openPopup } from "../../utils/openPopup";
import PathConstants from "../../routers/path";
import { useTelStore } from "../../stores/telStore";

export default function AppbarButton({ ...rest }: ButtonProps) {
  const { telno } = useTelStore(["telno"]);

  //api로 전화기의 상태를 가져옴
  const [state, setState] = useState<boolean>(true);

  const setTel = () => {
    openPopup({
      url: PathConstants.NetworkSetup,
      windowName: "통신환경설정",
      windowFeatures: "width=300,height=250,scrollbars=no,resizable=no",
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!state) {
      setTel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: state
          ? "appbar.appbarItemColorGreen"
          : telno === ""
            ? "grey.300" // 회색
            : "appbar.appbarItemColorRed",
        color: "appbar.appbarItemTextColor",
        padding: "7px 20px 7px 20px",
        borderRadius: 2,
        fontSize: "14px",
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <img
        src={state ? Connection : UnConnection}
        style={{ paddingRight: "8px" }}
      />
      {telno == "" ? "전화기 연결" : telno}
    </Button>
  );
}
