import { ApiResponseType } from "./apiResponse";

export type GetSmsbaseRequestType = {
  smsSeCd: string;
};

export type GetSmstelSelectRequestType = {
  mbtlNo: string;
};

export type GetCommonCodeRequestType = {
  upCd: string;
};

export type PostSmstelRequestType = {
  sptNo: string;
  mbtlNo: string;
  cstmrNm: "string";
  userId: "string";
};

export type PutSmstelRequestType = {
  sptNo: "string";
  mbtlNo: "string";
  cstmrNm: "string";
  userId: "string";
};

export type DeleteSmstelRequestType = {
  sptNo: "string";
  mbtlNo: "string";
  userId: "string";
};

// export interface GetSmsbaseResponseType extends ApiResponseType {
//   contents: SmsbaseType[];
// }
