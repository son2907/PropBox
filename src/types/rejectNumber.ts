import { ApiResponseType } from "./apiResponse";

//수신거부 현장목록 조회
export type RejectLocalListType = {
    sptNo: string,
    userNo: string,
    sptNm: string,
    userNm: string
};
export interface RejecttLocalListResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: RejectLocalListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//수신거부 목록 조회
export type RejectNumberType = {
    rejectNo: string,
    sptNo: string,
    tel070No: string,
    rejectTelNo: string,
    rejectCd: string,
    useYn: string,
    rmk: string
};
export interface RejectNumberResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: RejectNumberType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};