import { ApiResponseType } from "./apiResponse";

// 전송결과 그룹 조회
export type GetResultRequestType = {
  sptNo: string;
  fromDate: string;
  toDate?: string | null;
  mbtlNo?: string | null;
  page: number;
  limit: number;
};

//전송결과 목록 조회
export type GetResultDetaiListRequestType = {
  sptNo: string;
  msgKnd: string;
  sendGroup: string;
  page: number;
  limit: number;
};
// 전송결과 그룹 조회 엑셀 저장
export type GetResultExcelRequestType = {
  sptNo: string;
  fromDate: string;
  toDate?: string | null;
  mbtlNo?: string | null;
};

// 전송결과 목록 조회 엑셀 저장
export type GetResultDetailExcelRequestType = {
  sptNo: string;
  msgKnd: string;
  sendGroup: string;
};

// 전송결과 상세 조회
export type GetResultDetailRequestType = {
  msgKnd: string;
  yyyyMm: string;
  idx: number;
};

// 삭제
export type deleteRequestType = {
  sptNo: string;
  msgKnd: string;
  sendGroup: string;
};
