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
  userNo: string;
  memo: string;
  userId: string;
};

type TelCnsltCn = {
  itemNo: string;
  detailNo: string;
};

export interface CnsltInfoRequestType {
  sptNo: string;
  cstmrNo: string;
  waitCstmrNo: string;
  cnsltNo: string;
  telId: string;
  cnsltTelno: string;
  callYn: string;
  trsmYn: string;
  cnsltnt: string;
  cstmrNm: string;
  mbtlNo: string;
  telNo: string;
  cstmrRmk: string;
  addr: string;
  areaNo: string;
  spcmnt: string;
  legacySlutnId: string;
  userId: string;
  telCnsltCnList: TelCnsltCn[];
}
