import { ApiResponseType } from "./apiResponse";

//사용자 목록
export type UserListType = {
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
    useYn: string | undefined,
};
export interface UserListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: UserListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//사용자 상세 조회
export type UserDetailType = {
    userNo: string,
    userNm: string,
    loginId: string,
    constntUserNo: string,
    userConstntSeCd: string,
    loginIdPrefix: string,
    encptUserNm: string,
    attlistUserNm: string,
    pwdNo: string,
    mbtlNo: string,
    attlistMbtlNo: string,
    encptMbtlNo: string,
    advrtsAgreYn: string,
    advrtsAgreDttm: string,
    useYn: string,
    delYn: string,
    rmk: string,
    cmpnm: string,
    bizrno: string,
    rprsntvNm: string,
    adres1: string,
    adres2: string,
    reprsntTelno: string,
    fxnum: string,
};
export interface UserDetailResponse extends ApiResponseType {
    contents: UserDetailType
};

//사용자 허가 솔루션
export type UserPermitSolutionType = {
    id : string,
    userNo: string,
    slutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneSeNm: string,
    userlisneCnt: string,
    sptlisneCnt: string,
    chrgcnt: string,
    userId: string | undefined,
};
export interface UserPermitSolutionResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: UserPermitSolutionType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//사용자 추가
export type UserType = {
    userNo: string,
    userNm: string,
    loginId: string,
    constntUserNo: string,
    userConstntSeCd: string,
    loginIdPrefix: string,
    encptUserNm: string,
    attlistUserNm: string,
    pwdNo: string,
    mbtlNo: string,
    attlistMbtlNo: string,
    encptMbtlNo: string,
    advrtsAgreYn: string,
    advrtsAgreDttm: string,
    delYn: string,
    rmk: string,
    userId: string,
};
export type CompanyType = {
    userNo: string,
    cmpnm: string,
    bizrno: string,
    rprsntvNm: string,
    adres1: string,
    adres2: string,
    reprsntTelno: string,
    fxnum: string,
    rmk: string,
    useYn: string,
    userId: string
};
export type UserInsertType = {
    user : UserType,
    cmpny: CompanyType,
};

//사용자 수정
export type UserUpdateType = {
    userNo: string,
    userNm: string,
    loginId: string,
    constntUserNo: string,
    userConstntSeCd: string,
    loginIdPrefix: string,
    encptUserNm: string,
    attlistUserNm: string,
    pwdNo: string,
    mbtlNo: string,
    attlistMbtlNo: string,
    encptMbtlNo: string,
    advrtsAgreYn: string,
    advrtsAgreDttm: string,
    delYn: string,
    rmk: string,
    userId: string,
};
export type CompanyUpdateType = {
    userNo: string,
    cmpnm: string,
    bizrno: string,
    rprsntvNm: string,
    adres1: string,
    adres2: string,
    reprsntTelno: string,
    fxnum: string,
    rmk: string,
    useYn: string,
    userId: string,
};
export type UserDetailUpdateType = {
    user : UserUpdateType,
    cmpny: CompanyUpdateType,
};

//사용자 삭제
export type DeleteUserType = {
    userNo: string | null,
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
    userId: string,
};

