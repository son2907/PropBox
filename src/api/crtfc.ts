import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import {
  CrtfcListResponseType,
  CrtfcCheckResponseType,
  CrtfcListRequestType,
  CrtfcCheckRequestType,
  CrtfcSaveRequestType,
  CrtfcDeleteRequestType,
  CtrfcRequestType,
  PassToken,
  PASSAble,
} from "../types/crtfc";
import { spt } from "../utils/sptNo";

const API = {
  // 발신번호 목록 조회
  getCrtfcList: async ({ cid }: CrtfcListRequestType) => {
    let url = `/api/crtfc/cidno/list?sptNo=${spt}`;
    if (cid) url += `&cid=${cid}`;
    return await instance.get<CrtfcListResponseType>(url);
  },
  // 인증번호 확인
  getCrtfcCheck: async ({ cid, eno }: CrtfcCheckRequestType) => {
    let url = `/api/crtfc/check?eno=${eno}`;
    if (cid) url += `&cid=${cid}`;
    return await instance.get<CrtfcCheckResponseType>(url);
  },
  // 인증 요청
  postCrtfc: async (requestData: { body: CtrfcRequestType }) => {
    const url = `/api/crtfc`;
    return await instance.post(url, requestData.body);
  },
  // 발신번호 저장
  saveCrtfc: async (requestData: { body: CrtfcSaveRequestType }) => {
    const url = `/api/crtfc/cidno/save`;
    return await instance.post(url, requestData.body);
  },
  // 발신번호 삭제
  deleteCrtfc: async (requestData: { body: CrtfcDeleteRequestType }) => {
    const url = `/api/crtfc/cidno/remove`;
    return await instance.post(url, requestData.body);
  },
  // <---------본인인증 API----------->
  // mdn 토큰 발급
  getOkcertToken: async ({ returnUrl }: { returnUrl: string }) => {
    const url = `/api/crtfc/okcert/token?sptNo=${spt}&returnUrl=${returnUrl}`;
    return await instance.get<PassToken>(url);
  },
  // 인증 여부 확인
  getOkcert: async () => {
    const url = `/api/crtfc/okcert/user`;
    return await instance.get<PASSAble>(url);
  },
  // 인증 결과
  getOkcertResult: async ({ mdlTkn }: { mdlTkn: string }) => {
    const url = `/api/crtfc/okcert/result?mdlTkn=${mdlTkn}`;
    return await instance.get<PassToken>(url);
  },
};

const KEY = {
  getCrtfcList: ({ cid }: CrtfcListRequestType) => [
    "/api/crtfc/cidno/list",
    cid,
  ],
  getCrtfcCheck: ({ cid, eno }: CrtfcCheckRequestType) => [
    "/api/crtfc/check",
    cid,
    eno,
  ],
  postCrtfc: () => ["/api/crtfc"],
  saveCrtfc: () => ["/api/crtfc/cidno/save"],
  deleteCrtfc: () => ["/api/crtfc/cidno/remove"],
  getOkcertToken: ({ returnUrl }) => ["/crtfc/okcert/token", returnUrl],
  getOkcertResult: ({ mdlTkn }) => ["/api/crtfc/okcert/result", mdlTkn],
  getOkcert: () => ["/api/crtfc/okcert/user"],
};

// 발신번호 목록 조회
export const useCrtfcList = ({ cid }: CrtfcListRequestType = {}) => {
  return useQuery({
    queryKey: KEY.getCrtfcList({ cid }),
    queryFn: async () => {
      return await API.getCrtfcList({ cid });
    },
  });
};

// 인증번호 확인
export const useCrtfcCheck = ({ cid, eno }: CrtfcCheckRequestType) => {
  return useQuery({
    queryKey: KEY.getCrtfcCheck({ cid, eno }),
    queryFn: async () => {
      return await API.getCrtfcCheck({ cid, eno });
    },
    enabled: false,
  });
};
// 인증 요청
export const usePostCrtfc = () => {
  return useMutation({
    mutationFn: (requstData: { body: CtrfcRequestType }) =>
      API.postCrtfc(requstData),
    mutationKey: KEY.postCrtfc(),
  });
};
// 발신번호 저장
export const useSaveCrtfc = () => {
  return useMutation({
    mutationFn: (requstData: { body: CrtfcSaveRequestType }) =>
      API.saveCrtfc(requstData),
    mutationKey: KEY.saveCrtfc(),
  });
};

// 발신번호 삭제
export const useDeleteCrtfc = () => {
  return useMutation({
    mutationFn: (requstData: { body: CrtfcDeleteRequestType }) =>
      API.deleteCrtfc(requstData),
    mutationKey: KEY.deleteCrtfc(),
  });
};

// 토큰 발급
export const useOkcertToken = ({ returnUrl }) => {
  return useQuery({
    queryKey: KEY.getOkcertToken({ returnUrl }),
    queryFn: async () => {
      return await API.getOkcertToken({ returnUrl });
    },
    gcTime: 0,
  });
};

// getOkcert;
export const useGetOkcert = () => {
  return useQuery({
    queryKey: KEY.getOkcert(),
    queryFn: async () => {
      return await API.getOkcert();
    },
    gcTime: 0,
  });
};

// 인증 여부 확인
export const useOkcertResult = ({ mdlTkn }) => {
  return useQuery({
    queryKey: KEY.getOkcertResult({ mdlTkn }),
    queryFn: async () => {
      return await API.getOkcertResult({ mdlTkn });
    },
    gcTime: 0,
  });
};
