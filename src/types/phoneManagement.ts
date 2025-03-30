import { ApiResponseType } from "./apiResponse";

//모든 사용자의 전화기 수
export type AllPhoneCountType = {
    userNo: string,
    userNm: string,
    telCnt: string,
};
export interface AllPhoneCountResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: AllPhoneCountType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//선택한 사용자의 전화기 리스트
export type UserPhoneListType = {
    userNo: string,
    telId: string,
    commnSeNm: string,
    id: string,
    pwdNo: string,
    telNo: string
};
export interface UserPhoneListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: UserPhoneListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//모든 전화기 리스트
export type AllPhoneListType = {
    userNo: string,
    telId: string,
    commnSeNm: string,
    id: string,
    pwdNo: string,
    telNo: string,
    userYn: string,
};
export interface AllPhoneListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: AllPhoneListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
}

//전화기 상세보기
export type PhoneDetailType = {
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
export interface PhoneDetailResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: PhoneDetailType;
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
}

//전화기 추가
export type PhoneInsertType = {
    telno: string,
    commnSeNo: string,
    lxtnNo: string,
    id: string,
    pwdNo: string,
    rmk: string,
    userId: string,
};

//전화기 수정
export type PhoneUpdateType = {
    telId: string,
    telno: string,
    commnSeNo: string,
    commnSeNm: string,
    lxtnNo: string,
    id: string,
    pwdNo: string,
    useYn: string,
    rmk: string,
    userId: string,
};

//사용자에게 전화기 등록
export type UserInsertPhoneInsertType = {
    userNo: string,
    userNm: string,
    telId: string,
    cntrctBgnde: string,
    cntrctEndde: string,
    useYn: string,
    delYn: string,
    userId: string
}[];

//사용자의 전화기 회수
export type UserUnsertPhoneType = {
    userNo: string,
    telId: string
}[];