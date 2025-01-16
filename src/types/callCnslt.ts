import { ApiResponseType } from "./apiResponse";

export type TelDataType = TelData[];

export type TelData = {
  telno: string; // 전화번호
  telTitle: string; // 통신구분(전화번호)
  commnSeCd: string; // 통신구분_1006000
  cntrctBgnde: string; // 사용시기
  cntrctEndde: string; // 사용종기
  lxtnNo: string; // 내선번호
  host: string; // 호스트
  id: string; // 아이디
  pwdNo: string; // 패스워드
  lastSptNo: string; // 최근현장번호
  useYn: string; // 사용여부
  delYn: string; // 삭제여부
  rmk: string; // 비고
  userId: string; // 사용자ID
  constntUserNo: string; // 구성원 번호
};

export interface TelApiResponseType extends ApiResponseType {
  contents: TelDataType;
}

// 전화받기, 전화걸기의 응답 데이터
export type TelCnsltType = {
  cnsltDttm: string;
  cnsltNo: string;
  cnsltTelno: string;
  cstmrNm: string;
  cstmrNo: string;
  sptNo: string;
};

export interface TelCnsltApiResponseType extends ApiResponseType {
  contents: TelCnsltType[];
}

// 메모 요청 body 데이터
export type MemoRequestBody = {
  sptNo: string;
  userNo?: string;
  userId?: string;
  memo: string;
};

type TelCnsltCn = {
  itemNo: string;
  detailNo: string;
};

// 전화상담 > 상담현황 api 응답
type ReportListItem = {
  sptNo: string | null;
  tmzonNm: string;
  callN: number;
  callY: number;
  callTot: number;
};

export interface ReportListResponseType extends ApiResponseType {
  contents: ReportListItem[];
}

export interface CnsltInfoRequestType {
  sptNo: string; // 지원 번호
  cstmrNo: string; // 고객 번호
  waitCstmrNo?: string; // 대기 고객 번호 (선택적)
  cnsltNo: string; // 상담 번호
  telId: string; // 전화 ID
  cnsltTelno: string; // 상담 전화번호
  callYn: string; // 걸기 여부
  trsmYn: string; // 통화 여부
  cnsltnt: string; // 상담자
  cnsltDt: string; // 상담 날짜
  cstmrNm: string; // 고객 이름
  mbtlNo: string; // 휴대전화 번호
  telNo: string; // 일반전화 번호
  cstmrRmk: string; // 고객 정보
  addr?: string; // 주소 (선택적)
  areaNo: string; // 지역 번호
  spcmnt: string; // 특이 사항
  legacySlutnId?: string; // 레거시 솔루션 ID (선택적)
  userId: string; // 사용자 ID
  telCnsltCnList: TelCnsltCn[]; // 상담 항목 목록
}

export type CnsltItem = {
  itemNo: string;
  sptNo: string | null;
  itemNm: string | null;
  lnupOrd: string | null;
  useYn: "Y" | "N" | null;
  delYn: string | null;
  userId: string | null;
};

export interface CnsltItemListResponseType extends ApiResponseType {
  contents: CnsltItem[];
}

// 지역
export type AreaListItem = {
  sptNo: string | null;
  areaNo: string | null;
  areaNm: string | null;
  lnupOrd: string | null;
  useYn: string | null;
  delYn: string | null;
  userId: string | null;
};

export interface AreaListItemListResponseType extends ApiResponseType {
  contents: AreaListItem[];
}

// 상세 항목
export type DetailItem = {
  sptNo: string | null;
  detailNo: string;
  itemNo: string;
  detailNm: string;
  lnupOrd: string;
  useYn: string;
  delYn: string | null;
  userId: string | null;
};

export interface DetailListResponseType extends ApiResponseType {
  contents: DetailItem[];
}

// <--------------문자 팝업--------------->

// 발신번호 목록 응답
export type GetCidItem = {
  cidSj: string;
  cid: string;
};

export interface GetCidListResponseType extends ApiResponseType {
  contents: GetCidItem[];
}

// 수신 거부 한 개 조회
export interface GetRejectMsgResponseType extends ApiResponseType {
  contents: string;
}

// 메세지 목록 조회
export type MsgSaveItem = {
  saveNo: string;
  sptNo: string;
  userNo: string;
  mssage: string;
};

export interface GetMsgsaveListResponseType extends ApiResponseType {
  contents: MsgSaveItem[];
}

// 한개의 문자에 대한 상세 정보
export type MsgGetOneRequestType = {
  saveNo: string; // 메세지 번호
};

// 메세지 저장 및 수정
export type MsgSaveRequestType = {
  saveNo: string;
  sptNo: string;
  userNo: string;
  commUseYn: string;
  mssage: string;
  userId: string;
};
