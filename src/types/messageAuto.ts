import { ApiResponseType } from "./apiResponse";

export type GetSmsbaseRequestType = {
  smsSeCd: string;
};

export type SmsbaseType = {
  sptNo: string;
  smsSeCd: string;
  smsKnd: string;
  useYn: string | null;
  mssage: string | null;
};

export interface GetSmsbaseResponseType extends ApiResponseType {
  contents: SmsbaseType;
}

export type SmsTelList = {
  sptNo: string;
  mbtlNo: string;
  cstmrNm: string;
  recptnNo: string;
};

export interface GetSmsTelListResponseType extends ApiResponseType {
  contents: SmsTelList[];
}

export type GetSmstelSelectRequestType = {
  mbtlNo: string;
};

export type GetCommonCodeRequestType = {
  upCd: string;
};

export type CommonCodeType = {
  cd: string | null;
  upCd: string | null;
  cdNm: string | null;
  othrSysCd: string | null;
  chartrRef1: string | null;
  chartrRef2: string | null;
  chartrRef3: string | null;
  chartrRef4: string | null;
  chartrRef5: string | null;
  numRef1: string | null;
  numRef2: string | null;
  numRef3: string | null;
  numRef4: string | null;
  numRef5: string | null;
  useYn: string | null;
  delYn: string | null;
  lnupOrd: string | null;
  updPsblYn: string | null;
  rmk: string | null;
};

export type CommonCodeResponseType = {
  contents: CommonCodeType[];
};

export type PostSmstelRequestType = {
  sptNo: string;
  mbtlNo: string;
  cstmrNm: string;
  userId: string;
};

export type PutSmstelRequestType = {
  sptNo: string;
  mbtlNo: string;
  cstmrNm: string;
  userId: string;
  recptnNo: string;
};

export type DeleteSmstelRequestType = {
  sptNo: string;
  mbtlNo: string;
  userId: string;
};

export type PostSmsmngAutoRequestType = {
  sptNo: string | null;
  mssage: string | null; // 메인 메세지
  dsptchNo: string | null; // 발신번호
  dsptchBgnde: string | null; // 발송 시작 날짜
  dsptchEndde: string | null; // 발송 끝 날짜
  userId: string | null;
  smsBassList: [
    {
      sptNo: string | null;
      smsSeCd: string | null;
      smsKnd: string | null;
      mssage: string | null;
      recptnTm: string | null;
      useYn: string | null; // 이건뭐지.. 백엔드 문서 부실..
      userId: string | null;
    },
  ];
  smsTMZonList: [
    {
      sptNo: string | null;
      tmZon: string | null;
      useYn: string | null;
      userId: string | null;
    },
  ];
};
