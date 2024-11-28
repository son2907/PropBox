import { useRef } from "react";
import Logo from "../../assets/svg/logo.svg";
import BasicInput from "../../components/Input/BasicInput";
import PasswordInput from "../../components/Input/PasswordInput";
import { Box, Stack, Typography } from "@mui/material";
import BlackButton from "../../components/Button/BlackButton";
import CenteredBox from "../../components/Box/CenteredBox";

export default function Login() {
  const idRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const fu_Login = () => {
    console.log(idRef.current?.value, passwordRef.current?.value);
  };
  return (
    <Stack width={"300px"} gap={1} justifyContent={"center"}>
      <Box>
        <img src={Logo} alt="logo" width={"100%"} />
      </Box>
      <CenteredBox gap={1}>
        <Typography color="primary.dark" width={"64px"}>
          아이디
        </Typography>
        <BasicInput ref={idRef} placeholder="아이디를 입력하세요" fullWidth />
      </CenteredBox>
      <CenteredBox gap={1}>
        <Typography color="primary.dark">비밀번호</Typography>
        <PasswordInput ref={passwordRef} />
      </CenteredBox>
      {/* api 완성 후 수정 */}
      <Typography marginTop={1} color="error.main">
        사용자 정보가 잘못되었습니다.
      </Typography>
      <Box style={{ display: "flex" }}>
        <Typography className="underline">아이디 기억하기</Typography>
        <input type="checkbox" />
      </Box>

      <BlackButton onClick={fu_Login}>로그인</BlackButton>

      <Typography color="pageTab.tabIcon">문의 전화번호 : 1661-8050</Typography>
    </Stack>
  );
}
