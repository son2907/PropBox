import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type UserType = {
    userNo: string,
    slutnId: string,
    lisneCnt: string,
    useYn: string,
    delYn: string,
    rmk: string,
    userId: string
};

export type UserPermissionRegistrationType = {
    userList: UserType[]; // 사용자 목록
    userId: string | undefined; // 사용자 ID
};

const API = {
    userPermissionRegistration: async (requstData: { body: UserPermissionRegistrationType }) => await instance.post('/api/user/slutn', requstData.body)
};

const KEY = {
    userPermissionRegistration: () => ['/api/user/slutn']
};

export const userPermissionRegistration = () => {
    return useMutation({
        mutationFn: (requstData: { body: UserPermissionRegistrationType }) => API.userPermissionRegistration(requstData),
        mutationKey: KEY.userPermissionRegistration(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
}
