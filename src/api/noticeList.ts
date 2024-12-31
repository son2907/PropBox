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
    getNoticeList: async (requsetData : string) => {
        const url = requsetData ? `/api/notice/list?noticeSj=${requsetData}` : '/api/notice/list';
        return await instance.get<NoticeListResponse>(url);
    }
};

const KEY = {
    getNoticeList: (requsetData : string) => [`/api/notice/list?noticeSj=${requsetData}`],
};

export const useNoticeList = (requsetData : string) => {
    console.log("실행됨",requsetData);
    return useQuery({
        queryKey : KEY.getNoticeList(requsetData),
        queryFn : async () => {
            return await API.getNoticeList(requsetData);
        }
    });
}