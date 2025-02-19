import { ApiResponseType } from "./apiResponse";

//사용자 및 회사 리스트
export type UserCompanyListType = {
    userNo: string,
    cmpNm: string,
    telCnt: string,
};
export interface UserCompanyListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: UserCompanyListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//회사와 현장 리스트
export type CompanyLocalListType = {
    userNo: string,
    cmpnm: string,
    sptNm: string,
    telCnt: string,
};
export interface CompanyLocalListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: CompanyLocalListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//회사와 구성원 리스트
export type MemeberLocalListType = {
    userNo: string,
    cmpnm: string,
    sptNo: string,
    sptNm: string,
    constntNo: string,
    constntNm: string
};
export interface MemeberLocalListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: MemeberLocalListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//전화기 추가
export type InsertPhone = {
    telno: string,
    commnSeNo: string,
    lxtnNo: string,
    id: string,
    pwdNo: string,
    rmk: string,
    userId: string
};

//장치 구분
export type DeviceSectionListType = {
    commnSeNo: string,
    commnSeNm: string,
    host: string,
    useYn: string,
    delYn: string,
    rmk: string,
    userId: string,
};
export interface DeviceSectionListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: DeviceSectionListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
}