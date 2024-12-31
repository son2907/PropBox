import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance"

export type insertNoticeType = {
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
    //공지사항 등록
    insertNotice : async (requestData : {body : insertNoticeType}) => await instance.post('/api/notice',requestData.body),
};

const KEY = {
    insertNotice: () => ['/api/notice']
};

export const insertNotice = (requestData : {body : insertNoticeType}) => {
    return useMutation({
        mutationFn: API.insertNotice,
        mutationKey: KEY.insertNotice(),
    });
};