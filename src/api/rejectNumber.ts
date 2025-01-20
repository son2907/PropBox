// /api/spt/reject/sptlist?userNm=%EC%9A%A9&page=0&limit=20

import { useQuery } from "@tanstack/react-query";
import { RejectNumberResponseType, RejecttLocalListResponseType } from "../types/rejectNumber";
import instance from "../utils/axiosInstance";

const API = {
    //수신거부 목록 조회
    getRejectNumber: async (requestData: { sptNo : string, page: string, limit: string}) => {
        const url = `/api/spt/reject/list?sptNo=${requestData.sptNo}&page=${requestData.page}&limit=${requestData.limit}`;
        return await instance.get<RejectNumberResponseType>(url);
    },
    getRejectLocalList: async (requestData: { userNm : string, page: string, limit: string}) => {
        const url = `/api/spt/reject/sptlist?userNm=${requestData.userNm}&page=${requestData.page}&limit=${requestData.limit}`;
        return await instance.get<RejecttLocalListResponseType>(url);
    },
};

const KEY = {
    getRejectNumber: (requestData: { sptNo : string, page: string, limit: string}) => [`/api/spt/reject/list?sptNo=${requestData.sptNo}&page=${requestData.page}&limit=${requestData.limit}`],
    getRejectLocalList: (requestData: { userNm : string, page: string, limit: string}) => [`/api/spt/reject/sptlist?userNm=${requestData.userNm}&page=${requestData.page}&limit=${requestData.limit}`],
};

//수신거부 목록 조회
export const useRejectNumber = (requestData: { sptNo : string, page: string, limit: string}) => {
    return useQuery({
        queryKey: KEY.getRejectNumber(requestData),
        queryFn: async () => {
            const result = await API.getRejectNumber(requestData);
            return result;
        }
    })
};

//현장목록 조회
export const useRejectLocalList = (requestData: { userNm : string, page: string, limit: string}) => {
    return useQuery({
        queryKey: KEY.getRejectLocalList(requestData),
        queryFn: async () => {
            const result = await API.getRejectLocalList(requestData);
            return result;
        }
    })
};