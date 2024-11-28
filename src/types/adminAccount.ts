//로그인 요청 모델
export type LoginRequestModel = {
  // 아이디
  loginId: string;
  // 비밀번호
  pwdNo: string;
};

// 로그인 응답 모델
export type LoginResponseModel = {
  code?: number;
  result?: string;
  message?: string;
  totalCnt?: number | null;
  contents: {
    uuid: string;
    userNo: string;
    loginId: string;
    attlistUserNm: string;
    attlistMbtlNo: string | null;
    userNm: string;
    mbtlNo: string | null;
    constntUserNo: string;
    userConstntSeCd: string;
    loginIdPrefix: string | null;
  };
  params?: any;
  errorCode?: any;
  accessToken?: string;
  refreshToken?: string;
};
