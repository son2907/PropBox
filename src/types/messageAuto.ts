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
};

export type DeleteSmstelRequestType = {
  sptNo: string;
  mbtlNo: string;
  userId: string;
};

// export interface GetSmsbaseResponseType extends ApiResponseType {
//   contents: SmsbaseType[];
// }
