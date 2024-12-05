// import axios, {
//   AxiosError,
//   AxiosInstance,
//   InternalAxiosRequestConfig,
// } from "axios";
// import qs from "qs";
// import { useCallback, useEffect } from "react";
// import { useAuthStore } from "../stores/authStore";

// const instance: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   paramsSerializer: paramsRepeatSerializer,
//   withCredentials: true,
// });

// // App.tsx 에서 반드시 호출해야 함
// export function useAxiosInterceptor() {
//   const { accessToken } = useAuthStore(["accessToken"]);

//   // 요청 인터셉터
//   const requestInterceptor = useCallback(
//     (config: InternalAxiosRequestConfig) => {
//       if (accessToken && config.headers) {
//         config.headers.accessToken = accessToken;
//       }
//       console.log("헤더:", config.headers?.accessToken);
//       return config;
//     },
//     [accessToken]
//   );

//   // 응답 에러 인터셉터
//   const responseErrorInterceptor = useCallback(
//     (error: AxiosError<any>) => {
//       console.log("에러 인터셉터 - 에러:", error);
//       return Promise.reject(error);
//     },
//     [accessToken]
//   );

//   // 인터셉터 등록
//   const register = useCallback(() => {
//     instance.interceptors.request.use(requestInterceptor, function (error) {
//       return Promise.reject(error);
//     });

//     instance.interceptors.response.use(function (response) {
//       return response;
//     }, responseErrorInterceptor);
//   }, [accessToken]);

//   useEffect(() => {
//     instance.interceptors.request.clear();
//     instance.interceptors.response.clear();
//     register();
//   }, [accessToken]);
// }

// export function paramsDotSerializer(params: Record<string, any>) {
//   return Object.keys(params)
//     .map((key) => {
//       if (typeof params[key] === "object") {
//         return Object.keys(params[key])
//           .map((subKey) => `${key}.${subKey}=${params[key][subKey]}`)
//           .join("&");
//       }
//       return `${key}=${params[key]}`;
//     })
//     .join("&");
// }

// export function paramsRepeatSerializer(params: Record<string, any>) {
//   return qs.stringify(params, { arrayFormat: "repeat" });
// }

// export default instance;
import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import { store } from "../stores/authStore";

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
    return Promise.reject(error);
  }
);

// 파라미터 직렬화 함수
export function paramsRepeatSerializer(params: Record<string, any>) {
  return qs.stringify(params, { arrayFormat: "repeat" });
}

export default instance;
