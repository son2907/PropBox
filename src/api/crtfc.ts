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
