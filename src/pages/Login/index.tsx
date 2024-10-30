import { useRef } from "react";
import Logo from "../../assets/svg/logo.svg";
import BasicInput from "../../components/Input/BasicInput";
import PasswordInput from "../../components/Input/PasswordInput";
import { Box, Typography } from "@mui/material";
import BlackButton from "../../components/Button/BlackButton";

export default function Login() {
  const idRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const fu_Login = () => {
    console.log(idRef.current?.value, passwordRef.current?.value);
  };
  return (
    <Box
      style={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        width: "250px",
        gap: 6,
      }}
    >
      <Box>
        <img src={Logo} alt="logo" width={"100%"} />
      </Box>
      <Box marginBottom={1.5}>
        <Typography color="primary.dark" marginBottom={1}>
          아이디
        </Typography>
        <BasicInput ref={idRef} placeholder="아이디를 입력하세요" />
      </Box>
      <Box marginBottom={1.5}>
        <Typography color="primary.dark" marginBottom={1}>
          비밀번호
        </Typography>
        <PasswordInput ref={passwordRef} />
        {/* api 완성 후 수정 */}
        <Typography marginTop={1} color="error.main">
          사용자 정보가 잘못되었습니다.
        </Typography>
      </Box>
      <Box style={{ display: "flex" }}>
        <Typography className="underline">아이디 기억하기</Typography>
        <input type="checkbox" />
      </Box>

      <BlackButton onClick={fu_Login}>로그인</BlackButton>

      <Typography color="pageTab.tabIcon">문의 전화번호 : 1661-8050</Typography>
    </Box>
  );
}
