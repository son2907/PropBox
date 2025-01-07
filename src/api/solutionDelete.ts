import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance"

export type deleteSolutionType = {
    slutnId: string,
    upperSlutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneSeNm: string,
    lisneCnfirmYn: string,
    url: string,
    iconFlpth: string,
    authorNthgUrl: string,
    useYn: string,
    delYn: string,
    lnupOrd: string,
    rmk: string,
    regrId: string,
    updrId: string | undefined,
}

const API = {
    deleteSolution: async (requstData: { body: deleteSolutionType }) => {
        const { slutnId } = requstData.body; // slutnId 추출
        const url = `/api/slutn/remove?slutnId=${slutnId}`; // URL에 slutnId 추가
        return await instance.post(url, requstData.body);
    }
};

const KEY = {
    deleteSolution: () => ['/api/slutn/remove']
};

export const deleteSolution = () => {
    return useMutation({
        mutationFn : (requstData : { body : deleteSolutionType}) => API.deleteSolution(requstData),
        mutationKey : KEY.deleteSolution(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
}