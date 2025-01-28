import { useMutation, useQuery } from "@tanstack/react-query";
import { FaqDeleteType, FaqDetailResponse, FaqInsertType, FAQListResponseType, FaqUpdateType } from "../types/faq"
import instance from "../utils/axiosInstance"

const API = {
    //faq 목록 조회
    getFaqList : async (requestData : string) => {
        const url = requestData ? `/api/faq/list?faqSj=${requestData}` : '/api/faq/list'
        return await instance.get<FAQListResponseType>(url);
    },
    //faq 상세 조회
    getFaqDetail: async (id:string) => {
        const url = id ? `/api/faq/${id}` : `/api/faq/`;
        return await instance.get<FaqDetailResponse>(url);
    },
    //faq 추가
    insertFaq: async (requestData: {body:FaqInsertType}) => {
        const response = await instance.post('/api/faq', requestData.body);
        return response;
    },
    //faq 수정
    updateFaq: async (requestData: {body: FaqUpdateType}) => {
        const response = await instance.put('/api/faq', requestData.body);
        return response;
    },
    //faq 삭제
    deleteFaq: async (requestData: {body: FaqDeleteType}) => {
        const response = await instance.post('/api/faq/remove', requestData.body);
        return response;
    },
};

const KEY = {
    getFaqList: (requestData: string) => {
        const url = requestData ? `/api/faq/list?faqSj=${requestData}` : '/api/faq/list';
        //console.log("Generated URL:", url); // URL 로그 추가
        return [url];
    },
    //faq 상세 조회
    getFaqDetail: (id:string) => [`/api/faq/${id}`],
    //faq 수정
    updateFaq: (requestData: {body: FaqUpdateType}) => ['/api/faq'],
    //faq삭제
    deleteFaq: () => ['/api/faq/remove'],
    insertFaq: () => ['/api/faq'],
}

//faq 목록 조회
export const useFaqList = (requestData : string) => {
    //console.log("실행됨",requestData);
    return useQuery({
        queryKey : KEY.getFaqList(requestData),
        queryFn: async () => {
            const result = await API.getFaqList(requestData);
            //console.log("api 호출 결과",result);
            return result;
        },
        gcTime: 0,
    })
};

//faq 상세 조회
export const useFaqDetail = (id:string) => {
    return useQuery({
        queryKey : KEY.getFaqDetail(id),
        queryFn: async () => {
            const result = await API.getFaqDetail(id);
            return result;
        },
        enabled: !!id,
    });
};

//faq 추가
export const insertFaq = (requestData: {body:FaqInsertType}) => {
    return useMutation({
        mutationFn: API.insertFaq,
        mutationKey: KEY.insertFaq(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
}

//faq 수정
export const updateFaq = (requestData: {body: FaqUpdateType}) => {
    return useMutation({
        mutationFn: API.updateFaq,
        mutationKey: KEY.updateFaq(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//Faq삭제
export const deleteFaq = () => {
    return useMutation({
        mutationFn: (requestData: {body: FaqDeleteType}) => API.deleteFaq(requestData),
        mutationKey: KEY.deleteFaq(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};