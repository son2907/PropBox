import { ApiResponseType } from "./apiResponse";

// 방통위 목록 조회
export type KccRequestType = {
  groupNo: string | number;
};

export type KccListType = {
  groupNo: number | null;
  sttemntTelno: string | null;
  encptMbtlNo: string | number | null;
  mbtlNo: null;
  msgCnt: number | null;
  grpNm: string | null;
};

export interface KccListResponseType extends ApiResponseType {
  contents: KccListType[];
}

// 방통위 신고 메세지 목록 조회

export type KccMsgRequestType = {
  encptMbtlNo: string | null;
};

export type KccMsgType = {
  trnsmitTxt: string | null;
  smsKnd: string | null;
  mssage: string | null;
};

export interface KccMsgResponseType extends ApiResponseType {
  contents: KccMsgType[];
}

// 방통위 수신거부 등록
export type KccRejectRequestType = {
  mbtlNo: string;
  encptMbtlNo: string;
};

// 방통위 엑셀 업로드
export type UploadKccExcelRequestType = {
  groupNo: number; // 쿼리 파라미터
  mbtlNoPos: number; // 쿼리 파라미터
  file: File; // 업로드할 파일
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
