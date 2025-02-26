import { useMutation, useQuery } from "@tanstack/react-query";
import { AllPhoneCountResponse, AllPhoneListResponse, PhoneDetailResponse, PhoneDetailType, PhoneInsertType, PhoneUpdateType, UserInsertPhoneInsertType, UserPhoneListResponse, UserUnsertPhoneType } from "../types/phoneManagement";
import instance from "../utils/axiosInstance";

const API = {
    //모든 사용자의 전화기 수
    getUserPhoneCount: async (requestData : {userNm : string}) => {
        const url = requestData ? `/api/tel/user/cnt/list?userNm=${requestData.userNm}` : '/api/tel/user/cnt/list';
        return await instance.get<AllPhoneCountResponse>(url);
    },
    //선택한 사용자의 전화기 리스트
    getUserPhoneList: async (userNo: string) => {
        const url = `/api/tel/user/list/selected/${userNo}`;
        return await instance.get<UserPhoneListResponse>(url);
    },
    //모든 전화기 리스트
    getAllPhoneList: async (telNo: string) => {
        const url = telNo ? `/api/tel/user/list?telNo=${telNo}` : '/api/tel/user/list';
        return await instance.get<AllPhoneListResponse>(url);
    },
    //전화기 상세보기
    getPhoneDetail: async (telId : string) => {
        const url = `/api/tel/${telId}`;
        return await instance.get<PhoneDetailResponse>(url);
    },
    //전화기 추가
    insertPhone: async (requestData : {body : PhoneInsertType}) => {
        const url = '/api/tel/commnse';
        return await instance.post(url, requestData.body);
    },
    //전화기 수정
    updatePhone: async (requestData : {body : PhoneUpdateType}) => {
        const url = '/api/tel';
        return await instance.put(url, requestData.body);
    },
    //사용자 전화기 할당
    insertUserPhone: async (requestData: {body: UserInsertPhoneInsertType}) => {
        const url = '/api/tel/user';
        return await instance.post(url,requestData.body);
    },
    //사용자 전화기 회수
    userUnsertPhone: async (requestData: {body : UserUnsertPhoneType}) => {
        const url = '/api/tel/user/remove/selected';
        return await instance.put(url, requestData.body);
    }
}

const KEY = {
    //모든 사용자의 전화기 수
    getUserPhoneCount: (requestData : {userNm : string}) => {
        const url = requestData ? `/api/tel/user/cnt/list?userNm=${requestData.userNm}` : '/api/tel/user/cnt/list';
        return [url]
    },
    //선택한 사용자의 전화기 리스트
    getUserPhoneList: (userNo: string) => [`/api/tel/user/list/selected/${userNo}`],
    //모든 전화기 리스트
    getAllPhoneList: (telNo: string) => {
        const url = telNo ? `/api/tel/user/list?telNo=${telNo}` : '/api/tel/user/list';
        return [url]
    },
    //전화기 상세보기
    getPhoneDetail: (telId : string) => [`/api/tel/${telId}`],
    //전화기 추가
    insertPhone: () => ['/api/tel/commnse'],
    //전화기 수정
    updatePhone: () => ['/api/tel'],
    //사용자 전화기 할당
    insertUserPhone: () => ['/api/tel/user'],
    //사용자 전화기 회수
    userUnsertPhone: () => ['/api/tel/user/remove/selected'],
}

//모든 사용자의 전화기 수
export const getUserPhoneCount = (requestData : {userNm : string}) => {
    return useQuery({
        queryKey: KEY.getUserPhoneCount(requestData),
        queryFn: async () => {
            const result  = await API.getUserPhoneCount(requestData);
            return result;
        }
    })
};

//선택한 사용자의 전화기 리스트
export const getUserPhoneList = (userNo: string) => {
    return useQuery({
        queryKey: KEY.getUserPhoneList(userNo),
        queryFn: async () => {
            const result = await API.getUserPhoneList(userNo);
            return result;
        },
        enabled: !!userNo
    })
};

//모든 전화기 리스트
export const getAllPhoneList = (telNo: string) => {
    return useQuery({
        queryKey : KEY.getAllPhoneList(telNo),
        queryFn: async () => {
            const result = await API.getAllPhoneList(telNo);
            return result;
        }
    })
};

//전화기 상세보기
export const getPhoneDetail = (telId : string) => {
    return useQuery({
        queryKey: KEY.getPhoneDetail(telId),
        queryFn: async () => {
            const result = await API.getPhoneDetail(telId);
            console.log("상세보기 결과값 확인 : ",result);
            return result;
        },
        enabled : !!telId
    })
};

//전화기 추가
export const insertPhone = () => {
    return useMutation({
        mutationKey: KEY.insertPhone(),
        mutationFn: (requestData : {body : PhoneInsertType}) => API.insertPhone(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//전화기 수정
export const updatePhone = () => {
    return useMutation({
        mutationKey: KEY.updatePhone(),
        mutationFn: (requestData : {body : PhoneUpdateType}) => API.updatePhone(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//사용자 전화기 할당
export const insertUserPhone = () => {
    return useMutation({
        mutationKey: KEY.insertUserPhone(),
        mutationFn: (requestData: {body: UserInsertPhoneInsertType}) => API.insertUserPhone(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//사용자 전화기 회수
export const userUnsertPhone = () => {
    return useMutation({
        mutationKey: KEY.userUnsertPhone(),
        mutationFn: (requestData: {body : UserUnsertPhoneType}) => API.userUnsertPhone(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};