import { ApiResponseType } from "./apiResponse";

//구성원 및 사용자 목록
export type MemberListType = {
    userNo: string,
    userNm: string,
    attlistMbtlNo: string,
    loginIdPrefix: string,
    loginId: string,
    cmpnm: string,
    bizrno: string,
    rprsntvNm: string,
    adres1: string,
    adres2: string,
    reprsntTelno: string,
    useYn: string
};
export interface UserListResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: MemberListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//구성원 수정
export type MemberUpdateType = {
    userNo: string,
    userNm: string,
    loginId: string,
    attlistUserNm: string,
    useYn: string,
    rmk: string,
    userId: string
};

//구성원 상세
export type memeberDetailType = {
    userNo: string,
    userNm: string,
    loginId: string,
    constntUserNo: string,
    userConstntSeCd: string,
    loginIdPrefix: string,
    encptUserNm: string,
    attlistUserNm: string,
    pwdNo: string,
    advrtsAgreYn: string,
    useYn: string,
    rmk: string,
    userId: string
};
export interface MemberDetailResponse extends ApiResponseType {
    contents: memeberDetailType;
};

//구성원 추가
export type MemberInsertType = {
    userNo: string,
    userNm: string,
    loginId: string,
    constntUserNo: string,
    userConstntSeCd: string,
    loginIdPrefix: string,
    attlistUserNm: string,
    pwdNo: string,
    advrtsAgreYn: string,
    useYn: string,
    rmk: string,
    userId: string
};

//구성원 삭제
export type MemberDeleteType = {
    userNo: string,
}
