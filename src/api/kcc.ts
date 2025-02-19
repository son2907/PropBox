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
import { AxiosResponse } from "axios";

const API = {
  // 방통위 페이지 목록 조회
  getKccList: async ({ groupNo }: KccRequestType) => {
    const url = `/api/kcc/list?sptNo=${spt}&groupNo=${groupNo}`;
    return await instance.get<KccListResponseType>(url);
  },
  // 방통위 메세지 목록 조회
  getKccMsg: async ({ encptMbtlNo }: KccMsgRequestType) => {
    const url = `/api/kcc/msg?sptNo=${spt}&encptMbtlNo=${encptMbtlNo}`;
    return await instance.get<KccMsgResponseType>(url);
  },
  // 방통위 신고 수신거부 등록
  postKccReject: async (requestData: { body: KccRejectRequestType[] }) => {
    const url = `/api/kcc/reject/${spt}`;
    return await instance.post(url, requestData);
  },
  // 방통위 엑셀 업로드
  uploadKccExcel: async (
    requestData: UploadKccExcelRequestType
  ): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append("file", requestData.file); // file은 binary 형식
    const headers = {
      "Content-Type": "multipart/form-data", // multipart/form-data로 설정
    };
    const url = `/api/kcc/upload?groupNo=${requestData.groupNo}&mbtlNoPos=${requestData.mbtlNoPos}`;

    return await instance.post(url, formData, { headers });
  },
  // 방통위 팝업 그룹 목록 조회
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
    return await instance.put(url, requestData);
  },
  // 방통위 그룹셀 삭제
  deleteKccGroup: async ({ groupNo }: KccGroupDeleteRequestType) => {
    const url = `/api/kcc/group/${groupNo}`;
    return await instance.delete(url);
  },
};

const KEY = {
  getKccList: ({ groupNo }: KccRequestType) => ["/api/kcc/list", groupNo, spt],
  getKccMsg: ({ encptMbtlNo }: KccMsgRequestType) => [
    "/api/kcc/msg",
    encptMbtlNo,
    spt,
  ],
  getKccGroupList: () => ["/api/kcc/group/list", spt],
};

// 방통위 페이지 목록 조회
export const useGetKccList = ({ groupNo }: KccRequestType) => {
  return useQuery({
    queryKey: KEY.getKccList({ groupNo }),
    queryFn: async () => {
      return await API.getKccList({ groupNo });
    },
    gcTime: 0,
    enabled: !!groupNo,
  });
};

// 방통위 메세지 목록 조회
export const useGetKccMsg = ({ encptMbtlNo }: KccMsgRequestType) => {
  return useQuery({
    queryKey: KEY.getKccMsg({ encptMbtlNo }),
    queryFn: async () => {
      return await API.getKccMsg({ encptMbtlNo });
    },
    gcTime: 0,
    enabled: !!encptMbtlNo,
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
  return useMutation<
    AxiosResponse,
    Error,
    { requestData: UploadKccExcelRequestType }
  >({
    mutationFn: ({ requestData }) => API.uploadKccExcel(requestData),
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
