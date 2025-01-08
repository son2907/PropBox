import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type updateSolutionType = {
    slutnId: string,
    upperSlutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneCnfirmYn: string,
    url: string,
    iconFlpth: string,
    authorNthgUrl: string,
    lnupOrd: string,
    rmk: string,
};

const API = {
    updateSolution: async (requestData: { body: updateSolutionType }) => {
        console.log("API 요청 데이터:", requestData); // 요청 데이터 로깅
        const response = await instance.put('/api/slutn', requestData.body);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    }
};

const KEY = {
    updateSolution: () => ['/api/slutn'],
};

export const updateSolution = (requstData: { body: updateSolutionType }) => {
    return useMutation({
        mutationFn : API.updateSolution,
        mutationKey: KEY.updateSolution(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};