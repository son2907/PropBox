import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteRequestType,
  GetResultDetailExcelRequestType,
  GetResultDetaiListRequestType,
  GetResultDetailRequestType,
  GetResultExcelRequestType,
  GetResultRequestType,
  ResultDetailListResponseType,
  ResultDetailResponseType,
  ResultResponseType,
} from "../types/messageResult";
import instance from "../utils/axiosInstance";
import DownloadExcel from "../utils/download";

export const API = {
  // 전송 결과 그룹 조회
  getMsgResult: async ({
    sptNo,
    fromDate,
    toDate,
    mbtlNo,
    page,
    limit,
  }: GetResultRequestType) => {
    let url = `/api/msg/result/list?sptNo=${sptNo}&fromDate=${fromDate}&page=${page}&limit=${limit}`;
    if (toDate) url += `&toDate=${toDate}`;
    if (mbtlNo) url += `&mbtlNo=${mbtlNo}`;
    return await instance.get<ResultResponseType>(url);
  },
  // 전송 결과 그룹 조회 엑셀 저장
  getMsgResultExcel: async ({
    sptNo,
    fromDate,
    toDate,
    mbtlNo,
  }: GetResultExcelRequestType) => {
    let url = `/api/msg/result/list/exceldownload?sptNo=${sptNo}&fromDate=${fromDate}`;
    if (toDate) url += `&toDate=${toDate}`;
    if (mbtlNo) url += `&mbtlNo=${mbtlNo}`;

    const response = await instance.get(url, {
      responseType: "blob",
    });

    DownloadExcel({ response });
    return response;
  },
  // 전송 결과 목록 조회
  getMsgResultDetailList: async ({
    sptNo,
    msgKnd,
    sendGroup,
    page,
    limit,
  }: GetResultDetaiListRequestType) => {
    const url = `/api/msg/result/list/detail/list?sptNo=${sptNo}&msgKnd=${msgKnd}&sendGroup=${sendGroup}&page=${page}&limit=${limit}`;
    return await instance.get<ResultDetailListResponseType>(url);
  },
  // 전송 결과 목록 엑셀
  getMsgResultDetailExcel: async ({
    sptNo,
    msgKnd,
    sendGroup,
  }: GetResultDetailExcelRequestType) => {
    const url = `/api/msg/result/list/detail/list/exceldownload?sptNo=${sptNo}&msgKnd=${msgKnd}&sendGroup=${sendGroup}`;
    const response = await instance.get(url, {
      responseType: "blob",
    });

    DownloadExcel({ response });
    return response;
  },
  // 전송 결과 상세 조회
  getResultDetail: async ({
    msgKnd,
    yyyyMm,
    idx,
  }: GetResultDetailRequestType) => {
    const url = `/api/msg/result/list/detail?msgKnd=${msgKnd}&yyyyMm=${yyyyMm}&idx=${idx}`;
    return await instance.get<ResultDetailResponseType>(url);
  },
  // 대기메세지 삭제
  deleteResultMsg: async ({ sptNo, msgKnd, sendGroup }: deleteRequestType) => {
    const url = `/api/spt/msgsave/${sptNo}/${msgKnd}/${sendGroup}`;
    return await instance.delete(url);
  },
};

const KEY = {
  getMsgResult: ({
    sptNo,
    fromDate,
    toDate,
    mbtlNo,
    page,
    limit,
  }: GetResultRequestType) => [
    "/api/msg/result/list",
    sptNo,
    fromDate,
    toDate,
    mbtlNo,
    page,
    limit,
  ],
  getMsgResultExcel: ({
    sptNo,
    fromDate,
    toDate,
    mbtlNo,
  }: GetResultExcelRequestType) => [
    "/api/msg/result/list/exceldownload",
    sptNo,
    fromDate,
    toDate,
    mbtlNo,
  ],
  getMsgResultDetailList: ({
    sptNo,
    msgKnd,
    sendGroup,
    page,
    limit,
  }: GetResultDetaiListRequestType) => [
    "/api/msg/result/list/detail/list",
    sptNo,
    msgKnd,
    sendGroup,
    page,
    limit,
  ],
  getMsgResultDetailExcel: ({
    sptNo,
    msgKnd,
    sendGroup,
  }: GetResultDetailExcelRequestType) => [
    "/api/msg/result/list/detail/list/exceldownload",
    sptNo,
    msgKnd,
    sendGroup,
  ],
  getResultDetail: ({ msgKnd, yyyyMm, idx }: GetResultDetailRequestType) => [
    "/api/msg/result/list/detail",
    msgKnd,
    yyyyMm,
    idx,
  ],
};

// 전송 결과 그룹 조회
export const useMsgResult = ({
  sptNo,
  fromDate,
  toDate,
  mbtlNo,
  page,
  limit,
}: GetResultRequestType) => {
  return useQuery({
    queryKey: KEY.getMsgResult({
      sptNo,
      fromDate,
      toDate,
      mbtlNo,
      page,
      limit,
    }),
    queryFn: async () =>
      await API.getMsgResult({ sptNo, fromDate, toDate, mbtlNo, page, limit }),
  });
};

// 전송 결과 그룹 조회 엑셀 저장
export const useMsgResultExcel = ({
  sptNo,
  fromDate,
  toDate,
  mbtlNo,
}: GetResultExcelRequestType) => {
  return useQuery({
    queryKey: KEY.getMsgResultExcel({
      sptNo,
      fromDate,
      toDate,
      mbtlNo,
    }),
    queryFn: async () =>
      await API.getMsgResultExcel({
        sptNo,
        fromDate,
        toDate,
        mbtlNo,
      }),
    enabled: false,
  });
};

// 전송 결과 목록 조회
export const useMsgResultDetailList = ({
  sptNo,
  msgKnd,
  sendGroup,
  page,
  limit,
}: GetResultDetaiListRequestType) => {
  return useQuery({
    queryKey: KEY.getMsgResultDetailList({
      sptNo,
      msgKnd,
      sendGroup,
      page,
      limit,
    }),
    queryFn: async () =>
      await API.getMsgResultDetailList({
        sptNo,
        msgKnd,
        sendGroup,
        page,
        limit,
      }),
    enabled: !!msgKnd && !!sendGroup && !!page && !!limit,
  });
};

// 전송 결과 목록 엑셀
export const useMsgResultDetailExcel = ({
  sptNo,
  msgKnd,
  sendGroup,
}: GetResultDetailExcelRequestType) => {
  return useQuery({
    queryKey: KEY.getMsgResultDetailExcel({
      sptNo,
      msgKnd,
      sendGroup,
    }),
    queryFn: async () =>
      await API.getMsgResultDetailExcel({
        sptNo,
        msgKnd,
        sendGroup,
      }),
    enabled: false,
  });
};

// 전송 결과 상세 조회
export const useMsgResultDetail = ({
  msgKnd,
  yyyyMm,
  idx,
}: GetResultDetailRequestType) => {
  return useQuery({
    queryKey: KEY.getResultDetail({
      msgKnd,
      yyyyMm,
      idx,
    }),
    queryFn: async () =>
      await API.getResultDetail({
        msgKnd,
        yyyyMm,
        idx,
      }),
  });
};

//메세지 삭제
export const useDeleteMsg = () => {
  return useMutation({
    mutationFn: ({ sptNo, msgKnd, sendGroup }: deleteRequestType) =>
      API.deleteResultMsg({ sptNo, msgKnd, sendGroup }),
  });
};
