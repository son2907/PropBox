import { Button, ButtonProps } from "@mui/material";
import Connection from "../../assets/svg/connection.svg";
import UnConnection from "../../assets/svg/lostConnection.svg";
import { useEffect, useState } from "react";
import { useTelStore } from "../../stores/telStore";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import { useStorageStore } from "../../hooks/useStorageStore";
import NetworkSetupPop from "../../pages/NetworkSetup/popup";
import useModal from "../../hooks/useModal";

export default function AppbarButton({ ...rest }: ButtonProps) {
  const telStore = useStorageStore(useTelStore, "selectedTel");
  // 연결 상태, 원활할 시 true, 끊겼을 시 false
  // websoket api로 받아와야 한다.
  const [state, setState] = useState<boolean>(true);
  const { openModal } = useModal();

  const setTel = () => {
    openModal(NetworkSetupPop, {
      modalId: "통신기기선택",
      stack: false, // 단일 모달 모드 = false,
    });
  };

  const handleClick = () => {
    if (telStore.telno == "") setTel();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useDidMountEffect(() => {
    useTelStore.persist.rehydrate();
  }, [telStore.telno]);

  useEffect(() => {
    useTelStore.persist.rehydrate();
  }, []);

  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: state
          ? telStore.telno != ""
            ? "appbar.appbarItemColorGreen"
            : "grey.300"
          : telStore.telno == ""
            ? "grey.300"
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
      {telStore.telno == "" ? "전화기 연결" : telStore.telno}
    </Button>
  );
}
