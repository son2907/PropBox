// /api/crtfc/list?page=1&limit=20

import { useQuery } from "@tanstack/react-query";
import { AuthCodeListResponse } from "../types/authCode";
import instance from "../utils/axiosInstance";

const API = {
    //인증번호 목록 조회
    getAuthCodeList: async (requestData: { cid : string, page: number, limit: any}) => {
        const url = `/api/crtfc/list?cid=${requestData.cid}&page=${requestData.page}&limit=${requestData.limit}`;
        return await instance.get<AuthCodeListResponse>(url);
    },
}

const KEY = {
    getAuthCodeList: (requestData: { cid : string, page: number, limit: any}) => [`api/crtfc/list?cid=${requestData.cid}&page=${requestData.page}&limit=${requestData.limit}`],
};

//인증번호 목록 조회
export const useAuthCodeList = (requestData: { cid : string, page: number, limit: any}) => {
    return useQuery({
        queryKey: KEY.getAuthCodeList(requestData),
        queryFn: async () => {
            const result = await API.getAuthCodeList(requestData);
            console.log("인증번호관리 조회 결과값 : ",result);
            return result;
        }
    })
}