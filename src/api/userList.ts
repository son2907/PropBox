import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import { DeleteUserType, UserInsertType } from "../types/userList";

export type UserListType = {
    userNo: string,
    userNm: string,
    attlistMbtlNo: string,
    loginIdPrefix: string,
    loginId: string,
    cmpnm: string,
    bizrno: string,
    rprsntvNm: string,
    adres1: string,
    adres2: string,
    reprsntTelno: string,
    useYn: string | undefined,
};

export interface UserListResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: UserListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

const API = {
    getUserList: async (requsetData: string) => {
        const url = requsetData ? `/api/user/list?userNm=${requsetData}` : '/api/user/list';
        //console.log("Calling API with URL:", url); // URL 로그 추가
        const response = await instance.get<UserListResponse>(url);
        //console.log("API Response:", response.data); // 응답 데이터 로그 추가
        return response;
    },
    deleteUser: async (requsetData: { body: DeleteUserType }) => {
        const url = '/api/user/myinfo';
        return await instance.post(url, requsetData.body);
    },
    insertUSer: async (requsetData: { body: UserInsertType }) => {
        const url = '/api/user'
        return await instance.post(url, requsetData);
    },
};

const KEY = {
    getUserList: (requsetData: string) => {
        const url = requsetData ? `/api/user/list?userNm=${requsetData}` : '/api/user/list';
        //console.log("Generated URL:", url); // URL 로그 추가
        return [url];
    },
    deleteUser: () => ['/api/user/myinfo'],
    insertUser: () => ['/api/user'],
};

export const useUserList = (requsetData: string) => {
    //console.log("Executing user list query with request data:", requsetData); // 요청 데이터 로그 추가
    return useQuery({
        queryKey: KEY.getUserList(requsetData),
        queryFn: async () => {
            const result = await API.getUserList(requsetData);
            //console.log("Query Result:", result.data); // 쿼리 결과 로그 추가
            return result;
        },
    });
};

export const deleteUser = (requsetData: { body: DeleteUserType }) => {
    return useMutation({
        mutationFn: (requsetData: { body: DeleteUserType }) => API.deleteUser(requsetData),
        mutationKey: KEY.deleteUser(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

export const insertUser = (requsetData: { body: UserInsertType }) => {
    return useMutation({
        mutationFn: (requsetData: { body: UserInsertType }) => API.insertUSer(requsetData),
        mutationKey: KEY.insertUser(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};