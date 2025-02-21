import { ApiResponseType } from "./apiResponse";

//인증번호 조회
export type AuthCodeListType = {
    cid: string,
    eno: string,
    regDtm: string,
};
export interface AuthCodeListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    totalPage:number,
    contents: AuthCodeListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};