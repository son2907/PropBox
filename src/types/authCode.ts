import { ApiResponseType } from "./apiResponse";

//인증번호 조회
export type AuthCodeListType = {
    cid: string,
    eno: string,
    regDtm: string,
};
export interface AuthCodeListResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: AuthCodeListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};