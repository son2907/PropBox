import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type SolutionType = {
    userNo: string,
    slutnId: string,
    lisneCnt: string,
    useYn: string,
    delYn: string,
    rmk: string,
    userId: string,
};

export type UserNonPermissionRegistrationType = {
    userList: SolutionType[]; // 사용자 목록
    userId: string | undefined; // 사용자 ID
};

const API = {
    userNonPermissionRegistration: async (requstData: { body: UserNonPermissionRegistrationType }) => await instance.put('/api/user/slutn', requstData.body)
};

const KEY = {
    userNonPermissionRegistration: () => ['/api/user/slutn']
};

export const userNonPermissionRegistration = () => {
    return useMutation({
        mutationFn: (requstData: { body: UserNonPermissionRegistrationType }) => API.userNonPermissionRegistration(requstData),
        mutationKey: KEY.userNonPermissionRegistration(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
}