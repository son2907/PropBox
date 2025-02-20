import { ApiResponseType } from "./apiResponse";

export type SocketContentsType = {
  userNo: string;
  sptNo: string;
  deviceSe: string;
  commCarrier: string;
  commnHost: string;
  commnId: string;
  commnPw: string;
};

export interface SocketResponseType extends ApiResponseType {
  contents: SocketContentsType;
}

export type FindToastCustomRequestType = {
  telno?: string;
};

export interface FindToastCustomResponseType extends ApiResponseType {
  contents: {
    sptNo: string | null;
    cstmrNo: string | null;
    cnsltNo: string | null;
    cstmrNm: string | null;
    cnsltTelno: string | null;
    mbtlNo: string | null;
    telNo: string | null;
    cstmrRmk: string | null;
    areaNo: string | null;
    addr: string | null;
    rctnRejectXyn: string | null;
    complianceRate: string | null;
    hopeBalance: string | null;
    legacySlutnId: string | null;
  };
}
