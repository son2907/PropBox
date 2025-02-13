// 문자 관리 > 수신 거부 페이지
import { ApiResponseType } from "./apiResponse";

// 수신거부 목록 조회
export type GetRejectListRequestType = {
  page: number;
  limit: number;
};

export type GetRejectList = {
  regDtm: string;
  regrNm: string;
  rejectNo: string;
  sptNo: string;
  tel070No: string;
  rejectTelNo: string;
  rejectCd: string;
  useYn: string;
  rmk: string;
};

export interface GetRejectListResponseType extends ApiResponseType {
  contents: GetRejectList[];
  totalCnt: number;
  totalPage: number;
}

// 수신거부 현장 목록 조회
export type GetRejectSptListRequestType = {
  userNm?: string;
  page: number;
  limit: number;
};

export type GetRejectSptItem = {
  sptNo: string;
  userNo: string;
  sptNm: string;
  userNm: string;
};
export interface GetRejectSptListResponseType extends ApiResponseType {
  contents: GetRejectSptItem[];
}

// 수신 거부 상세 조회, 수신거부 삭제
export type GetRejectDetRequestType = {
  rejectNo: string;
};

export type GetRejectDet = {
  rejectNo: string;
  sptNo: string;
  tel070No: string;
  rejectTelNo: string;
  rejectCd: string;
  useYn: string;
  rmk: string;
};

export interface GetRejectDetResponseType extends ApiResponseType {
  contents: GetRejectDet;
}

// 수신거부 등록 및 수정
export type PostRejectRequestType = {
  rejectNo?: string;
  sptNo: string;
  tel070No?: string;
  rejectTelNo?: string;
  rejectCd?: string;
  useYn?: string;
  rmk: string;
  userId: string;
};
