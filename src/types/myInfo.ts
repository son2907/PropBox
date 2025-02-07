import { ApiResponseType } from "./apiResponse";

//비밀번호 확인
export type PasswordCheckType = {
    loginId: string,
    pwdNo: string,
    chkResult: string,
    userConstntSeCd: string,
};

//내정보 - 사용자/구성원 상세보기
export type MyInfoDetailType = {
    userNo: string,
    userNm: string,
    loginId: string,
    constntUserNo: string,
    pwdNo: string,
    mbtlNo: string,
    cmpnm: string,
    bizrno: string,
    rprsntvNm: string,
    adres1: string,
    adres2: string,
    reprsntTelno: string,
    userId: string | undefined,
};
export interface MyInfoDetailResponse extends ApiResponseType {
    contents: MyInfoDetailType
};

//내정보 수정 - 사용자/구성원
export type MyInfoUpdateType = {
    userNo: string,
    userNm: string,
    encptUserNm: string,
    attlistUserNm: string,
    pwdNo: string,
    mbtlNo: string,
    attlistMbtlNo: string,
    encptMbtlNo: string,
    userId: string,
};