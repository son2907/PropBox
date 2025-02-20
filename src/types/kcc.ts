import { ApiResponseType } from "./apiResponse";

// 방통위 목록 조회
export type KccRequestType = {
  mbtlNo?: string;
  groupNo?: string;
  page: number;
  limit: number;
};

export type KccListType = {
  idx: number;
  groupNo: number | null;
  kccGroupNm: number | null;
  sttemntTelno: string | null;
  encptMbtlNo: string | number | null;
  mbtlNo: null;
  msgCnt: number | null;
  grpNm: string | null;
  mgm: number;
  event: number;
  cnslt: number;
};

export interface KccListResponseType extends ApiResponseType {
  contents: KccListType[];
  totalCnt: number | null;
  totalPage: number | null;
}

// 방통위 신고 메세지 목록 조회
export type KccMsgRequestType = {
  mbtlNo: string | null;
  page: number;
  limit: number;
};

export type KccMsgType = {
  trnsmitTxt: string | null;
  smsKnd: string | null;
  mssage: string | null;
};

export interface KccMsgResponseType extends ApiResponseType {
  contents: KccMsgType[];
  totalCnt: number | null;
  totalPage: number | null;
}

// 방통위 수신거부 등록
export type KccRejectRequestType = {
  mbtlNo: string;
};

// 방통위 엑셀 업로드
export type UploadKccExcelRequestType = {
  sptNo: string;
  groupNo: string;
  mbtlNoList: [
    {
      id: number;
      mbtlNo: string;
    },
  ];
};

// 방통위 신고 그룹 목록 조회(팝업)
export type KccGroupListType = {
  groupNo: string;
  groupNm: string;
};

export interface KccGroupListResponseType extends ApiResponseType {
  contents: KccGroupListType[];
}

// 방통위 그룹셀 팝업
// 등록
export type KccGroupPostRequestType = {
  sptNo: string;
  groupNm: string;
};

// 수정
export type KccGroupPutRequestType = {
  groupNo: string;
  groupNm: string;
};

// 삭제
export type KccGroupDeleteRequestType = {
  groupNo: string;
};
