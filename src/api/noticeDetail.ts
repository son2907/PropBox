import { useQuery } from "@tanstack/react-query";
import { ApiResponseType } from "../types/apiResponse";
import instance from "../utils/axiosInstance";

//공지사항 형식 정의
export type noticeDetailType = {
    noticeNo: string,       //공지사항 번호
    noticeSj: string,       //공지사항 제목
    noticeCn: string,       //공지사항 내용
    popupYn: string,        //팝업 여부
    popupBgnde: string,     //팝업 유지 startdate
    popupEndde: string,     //팝업 유지 enddate
    regDe: string,          //등록일
};

//API에서 반환하는 데이터 형식을 아래와 같이 정의
export interface NoticeDetailResponse extends ApiResponseType {
    contents: noticeDetailType;
}

const API = {
    getNoticeDetail: async (id: string | null) => {
        const url = id ? `/api/notice/${id}` : '/api/notice/';  //id가 있으면 url에 붙여줌
        return await instance.get<NoticeDetailResponse>(url);
    }
};

//api key 추가
const KEY = {
    getNoticeDetail: (id: string | null) => [`/api/notice/${id}`],
}

//공지사항 상세 조회 Hook
export const useNoticeDetail = (id: string | null) => {
    return useQuery({
        queryKey: KEY.getNoticeDetail(id),
        queryFn: async () => {
            const result = await API.getNoticeDetail(id);
            return result;
        }
    })
};

