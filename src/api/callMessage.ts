// 전화 상담 > 문자 팝업 내 api

import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import getItemByStorageOne from "../utils/getItemByStorageOne";
import {
  GetCidListResponseType,
  GetRejectMsgResponseType,
  GetMsgsaveListResponseType,
  MsgSaveItem,
  MsgGetOneRequestType,
  MsgSaveRequestType,
} from "../types/callCnslt";

const API = {
  // 발신번호 목록 조회
  getCidList: async () => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const url = `/api/tel/cnslt/cidlist/${spt}`;
    return await instance.get<GetCidListResponseType>(url);
  },
  // 수신거부 한 개 조회
  getRejectOne: async () => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const url = `/api/msg/reject/one/${spt}`;
    return await instance.get<GetRejectMsgResponseType>(url);
  },
  // 메세지 목록 조회 (우측 상단)
  getMsgsaveList: async () => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo; // 현장 선택 정보
    const url = `/api/spt/msgsave/list/${spt}`;
    return await instance.get<GetMsgsaveListResponseType>(url);
  },
  //메세지 상세 조회
  getMsgsaveOne: async ({ saveNo }: MsgGetOneRequestType) => {
    const url = `/api/spt/msgsave/${saveNo}`;
    return await instance.get<MsgSaveItem>(url);
  },
  // 메세지 저장
  postMsg: async (requestData: { body: MsgSaveRequestType }) => {
    const url = `/api/spt/msgsave`;
    return await instance.post(url, requestData.body);
  },
  // 메세지 수정
  putMsg: async (requestData: { body: MsgSaveRequestType }) => {
    const url = `/api/spt/msgsave`;
    return await instance.put(url, requestData.body);
  },
  // 메세지 삭제
  deleteMsg: async ({ saveNo }: MsgGetOneRequestType) => {
    const url = `/api/spt/msgsave/${saveNo}`;
    return await instance.delete(url);
  },
};

const KEY = {
  getCidList: () => ["/api/tel/cnslt/cidlist"],
  getRejectOne: () => ["/api/msg/reject/one"],
  getMsgsaveList: () => ["/api/spt/msgsave/list"],
  getMsgsaveOne: ({ saveNo }: MsgGetOneRequestType) => [
    "/api/spt/msgsave",
    saveNo,
  ],
  postMsg: () => ["/api/spt/msgsave", "post"],
  putMsg: () => ["/api/spt/msgsave", "put"],
  deleteMsg: ({ saveNo }: MsgGetOneRequestType) => [
    "/api/spt/msgsave",
    "delete",
    saveNo,
  ],
};

// 발신번호 목록 조회
export const useGetCidList = () => {
  return useQuery({
    queryKey: KEY.getCidList(),
    queryFn: async () => {
      return await API.getCidList();
    },
  });
};

// 수신거부 한 개 조회
export const useRejectOne = () => {
  return useQuery({
    queryKey: KEY.getRejectOne(),
    queryFn: async () => {
      return await API.getRejectOne();
    },
  });
};

// 메세지 목록 조회 (우측 상단)
export const useMsgList = () => {
  return useQuery({
    queryKey: KEY.getMsgsaveList(),
    queryFn: async () => {
      return await API.getMsgsaveList();
    },
  });
};

// 메세지 상세 조회
export const useMsgOneList = ({ saveNo }: MsgGetOneRequestType) => {
  return useQuery({
    queryKey: KEY.getMsgsaveOne({ saveNo }),
    queryFn: async () => {
      return await API.getMsgsaveOne({ saveNo });
    },
  });
};

//메세지 저장
export const usePostMsg = () => {
  return useMutation({
    mutationFn: (requstData: { body: MsgSaveRequestType }) =>
      API.postMsg(requstData),
    mutationKey: KEY.postMsg(),
  });
};

//메세지 수정
export const usePutMsg = () => {
  return useMutation({
    mutationFn: (requstData: { body: MsgSaveRequestType }) =>
      API.putMsg(requstData),
    mutationKey: KEY.putMsg(),
  });
};

//메세지 삭제
export const useDeleteMsg = ({ saveNo }: MsgGetOneRequestType) => {
  return useMutation({
    mutationFn: ({ saveNo }: MsgGetOneRequestType) => API.deleteMsg({ saveNo }),
    mutationKey: KEY.deleteMsg({ saveNo }),
  });
};
