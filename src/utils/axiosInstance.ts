import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import { store } from "../stores/authStore";
import PathConstants from "../routers/path";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: paramsRepeatSerializer,
  withCredentials: true,
});

// 요청 인터셉터 등록
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = store.getState().accessToken;
    if (accessToken && config.headers) {
      config.headers.accessToken = accessToken;
    }
    console.log("헤더:", config.headers?.accessToken);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 에러 인터셉터 등록
instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("에러 인터셉터 - 에러:", error);
    if (error.response?.status === 401) {
      store.getState().clear();
      localStorage.clear();
      alert("인증이 만료되었습니다. 로그인 페이지로 이동합니다.");
      window.location.href = PathConstants.Login;
    }
    return Promise.reject(error);
  }
);

// 파라미터 직렬화 함수
export function paramsRepeatSerializer(params: Record<string, any>) {
  return qs.stringify(params, { arrayFormat: "repeat" });
}

export default instance;
