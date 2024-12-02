import axios, {
  AxiosError, // Axios 요청 에러 타입
  AxiosInstance, // Axios 인스턴스 타입
  InternalAxiosRequestConfig, // Axios 내부 요청 설정 타입
} from "axios";
import qs from "qs"; // 쿼리 스트링을 생성하는 유틸리티 라이브러리
import { useCallback, useEffect } from "react"; // React에서 제공하는 훅
import { useAuthStore } from "../stores/authStore";

// Axios 인스턴스를 생성합니다.
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 환경 변수에서 API 기본 URL을 설정
  headers: {
    "Content-Type": "application/json", // 요청 헤더에 JSON 형식 설정
    // "X-Requested-With": "XMLHttpRequest",
  },
  paramsSerializer: paramsRepeatSerializer, // 쿼리 파라미터 직렬화 방식 설정 (배열 형태 반복 방식)
  withCredentials: true, // CORS 요청에서 인증 정보(쿠키, HTTP 인증 등)를 포함
});

export function useAxiosInterceptor() {
  const { accessToken } = useAuthStore(["accessToken", "clear"]);

  // 요청 인터셉터
  const requestInterceptor = useCallback(
    (config: InternalAxiosRequestConfig) => {
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers.accessToken = accessToken;
        // config.data.accessToken = accessToken;
      }
      console.log("헤더:", config);
      return config;
    },
    [accessToken]
  );

  // 응답 에러 인터셉터
  const responseErrorInterceptor = useCallback((error: AxiosError<any>) => {
    // 응답 에러 발생 시
    console.log("응답 에러 인터셉터 - 에러:", error);
    return Promise.reject(error);
  }, []);

  // 인터셉터 등록 함수
  const register = useCallback(() => {
    instance.interceptors.request.use(requestInterceptor, function (error) {
      return Promise.reject(error);
    });

    instance.interceptors.response.use(function (response) {
      console.log("응답 인터셉터 - 응답:", response); // 응답 내용 출력
      return response;
    }, responseErrorInterceptor);
  }, [accessToken]);

  useEffect(() => {
    instance.interceptors.request.clear();
    instance.interceptors.response.clear();
    register();
  }, [accessToken]);
}

// 배열 파라미터를 repeat 형식으로 직렬화하는 함수
export function paramsRepeatSerializer(params: Record<string, any>) {
  return qs.stringify(params, { arrayFormat: "repeat" });
  // qs 라이브러리를 사용해 배열 직렬화 방식 지정 (예: `key=value&key=value`)
}

export default instance; // Axios 인스턴스를 기본 내보내기로 제공
