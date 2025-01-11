import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type UserNonPermissionSolutionType = {
    id : string,
    slutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneSeNm: string,
    userNo: string,
    isOk: string
};

export interface UserNonPermissionSolutionResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: UserNonPermissionSolutionType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

const API = {
    getUserNonPermissionSolution : async (requsetData: string) => {
        //console.log("API 요청 데이터:", requsetData); // 요청 데이터 로깅
        const url = requsetData ? `/api/user/slutn/nosel/${requsetData}` : '/api/user/slutn/nosel/';
        const response = await instance.get<UserNonPermissionSolutionResponse>(url);
        //console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    }
};

const KEY = {
    getUserNonPermissionSolution: (requsetData: string) => {
        const url = requsetData ? `/api/user/slutn/nosel/${requsetData}` : '/api/user/slutn/nosel/';
        return [url];
    }
};

export const useUserNonPermissionSolution = (requsetData: string) => {
    return useQuery({
        queryKey : KEY.getUserNonPermissionSolution(requsetData),
        queryFn: async () => {
            const result = await API.getUserNonPermissionSolution(requsetData);
            return result;
        }
    });
};