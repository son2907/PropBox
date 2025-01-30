import { useMutation, useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import { DeleteUserType, UserDetailResponse, UserDetailUpdateType, UserInsertType, UserListResponse, UserPermitSolutionResponse } from "../types/userList";

const API = {
    //사용자 목록 조회
    getUserList: async (requsetData: string) => {
        const url = requsetData ? `/api/user/list?userNm=${requsetData}` : '/api/user/list';
        //console.log("Calling API with URL:", url); // URL 로그 추가
        const response = await instance.get<UserListResponse>(url);
        //console.log("API Response:", response.data); // 응답 데이터 로그 추가
        return response;
    },
    //사용자 상세 조회
    getUserDetail: async (userNo: string) => {
        const url = userNo ? `/api/user/one?userNo=${userNo}` : '/api/user/one?userNo=1001';
        const response = await instance.get<UserDetailResponse>(url)
        return response;
    },
    //사용자 허가 솔루션
    getUserPermitSolution: async (requsetData: string) => {
        console.log("API 요청 데이터:", requsetData); // 요청 데이터 로깅
        const url = requsetData ? `/api/user/slutn/sel/${requsetData}` : '/api/user/slutn/sel/';
        const response = await instance.get<UserPermitSolutionResponse>(url);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    },
    //사용자 추가
    insertUSer: async (requsetData: { body: UserInsertType }) => {
        const url = '/api/user'
        return await instance.post(url, requsetData.body);
    },
    //사용자 수정
    updateUser: async (requestData: { body: UserDetailUpdateType }) => {
        const url = '/api/user';
        return await instance.put(url, requestData.body);
    },
    //사용자 삭제
    deleteUser: async (userNo: string) => {
        const url = `/api/user/remove?userNo=${userNo}`;
        return await instance.post(url, { userNo });  // userNo를 body에도 포함
    },

};

const KEY = {
    //사용자 목록 조회
    getUserList: (requsetData: string) => {
        const url = requsetData ? `/api/user/list?userNm=${requsetData}` : '/api/user/list';
        //console.log("Generated URL:", url); // URL 로그 추가
        return [url];
    },
    //사용자 상세 조회
    getUserDetail: (userNo: string) => [`/api/user/one?userNo=${userNo}`],
    //사용자 허가 솔루션
    getUserPermitSolution: (requsetData: string) => {
        const url = requsetData ? `/api/user/slutn/sel/${requsetData}` : '/api/user/slutn/sel/';
        return [url];
    },
    //사용자 추가
    insertUser: () => ['/api/user'],
    //사용자 수정
    updateUser: () => ['/api/user'],
    //사용자 삭제
    deleteUser: () => [`/api/user/remove`], // 캐싱 키

};

//사용자 목록 조회
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

//사용자 상세 조회
export const useUserDetail = (userNo: string) => {
    return useQuery({
        queryKey: KEY.getUserDetail(userNo),
        queryFn: async () => {
            const result = await API.getUserDetail(userNo);
            return result;
        },
        enabled: !!userNo,
    })
};

//사용자 허가 솔루션 조회
export const useUserPermitSolution = (requsetData: string) => {
    console.log("데이터 넘어오는지 확인 : ", requsetData);
    return useQuery({
        queryKey: KEY.getUserPermitSolution(requsetData),
        queryFn: async () => {
            const result = await API.getUserPermitSolution(requsetData);
            console.log("결과 : ", result);
            return result;
        },
    })
};

//사용자 추가
export const insertUser = () => {
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

//사용자 수정
export const updateUser = () => {
    return useMutation({
        mutationFn: (requestData: { body: UserDetailUpdateType }) => API.updateUser(requestData),
        mutationKey: KEY.updateUser(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//사용자 삭제
export const deleteUser = () => {
    return useMutation({
        mutationFn: (userNo: string) => API.deleteUser(userNo),  // userNo가 올바르게 전달되는지 확인
        mutationKey: KEY.deleteUser(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data);
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error);
        },
    });
};