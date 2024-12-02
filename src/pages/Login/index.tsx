import { useEffect, useState } from "react";
import Logo from "../../assets/svg/logo.svg";
import BasicInput from "../../components/Input/BasicInput";
import PasswordInput from "../../components/Input/PasswordInput";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import BlackButton from "../../components/Button/BlackButton";
import CenteredBox from "../../components/Box/CenteredBox";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/authStore";
import { useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import instance from "../../utils/axiosInstance";
import { LoginRequestModel } from "../../types/adminAccount";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../routers/path";

export default function Login() {
  const [rememberId, setRembmber] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
    getValues,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      loginId: "",
      pwdNo: "",
    },
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient(); // queryClient 생성
  const { mutate: userLogin } = api.AdminAccount.useUserLogin(); // login 훅 불러옴

  // store에서 필요한 것들을 불러온다.
  const { clear, remember, setSaveLogin, loginId, accessToken } = useAuthStore([
    "clear",
    "remember",
    "setSaveLogin",
    "loginId",
    "accessToken",
  ]);

  const onSubmit = (data: LoginRequestModel) => {
    clear(); // 일단, 기존에 존재하는 store를 비운다.
    console.log("onSubmit : ", data);
    queryClient.resetQueries(); // 모든 쿼리를 리셋한다.
    if (rememberId) {
      setSaveLogin(getValues("loginId"), true);
    }
    // instance.post("/api/login", data);
    userLogin(data, {
      onSuccess: (data) => {
        console.log("성공:", data);
        navigate(PathConstants.Home);
      },
      onError: (e: unknown) => {
        console.log("에러", e);
      },
    });
  };

  useEffect(() => {
    // remember이 true이면, 로컬 스토리지에서 get한 loginId를 불러온다.
    if (remember) {
      setValue("loginId", loginId ?? "");
      setRembmber(remember);
    }
  }, []);

  return (
    <Stack width={"300px"} gap={1.5} justifyContent={"center"}>
      <Box>
        <img src={Logo} alt="logo" width={"100%"} />
      </Box>
      <CenteredBox gap={1}>
        <Typography color="primary.dark" width={"64px"}>
          아이디
        </Typography>
        <BasicInput
          {...register("loginId")}
          placeholder="아이디를 입력하세요"
          fullWidth
        />
      </CenteredBox>
      <CenteredBox gap={1}>
        <Typography color="primary.dark">비밀번호</Typography>
        <PasswordInput
          {...register("pwdNo")}
          placeholder="비밀번호를 입력하세요"
          fullWidth
        />
      </CenteredBox>
      {/* api 완성 후 수정 */}
      <Typography marginTop={1} color="error.main">
        사용자 정보가 잘못되었습니다.
      </Typography>

      <Box style={{ display: "flex" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberId}
              onChange={() => setRembmber(!rememberId)}
            />
          }
          label="아이디 기억하기"
        />
      </Box>
      <BlackButton onClick={handleSubmit(onSubmit)}>로그인</BlackButton>
      <Typography color="pageTab.tabIcon">문의 전화번호 : 1661-8050</Typography>
    </Stack>
  );
}
