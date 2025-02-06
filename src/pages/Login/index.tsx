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
import { LoginRequestModel } from "../../types/adminAccount";
import { useNavigate } from "react-router-dom";
import { usePopupStore } from "../../stores/popupStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/adminResolver";
import { useMenuStore } from "../../stores/menuStore";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import useModal from "../../hooks/useModal";
import SiteSelection from "../SiteSelection";

export default function Login() {
  const [rememberId, setRembmber] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const { openModal } = useModal();
  const { popups } = usePopupStore();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      loginId: "",
      pwdNo: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: userLogin } = api.AdminAccount.useUserLogin();

  const { clear, remember, setSaveLogin, loginId } = useAuthStore([
    "clear",
    "remember",
    "setSaveLogin",
    "loginId",
    "accessToken",
  ]);

  const { clear: clearMenu } = useMenuStore();

  const onSubmit = (data: LoginRequestModel) => {
    clear();
    clearMenu();
    localStorage.clear();
    queryClient.resetQueries();
    if (rememberId) {
      setSaveLogin(getValues("loginId"), true);
    }
    userLogin(data, {
      onSuccess: () => {
        openModal(SiteSelection, {
          modalId: "현장선택",
          stack: true, // 단일 모달 모드 = false,
        });
      },
      onError: () => {
        setErrMsg("사용자 정보가 잘못되었습니다.");
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    if (remember) {
      setValue("loginId", loginId ?? "");
      setRembmber(remember);
    }
  }, []);

  useDidMountEffect(() => {
    if (popups.length == 0) {
      navigate("/");
    }
  }, [popups]);

  return (
    <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
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
            name="loginId"
            autoComplete="username"
            error={!!errors.loginId}
          />
        </CenteredBox>
        {errors.loginId && (
          <Typography color="error.main">{errors.loginId.message}</Typography>
        )}
        <CenteredBox gap={1}>
          <Typography color="primary.dark">비밀번호</Typography>
          <PasswordInput
            {...register("pwdNo")}
            placeholder="비밀번호를 입력하세요"
            fullWidth
            onKeyDown={handleKeyDown}
            name="pwdNo"
            autoComplete="current-password"
            error={!!errors.pwdNo}
          />
        </CenteredBox>
        {errors.loginId && (
          <Typography color="error.main">{errors.loginId.message}</Typography>
        )}

        <Typography marginTop={1} color="error.main">
          {errMsg}
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
        <BlackButton type="submit">로그인</BlackButton>
        <Typography color="pageTab.tabIcon">
          문의 전화번호 : 1661-8050
        </Typography>
      </Stack>
    </form>
  );
}
