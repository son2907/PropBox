import { ApiResponseType } from "./apiResponse";

//고객 관리 그룹 목록 조회
export type CustomerGroupListType = {
    groupNo: string,
    groupNm: string
};
export interface CustomerGroupListResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: CustomerGroupListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//고객관리 그룹 헤더 조회
export type CustomerGroupListHeaderListType = {
    sptNo: string,
    groupNo: string,
    groupNm: string,
    hder01: string,
    hder02: string,
    hder03: string,
    hder04: string,
    hder05: string,
    hder06: string,
    hder07: string,
    hder08: string,
    hder09: string,
    hder10: string
};
export interface CustomerGroupListHeaderListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: CustomerGroupListHeaderListType;
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//고객관리 - 그룹 헤더 수정
export type UpdateGroupHeader = {
    sptNo: string,
    groupNo: string,
    groupNm: string,
    hder01: string,
    hder02: string,
    hder03: string,
    hder04: string,
    hder05: string,
    hder06: string,
    hder07: string,
    hder08: string,
    hder09: string,
    hder10: string,
};