import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import { deleteNoticeType, insertNoticeType, NoticeDetailResponse, NoticeListResponse, PopupNoticeListResponse, updateNoticeType } from "../types/notice";

const API = {
    //공지사항 목록 조회
    getNoticeList: async (requestData : string) => {
        const url = requestData ? `/api/notice/list?noticeSj=${requestData}` : '/api/notice/list';
        return await instance.get<NoticeListResponse>(url);
    },
    //공지사항 상세 조회
    getNoticeDetail: async (id: string | null) => {
        const url = id ? `/api/notice/${id}` : '/api/notice/';  //id가 있으면 url에 붙여줌
        return await instance.get<NoticeDetailResponse>(url);
    },
    //공지사항 등록
    insertNotice : async (requestData : {body : insertNoticeType}) => await instance.post('/api/notice',requestData.body),
    //공지사항 삭제
    deleteNotice: async (requstData: { body: deleteNoticeType }) => await instance.post('/api/notice/remove', requstData.body),
    //공지사항 수정정
    updateNotice: async (requestData: { body: updateNoticeType }) => {
        //console.log("API 요청 데이터:", requestData); // 요청 데이터 로깅
        const response = await instance.put('/api/notice', requestData.body);
        //console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    },
    //팝업 공지
    getPopupNotice: async () => {
        return await instance.get<PopupNoticeListResponse>('/api/notice/popup');
    }
};

const KEY = {
    //공지사항 목록 조회회
    getNoticeList: (requestData : string) => [`/api/notice/list?noticeSj=${requestData}`],
    //공지사항 상세
    getNoticeDetail: (id: string | null) => [`/api/notice/${id}`],
    //공지사항 추가
    insertNotice: () => ['/api/notice'],
    //공지사항 삭제
    deleteNotice: () => ['/api/notice/remove'],
    //공지사항 수정
    updateNotice: () => ['/api/notice'],
    //팝업 공지
    getPopupNotice: () => ['/api/notice/popup'],
};

//공지사항 목록 조회
export const useNoticeList = (requestData : string) => {
    console.log("실행됨",requestData);
    return useQuery({
        queryKey : KEY.getNoticeList(requestData),
        queryFn : async () => {
            return await API.getNoticeList(requestData);
        },
        gcTime: 0,
    });
}

//공지사항 상세 조회 Hook
export const useNoticeDetail = (id: string | null) => {
    return useQuery({
        queryKey: KEY.getNoticeDetail(id),
        queryFn: async () => {
            const result = await API.getNoticeDetail(id);
            return result;
        },
        enabled: !!id,
    })
};

//공지사항 추가
export const insertNotice = (requestData : {body : insertNoticeType}) => {
    return useMutation({
        mutationFn: API.insertNotice,
        mutationKey: KEY.insertNotice(),
    });
};

//공지사항 삭제
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
};

//공지사항 수정
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

//팝업 공지
export const usePopupNotice = () => {
    return useQuery({
        queryKey: KEY.getPopupNotice(),
        queryFn: async () => {
            return await API.getPopupNotice();
        }
    })
};