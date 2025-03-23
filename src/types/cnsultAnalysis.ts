import { ApiResponseType } from "./apiResponse";

// 조회 항목 조회
export type graphItemType = {
  itemNo: string;
  itemNm: string;
};

export type GraphItemResponseType = {
  contents: graphItemType[];
};

// 그래프 데이터 조회
// 요청 양식
export type GraphDataRequestType = {
  fromDate: string;
  toDate: string;
  callYn: string;
  itemNo: string;
};

// 응답 양식
export type GraphType = {
  itemNm: string;
  cnt: number;
};

export interface GraphDataResponseType extends ApiResponseType {
  contents: GraphType[];
}
