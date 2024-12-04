// 공통된 응답 형태
export type ApiResponseType = {
  code?: number;
  result?: string;
  message?: string;
  params?: any;
  errorCode?: any;
  accessToken?: string | null;
  refreshToken?: string | null;
};
