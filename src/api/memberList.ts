import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import { MemberDetailResponse, MemberInsertType, MemberUpdateType, UserListResponse } from "../types/memberList";

const API = {
    //구성원 및 사용자 목록
    getMemeberLsit: async (requsetData: string) => {
        const url = requsetData ? `/api/user/listofmber/${requsetData}` : '/api/user/listofmber/';
        const response = await instance.get<UserListResponse>(url);
        return response;
        
    },
    //구셩원 수정
    updateMember: async (requestData: { body: MemberUpdateType }) => {
        console.log("API 요청 데이터:", requestData); // 요청 데이터 로깅
        const response = await instance.put('/api/constnt', requestData.body);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    },
    //구성원 상세
    getMemberDetail: async (id: string | null) => {
        const url = id ? `/api/constnt/${id}` : '/api/constnt/';  //id가 있으면 url에 붙여줌
        return await instance.get<MemberDetailResponse>(url);
    },
    //구성원 추가가
    insertMember: async (requestData: { body: MemberInsertType }) => {
        console.log("API 요청 데이터:", requestData); // 요청 데이터 로깅
        const response = await instance.post('/api/constnt', requestData.body);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    },
    //구성원 삭제제
    deleteMember: async (id: string | null) => {
        console.log("API 요청 데이터:", id); // 요청 데이터 로깅
        const response = await instance.post(`/api/constnt/remove/${id}`);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    },
};

const KEY = {
    //구성원 및 사용자 목록
    getMemeberLsit: (requsetData: string) => {
        const url = requsetData ? `/api/user/listofmber/${requsetData}` : '/api/user/listofmber/';
        return [url];
    },
    //구성원 수정
    updateMember: () => ['/api/constnt'],
    //구성원 상세
    getMemberDetail: (id: string | null) => {
        const url = id ? `/api/constnt/${id}` : '/api/constnt/';
        return [url]
    },
    //구성원 추가
    insertMember: () => ['/api/constnt'],
    //구성원 삭제
    deleteMember: (id: string | null) => [`/api/constnt/remove/${id}`],
};

//구성원 및 사용자 목록
export const useMemberList = (requsetData: string) => {
    //console.log("request data:", requsetData); // 요청 데이터 로그 추가
    return useQuery({
        queryKey: KEY.getMemeberLsit(requsetData),
        queryFn: async () => {
            const result = await API.getMemeberLsit(requsetData);
            //console.log("Result:", result); // 쿼리 결과 로그 추가
            return result;
        }
    })
}

//구성원 수정
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
};

//구성원 상세
export const useMemberDetail = (id: string | null) => {
    return useQuery({
        queryKey: KEY.getMemberDetail(id),
        queryFn: async () => {
            const result = await API.getMemberDetail(id);
            return result;
        },
        enabled: !!id, // 사용자 번호 선택안하면 실행 안함
    })
};

//구성원 추가
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
};

//구성원 삭제
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