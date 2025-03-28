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
    sptNo: string,
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

//회사와 구성원 리스트 5번째 테이블 리스트
export type MemeberLocalListType = {
    idx: string,
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

//통신환경설정 3번째 테이블 리스트
export type SptPermissionPhoneListType = {
    userNo: string,
    sptNo: string,
    telId: string,
    commnSeNo: string,
    commnSeNm: string,
    telNo: string,
    cntrctBgnde: string,
    cntrctEndde: string
};
export interface SptPermissionPhoneListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: SptPermissionPhoneListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//통신환경설정 4번째 테이블 리스트
export type SptNonPermissionPhoneListType = {
    userNo: string,
    telId: string,
    commnSeNo: string,
    commnSeNm: string,
    telNo: string,
    sptNo: string,
    sptYn: string,
    sptNm: string,
};
export interface SptNonPermissionPhoneListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: SptNonPermissionPhoneListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//통신환경설정 4번테이블에서 3번테이블로 전화기 등록
export type SptPermissionPhoneType = {
    sptNo: string,
    telId: string,
    cntrctBgnde: string,
    cntrctEndde: string,
    userId: string,
}[];

//통신환경설정 3번테이블에서 4번으로 전화기 삭제
export type SptNonPermissionPhoneType = {
    sptNo: string,
    telId: string,
    userId: string
}[];

//통신환경설정 7번 테이블 목록 조회
export type MemNonPermissionListType = {
    sptNo: string,
    telId: string,
    commnSeNo: string,
    commnSeNm: string
    telNo: string,
    constntYN: string,
    constntNm: string
};
export interface MemNonPermissionListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: MemNonPermissionListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//통신환경설정 6번 테이블 목록 조회
export type MemPermissionListType = {
    userNo: string,
    sptNo: string,
    telId: string,
    telNo: string,
    commnSeNo: string,
    commnSeNm: string,
    cntrctBgnde: string,
    cntrctEndde: string
};
export interface MemPermissionListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: MemPermissionListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//6번에서 7번으로 권한 이동
export type MemberNonPermissionPhoneType = {
    userNo: string,
    sptNo: string,
    telId: string,
    cntrctBgnde: string,
    cntrctEndde: string,
    useYn: string,
    nowUseYn: string,
    userId: string
};

//7번에서 6번으로 권한 이동
export type MemberPermissionPhoneType = {
    userNo: string,
    sptNo: string,
    telId: string,
    cntrctBgnde: string,
    cntrctEndde: string,
    useYn: string,
    nowUseYn: string,
    userId: string
};

//장치 구분 추가
export type InsertDeviceSectionType = {
    commnSeNm: string,
    host: string,
    useYn: string,
    rmk: string,
    userId: string,
};

//장치 구분 수정
export type UpdateDeviceSectionType = {
    commnSeNo: string,
    commnSeNm: string,
    host: string,
    useYn: string,
    delYn: string,
    rmk: string,
    userId: string,
};

//장치 구분 삭제
// export type DeleteDeviceSectionType = {

// };

//장치 구분 상세조회
export type DetailDeviceSectionType = {
    telId: string,
    telno: string,
    commnSeNo: string,
    commnSeNm: string,
    lxtnNo: string,
    id: string,
    pwdNo: string,
    useYn: string,
    rmk: string,
    userId: string
};

