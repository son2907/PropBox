import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type insertSolutionType = {
    slutnId: string,
    upperSlutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneCnfirmYn: string,
    authorNthgUrl: string,
    useYn: string,
    lnupOrd: string,
    rmk: string,
    userId: string | undefined,
};

const API = {
    insertSolution: async (requestData: { body: insertSolutionType }) => await instance.post('/api/slutn', requestData.body),
};

const KEY = {
    insertSolution: () => ['/api/slutn']
};

export const insertSolution = (requstData: { body: insertSolutionType }) => {
    return useMutation({
        mutationFn: API.insertSolution,
        mutationKey: KEY.insertSolution(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};