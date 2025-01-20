import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type UserPermitSolutionType = {
    id : string,
    userNo: string,
    slutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneSeNm: string,
    userlisneCnt: string,
    sptlisneCnt: string,
    chrgcnt: string,
    userId: string | undefined,
};

export interface UserPermitSolutionResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: UserPermitSolutionType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

const API = {
    getUserPermitSolution: async (requsetData: string) => {
        console.log("API 요청 데이터:", requsetData); // 요청 데이터 로깅
        const url = requsetData ? `/api/user/slutn/sel/${requsetData}` : '/api/user/slutn/sel/';
        const response = await instance.get<UserPermitSolutionResponse>(url);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    }
};

const KEY = {
    getUserPermitSolution: (requsetData: string) => {
        const url = requsetData ? `/api/user/slutn/sel/${requsetData}` : '/api/user/slutn/sel/';
        return [url];
    }
};

export const useUserPermitSolution = (requsetData: string) => {
    console.log("데이터 넘어오는지 확인 : ", requsetData);
    return useQuery({
        queryKey: KEY.getUserPermitSolution(requsetData),
        queryFn: async () => {
            const result = await API.getUserPermitSolution(requsetData);
            console.log("결과 : ", result)
            return result;
        }
    })
}