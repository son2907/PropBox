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
  recptnNo: string;
  userId: string;
};

type SmsBassItem = {
  sptNo: string;
  smsSeCd: string;
  smsKnd: string;
  mssage: string;
  recptnTm: string;
  useYn: string | null;
  userId: string;
};

type SmsTMZonItem = {
  sptNo: string;
  tmZon: string;
};

export type PostSmsmngAutoRequestType = {
  sptNo: string;
  mssage: string;
  dsptchNo: string;
  dsptchBgnde: string;
  dsptchEndde: string;
  userId: string;
  smsBassList: SmsBassItem[];
  smsTMZonList: SmsTMZonItem[];
};

export type TestMsgRequestType = {
  sptNo: string | null;
  smsKnd: string | null;
  mssage: string | null;
  trnsmitTxt: string | null;
  mbtlNo: string | null;
  dsptchNo: string | null;
};
