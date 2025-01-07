import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type insertMenuType = {
    slutnId: string,
    upperSlutnId: string,
    slutnNm: string,
    lisneCnfirmYn: string,
    url: string,
    iconFlpth: string,
    useYn: string,
    delYn: string,
    lnupOrd: string,
    rmk: string,
    userId: string | undefined,
};

const API = {
    insertMenu: async (requestData: { body: insertMenuType }) => await instance.post('/api/slutn', requestData.body),
};

const KEY = {
    insertMenu: () => ['/api/slutn']
};

export const insertMenu = (requestData: { body: insertMenuType }) => {
    return useMutation({
        mutationFn: API.insertMenu,
        mutationKey: KEY.insertMenu(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
}