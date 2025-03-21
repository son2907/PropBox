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

//고객관리 왼쪽 테이블 조회
export type CustomerListType = {
    seNm: string,
    groupNo: string,
    groupNm: string,
    groupCnt: string,
};
export interface CustomerListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    totalPage: number,
    contents: CustomerListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//고객관리 고객 상세 테이블 조회 - 오른쪽 테이블
export type CustomerDetailListType = {
    cstmrNo: string,
    cstmrNm: string,
    mbtlNo: string,
    telNo: string,
    cstmrRmk: string,
    addr: string,
    regDtm: string,
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
export interface CustomerDetailListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    totalPage: number,
    contents: CustomerDetailListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//고객관리 고객 상세 조회 - 오른쪽 input조회
export type CustomerDetailTopType = {
    cstmrNo: string,
    cstmrNm: string,
    mbtlNo: string,
    telNo: string,
    cstmrRmk: string,
    addr: string,
    areaNm: string,
    regDtm: string,
    validMbtlNo: string,
    dupMbtlNo: string,
    rctnRejectXyn: string
};
export interface CustomerDetailTopResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    totalPage: number,
    contents: CustomerDetailTopType;
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//고객관리 상세조회 - 오른쪽 input아래부분
export type CustomerDetailBottomType = {
    itemNm: string,
    detailNm: string
};
export interface CustomerDetailBottomResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    totalPage: number,
    contents: CustomerDetailBottomType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//고객관리 고객 관리지역 리스트
export type CustomerManagementAreaType = {
    sptNo: string,
    areaNo: string,
    areaNm: string,
    lnupOrd: string,
    useYn: string,
    delYn: string,
    userId: string
};
export interface CustomerManagementAreaResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    totalPage: number,
    contents: CustomerManagementAreaType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//고객관리 - 고객 그룹 추가
export type CustomerGroupInsertType = {
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

//고객관리 - 고객 그룹 삭제
export type CustomerGroupDeleteType = {
    sptNo: string,
    groupNo: string,
};

//고객관리 고객 개별 수정
export type CustomerSingleUpdateType = {
    sptNo: string,
    groupNo: string,
    cstmrNo: string,
    cstmrNm: string,
    mbtlNo: string,
    telNo: string,
    addr: string,
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

//고객관리 고객 개별 삭제
export type CustomerSingleDeleteType = {
    sptNo: string,
    cstmrNo: string,
};

//고객관리 - 문자메시지 - 전송대상 미리보기 인원수
export type CustomerSmsTotalCountType = {
    sptNo: string,
    groupNo: string,
    tabFlag: string,
    cstmrList: string[]
};

//고객관리 - 문자메시지팝업 - 전송대상미리보기 인원수 Response
export type CustomerSmsTotalCountListType = {
    sptNo: string,
    groupNo: string,
    totalCnt1: string,
    totalCnt2: string,
    totalCnt3: string,
    totalCnt4: string
};
export interface CustomerSmsTotalCountListResponse extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    totalPage: number,
    contents: CustomerSmsTotalCountListType;
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//고객관리 - 미리보기 
export type CustomerPreviewTotalCountType = {
    sptNo: string,
    groupNo: string,
    tabFlag: string,
    cstmrList: string[]
};