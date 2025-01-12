import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type userSolutionCountType = {
    userNo: string,
    slutnId: string,
    userlisneCnt: string,
    userId: string | undefined,
};

const API = {
    userSolutionCount: async (requestData: { body: userSolutionCountType }) => {
        console.log("API 요청 데이터:", requestData); // 요청 데이터 로깅
        const response = await instance.put('/api/user/slutn/count', requestData.body);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    }
};

const KEY = {
    userSolutionCount: () => ['/api/user/slutn/count'],
};

export const userSolutionCount = (requestData: { body: userSolutionCountType }) => {
    return useMutation({
        mutationFn: API.userSolutionCount,
        mutationKey: KEY.userSolutionCount(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};