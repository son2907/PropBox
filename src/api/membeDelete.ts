import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type MemberDeleteType = {
    userNo: string,
}

const API = {
    deleteMember: async (id: string | null) => {
        console.log("API 요청 데이터:", id); // 요청 데이터 로깅
        const response = await instance.post(`/api/constnt/remove/${id}`);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    }
};

const KEY = {
    deleteMember: (id: string | null) => [`/api/constnt/remove/${id}`]
}

export const deleteMember = (id: string | null) => {
    return useMutation({
        mutationFn: API.deleteMember,
        mutationKey: KEY.deleteMember(id),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
}