import { ApiResponseType } from "./apiResponse";

// 발신 번호 목록 조회
export type CrtfcItem = {
  cid: string | null; // 발신자 번호
  sj: string | null; // 제목
  eno: string | null; // 직원 번호
  regDtm: string | null; // 등록 일시 (날짜와 시간)
};

export type CrtfcListRequestType = {
  cid?: string; //발신번호
};

export interface CrtfcListResponseType extends ApiResponseType {
  contents: CrtfcItem[];
}

// 인증번호 확인
type CrtfcCheckItem = {
  cid: string | null; // 발신번호
  userNo: string | null; // 사용자번호
  commUseYn: string | null; // 공용여부(Y/N)
  sj: string | null; // 제목
  seCd: string | null; // 구분_S(SMS)_A(ARS)
  eno: string | null; // 인증번호
  uid: string; // 업체코드
  callId: string | null; // 발송아이디
  resultCode: string | null; // 결과코드
};

export type CrtfcCheckRequestType = {
  cid?: string; //발신번호
  eno?: string; //인증번호
};

export interface CrtfcCheckResponseType extends ApiResponseType {
  contents: CrtfcCheckItem;
}

// 발신번호 저장 및 삭제
export type CrtfcSaveRequestType = {
  sptNo?: string | null;
  cid?: string | null; // 발신번호
  sj?: string | null; // 제목
  eno?: string; // 인증번호
  commUseYn?: string | null; // 공용여부
};

// 발신번호 삭제
export type CrtfcDeleteRequestType = {
  sptNo?: string | null;
  cid?: string | null; // 발신번호
};

// 인증 요청
export type CtrfcRequestType = {
  cid?: string; // 발신번호
  userNo?: string | null; // 사용자번호
  commUseYn?: string | null; // 공용여부
  sj?: string; // 제목
  seCd?: string | null; // 구분
  eno?: string; // 인증번호
  uid?: string | null; // 업체코드
  callId?: string | null; // 발송아이디
  resultCode?: string | null; // 결과코드드
};
