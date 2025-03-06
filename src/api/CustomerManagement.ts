import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomerGroupListHeaderListResponse, CustomerGroupListResponseType, UpdateGroupHeader } from "../types/CustomerManagement";
import instance from "../utils/axiosInstance";

const API = {
    //고객 관리 그룹 목록 조회
    getCustomerGroupList: async (sptNo : string) => {
        const url = sptNo ? `/api/custom/group/list?sptNo=${sptNo}` : '/api/custom/group/list';
        return await instance.get<CustomerGroupListResponseType>(url);
    },
    //고객 관리 그룹 헤더 조회
    getCustomerGroupHeaderList: async (requestData : {sptNo: string, groupNo: string}) => {
        const url = `/api/custom/group?sptNo=${requestData.sptNo}&groupNo=${requestData.groupNo}`;
        return await instance.get<CustomerGroupListHeaderListResponse>(url);
    },
    //고객 그룹 헤더 수정
    updateCumtomerGroupHeader: async (requestData : {body : UpdateGroupHeader}) => {
        const url = '/api/custom/group';
        return await instance.post(url, requestData.body);
    },
};

const KEY = {
    //고객 관리 그룹 목록 조회
    getCustomerGroupList: (sptNo : string) => {
        const url = sptNo ? `/api/custom/group/list?sptNo=${sptNo}` : '/api/custom/group/list';
        return [url]
    },
    //고객 관리 그룹 헤더 조회
    getCustomerGroupHeaderList: (requestData : {sptNo: string, groupNo: string}) => [`/api/custom/group?sptNo=${requestData.sptNo}&groupNo=${requestData.groupNo}`],
    //고객 그룹 헤더 수정
    updateCumtomerGroupHeader: () => ['/api/custom/group'],
};

//고객 관리 그룹 목록 조회
export const getCustomerGroupList = (sptNo : string) => {
    return useQuery({
        queryKey: KEY.getCustomerGroupList(sptNo),
        queryFn: async () => {
            console.log("고객 관리 그룹 목록 조회 보낸데이터:", sptNo);
            const result = await API.getCustomerGroupList(sptNo);
            console.log("고객 관리 그룹 목록 조회 데이터:", result);
            return result;
        }, 
        enabled: !!sptNo
    })
};

//고객 관리 그룹 헤더 조회
export const getCustomerGroupHeaderList = (requestData: { sptNo: string; groupNo: string }) => {
    return useQuery({
        queryKey: KEY.getCustomerGroupHeaderList(requestData), // ✅ KEY를 사용하도록 수정
        queryFn: async () => {
            console.log("고객 관리 그룹 헤더 조회 보낸 데이터:", requestData);
            const result = await API.getCustomerGroupHeaderList(requestData);
            console.log("고객 관리 그룹 헤더 조회 데이터:", result);
            return result;
        },
        enabled: !!requestData.sptNo || !!requestData.groupNo
    });
};

//고객 그룹 헤더 수정
export const updateCumtomerGroupHeader = () => {
    return useMutation({
        mutationKey: KEY.updateCumtomerGroupHeader(),
        mutationFn: (requestData : {body : UpdateGroupHeader}) => API.updateCumtomerGroupHeader(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    });
};