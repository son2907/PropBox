import { ApiResponseType } from "./apiResponse";

//구성원별 메뉴 목록 조회
export type MemberMenuList = {
    userNo: string,
    slutnId: string,
    slutnNm: string,
    menuId: string,
    menuNm: string,
    sptNo: string,
};
export interface MemberMenuListResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: MemberMenuList[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//구성원 메뉴 권한 상세 조회
export type MemberAuthDetailType = {
    sptNo: string,
    userNo: string,
    userNm: string,
    constntUserNo: string,
    userConstntSeCd: string,
    rspofcCd: string,
    rspofcNm: string,
    rmk: string,
};
export interface MemberAuthDetailResponse extends ApiResponseType {
    contents: MemberAuthDetailType;
}

//구성원 메뉴 권한 등록 및 수정 팝업 - 미권한 메뉴 조회
export type NonPermissionMenuListType = {
    userNo: string,
    slutnId: string,
    slutnNm: string,
    menuId: string,
    menuNm: string,
    sptNo: string,
};
export interface NonPermissionMenuListResponse extends ApiResponseType {
    contents: NonPermissionMenuListType[]
};

//구성원 메뉴 권한 등록 및 수정 팝업 - 권한메뉴 조회
export type MemberPermissionMenuListType = {
    userNo: string,
    slutnId: string,
    slutnNm: string,
    menuId: string,
    menuNm: string,
    sptNo: string,
};
export interface MemberPermissionMenuListResponse extends ApiResponseType {
    contents: MemberPermissionMenuListType[]
};

// 구성원 메뉴 권한 등록 및 수정 팝업 - 미권한 등록
export type MenuNonPermissionInsertType = {
    sptNo: string,
    userNo: string,
    userId: string,
    slutnIdList: string[],
};

// 구성원 메뉴 권한 등록 및 수정 팝업 - 권한 등록
export type MenuPermissionInsertType = {
    sptNo: string,
    userNo: string,
    userId: string,
    constntLisneList: string[]
};

//구성원 권한 회수
export type MemberPermissionRevok = {
    slutnId: string
}
export type MemberPermissionRevokedType = {
    sptNo: string,
    userNo: string,
    resn: string,
    userId: string,
    slutnIdList: MemberPermissionRevok[];
};

//구성원 권한 복사 팝업 목록
export type PermissionMenuListType = {
    sptNo: string,
    userNo: string,
    userNm: string,
    constntUserNo: string,
    userConstntSeCd: string,
    rspofcCd: string,
    rspofcNm: string,
    rmk: string,
};
export interface PermissionMenuListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: PermissionMenuListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//구성원 권한 복사 팝업 - 권한 복사
export type PermissionMenuCopyType = {
    sptNo: string,
    userId: string,
    userNo: string,
    userList: string[]
};

//구성원 권한 회수
export type PermissionRevokeList = {
    slutnId: string
};
export type PermissionRevokeType = {
    sptNo: string,
    userNo: string,
    resn: string,
    userId: string,
    slutnIdList: PermissionRevokeList[],
};
