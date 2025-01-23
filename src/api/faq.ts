import { useQuery } from "@tanstack/react-query";
import { FAQListResponseType } from "../types/faq"
import instance from "../utils/axiosInstance"

const API = {
    //faq 목록 조회
    getFaqList : async (requestData : string) => {
        const url = requestData ? `/api/faq/list?faqSj=${requestData}` : '/api/faq/list'
        return await instance.get<FAQListResponseType>(url);
    },

};

const KEY = {
    getFaqList: (requestData: string) => {
        const url = requestData ? `/api/faq/list?faqSj=${requestData}` : '/api/faq/list';
        //console.log("Generated URL:", url); // URL 로그 추가
        return [url];
    },
}

export const useFaqList = (requestData : string) => {
    return useQuery({
        queryKey : KEY.getFaqList(requestData),
        queryFn: async () => {
            const result = await API.getFaqList(requestData);
            return result;
        }
    })
};