import axios, {
  AxiosError, // Axios 요청 에러 타입
  AxiosInstance, // Axios 인스턴스 타입
  InternalAxiosRequestConfig, // Axios 내부 요청 설정 타입
} from "axios";
import qs from "qs"; // 쿼리 스트링을 생성하는 유틸리티 라이브러리
import { useCallback, useEffect } from "react"; // React에서 제공하는 훅
import PathConstants from "../routers/path";
import BasicAlert from "../components/Alert/BasicAlert";
import { useAuthStore } from "../stores/authStore";
import useModal from "../hooks/useModal";

// Axios 인스턴스를 생성합니다.
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 환경 변수에서 API 기본 URL을 설정
  headers: {
    "Content-Type": "application/json", // 요청 헤더에 JSON 형식 설정
  },
  paramsSerializer: paramsRepeatSerializer, // 쿼리 파라미터 직렬화 방식 설정 (배열 형태 반복 방식)
});

// 애플리케이션의 최상위 컴포넌트(App.tsx)에서 반드시 호출해야 하는 함수입니다.
export function useAxiosInterceptor() {
  const { accessToken, clear } = useAuthStore(["accessToken", "clear"]);
  // 인증 토큰(accessToken)과 인증 상태를 초기화하는 메서드(clear)를 가져옵니다.
  const { openModal } = useModal();
  // 모달을 열 수 있는 메서드(openModal)를 가져옵니다.

  // 요청 인터셉터: 모든 Axios 요청에 공통적으로 적용
  const requestInterceptor = useCallback(
    (config: InternalAxiosRequestConfig) => {
      if (accessToken && config.headers) {
        // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰을 추가
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config; // 수정된 요청 설정 반환
    },
    [accessToken] // accessToken이 변경될 때마다 업데이트
  );

  // 응답 에러 처리 인터셉터: 모든 Axios 요청 에러에 공통적으로 적용
  const responseErrorInterceptor = useCallback(
    (error: AxiosError<any>) => {
      // 특정 상태 코드(403, IS_FORBIDDEN) 처리
      if (
        error.response?.status === 403 &&
        error.response?.data.code === "IS_FORBIDDEN"
      ) {
        // openModal(BasicAlert, {
        //   key: "ERROR_403", // 모달 식별 키
        //   message: error.response?.data.message, // 서버로부터 받은 메시지
        //   onSubmit: () => {
        //     clear(); // 인증 상태 초기화
        //     window.location.href = PathConstants.Login; // 로그인 페이지로 리다이렉트
        //   },
        // });
      }
      return Promise.reject(error); // 에러를 호출자에게 전달
    },
    [accessToken] // accessToken이 변경될 때마다 업데이트
  );

  // 인터셉터 등록 함수
  const register = useCallback(() => {
    // 요청 인터셉터 등록
    instance.interceptors.request.use(requestInterceptor, function (error) {
      return Promise.reject(error); // 요청 에러 처리
    });

    // 응답 성공 및 에러 인터셉터 등록
    instance.interceptors.response.use(
      function (response) {
        return response; // 응답 데이터 그대로 반환
      },
      responseErrorInterceptor // 응답 에러 처리
    );
  }, [accessToken]); // accessToken이 변경될 때마다 업데이트

  // 컴포넌트 마운트/업데이트 시 실행
  useEffect(() => {
    instance.interceptors.request.clear(); // 기존 요청 인터셉터 초기화
    instance.interceptors.response.clear(); // 기존 응답 인터셉터 초기화
    register(); // 새로운 인터셉터 등록
  }, [accessToken]); // accessToken이 변경될 때마다 실행
}

// 중첩된 객체를 점(dot) 형식으로 직렬화하는 함수
export function paramsDotSerializer(params: Record<string, any>) {
  return Object.keys(params)
    .map((key) => {
      if (typeof params[key] === "object") {
        // 객체 타입인 경우 key.subKey=value 형식으로 변환
        return Object.keys(params[key])
          .map((subKey) => `${key}.${subKey}=${params[key][subKey]}`)
          .join("&");
      }
      return `${key}=${params[key]}`; // 일반 키-값 쌍
    })
    .join("&"); // &로 연결
}

// 배열 파라미터를 repeat 형식으로 직렬화하는 함수
export function paramsRepeatSerializer(params: Record<string, any>) {
  return qs.stringify(params, { arrayFormat: "repeat" });
  // qs 라이브러리를 사용해 배열 직렬화 방식 지정 (예: `key=value&key=value`)
}

export default instance; // Axios 인스턴스를 기본 내보내기로 제공
