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
