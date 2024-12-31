import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type deleteNoticeType = {
    noticeNo: string,       //공지사항 번호
    noticeSj: string,       //공지사항 제목
    noticeCn: string,       //공지사항 내용
    popupYn: string,        //팝업 여부
    popupBgnde: string,     //팝업 유지 startdate
    popupEndde: string,     //팝업 유지 enddate
    regDe: string,          //등록일
    userId: string | undefined //userID
}[];

const API = {
    deleteNotice: async (requstData: { body: deleteNoticeType }) => await instance.post('/api/notice/remove', requstData.body)
};

const KEY = {
    deleteNotice: () => ['/api/notice/remove']
};

export const deleteNotice = () => {
    return useMutation({
        mutationFn: (requstData: { body: deleteNoticeType }) => API.deleteNotice(requstData),
        mutationKey: KEY.deleteNotice(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
}