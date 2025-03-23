import { useQuery } from "@tanstack/react-query";
import {
  GraphDataRequestType,
  GraphDataResponseType,
  GraphItemResponseType,
} from "../types/cnsultAnalysis";
import instance from "../utils/axiosInstance";
import { spt } from "../utils/sptNo";

export const API = {
  // 그래프 조회 항목 조회
  getGraphItems: async () => {
    const url = `/api/tel/cnslt/stats/graph/item?sptNo=${spt}`;
    return await instance.get<GraphItemResponseType>(url);
  },
  // 그래프 데이터 조회
  getGraphData: async ({
    fromDate,
    toDate,
    callYn,
    itemNo,
  }: GraphDataRequestType) => {
    const url = `/api/tel/cnslt/stats/graph?sptNo=${spt}&fromDate=${fromDate}&toDate=${toDate}&callYn=${callYn}&itemNo=${itemNo}`;
    return await instance.get<GraphDataResponseType>(url);
  },
};

const KEY = {
  getGraphItems: () => ["/api/tel/cnslt/stats/graph/item", spt],
  getGraphData: ({
    fromDate,
    toDate,
    callYn,
    itemNo,
  }: GraphDataRequestType) => [
    "/api/tel/cnslt/stats/graph",
    fromDate,
    toDate,
    callYn,
    itemNo,
  ],
};

// 그래프 조회 항목 조회
export const useGetGraphItems = () => {
  return useQuery({
    queryKey: KEY.getGraphItems(),
    queryFn: async () => await API.getGraphItems(),
  });
};

// 그래프 데이터 조회
export const useGetGraphData = ({
  fromDate,
  toDate,
  callYn,
  itemNo,
}: GraphDataRequestType) => {
  return useQuery({
    queryKey: KEY.getGraphData({ fromDate, toDate, callYn, itemNo }),
    queryFn: async () =>
      await API.getGraphData({ fromDate, toDate, callYn, itemNo }),
    gcTime: 0,
    enabled: !!fromDate && !!toDate && !!callYn && !!itemNo,
  });
};
