import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type MemberListType = {
    userNo: string,
    userNm: string,
    attlistMbtlNo: string,
    loginIdPrefix: string,
    loginId: string,
    cmpnm: string,
    bizrno: string,
    rprsntvNm: string,
    adres1: string,
    adres2: string,
    reprsntTelno: string,
    useYn: string
};

export interface UserListResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: MemberListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

const API = {
    getMemeberLsit: async (requsetData: string) => {
        const url = requsetData ? `/api/user/listofmber/${requsetData}` : '/api/user/listofmber/';
        const response = await instance.get<UserListResponse>(url);
        return response;
        
    }
};

const KEY = {
    getMemeberLsit: (requsetData: string) => {
        const url = requsetData ? `/api/user/listofmber/${requsetData}` : '/api/user/listofmber/';
        return [url];
    }
};

export const useMemberList = (requsetData: string) => {
    //console.log("request data:", requsetData); // 요청 데이터 로그 추가
    return useQuery({
        queryKey: KEY.getMemeberLsit(requsetData),
        queryFn: async () => {
            const result = await API.getMemeberLsit(requsetData);
            //console.log("Result:", result); // 쿼리 결과 로그 추가
            return result;
        }
    })
}