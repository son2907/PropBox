import { Button, ButtonProps } from "@mui/material";
import Connection from "../../assets/svg/connection.svg";
import UnConnection from "../../assets/svg/lostConnection.svg";
import { useEffect, useState } from "react";
import { openPopup } from "../../utils/openPopup";
import PathConstants from "../../routers/path";
import { useTelStore } from "../../stores/telStore";

export default function AppbarButton({ ...rest }: ButtonProps) {
  const { telno } = useTelStore();
  console.log("값:", telno);

  //api로 전화기의 상태를 가져와 바인딩 해주어야 함..
  const [state, setState] = useState<boolean>(true);

  const setTel = () => {
    openPopup({
      url: PathConstants.NetworkSetup,
      windowName: "통신환경설정",
      windowFeatures: "width=300,height=250,scrollbars=no,resizable=no",
    });
  };

  const handleClick = () => {
    if (!state) {
      setTel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    // todo 조건에 api로 가져온 전화기의 상태를 추가하여야 함
    if (telno !== "") {
      setState(true);
    } else {
      setState(false);
    }
  }, [telno]);

  useEffect(() => {
    useTelStore.persist.rehydrate();
  }, []);

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
