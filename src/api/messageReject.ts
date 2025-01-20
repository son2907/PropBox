import { useMutation, useQuery } from "@tanstack/react-query";
import getItemByStorageOne from "../utils/getItemByStorageOne";
import {
  GetRejectListRequestType,
  GetRejectListResponseType,
  GetRejectSptListRequestType,
  GetRejectSptListResponseType,
  GetRejectDetRequestType,
  GetRejectDetResponseType,
  PostRejectRequestType,
} from "../types/messageReject";
import instance from "../utils/axiosInstance";

const API = {
  // 수신거부 목록 조회
  getRejectList: async ({ page, limit }: GetRejectListRequestType) => {
    const spt = getItemByStorageOne("selectedSite")?.sptNo;
    const url = `/api/spt/reject/list?sptNo=${spt}&page=${page}&limit=${limit}`;
    return await instance.get<GetRejectListResponseType>(url);
  },
  // 수신거부 현장 목록 조회
  getRejectSptList: async ({
    userNm,
    page,
    limit,
  }: GetRejectSptListRequestType) => {
    let url = `/api/spt/reject/list?page=${page}&limit=${limit}`;
    if (userNm) url += `&userNm=${userNm}`;
    return await instance.get<GetRejectSptListResponseType>(url);
  },
  // 수신거부 상세 조회
  getRejectDet: async ({ rejectNo }: GetRejectDetRequestType) => {
    const url = `/api/spt/reject/${rejectNo}`;
    return await instance.get<GetRejectDetResponseType>(url);
  },
  // 수신거부 등록
  postReject: async (requestData: { body: PostRejectRequestType }) => {
    const url = `/api/spt/reject`;
    return await instance.post(url, requestData.body);
  },
  // 수신거부 수정
  putReject: async (requestData: { body: PostRejectRequestType }) => {
    const url = `/api/spt/reject`;
    return await instance.put(url, requestData.body);
  },
  // 수신거부 삭제
  deleteRejectDet: async ({ rejectNo }: GetRejectDetRequestType) => {
    const url = `/api/spt/reject/${rejectNo}`;
    return await instance.delete(url);
  },
};

const KEY = {
  getRejectList: ({ page, limit }: GetRejectListRequestType) => [
    "/api/spt/reject/list",
    page,
    limit,
  ],
  getRejectSptList: ({ userNm, page, limit }: GetRejectSptListRequestType) => [
    "/api/spt/reject/list",
    userNm,
    page,
    limit,
  ],
  getRejectDet: ({ rejectNo }: GetRejectDetRequestType) => [
    "/api/spt/reject",
    rejectNo,
  ],
  postReject: () => ["/api/spt/reject", "post"],
  putReject: () => ["/api/spt/reject", "put"],
  deleteRejectDet: ({ rejectNo }: GetRejectDetRequestType) => [
    "/api/spt/reject",
    "delete",
    rejectNo,
  ],
};

// 수신거부 목록 조회
export const useRejectList = ({ page, limit }: GetRejectListRequestType) => {
  return useQuery({
    queryKey: KEY.getRejectList({ page, limit }),
    queryFn: async () => await API.getRejectList({ page, limit }),
  });
};

// 수신거부 현장 목록 조회
export const useRejectSptList = ({
  userNm,
  page,
  limit,
}: GetRejectSptListRequestType) => {
  return useQuery({
    queryKey: KEY.getRejectSptList({
      userNm,
      page,
      limit,
    }),
    queryFn: async () =>
      await API.getRejectSptList({
        userNm,
        page,
        limit,
      }),
  });
};

// 수신거부 목록 조회
export const useGetCidList = ({ rejectNo }: GetRejectDetRequestType) => {
  return useQuery({
    queryKey: KEY.getRejectDet({ rejectNo }),
    queryFn: async () => await API.getRejectDet({ rejectNo }),
  });
};

//수신거부 등록
export const usePostReject = () => {
  return useMutation({
    mutationFn: (requstData: { body: PostRejectRequestType }) =>
      API.postReject(requstData),
    mutationKey: KEY.postReject(),
  });
};

//수신거부 수정
export const usePutMsg = () => {
  return useMutation({
    mutationFn: (requstData: { body: PostRejectRequestType }) =>
      API.putReject(requstData),
    mutationKey: KEY.putReject(),
  });
};

//수신거부 삭제
export const useDeletetMsg = ({ rejectNo }: GetRejectDetRequestType) => {
  return useMutation({
    mutationFn: ({ rejectNo }: GetRejectDetRequestType) =>
      API.deleteRejectDet({ rejectNo }),
    mutationKey: KEY.deleteRejectDet({ rejectNo }),
  });
};
