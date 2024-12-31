import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type popupNoticeType = {
    noticeNo: string,       //공지사항 번호
    noticeSj: string,       //공지사항 제목
    noticeCn: string,       //공지사항 내용
    popupYn: string,        //팝업 여부
    popupBgnde: string,     //팝업 유지 startdate
    popupEndde: string,     //팝업 유지 enddate
    regDe: string,          //등록일
};

export interface NoticeListResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: popupNoticeType[]; 
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

const API = {
    getPopupNotice: async () => {
        return await instance.get<NoticeListResponse>('/api/notice/popup');
    }
};

const KEY = {
    getPopupNotice: () => ['/api/notice/popup'],
};

export const usePopupNotice = () => {
    return useQuery({
        queryKey: KEY.getPopupNotice(),
        queryFn: async () => {
            return await API.getPopupNotice();
        }
    })
}