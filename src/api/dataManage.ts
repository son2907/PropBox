import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import { spt } from "../utils/sptNo";
import {
  cnsltDataRequestType,
  CustDataRequestType,
  CustomerDataExcelDownloadType,
  OutItemsDetailResponseType,
  OutItemsResponseType,
} from "../types/dataManage";
import DownloadExcel from "../utils/download";

export const API = {
  // 상담데이터 > 출력항목 조회
  getCnsltOutItems: async () => {
    const url = `/api/tel/cnslt/data/cnslt/outitems?sptNo=${spt}`;
    return await instance.get<OutItemsResponseType>(url);
  },
  // 상담데이터 > 조회조건
  getTelCnsltDataCnsltCond: async () => {
    const url = `/api/tel/cnslt/data/cnslt/cond`;
    return await instance.get<OutItemsResponseType>(url);
  },
  // 상담데이터 > 조회
  postTelCnsltDataCnslt: async (requestData: {
    body: cnsltDataRequestType;
  }) => {
    const url = `/api/tel/cnslt/data/cnslt`;
    return await instance.post(url, requestData.body);
  },
  // 고객데이터 > 상담항목 조회
  getTelCnsltDataCustItems: async () => {
    const url = `/api/tel/cnslt/data/cust/items?sptNo=${spt}`;
    return (await instance.get)<OutItemsResponseType>(url);
  },
  // 고객데이터 > 상담항목 상세 조회
  getTelCnsltDataCustItemsDetail: async ({ itemNo }: { itemNo: string }) => {
    const url = `/api/tel/cnslt/data/cust/items/detail?itemNo=${itemNo}&sptNo=${spt}`;
    return (await instance.get)<OutItemsDetailResponseType>(url);
  },
  // 고객데이터 > 조회
  postTelCnsltDataCust: async (requestData: { body: CustDataRequestType }) => {
    const url = `/api/tel/cnslt/data/cust`;
    return await instance.post(url, requestData.body);
  },
  // 엑셀 다운로드
  dataManageExcelDownload: async (requestData: { body: any }) => {
    const url = `/api/tel/cnslt/data/cnslt/front/exceldownload`;
    const response = await instance.post(url, requestData.body, {
      responseType: "blob",
    });
    DownloadExcel({ response });
    return response;
  },
  //고객데이터 - 엑셀 다운로드
  customerDataExcelDownload: async (requestData: {body : CustomerDataExcelDownloadType}) => {
    const url = '/api/tel/cnslt/data/cust/exceldownload';
    const response = await instance.post(url,requestData.body, {
      responseType: "blob",
    });
    DownloadExcel({ response });
    return response;
  },
};

const KEY = {
  getCnsltOutItems: () => ["/api/tel/cnslt/data/cnslt/outitems", spt],
  getTelCnsltDataCnsltCond: () => ["/api/tel/cnslt/data/cnslt/cond"],
  postTelCnsltDataCnslt: (requestData: { body: cnsltDataRequestType }) => [
    "/api/tel/cnslt/data/cnslt",
    requestData,
  ],
  getTelCnsltDataCustItems: () => ["/api/tel/cnslt/data/cust/items", spt],
  getTelCnsltDataCustItemsDetail: ({ itemNo }: { itemNo: string }) => [
    "/api/tel/cnslt/data/cust/items/detail",
    itemNo,
    spt,
  ],
  customerDataExcelDownload: () => ["/api/tel/cnslt/data/cust/exceldownload"],
};

// 출력항목 조회
export const useGetOutItems = () => {
  return useQuery({
    queryKey: KEY.getCnsltOutItems(),
    queryFn: async () => await API.getCnsltOutItems(),
  });
};

// 조회조건 조회
export const useGetCnsltCond = () => {
  return useQuery({
    queryKey: KEY.getTelCnsltDataCnsltCond(),
    queryFn: async () => await API.getTelCnsltDataCnsltCond(),
  });
};

// 상담데이터 조회
export const useGetCnsltData = () => {
  return useMutation({
    mutationFn: (requestData: { body: cnsltDataRequestType }) =>
      API.postTelCnsltDataCnslt(requestData),
    gcTime: 0,
  });
};

// 고객항목 조회
export const useGetCustItems = () => {
  return useQuery({
    queryKey: KEY.getTelCnsltDataCustItems(),
    queryFn: async () => await API.getTelCnsltDataCustItems(),
    gcTime: 0,
  });
};

// 고객항목 상세 조회
export const useGetCustItemsDetail = ({ itemNo }: { itemNo: string }) => {
  return useQuery({
    queryKey: KEY.getTelCnsltDataCustItemsDetail({ itemNo }),
    queryFn: async () => await API.getTelCnsltDataCustItemsDetail({ itemNo }),
    gcTime: 0,
  });
};

// 고객데이터 조회
export const useGetCustData = () => {
  return useMutation({
    mutationFn: (requestData: { body: CustDataRequestType }) =>
      API.postTelCnsltDataCust(requestData),
  });
};

// 엑셀 다운로드
export const useDataManageExcelDownload = () => {
  return useMutation({
    mutationFn: (requestData: { body: any }) =>
      API.dataManageExcelDownload(requestData),
  });
};

//고객데이터 - 엑셀 다운로드
export const customerDataExcelDownload = () => {
  return useMutation({
    mutationKey: KEY.customerDataExcelDownload(),
    mutationFn: (requestData: {body : CustomerDataExcelDownloadType}) => API.customerDataExcelDownload(requestData),
    onSuccess: (response) => {
      console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
  },
  onError: (error) => {
      console.error("API 호출 실패. 에러:", error); // 에러 로깅
  },
  })
};