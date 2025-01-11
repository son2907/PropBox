import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type MemberInsertType = {
    userNo: string,
    userNm: string,
    loginId: string,
    constntUserNo: string,
    userConstntSeCd: string,
    loginIdPrefix: string,
    attlistUserNm: string,
    pwdNo: string,
    advrtsAgreYn: string,
    useYn: string,
    rmk: string,
    userId: string
};

const API = {
    insertMember: async (requestData: { body: MemberInsertType }) => {
        console.log("API 요청 데이터:", requestData); // 요청 데이터 로깅
        const response = await instance.post('/api/constnt', requestData.body);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    }
};

const KEY = {
    insertMember: () => ['/api/constnt']
};

export const insertMember = (requstData: { body: MemberInsertType }) => {
    return useMutation({
        mutationFn: API.insertMember,
        mutationKey: KEY.insertMember(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
}

