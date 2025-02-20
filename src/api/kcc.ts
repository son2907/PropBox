import { useMutation, useQuery } from "@tanstack/react-query";
import {
  KccGroupDeleteRequestType,
  KccGroupListResponseType,
  KccGroupPostRequestType,
  KccGroupPutRequestType,
  KccListResponseType,
  KccMsgRequestType,
  KccMsgResponseType,
  KccRejectRequestType,
  KccRequestType,
  UploadKccExcelRequestType,
} from "../types/kcc";
import instance from "../utils/axiosInstance";
import { spt } from "../utils/sptNo";

const API = {
  // 방통위 페이지 목록 조회
  getKccList: async ({ groupNo, mbtlNo, page, limit }: KccRequestType) => {
    let url = `/api/kcc/list?sptNo=${spt}&page=${page}&limit=${limit}`;
    if (groupNo) url += `&groupNo=${groupNo}`;
    if (mbtlNo) url += `&mbtlNo=${mbtlNo}`;
    return await instance.get<KccListResponseType>(url);
  },
  // 방통위 메세지 목록 조회
  getKccMsg: async ({ mbtlNo, page, limit }: KccMsgRequestType) => {
    const url = `/api/kcc/msg?sptNo=${spt}&mbtlNo=${mbtlNo}&page=${page}&limit=${limit}`;
    return await instance.get<KccMsgResponseType>(url);
  },
  // 방통위 신고 수신거부 등록
  postKccReject: async (requestData: { body: KccRejectRequestType[] }) => {
    const url = `/api/kcc/reject/${spt}`;
    return await instance.post(url, requestData.body);
  },
  // 방통위 엑셀 업로드
  uploadKccExcel: async (requestData: { body: UploadKccExcelRequestType }) => {
    const url = `/api/kcc`;
    return await instance.post(url, requestData.body);
  },
  // 방통위 그룹 조회
  getKccGroupList: async () => {
    const url = `/api/kcc/group/list?sptNo=${spt}`;
    return await instance.get<KccGroupListResponseType>(url);
  },
  // 방통위 그룹셀 등록
  postKccGroup: async (requestData: { body: KccGroupPostRequestType }) => {
    const url = `/api/kcc/group`;
    return await instance.post(url, requestData.body);
  },
  // 방통위 그룹셀 수정
  putKccGroup: async (requestData: { body: KccGroupPutRequestType }) => {
    const url = `/api/kcc/group`;
    return await instance.put(url, requestData.body);
  },
  // 방통위 그룹셀 삭제
  deleteKccGroup: async ({ groupNo }: KccGroupDeleteRequestType) => {
    const url = `/api/kcc/group/${groupNo}`;
    return await instance.delete(url);
  },
};

const KEY = {
  getKccList: ({ groupNo, mbtlNo, page, limit }: KccRequestType) => [
    "/api/kcc/list",
    groupNo,
    spt,
    mbtlNo,
    page,
    limit,
  ],
  getKccMsg: ({ mbtlNo, page, limit }: KccMsgRequestType) => [
    "/api/kcc/msg",
    mbtlNo,
    page,
    limit,
    spt,
  ],
  getKccGroupList: () => ["/api/kcc/group/list", spt],
};

// 방통위 페이지 목록 조회
export const useGetKccList = ({
  groupNo,
  mbtlNo,
  page,
  limit,
}: KccRequestType) => {
  return useQuery({
    queryKey: KEY.getKccList({ groupNo, mbtlNo, page, limit }),
    queryFn: async () => {
      return await API.getKccList({ groupNo, mbtlNo, page, limit });
    },
    gcTime: 0,
    enabled: !!page && !!limit,
  });
};

// 방통위 메세지 목록 조회
export const useGetKccMsg = ({ mbtlNo, page, limit }: KccMsgRequestType) => {
  return useQuery({
    queryKey: KEY.getKccMsg({ mbtlNo, page, limit }),
    queryFn: async () => {
      return await API.getKccMsg({ mbtlNo, page, limit });
    },
    gcTime: 0,
    enabled: !!mbtlNo && !!page && !!limit,
  });
};

// 방통위 신고 그룹 목록 조회(팝업)
export const useGetKccGroupList = () => {
  return useQuery({
    queryKey: KEY.getKccGroupList(),
    queryFn: async () => {
      return await API.getKccGroupList();
    },
    gcTime: 0,
  });
};

//수신거부 등록
export const usePostKccReject = () => {
  return useMutation({
    mutationFn: (requestData: { body: KccRejectRequestType[] }) =>
      API.postKccReject(requestData),
  });
};

// 엑셀 업로드
export const useKccExcelUpload = () => {
  return useMutation({
    mutationFn: (requestData: { body: UploadKccExcelRequestType }) =>
      API.uploadKccExcel(requestData),
  });
};

// 방통위 그룹셀 등록
export const usePostKccGroup = () => {
  return useMutation({
    mutationFn: (requestData: { body: KccGroupPostRequestType }) =>
      API.postKccGroup(requestData),
  });
};

// 방통위 그룹셀 수정
export const usePutKccGroup = () => {
  return useMutation({
    mutationFn: (requestData: { body: KccGroupPutRequestType }) =>
      API.putKccGroup(requestData),
  });
};

// 방통위 그룹셀 삭제
export const useDeleteKccGroup = () => {
  return useMutation({
    mutationFn: ({ groupNo }: KccGroupDeleteRequestType) =>
      API.deleteKccGroup({ groupNo }),
  });
};
