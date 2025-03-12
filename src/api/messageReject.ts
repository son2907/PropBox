import { useMutation, useQuery } from "@tanstack/react-query";
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
import { spt } from "../utils/sptNo";

const API = {
  // 수신거부 목록 조회
  getRejectList: async ({ page, limit, mbtlNo }: GetRejectListRequestType) => {
    let url = `/api/reject?sptNo=${spt}&page=${page}&limit=${limit}`;
    if (mbtlNo) url += `&mbtlNo=${mbtlNo}`;
    return await instance.get<GetRejectListResponseType>(url);
  },
  // 수신거부 현장 목록 조회
  getRejectSptList: async ({
    userNm,
    page,
    limit,
  }: GetRejectSptListRequestType) => {
    let url = `/api/spt/reject/sptlist?page=${page}&limit=${limit}`;
    if (userNm) url += `&userNm=${userNm}`;
    return await instance.get<GetRejectSptListResponseType>(url);
  },
  // 수신거부 상세 조회
  getRejectDet: async ({ mbtlNo }: GetRejectDetRequestType) => {
    const url = `/api/reject/detail/${mbtlNo}`;
    return await instance.get<GetRejectDetResponseType>(url);
  },
  // 수신거부 등록 및 수정
  postReject: async (requestData: { body: PostRejectRequestType }) => {
    const url = `/api/reject`;
    return await instance.post(url, requestData.body);
  },
  // 수신거부 삭제
  deleteRejectDet: async ({ mbtlNo }: GetRejectDetRequestType) => {
    const url = `/api/reject/${spt}/${mbtlNo}`;
    return await instance.delete(url);
  },
};

const KEY = {
  getRejectList: ({ page, limit, mbtlNo }: GetRejectListRequestType) => [
    "/api/spt/reject",
    page,
    limit,
    mbtlNo,
  ],
  getRejectSptList: ({ userNm, page, limit }: GetRejectSptListRequestType) => [
    "/api/spt/reject/list",
    userNm,
    page,
    limit,
  ],
  getRejectDet: ({ mbtlNo }: GetRejectDetRequestType) => [
    "/api/spt/reject",
    mbtlNo,
  ],
  postReject: () => ["/api/spt/reject", "post"],
  deleteRejectDet: () => ["/api/spt/reject", "delete"],
};

// 수신거부 목록 조회
export const useRejectList = ({
  page,
  limit,
  mbtlNo,
}: GetRejectListRequestType) => {
  return useQuery({
    queryKey: KEY.getRejectList({ page, limit, mbtlNo }),
    queryFn: async () => await API.getRejectList({ page, limit, mbtlNo }),
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

// 수신거부 상세 조회
export const useRejectDetList = ({ mbtlNo }: GetRejectDetRequestType) => {
  return useQuery({
    queryKey: KEY.getRejectDet({ mbtlNo }),
    queryFn: async () => await API.getRejectDet({ mbtlNo }),
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

//수신거부 삭제
export const useDeletetReject = () => {
  return useMutation({
    mutationFn: ({ mbtlNo }: GetRejectDetRequestType) =>
      API.deleteRejectDet({ mbtlNo }),
    mutationKey: KEY.deleteRejectDet(),
  });
};
