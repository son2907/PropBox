import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type NoticeListType = {
    id: string;
    noticeNo: string;
    noticeSj: string;
    regDe: string;
};

export interface NoticeListResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: NoticeListType[];  // User[]를 그대로 사용
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

const API = {
    getNoticeList: async (requestData : string) => {
        const url = requestData ? `/api/notice/list?noticeSj=${requestData}` : '/api/notice/list';
        return await instance.get<NoticeListResponse>(url);
    }
};

const KEY = {
    getNoticeList: (requestData : string) => [`/api/notice/list?noticeSj=${requestData}`],
};

export const useNoticeList = (requestData : string) => {
    console.log("실행됨",requestData);
    return useQuery({
        queryKey : KEY.getNoticeList(requestData),
        queryFn : async () => {
            return await API.getNoticeList(requestData);
        }
    });
}