import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type UserListType = {
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
    useYn: string | undefined,
};

export interface UserListResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: UserListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

const API = {
    getUserList: async (requsetData: string) => {
        const url = requsetData ? `/api/user/list?userNm=${requsetData}` : '/api/user/list';
        //console.log("Calling API with URL:", url); // URL 로그 추가
        const response = await instance.get<UserListResponse>(url);
        //console.log("API Response:", response.data); // 응답 데이터 로그 추가
        return response;
    },
};

const KEY = {
    getUserList: (requsetData: string) => {
        const url = requsetData ? `/api/user/list?userNm=${requsetData}` : '/api/user/list';
        //console.log("Generated URL:", url); // URL 로그 추가
        return [url];
    },
};

export const useUserList = (requsetData: string) => {
    //console.log("Executing user list query with request data:", requsetData); // 요청 데이터 로그 추가
    return useQuery({
        queryKey: KEY.getUserList(requsetData),
        queryFn: async () => {
            const result = await API.getUserList(requsetData);
            //console.log("Query Result:", result.data); // 쿼리 결과 로그 추가
            return result;
        },
    });
};