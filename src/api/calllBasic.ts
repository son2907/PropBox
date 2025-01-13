// 전화관리 > 기본정보
import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import {
  BasicAreaDeleteRequestType,
  BasicAreaRequestType,
  BasicDetItemDeleteRequestType,
  BasicDetItemRequestType,
  BasicItemDeleteRequestType,
  BasicItemRequestType,
} from "../types/callBasic";

const API = {
  // 상담항목 등록
  postBasicItem: async (requestData: { body: BasicItemRequestType }) => {
    const url = `/api/sptcnslt/item`;
    return await instance.post(url, requestData.body);
  },
  //상담항목 수정
  putBasicItem: async (requestData: { body: BasicItemRequestType }) => {
    const url = `/api/sptcnslt/item`;
    return await instance.put(url, requestData.body);
  },
  //상담항목 삭제
  deleteBasicItem: async (requestData: {
    body: BasicItemDeleteRequestType;
  }) => {
    const url = `/api/sptcnslt/item/remove`;
    return await instance.put(url, requestData.body);
  },
  // 상담 상세항목 등록
  postBasicItemDet: async (requestData: { body: BasicDetItemRequestType }) => {
    const url = `/api/sptcnslt/itemdet`;
    return await instance.post(url, requestData.body);
  },
  //상담 상세항목 수정
  putBasicItemDet: async (requestData: { body: BasicDetItemRequestType }) => {
    const url = `/api/sptcnslt/itemdet`;
    return await instance.put(url, requestData.body);
  },
  //상담 상세항목 삭제
  deleteBasicItemDet: async (requestData: {
    body: BasicDetItemDeleteRequestType;
  }) => {
    const url = `/api/sptcnslt/itemdet/remove`;
    return await instance.post(url, requestData.body);
  },
  // 관리지역 등록
  postBasicArea: async (requestData: { body: BasicAreaRequestType }) => {
    const url = `/api/sptcnslt/area`;
    return await instance.post(url, requestData.body);
  },
  //관리지역 수정
  putBasicArea: async (requestData: { body: BasicAreaRequestType }) => {
    const url = `/api/sptcnslt/area`;
    return await instance.put(url, requestData.body);
  },
  //관리지역 삭제
  deleteBasicArea: async (requestData: {
    body: BasicAreaDeleteRequestType;
  }) => {
    const url = `/api/sptcnslt/area/remove`;
    return await instance.post(url, requestData.body);
  },
};

const KEY = {
  postBasicItem: () => ["/api/sptcnslt/item", "post"],
  putBasicItem: () => ["/api/sptcnslt/item", "put"],
  postBasicItemDet: () => ["/api/sptcnslt/itemdet", "post"],
  putBasicItemDet: () => ["/api/sptcnslt/itemdet", "put"],
  postBasicArea: () => ["/api/sptcnslt/area", "post"],
  putBasicArea: () => ["/api/sptcnslt/area", "put"],
  deleteBasicItem: () => ["/api/sptcnslt/item/remove"],
  deleteBasicItemDet: () => ["/api/sptcnslt/itemdet/remove"],
  deleteBasicArea: () => ["/api/sptcnslt/area/remove"],
};

// 상담 항목 등록
export const usePostBasicItem = () => {
  return useMutation({
    mutationFn: (requstData: { body: BasicItemRequestType }) =>
      API.postBasicItem(requstData),
    mutationKey: KEY.postBasicItem(),
  });
};
// 상담 항목 수정
export const usePutBasicItem = () => {
  return useMutation({
    mutationFn: (requstData: { body: BasicItemRequestType }) =>
      API.putBasicItem(requstData),
    mutationKey: KEY.putBasicItem(),
  });
};
// 상담 항목 삭제
export const useDeleteBasicItem = () => {
  return useMutation({
    mutationFn: (requstData: { body: BasicItemDeleteRequestType }) =>
      API.deleteBasicItem(requstData),
    mutationKey: KEY.deleteBasicItem(),
  });
};

// 상담 상세 항목 등록
export const usePostBasicItemDet = () => {
  return useMutation({
    mutationFn: (requstData: { body: BasicDetItemRequestType }) =>
      API.postBasicItemDet(requstData),
    mutationKey: KEY.postBasicItemDet(),
  });
};
// 상담 상세 항목 수정
export const usePutBasicItemDet = () => {
  return useMutation({
    mutationFn: (requstData: { body: BasicDetItemRequestType }) =>
      API.putBasicItemDet(requstData),
    mutationKey: KEY.putBasicItemDet(),
  });
};
// 상담 상세 항목 삭제
export const useDeleteBasicItemDet = () => {
  return useMutation({
    mutationFn: (requstData: { body: BasicDetItemDeleteRequestType }) =>
      API.deleteBasicItemDet(requstData),
    mutationKey: KEY.deleteBasicItemDet(),
  });
};

// 지역 등록
export const usePostBasicArea = () => {
  return useMutation({
    mutationFn: (requstData: { body: BasicAreaRequestType }) =>
      API.postBasicArea(requstData),
    mutationKey: KEY.postBasicArea(),
  });
};
// 지역 수정
export const usePutBasicArea = () => {
  return useMutation({
    mutationFn: (requstData: { body: BasicAreaRequestType }) =>
      API.putBasicArea(requstData),
    mutationKey: KEY.putBasicArea(),
  });
};
// 지역 삭제
export const useDeleteBasicArea = () => {
  return useMutation({
    mutationFn: (requstData: { body: BasicAreaDeleteRequestType }) =>
      API.deleteBasicArea(requstData),
    mutationKey: KEY.deleteBasicArea(),
  });
};
