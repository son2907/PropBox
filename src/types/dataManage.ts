import { ApiResponseType } from "./apiResponse";

// 출력항목
export type OutItemsType = {
  itemNo: string;
  itemNm: string;
};
export interface OutItemsResponseType extends ApiResponseType {
  contents: OutItemsType[];
}

// 상담 상세항목
export type OutItmesDetailType = {
  detailNo: string;
  detailNm;
  string;
};

export interface OutItemsDetailResponseType extends ApiResponseType {
  contents: OutItmesDetailType[];
}

// 고객데이터 조회
export type CustDataRequestType = {
  sptNo: string;
  fromDate: string;
  toDate: string;
  callYn: string;
  itemNo: string;
  detailNo: string;
};

export type CustDataType = {
  idx: string;
  cstmrNm: string;
  mbtlNo: string;
  telNo: string;
  cstmrRmk: string;
  zip: string;
  addr: string;
  areaNm: string;
  itemNo3: string;
  itemNo2: string;
  itemNo1: string;
  itemNo4: string;
  itemNo5: string;
  itemNo7: string;
  itemNo16: string;
  itemNo15: string;
  itemNo17: string;
  itemNo18: string;
  itemNo19: string;
  itemNo20: string;
  itemNo21: string;
  itemNo30: string;
};

export interface CustDataResponseType extends ApiResponseType {
  contents: {
    headers: string[];
    data: CustDataType[];
  };
}

// 상담데이터 조회
export type cnsltDataRequestType = {
  sptNo: string;
  fromDate: string;
  toDate: string;
  callYn: string;
  itemNos: string[];
  addCond: string;
  addCondTxt: string;
};

export type cnsltDataType = {
  idx: number;
  cnsltDttm: string;
  cnsltSeNm: string;
  cstmrNm: string;
  cnsltTelno: string;
  mbtlNo: string;
  telNo: string;
  addr: string;
  spcmnt: string;
  cnsltntNm: string;
  cstmrRmk: string;
  itemNo1: string;
  itemNo2: string;
  itemNo3: string;
};

export type cnsltDataResponseType = {
  contents: {
    headers: string[];
    data: cnsltDataType[];
  };
};

//고객 데이터 엑셀 다운로드
export type CustomerDataExcelDownloadType = {
  sptNo: string,
  fromDate: string,
  toDate: string,
  callYn: string,
  itemNo: string,
  detailNo: string,
  addCond: string,
  itemNos: string[],
  page: 0,
  limit: 0,
  offset: 0
};