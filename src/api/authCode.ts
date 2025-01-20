///api/crtfc/list?cid=010&page=0&limit=20

import { useQuery } from "@tanstack/react-query";
import { AuthCodeListResponseType } from "../types/authCode";
import instance from "../utils/axiosInstance";

const API = {
    //인증번호 목록 조회
    getAuthCodeList: async (requestData: { cid : string, page: string, limit: string}) => {
        const url = `api/crtfc/list?cid=${requestData.cid}&page=${requestData.page}&limit=${requestData.limit}`;
        return await instance.get<AuthCodeListResponseType>(url);
    },
}

const KEY = {
    getAuthCodeList: (requestData: { cid : string, page: string, limit: string}) => [`api/crtfc/list?cid=${requestData.cid}&page=${requestData.page}&limit=${requestData.limit}`],
};

//인증번호 목록 조회
export const useAuthCodeList = (requestData: { cid : string, page: string, limit: string}) => {
    return useQuery({
        queryKey: KEY.getAuthCodeList(requestData),
        queryFn: async () => {
            const result = await API.getAuthCodeList(requestData);
            return result;
        }
    })
}