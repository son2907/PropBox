import { useMutation } from "@tanstack/react-query"
import instance from "../utils/axiosInstance"

export type updateNoticeType = {
    noticeNo: string,       //공지사항 번호
    noticeSj: string,       //공지사항 제목
    noticeCn: string,       //공지사항 내용
    popupYn: string,        //팝업 여부
    popupBgnde: string,     //팝업 유지 startdate
    popupEndde: string,     //팝업 유지 enddate
    regDe: string,          //등록일
    userId: string | undefined //userID
};

const API = {
    //updateNotice: async (requstData : { body: updateNoticeType }) => await instance.put('/api/notice', requstData.body),
    updateNotice: async (requestData: { body: updateNoticeType }) => {
        console.log("API 요청 데이터:", requestData); // 요청 데이터 로깅
        const response = await instance.put('/api/notice', requestData.body);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    },
};

const KEY = {
    updateNotice: () => ['/api/notice']
};

export const updateNotice = (requstData: { body: updateNoticeType }) => {
    return useMutation({
        mutationFn: API.updateNotice,
        mutationKey: KEY.updateNotice(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};
