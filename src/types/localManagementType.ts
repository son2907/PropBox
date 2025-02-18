import { ApiResponseType } from "./apiResponse";

//현장리스트
export type LocalListType = {
    sptNo: string,
    userNo: string,
    sptNm: string,
    progrsSeCd: string,
    cntrctBgnde: string,
    cntrctEndde: string,
    useYn: string
};
export interface LocalListResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: LocalListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//현장 허가솔루션
export type LocalPermissionListType = {
    id: string
    sptNo: string,
    slutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneSeNm: string,
    userlisneCnt: string,
    sptlisneCnt: string,
    chrgcnt: string,
    userId: string
};
export interface LocalPermissionListResponseType extends ApiResponseType {
    contents: LocalPermissionListType[];
};

//현장 미허가 솔루션
export type LocalNonPermissionType = {
    slutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneSeNm: string,
};
export interface LocalNonPermissionResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: LocalNonPermissionType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//현장 구성원 리스트
export type localMemberListType = {
    sptNo: string,
    userNo: string,
    userNm: string,
    constntUserNo: string,
    userConstntSeCd: string,
    rspofcCd: string,
    rspofcNm: string,
    rmk: string
};
export interface LocalMemberResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: localMemberListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//구성원 직책
export type MemberPositionType = {
    cd: string,
    upCd: string,
    cdNm: string,
    othrSysCd: string,
    chartrRef1: null,
    chartrRef2: null,
    chartrRef3: null,
    chartrRef4: null,
    chartrRef5: null,
    numRef1: null,
    numRef2: null,
    numRef3: null,
    numRef4: null,
    numRef5: null,
    useYn: string,
    delYn: string,
    lnupOrd: string,
    updPsblYn: string,
    rmk: string,
};
export interface MemberPositionResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: MemberPositionType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//구성원 리스트
export type MemeberList = {
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
    useYn: string,
};
export interface MemberListResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: MemeberList[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//구성원 직책 수정
export type MemeberPositionType = {
    userNo: string,
    sptNo: string,
    rspofcCd: string,
    userId: string,
};

//구성원 현장 등록
export type MemeberInsertType = {
    userNo: string,
    rspofcCd: string,
    memo: string,
    rmk: string,
};
export type MemberInsertListType = {
    sptNo: string,
    userId: string | undefined,
    constntList: MemeberInsertType[],
};

//현장에서 구성원 제외
export type MemberDeleteListType = {
    sptNo: string;
    userId: string | undefined;
    userNoList: string[];
};

//현장 허가 솔루션 등록
export type LocalPermissionRegistrationDataType = {
    slutnId: string,
    sptNo: string,
    userId: string | undefined,
};
export type LocalPermissionRegistrationType = {
    sptList: LocalPermissionRegistrationDataType[],
    userId: string | undefined,
}[];

//현장 미허가 솔루션 등록
export type LocalNonPermissionRegistrationType = {
    sptNo: string,
    slutnId: string,
    userId: string | undefined,
}[];

//현장 등록
export type LocalInsertType = {
    sptNo: string,
    userNo: string,
    sptNm: string,
    progrsSeCd: string,
    useYn: string,
    cntrctBgnde: string,
    cntrctEndde: string,
    rmk: string,
    storeCd: string,
    userId: string | undefined,
};

//현장 상세보기
export type LocalDetailType = {
    sptNo: string,
    userNo: string,
    sptNm: string,
    progrsSeCd: string,
    cntrctBgnde: string,
    cntrctEndde: string,
    useYn: string,
    storeCd: string,
    rmk : string,
};
export interface LocalDetailResponse extends ApiResponseType {
    contents: LocalDetailType
};

//현장 수정
export type LocalUpdateType = {
    sptNo: string,
    userNo: string,
    sptNm: string,
    progrsSeCd: string,
    useYn: string,
    cntrctBgnde: string,
    cntrctEndde: string,
    storeCd: string,
    rmk: string,
    userId: string | undefined,
};

//현장 삭제
export type LocalDeleteType = {
    sptNo: string,
    userId: string | undefined,
};


// export type SptList = {
//     slutnId: string,
//     sptNo: string,
//     lisneCnt: string,
//     rmk: string,
//     userId: string,
// };

// export type LocalNonPermissionType = {
//     sptList: SptList[];
//     userId: string | undefined; // 사용자 ID
// }
