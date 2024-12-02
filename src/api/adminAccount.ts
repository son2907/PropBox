import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import { LoginRequestModel, LoginResponseModel } from "../types/adminAccount";
import instance from "../utils/axiosInstance";
import { AxiosResponse } from "axios";

const API = {
  // 로그인
  login: async (data: LoginRequestModel) =>
    await instance.post<LoginResponseModel>("/api/login", data),
};

// useUserLogin 훅
export const useUserLogin = () => {
  const { setAuthData } = useAuthStore(["setAuthData"]);

  return useMutation({
    mutationFn: API.login,
    onSuccess: (res: AxiosResponse<LoginResponseModel>) => {
      const { contents, accessToken, refreshToken } = res.data;
      const {
        uuid,
        userNo,
        attlistUserNm,
        attlistMbtlNo,
        userNm,
        loginId,
        mbtlNo,
        constntUserNo,
        userConstntSeCd,
        loginIdPrefix,
      } = contents;

      // 상태 업데이트
      setAuthData({
        uuid,
        userNo,
        userNm,
        loginId,
        attlistUserNm,
        attlistMbtlNo,
        mbtlNo,
        constntUserNo,
        userConstntSeCd,
        loginIdPrefix,
        accessToken,
        refreshToken,
      });
    },
    // onError: (error) => {
    //   // 로그인 실패 처리
    //   console.error("Login failed", error);
    // },
  });
};
