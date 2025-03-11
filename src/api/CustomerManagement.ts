import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomerDetailListResponse, CustomerDetailResponse, CustomerGroupListHeaderListResponse, CustomerGroupListResponseType, CustomerListResponse, CustomerManagementAreaResponse, UpdateGroupHeader } from "../types/CustomerManagement";
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
    //고객관리 고객 리스트 테이블 조회 - 왼쪽
    getCumstomerList: async (requestData: { sptNo: string, cstmrNm: string, page: number, limit:any }) => {
        const url = `/api/custom?sptNo=${requestData.sptNo}&cstmrNm=${requestData.cstmrNm}&page=${requestData.page}&limit=${requestData.limit}`;
        return await instance.get<CustomerListResponse>(url);
    },
    //고객관리 고객 상세 테이블 조회 - 오른쪽 테이블
    getCustomerDetailList: async (requestData: {sptNo: string, groupNo: string, cstmrNm: string, page: number, limit:any}) => {
        const url = `/api/custom/detail/list?sptNo=${requestData.sptNo}&groupNo=${requestData.groupNo}&cstmrNm=${requestData.cstmrNm}&page=${requestData.page}&limit=${requestData.limit}`;
        return await instance.get<CustomerDetailListResponse>(url)
    },
    //고객관리 고객 상세 조회 - 오른쪽 input조회
    getCustmoerDetail: async (requestData : {sptNo:string,groupNo:string,cstmrNo:string }) => {
        const url = `/api/custom/detail?sptNo=${requestData.sptNo}&groupNo=${requestData.groupNo}&cstmrNo=${requestData.cstmrNo}`;
        return await instance.get<CustomerDetailResponse>(url);
    },
    //고객의 관리지역 목록
    getCustomerManagementArea: async (sptNo: string) => {
        const url = `/api/sptcnslt/area/list/${sptNo}`;
        return await instance.get<CustomerManagementAreaResponse>(url);
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
    //고객관리 왼쪽 테이블 조회
    getCumstomerList: (requestData: { sptNo: string, cstmrNm: string, page: number, limit:any }) => [`/api/custom?sptNo=${requestData.sptNo}&cstmrNm=${requestData.cstmrNm}&page=${requestData.page}&limit=${requestData.limit}`],
    //고객관리 고객 상세 테이블 조회 - 오른쪽 테이블
    getCustomerDetailList: (requestData: {sptNo: string, groupNo: string, cstmrNm: string, page: number, limit:any}) => [`/api/custom/detail/list?sptNo=${requestData.sptNo}&groupNo=${requestData.groupNo}&cstmrNm=${requestData.cstmrNm}&page=${requestData.page}&limit=${requestData.limit}`],
    //고객관리 고객 상세 조회 - 오른쪽 input조회
    getCustmoerDetail: (requestData : {sptNo:string,groupNo:string,cstmrNo:string }) => [`/api/custom/detail?sptNo=${requestData.sptNo}&groupNo=${requestData.groupNo}&cstmrNo=${requestData.cstmrNo}`],
    //고객의 관리지역 목록
    getCustomerManagementArea: (sptNo: string) => [`/api/sptcnslt/area/list/${sptNo}`],
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

//고객관리 왼쪽 테이블 조회
export const getCumstomerList = (requestData: { sptNo: string, cstmrNm: string, page: number, limit:any }) => {
    return useQuery({
        queryKey: KEY.getCumstomerList(requestData),
        queryFn: async () => {
            console.log("고객 조회 보낸 데이터:", requestData);
            const result = await API.getCumstomerList(requestData);
            console.log("고객 조회 데이터:",result);
            return result;
        },
        enabled: !!requestData.sptNo
    })
};

//고객관리 고객 상세 테이블 조회 - 오른쪽 테이블
export const getCustomerDetailList = (requestData: {sptNo: string, groupNo: string, cstmrNm: string, page: number, limit:any}) => {
    return useQuery({
        queryKey: KEY.getCustomerDetailList(requestData),
        queryFn: async () => {
            //console.log("고객 상세 조회 보낸 데이터:", requestData);
            const result = await API.getCustomerDetailList(requestData);
            //console.log("고객 상세 조회 데이터:",result);
            return result;
        },
        enabled: !!requestData.groupNo
    })
};

//고객관리 고객 상세 조회 - 오른쪽 input조회
export const getCustmoerDetail = (requestData : {sptNo:string,groupNo:string,cstmrNo:string }) => {
    return useQuery({
        queryKey: KEY.getCustmoerDetail(requestData),
        queryFn: async () => {
            console.log("고객 상세 조회 보낸 데이터:", requestData);
            const result = await API.getCustmoerDetail(requestData);
            console.log("고객 상세 조회 데이터:",result);
            return result;
        },
        enabled: !!requestData.cstmrNo
    })
};

//고객의 관리지역 목록
export const getCustomerManagementArea = (sptNo: string) => {
    return useQuery({
        queryKey: KEY.getCustomerManagementArea(sptNo),
        queryFn: async () => {
            console.log("고객 관리지역 보낸 데이터:", sptNo);
            const result = await API.getCustomerManagementArea(sptNo);
            console.log("고객 관리지역 데이터:",result);
            return result;
        },
        enabled: !!sptNo,
    })
};