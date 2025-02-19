import { useMutation, useQuery } from "@tanstack/react-query";
import { CompanyLocalListResponse, DeviceSectionListResponse, InsertPhone, MemeberLocalListResponse, UserCompanyListResponse } from "../types/networkSetup";
import instance from "../utils/axiosInstance";

const API = {
    //사용자 아이디 및 회사 조회
    getUserCompanyList: async (requestData: { userNo: string, cmpNm: string }) => {
        const url = requestData ? `/api/tel/user/config/list?userNo=${requestData.userNo}&cmpNm=${requestData.cmpNm}` : '/api/tel/user/config/list';
        return await instance.get<UserCompanyListResponse>(url);
    },
    //회사와 현장 리스트 조회
    getComapnyLocalList: async (requestData: { userNo: string, sptNm: string }) => {
        const url = `/api/tel/user/config/spt/list/${requestData.userNo}?sptNm=${requestData.sptNm}`;
        return await instance.get<CompanyLocalListResponse>(url);
    },
    //구성원과 현장 리스트 조회
    getMemberLocalList: async (requestData: { userNo: string, constntNm: string }) => {
        const url = `/api/tel/user/config/constnt/list/${requestData.userNo}?constntNm=${requestData.constntNm}`
        return await instance.get<MemeberLocalListResponse>(url);
    },
    //전화기 추가
    insertPhone: async (requestData: { body: InsertPhone }) => {
        const url = '/api/tel';
        return await instance.post(url, requestData.body);
    },
    //전화기 장치 구분
    deviceSection: async () => {
        const url = '/api/tel/commonselist';
        return await instance.get<DeviceSectionListResponse>(url);
    },
}

const KEY = {
    //사용자 아이디 및 회사 조회
    getUserCompanyList: (requestData: { userNo: string, cmpNm: string }) => [`api/tel/user/config/list?userNo=${requestData.userNo}&cmpNm=${requestData.cmpNm}`],
    //회사와 현장 리스트 조회
    getComapnyLocalList: (requestData: { userNo: string, sptNm: string }) => [`/api/tel/user/config/spt/list/${requestData.userNo}?sptNm=${requestData.sptNm}`],
    //구성원과 현장 리스트 조회
    getMemberLocalList: (requestData: { userNo: string, constntNm: string }) => [`/api/tel/user/config/constnt/list/${requestData.userNo}?constntNm=${requestData.constntNm}`],
    //전화기 추가
    insertPhone: () => ['/api/tel'],
    //전화기 장치 구분
    deviceSection: () => ['/api/tel/commonselist'],
}

//사용자 아이디 및 회사 조회
export const getUserCompanyList = (requestData: { userNo: string, cmpNm: string }) => {
    //console.log("보낸데이터 : ", requestData);
    return useQuery({
        queryKey: KEY.getUserCompanyList(requestData),
        queryFn: async () => {
            const result = await API.getUserCompanyList(requestData);
            console.log("받은데이터 : ", result);
            return result;
        }
    })
};

//회사와 현장 리스트 조회
export const getComapnyLocalList = (requestData: { userNo: string, sptNm: string }) => {
    //console.log("보낸데이터 : ", requestData);
    return useQuery({
        queryKey: KEY.getComapnyLocalList(requestData),
        queryFn: async () => {
            const result = await API.getComapnyLocalList(requestData);
            console.log("받은데이터 : ", result);
            return result;
        },
        enabled: !!requestData.userNo
    })
};

//구성원과 현장 리스트 조회
export const getMemberLocalList = (requestData: { userNo: string, constntNm: string }) => {
    return useQuery({
        queryKey: KEY.getMemberLocalList(requestData),
        queryFn: async () => {
            const result = await API.getMemberLocalList(requestData);
            console.log("받은데이터 : ", result);
            return result;
        },
        enabled: !!requestData.userNo
    })
};

//전화기 추가
export const insertPhone = () => {
    return useMutation({
        mutationFn: (requestData: { body: InsertPhone }) => API.insertPhone(requestData),
        mutationKey: KEY.insertPhone(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//전화기 장치 구분
export const getDeviceSection = () => {
    return useQuery({
        queryKey: KEY.deviceSection(),
        queryFn: async () => {
            const result = await API.deviceSection();
            console.log("받은데이터 : ", result);
            return result;
        }
    })
};