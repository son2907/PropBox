import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BulksendMsgRequestType,
  BulksendTmpMsgRequestType,
  BulkTotalCntType,
  GetBulkMsgListResponseType,
  GetBulkSaveMsgListResponseType,
  GetBulkSaveRequestType,
  GetBulkTotalCntResponseType,
  PostBulkListChkRequestType,
} from "../types/messageBulk";
import instance from "../utils/axiosInstance";
import { spt } from "../utils/sptNo";

export const API = {
  // 문자관리 > 대량문자 > 저장메시지 목록
  getBulkSaveMsgList: async ({ page, limit }: GetBulkSaveRequestType) => {
    const url = `/api/spt/smstel/alot/savedmsg/list/${spt}?page=${page}&limit=${limit}`;
    return await instance.get<GetBulkSaveMsgListResponseType>(url);
  },
  // 문자관리 > 대량문자 > 전송대상 목록
  getBulkMsgList: async () => {
    const url = `/api/spt/smstel/alot/list/${spt}`;
    return await instance.get<GetBulkMsgListResponseType>(url);
  },
  // 문자관리 > 대량문자 > 임시대상 > 임시대상 목록 (복붙데이터 input)
  postBulkTmpList: async (requestData) => {
    const url = `/api/spt/smstel/alot/tmp`;
    return await instance.post(url, requestData.body);
  },
  // 문자관리 > 대량문자 > 임시대상 확정인원 표시
  getBulkTotalCnt: async () => {
    const url = `/api/spt/smstel/alot/tmp/totalCnt/${spt}`;
    return await instance.get<GetBulkTotalCntResponseType>(url);
  },
  // 문자관리 > 대량문자 > 임시대상 - 대상확인 탭별 목록
  postBulkTmpChkList: async ({ tabFlag }: { tabFlag: string }) => {
    const url = `/api/spt/smstel/alot/tmp/list/chk/${spt}/${tabFlag}`;
    return await instance.post(url);
  },
  // 문자관리 > 대량문자 > 임시대상 - 대상확인 탭별 총인원수
  getBulkTmpChekTotal: async () => {
    const url = `/api/spt/smstel/alot/tmp/list/chkTotalCnt/${spt}`;
    return await instance.get<BulkTotalCntType>(url);
  },
  // 문자관리 > 대량문자 > 전송 대상:대상 확인 확정 목록
  postBulkChk: async (requestData: { body: PostBulkListChkRequestType }) => {
    const url = `/api/spt/smstel/alot/list/chk`;
    return await instance.post(url, requestData.body);
  },
  // 문자관리 > 대량문자 > 전송 대상:대상 확인 각 탭별 총인원수
  postBulkChkTotalCnt: async (requestData: {
    body: PostBulkListChkRequestType;
  }) => {
    const url = `/api/spt/smstel/alot/list/chkTotalCnt`;
    return await instance.post<BulkTotalCntType>(url, requestData.body);
  },
  // 문자관리 > 대량문자 > 전송 대상:대상 확인 수신거부 목록
  postBulkreject: async (requestData: { body: PostBulkListChkRequestType }) => {
    const url = `/api/spt/smstel/alot/list/chk4`;
    return await instance.post(url, requestData.body);
  },
  // 문자관리 > 대량문자 > 전송 대상:대상 확인 오류 목록
  postBulkError: async (requestData: { body: PostBulkListChkRequestType }) => {
    const url = `/api/spt/smstel/alot/list/chk3`;
    return await instance.post(url, requestData.body);
  },
  // 문자관리 > 대량문자 > 전송 대상:대상 확인 중복 목록
  postDup: async (requestData: { body: PostBulkListChkRequestType }) => {
    const url = `/api/spt/smstel/alot/list/chk2`;
    return await instance.post(url, requestData.body);
  },
  // 메세지 전송
  sendMsg: async (requestData: { body: BulksendMsgRequestType }) => {
    const url = `/api/spt/smstel/alot/msgsave`;
    return await instance.post(url, requestData.body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  // 메세지 전송
  sendTmpMsg: async (requestData: { body: BulksendTmpMsgRequestType }) => {
    const url = `/api/spt/smstel/alot/msgsavetmp`;
    return await instance.post(url, requestData.body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

const KEY = {
  getBulkSaveMsgList: ({ page, limit }: GetBulkSaveRequestType) => [
    "/api/spt/smstel/alot/savedmsg/list",
    spt,
    page,
    limit,
  ],
  getBulkMsgList: () => ["/api/spt/smstel/alot/list", spt],
  getBulkTotalCnt: () => ["/api/spt/smstel/alot/list", spt],
  getBulkTmpChekTotal: () => ["/api/spt/smstel/alot/tmp/list/chkTotalCnt", spt],
};

// 문자관리 > 대량문자 > 저장메시지 목록
export const useGetBulkSaveMsgList = ({
  page,
  limit,
}: GetBulkSaveRequestType) => {
  return useQuery({
    queryKey: KEY.getBulkSaveMsgList({ page, limit }),
    queryFn: async () => await API.getBulkSaveMsgList({ page, limit }),
    gcTime: 0,
  });
};

// 문자관리 > 대량문자 > 전송대상 목록
export const useGetBulkMsgList = () => {
  return useQuery({
    queryKey: KEY.getBulkMsgList(),
    queryFn: async () => await API.getBulkMsgList(),
    gcTime: 0,
  });
};

// 문자관리 > 대량문자 > 임시대상 - 임시대상 목록 (복붙데이터 input)
export const usePostBulkTmpList = () => {
  return useMutation({
    mutationFn: (requstData: { body }) => API.postBulkTmpList(requstData),
  });
};

// 문자관리 > 대량문자 > 임시대상 확정인원 표시
export const useGetBulkTotalCnt = () => {
  return useQuery({
    queryKey: KEY.getBulkTotalCnt(),
    queryFn: async () => await API.getBulkTotalCnt(),
    gcTime: 0,
  });
};

// 임시대상 > 탭별 목록
export const usePostBulkTmpChkList = () => {
  return useMutation({
    mutationFn: (tabFlag: string) => API.postBulkTmpChkList({ tabFlag }),
  });
};

// 임시대상 > 탭별 총 인원수
export const useGetBulkTmpChkTotal = () => {
  return useQuery({
    queryKey: KEY.getBulkTmpChekTotal(),
    queryFn: async () => await API.getBulkTmpChekTotal(),
    gcTime: 0,
  });
};

// 전송 대상:대상 확인 확정 목록
export const usePostBulkChk = () => {
  return useMutation({
    mutationFn: (requstData: { body: PostBulkListChkRequestType }) =>
      API.postBulkChk(requstData),
    gcTime: 0,
  });
};
// 전송 대상:대상 확인 각 탭별 총인원수
export const usePostBulkChkTotalCnt = () => {
  return useMutation({
    mutationFn: (requstData: { body: PostBulkListChkRequestType }) =>
      API.postBulkChkTotalCnt(requstData),
    gcTime: 0,
  });
};
// 전송 대상:대상 확인 수신거부 목록
export const usePostBulkreject = () => {
  return useMutation({
    mutationFn: (requstData: { body: PostBulkListChkRequestType }) =>
      API.postBulkreject(requstData),
    gcTime: 0,
  });
};
// 전송 대상:대상 확인 오류 목록
export const usePostBulkError = () => {
  return useMutation({
    mutationFn: (requstData: { body: PostBulkListChkRequestType }) =>
      API.postBulkError(requstData),
    gcTime: 0,
  });
};
// 전송 대상:대상 확인 중복 목록
export const usePostBulkDuplication = () => {
  return useMutation({
    mutationFn: (requstData: { body: PostBulkListChkRequestType }) =>
      API.postDup(requstData),
    gcTime: 0,
  });
};

// 문자 전송
export const useBulkSendMsg = () => {
  return useMutation({
    mutationFn: (requstData: { body: BulksendMsgRequestType }) =>
      API.sendMsg(requstData),
  });
};

// 문자 전송
export const useBulkTmpSendMsg = () => {
  return useMutation({
    mutationFn: (requstData: { body: BulksendTmpMsgRequestType }) =>
      API.sendTmpMsg(requstData),
  });
};
