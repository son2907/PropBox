import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type MemberUpdateType = {
    userNo: string,
    userNm: string,
    loginId: string,
    attlistUserNm: string,
    useYn: string,
    rmk: string,
    userId: string
};

const API = {
    updateMember: async (requestData: { body: MemberUpdateType }) => {
        console.log("API 요청 데이터:", requestData); // 요청 데이터 로깅
        const response = await instance.put('/api/constnt', requestData.body);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    }
};

const KEY = {
    updateMember: () => ['/api/constnt']
};

export const updateMember = (requestData: { body: MemberUpdateType }) => {
    return useMutation({
        mutationFn: API.updateMember,
        mutationKey: KEY.updateMember(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
}