import { ApiResponseType } from "./apiResponse";

// 저장메시지 목록
export type GetBulkSaveRequestType = {
  page: number;
  limit: number;
};

export type GetBulkSaveMsg = {
  saveNo: string;
  advYn: string;
  advTxt: string;
  mssage: string;
  commUse: string;
};

export interface GetBulkSaveMsgListResponseType extends ApiResponseType {
  contents: GetBulkSaveMsg[];
  totalCnt: number;
  totalPage: number;
}

// 전송대상 목록
export type GetBulkMsgList = {
  sptNo: string;
  groupNo: string;
  groupNm: string;
  cnt: string;
};
export interface GetBulkMsgListResponseType extends ApiResponseType {
  contents: GetBulkMsgList[];
}

// 임시대상 확정인원 표시
export interface GetBulkTotalCntResponseType extends ApiResponseType {
  contents: {
    sptNo: string;
    totalCnt: string;
    userNo: string;
  };
}

// 전송대상:임시대상 목록
export type PostBulkTmpMsgList = {
  sn: string;
  mbtlNo: string;
  cstmrNm: string;
  dplctYn: string;
  validMbtlNo: string;
};

export type PostBulkTmpMsgRequestType = PostBulkTmpMsgList[];

// 전송대상:대상확인 확정 목록 / 각 탭별 총 인원수 / 수신거부목록 / 오류 목록 / 중복 목록 요청 타입
export type PostBulkListChkRequestType = {
  sptNo: string;
  groupNoList: string[];
  notGroupNoList: string[];
};

// 메세지 전송
export type BulksendMsgRequestType = {
  smsKnd: string;
  subject: string;
  mssage: string;
  sptNo: string;
  dsptchNo: string;
  adYn: string;
  recptnDt: string;
  recptnTm: string;
  sendDivYn: string;
  sendDivCnt: string;
  sendMinGap: string;
  testYn: string;
  mbtlNo: string;
  grpList: string[];
  notGrpList: string[];
};

// 임시대상 > 메시지 전송
export type BulksendTmpMsgRequestType = {
  smsKnd: string;
  subject: string;
  mssage: string;
  sptNo: string;
  dsptchNo: string;
  adYn: string;
  recptnDt: string;
  recptnTm: string;
  sendDivYn: string;
  sendDivCnt: string;
  sendMinGap: string;
  testYn: string;
  list: [{ mbtlNo: string; cstmrNm: string }];
};

export interface BulkTotalCntType extends ApiResponseType {
  contents: {
    sptNo: string;
    totalCnt1: string;
    totalCnt2: string;
    totalCnt3: string;
    totalCnt4: string;
  };
}
