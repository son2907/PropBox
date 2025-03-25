import { Box, Typography, Stack, MenuItem } from "@mui/material";
import CenteredBox from "../Box/CenteredBox";
import { MdOutlineSupportAgent } from "react-icons/md";
import { useAuthStore } from "../../stores/authStore";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../Button";
import { useState } from "react";
import { openPopup } from "../../utils/openPopup";
import PathConstants from "../../routers/path";
import useModal from "../../hooks/useModal";
import { LogoutModal } from "../Modal/modal/Logout";
import { useWebSocket } from "../../routers/guard/soketFn";
import { WebSocketContext } from "../../routers/guard/SoketGuard";

export default function UserInfo() {
  const { userNm, mbtlNo } = useAuthStore(["userNm", "mbtlNo"]);
  const [open, setOpen] = useState<boolean>(false); // 메뉴 토글 상태
  const clear = useAuthStore(["clear"]);
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const webSocket = useWebSocket(WebSocketContext);

  const onLogout = () => {
    openModal(LogoutModal, {
      modalId: "logOut",
      stack: false, // 단일 모달 모드 = false,
      onClose: () => closeModal,
      onSubmit: () => {
        clear.clear();
        localStorage.clear();
        webSocket?.close(); // 웹소켓 닫음
        navigate("/login");
      },
    });
  };

  const toggleMenu = () => setOpen((prev) => !prev); // 메뉴 토글 함수
  const openNotice = () => {
    openPopup({
      url: PathConstants.Notice.NoticeList,
      windowName: "공지사항",
    });
  };

  const openFAQ = () => {
    openPopup({
      url: PathConstants.FAQ.FAQList,
      windowName: "FAQ",
    });
  };

  const openPasswordCheck = () => {
    openPopup({
      url: PathConstants.MyPage.PasswordCheck,
      windowName: "PasswordCheck",
      windowFeatures: "width=300,height=250,scrollbars=no,resizable=no",
    });
  };

  return (
    <CenteredBox height={"100%"} fontSize={"x-large"} gap={1}>
      {/* IconButton 클릭 시 메뉴 보이기 */}
      <IconButton size="large" onClick={toggleMenu}>
        <MdOutlineSupportAgent color="white" />
      </IconButton>

      <Typography color="white" onClick={openPasswordCheck}>
        {userNm} {mbtlNo}
      </Typography>

      {/* 세로줄 추가 */}
      <Box
        sx={{
          width: "1px",
          height: "30px",
          backgroundColor: "primary.200",
          marginX: 1,
        }}
      />

      <IconButton onClick={onLogout} color="primary">
        <TbLogout color="white" />
      </IconButton>

      {/* 메뉴 리스트 토글 */}
      {open && (
        <Box
          sx={{
            position: "absolute",
            top: "50px", // 버튼 아래에 위치하도록 설정
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: 3,
            padding: 1,
            zIndex: 10,
          }}
        >
          <Stack>
            <MenuItem>원격 지원</MenuItem>
            <MenuItem onClick={openNotice}>공지사항</MenuItem>
            <MenuItem onClick={openFAQ}>FAQ</MenuItem>
          </Stack>
        </Box>
      )}
    </CenteredBox>
  );
}
