import { ApiResponseType } from "./apiResponse";

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
};
