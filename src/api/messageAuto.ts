import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import { spt } from "../utils/sptNo";
import {
  CommonCodeResponseType,
  DeleteSmstelRequestType,
  GetCommonCodeRequestType,
  GetSmsbaseRequestType,
  GetSmsbaseResponseType,
  GetSmsTelListResponseType,
  GetSmstelSelectRequestType,
  PostSmsmngAutoRequestType,
  PostSmstelRequestType,
  PutSmstelRequestType,
  TestMsgRequestType,
} from "../types/messageAuto";

export const API = {
  // 기본메세지 조회
  getSmsBase: async ({ smsSeCd }: GetSmsbaseRequestType) => {
    const url = `/api/smsbass/auto/${spt}/${smsSeCd}`;
    return await instance.get<GetSmsbaseResponseType>(url);
  },
  // 자동문자 발송 조회
  getSmsmng: async () => {
    const url = `/api/spt/smsmng/${spt}`;
    return await instance.get<any>(url);
  },
  // 발송대상 목록보기
  getSmstelList: async () => {
    const url = `/api/spt/smstel/list/${spt}`;
    return await instance.get<GetSmsTelListResponseType>(url);
  },
  // 발송대상 상세보기
  getSmstelSelect: async ({ mbtlNo }: GetSmstelSelectRequestType) => {
    const url = `/api/spt/smstel/select/${spt}/${mbtlNo}`;
    return await instance.get<any>(url);
  },
  // 자동문자 전체 저장
  postSmsAutoSave: async (requestData: { body: PostSmsmngAutoRequestType }) => {
    const url = `/api/spt/smsmng/auto`;
    return await instance.post(url, requestData.body);
  },
  // 공통코드 조회
  getCommonCode: async ({ upCd }: GetCommonCodeRequestType) => {
    const url = `/api/common/code/simpleList?upCd=${upCd}`;
    return await instance.get<CommonCodeResponseType>(url);
  },
  // 자동문자 수신동의 고객 외 고객문자 조회
  getSmsmngCstmr: async () => {
    const url = `/api/spt/smsmng/cstmr/${spt}`;
    return await instance.get<any>(url);
  },
  // 발송번호 저장
  postSmstel: async (requestData: { body: PostSmstelRequestType }) => {
    const url = `/api/spt/smstel`;
    return await instance.post(url, requestData.body);
  },
  // 발송대상정보 수정
  putSmstel: async (requestData: { body: PutSmstelRequestType }) => {
    const url = `/api/spt/smstel`;
    return await instance.put(url, requestData.body);
  },
  // 발송대상정보 삭제
  deleteSmstel: async (requestData: { body: DeleteSmstelRequestType }) => {
    const url = `/api/spt/smstel/remove`;
    return await instance.post(url, requestData.body);
  },
  // 실험발송
  sendTestMsg: async (requestData: { body: TestMsgRequestType }) => {
    const url = `/api/msg/send/testmsg`;
    return await instance.post(url, requestData.body);
  },
  // 수신동의 실험발송
  sendTestMsguseYn: async (requestData: { body: TestMsgRequestType }) => {
    const url = `/api/msg/send/custom/testmsg`;
    return await instance.post(url, requestData.body);
  },
};

const KEY = {
  getSmsBase: ({ smsSeCd }: GetSmsbaseRequestType) => [
    "/api/smsbass/auto",
    smsSeCd,
  ],
  getSmsmng: () => ["/api/api/spt/smsmng", spt],
  getSmstelList: () => ["/api/spt/smstel/list", spt],
  getSmstelSelect: ({ mbtlNo }: GetSmstelSelectRequestType) => [
    "/api/spt/smstel/select",
    spt,
    mbtlNo,
  ],
  getCommonCode: ({ upCd }: GetCommonCodeRequestType) => [
    "/api/common/code/simpleList",
    upCd,
  ],
  getSmsmngCstmr: () => ["/api/spt/smsmng/cstmr/", spt],
};

// 기본메세지 조회
export const useGetSmsBase = ({ smsSeCd }: GetSmsbaseRequestType) => {
  return useQuery({
    queryKey: KEY.getSmsBase({ smsSeCd }),
    queryFn: async () => await API.getSmsBase({ smsSeCd }),
    gcTime: 0,
  });
};

// 자동문자 발송 조회
export const useGetSmsMng = () => {
  return useQuery({
    queryKey: KEY.getSmsmng(),
    queryFn: async () => await API.getSmsmng(),
  });
};

// 발송대상 목록보기
export const useGetSmsTelList = () => {
  return useQuery({
    queryKey: KEY.getSmstelList(),
    queryFn: async () => await API.getSmstelList(),
  });
};

// 발송대상 상세보기
export const useGetSmsTelSelect = ({ mbtlNo }: GetSmstelSelectRequestType) => {
  return useQuery({
    queryKey: KEY.getSmstelSelect({ mbtlNo }),
    queryFn: async () => await API.getSmstelSelect({ mbtlNo }),
    enabled: !!mbtlNo,
  });
};

// 공통코드 조회
export const useGetCommonCode = ({ upCd }: GetCommonCodeRequestType) => {
  return useQuery({
    queryKey: KEY.getCommonCode({ upCd }),
    queryFn: async () => await API.getCommonCode({ upCd }),
  });
};

// 자동문자 수신동의 고객 외 고객문자 조회
export const useSmsMngCstmr = () => {
  return useQuery({
    queryKey: KEY.getSmsmngCstmr(),
    queryFn: async () => await API.getSmsmngCstmr(),
  });
};

// 발송번호 저장
export const usePostSmsTel = () => {
  return useMutation({
    mutationFn: (requstData: { body: PostSmstelRequestType }) =>
      API.postSmstel(requstData),
  });
};

// 발송대상정보 수정
export const usePutSmsTel = () => {
  return useMutation({
    mutationFn: (requstData: { body: PutSmstelRequestType }) =>
      API.putSmstel(requstData),
  });
};

// 발송대상정보 삭제
export const useDeleteSmsTel = () => {
  return useMutation({
    mutationFn: (requstData: { body: DeleteSmstelRequestType }) =>
      API.deleteSmstel(requstData),
  });
};

// 전체 저장
export const usePostSmsAutoSave = () => {
  return useMutation({
    mutationFn: (requstData: { body: PostSmsmngAutoRequestType }) =>
      API.postSmsAutoSave(requstData),
  });
};

// 테스트 발송
export const useSendTestMsg = () => {
  return useMutation({
    mutationFn: (requstData: { body: TestMsgRequestType }) =>
      API.sendTestMsg(requstData),
  });
};

export const useSendTestMsgYn = () => {
  return useMutation({
    mutationFn: (requstData: { body: TestMsgRequestType }) =>
      API.sendTestMsguseYn(requstData),
  });
};
