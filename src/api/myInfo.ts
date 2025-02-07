import { useMutation, useQuery } from "@tanstack/react-query";
import { MyInfoDetailResponse, MyInfoDetailType, MyInfoUpdateType, PasswordCheckType } from "../types/myInfo";
import instance from "../utils/axiosInstance";

const API = {
    //비밀번호 확인
    passwordCheck: async (requestData : {body : PasswordCheckType}) => {
        const url = '/api/user/chk';
        return await instance.post(url, requestData.body);
    },
    //내정보 - 사용자/구성원 상세보기
    myInfoDetail: async () => {
        const url = '/api/user/myinfo';
        return await instance.get<MyInfoDetailResponse>(url);
    },
    //내정보 수정 - 사용자/구성원
    myInfoUpdate: async (requestData:{body: MyInfoUpdateType}) => {
        const url = '/api/user/myinfo';
        return await instance.put(url,requestData.body);
    },
}

const KEY = {
    //비밀번호 확인
    passwordCheck: () => ['/api/user/chk'],
    //내정보 - 사용자/구성원 상세보기
    myInfoDetail: () => ['/api/user/myinfo'],
    //내정보 수정 - 사용자/구성원
    myInfoUpdate: () => ['/api/user/myinfo'],
}

//비밀번호 확인
export const passwordCheck = () => {
    return useMutation({
        mutationFn: (requestData : {body : PasswordCheckType}) => API.passwordCheck(requestData),
        mutationKey: KEY.passwordCheck(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//내정보 - 사용자/구성원 상세보기
export const myInfoDetail = () => {
    return useQuery({
        queryKey: KEY.myInfoDetail(),
        queryFn: async () => {
            const result = await API.myInfoDetail();
            console.log("api 호출 결과값:", result);
            return result;
        },
        gcTime: 0,
    });
};

//내정보 수정 - 사용자/구성원
export const myInfoUpdate = () => {
    return useMutation({
        mutationFn: (requestData:{body: MyInfoUpdateType}) => API.myInfoUpdate(requestData),
        mutationKey: KEY.myInfoUpdate(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};
