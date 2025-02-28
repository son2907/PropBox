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

export type ResultMSgType = {
  idx: number;
  msgKnd: string;
  sendGroup: string;
  sendTm: string;
  msg: string;
  callback: string;
  sendCnt: number;
  waitCnt: number;
  succCnt: number;
  failCnt: number;
  smsCnt: number;
  lmsCnt: number;
  mmsCnt: number;
};
export interface ResultResponseType extends ApiResponseType {
  contents: ResultMSgType[];
  totalCnt: number;
  totalPage: number;
}

//전송결과 목록 조회
export type GetResultDetaiListRequestType = {
  sptNo: string;
  msgKnd: string;
  sendGroup: string;
  page: number;
  limit: number;
};

export type ResultDetailListType = {
  idx: number;
  msgKnd: string;
  yyyyMm: string;
  sendDate: string;
  mbtlNo: string;
  sendStat: string;
  sendResult: string;
  rmk: string;
};

export interface ResultDetailListResponseType extends ApiResponseType {
  contents: ResultDetailListType[];
  totalCnt: number;
  totalPage: number;
}

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

export type ResultDetailType = {
  msgKnd: string;
  sendResult: string;
  rmk: string;
  sendDate: string;
  rsltDate: string;
  mbtlNo: string;
  callback: string;
  msg: string;
};

export interface ResultDetailResponseType extends ApiResponseType {
  contents: ResultDetailType;
}

// 삭제
export type deleteRequestType = {
  sptNo: string;
  msgKnd: string;
  sendGroup: string;
};
