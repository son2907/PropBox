import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomerDetailBottomResponse, CustomerDetailListResponse, CustomerDetailTopResponse, CustomerGroupDeleteType, CustomerGroupInsertType, CustomerGroupListHeaderListResponse, CustomerGroupListResponseType, CustomerListResponse, CustomerManagementAreaResponse, CustomerPreviewTotalCountType, CustomerSingleDeleteType, CustomerSingleUpdateType, CustomerSmsTotalCountType, CustomserExcelUploadHeaderPositionType, UpdateGroupHeader } from "../types/CustomerManagement";
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
    //고객관리 고객 상세 조회 - 오른쪽 input (고객이름~주소)
    getCustmoerDetailTop: async (requestData : {sptNo:string,groupNo:string,cstmrNo :string }) => {
        const url = `/api/custom/detail/top?sptNo=${requestData.sptNo}&groupNo=${requestData.groupNo}&cstmrNo=${requestData.cstmrNo}`;
        return await instance.get<CustomerDetailTopResponse>(url);
    },
    //고객 관리 - 고객 상세 조회 기본정보 or 상담항목
    getCustomerDetailBottom: async (requestData : {sptNo:string,groupNo:string,cstmrNo:string }) => {
        const url = `/api/custom/detail/bottom?sptNo=${requestData.sptNo}&groupNo=${requestData.groupNo}&cstmrNo=${requestData.cstmrNo}`
        return await instance.get<CustomerDetailBottomResponse>(url);
    },
    //고객의 관리지역 목록
    getCustomerManagementArea: async (sptNo: string) => {
        const url = `/api/sptcnslt/area/list/${sptNo}`;
        return await instance.get<CustomerManagementAreaResponse>(url);
    },
    //고객관리 - 고객 그룹 추가
    customerGroupInsert: async (requestData: {body : CustomerGroupInsertType}) => {
        const url = '/api/custom/group';
        return await instance.post(url, requestData.body);
    },
    //고객관리 - 고객 그룹 관리 그룹 삭제
    customerGroupDelete: async ({sptNo, groupNo}: CustomerGroupDeleteType) => {
        const url = `/api/custom/group/${sptNo}/${groupNo}`;
        return await instance.delete(url);
    },
    //고객관리 - 고객 개별 수정
    customerSingleUpdate: async ( requestData : { body : CustomerSingleUpdateType}) => {
        const url = '/api/custom';
        return await instance.post(url, requestData.body);
    },
    //고객관리 개별 삭제
    customerSingleDelete: async ({sptNo, cstmrNo}: CustomerSingleDeleteType) => {
        const url = `/api/custom/delete?sptNo=${sptNo}&cstmrNo=${cstmrNo}`;
        return await instance.delete(url);
    },
    //고객관리 문자전송 전송대상 count
    transmissionCount: async (requestData: {body:CustomerSmsTotalCountType}) => {
        const url = '/api/custom/sms/tmptabscnt';
        return await instance.post(url,requestData.body);
    },
    // 고객 미리보기 - 확정인원 목록
    confirmedCustomerList: async (requestData: {body: CustomerPreviewTotalCountType}) => {
        const url = '/api/custom/sms/tmp';
        return await instance.post(url,requestData.body);
    },
    //고객관리 - 문자전송 - 전송대상 미리보기 - 중복인원
    duplicateCustomerList: async (requestData:{body : CustomerPreviewTotalCountType}) => {
        const url = '/api/custom/sms/tmp';
        return await instance.post(url,requestData.body);
    },
    //고객 엑셀 업로드 헤더 위치 저장
    customserExcelUploadHeaderPosition: async (requestData : {body : CustomserExcelUploadHeaderPositionType}) => {
        const url = '/api/custom/group/grouppos';
        return await instance.post(url,requestData.body);
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
    getCustmoerDetailTop: (requestData : {sptNo:string,groupNo:string,cstmrNo:string }) => [`/api/custom/detail?sptNo=${requestData.sptNo}&groupNo=${requestData.groupNo}&cstmrNo=${requestData.cstmrNo}`],
    //고객 관리 - 고객 상세 조회 기본정보 or 상담항목
    getCustomerDetailBottom: (requestData : {sptNo:string,groupNo:string,cstmrNo:string }) => [`/api/custom/detail/bottom?sptNo=${requestData.sptNo}&groupNo=${requestData.groupNo}&cstmrNo=${requestData.cstmrNo}`],
    //고객의 관리지역 목록
    getCustomerManagementArea: (sptNo: string) => [`/api/sptcnslt/area/list/${sptNo}`],
    //고객관리 - 고객 그룹 추가 또는 수정
    customerGroupInsert: () => ['/api/custom/group'],
    //고객관리 - 고객 그룹 관리 그룹 삭제
    customerGroupDelete: () => ["/api/custom/group","delete"],
    //고객관리 - 고객 개별 수정
    customerSingleUpdate: () => ['/api/custom'],
    //고객관리 개별 삭제
    customerSingleDelete: () => ["/api/custom/delete","delete"],
    //고객관리 문자전송 전송대상 count
    transmissionCount: () => ['/api/custom/sms/tmpcnt'],
    // 고객 미리보기 - 확정인원 목록
    confirmedCustomerList: () => ['/api/custom/sms/tmp'],
    //고객 엑셀 업로드 헤더 위치 저장
    customserExcelUploadHeaderPosition: () => ['/api/custom/group/grouppos'],
};

//고객 관리 그룹 목록 조회
export const getCustomerGroupList = (sptNo : string) => {
    return useQuery({
        queryKey: KEY.getCustomerGroupList(sptNo),
        queryFn: async () => {
            //console.log("고객 관리 그룹 목록 조회 보낸데이터:", sptNo);
            const result = await API.getCustomerGroupList(sptNo);
            //console.log("고객 관리 그룹 목록 조회 데이터:", result);
            return result;
        }, 
        enabled: !!sptNo
    })
};

//고객 관리 그룹 헤더 조회
export const getCustomerGroupHeaderList = (requestData: { sptNo: string; groupNo: string }) => {
    return useQuery({
        queryKey: KEY.getCustomerGroupHeaderList(requestData),
        queryFn: async () => {
            //console.log("고객 관리 그룹 헤더 조회 보낸 데이터:", requestData);
            const result = await API.getCustomerGroupHeaderList(requestData);
           //console.log("고객 관리 그룹 헤더 조회 데이터:", result);
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
            //console.log("고객 조회 보낸 데이터:", requestData);
            const result = await API.getCumstomerList(requestData);
            //console.log("고객 조회 데이터:",result);
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
            console.log("고객 상세 조회 보낸 데이터:", requestData);
            const result = await API.getCustomerDetailList(requestData);
            console.log("고객 상세 조회 테이블 데이터:",result);
            return result;
        },
        enabled: !!requestData.groupNo
    })
};

//고객관리 고객 상세 조회 - 오른쪽 input조회
export const getCustmoerDetailTop = (requestData : {sptNo:string,groupNo:string,cstmrNo:string }) => {
    return useQuery({
        queryKey: KEY.getCustmoerDetailTop(requestData),
        queryFn: async () => {
            console.log("고객 위쪽 상세 조회 보낸 데이터:", requestData);
            const result = await API.getCustmoerDetailTop(requestData);
            console.log("고객 위쪽 상세 조회 데이터:",result);
            return result;
        },
        enabled: !!requestData.cstmrNo
    })
};

//고객 관리 - 고객 상세 조회 기본정보 or 상담항목
export const getCustomerDetailBottom = (requestData : {sptNo:string,groupNo:string,cstmrNo:string }) => {
    return useQuery({
        queryKey: KEY.getCustomerDetailBottom(requestData),
        queryFn: async () => {
            //console.log("아래부분 보낸 데이터:",requestData);
            const result = await API.getCustomerDetailBottom(requestData);
            //console.log("아래 데이터:",result);
            return result;
        },
        enabled: !!requestData.cstmrNo
    });
};

//고객의 관리지역 목록
export const getCustomerManagementArea = (sptNo: string) => {
    return useQuery({
        queryKey: KEY.getCustomerManagementArea(sptNo),
        queryFn: async () => {
            //console.log("고객 관리지역 보낸 데이터:", sptNo);
            const result = await API.getCustomerManagementArea(sptNo);
            //console.log("고객 관리지역 데이터:",result);
            return result;
        },
        enabled: !!sptNo,
    })
};

//고객관리 - 고객 그룹 추가 또는 수정
export const customerGroupInsert = () => {
    return useMutation({
        mutationKey: KEY.customerGroupInsert(),
        mutationFn: (requestData: {body : CustomerGroupInsertType}) => API.customerGroupInsert(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    });
};

//고객관리 - 고객 그룹 관리 그룹 삭제
export const customerGroupDelete = () => {
    return useMutation({
        mutationKey: KEY.customerGroupDelete(),
        mutationFn: ({sptNo, groupNo}: CustomerGroupDeleteType) => API.customerGroupDelete({sptNo, groupNo}),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    });
};

//고객관리 - 고객 개별 수정
export const customerSingleUpdate = () => {
    return useMutation({
        mutationKey: KEY.customerSingleUpdate(),
        mutationFn: (requestData : { body : CustomerSingleUpdateType}) => API.customerSingleUpdate(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//고객관리 개별 삭제
export const customerSingleDelete = () => {
    return useMutation({
        mutationKey: KEY.customerSingleDelete(),
        mutationFn: ({sptNo, cstmrNo}: CustomerSingleDeleteType) => API.customerSingleDelete({sptNo, cstmrNo}),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    });
};

//고객관리 문자전송 전송대상 count
export const transmissionCount = () => {
    return useMutation({
        mutationKey: KEY.transmissionCount(),
        mutationFn: (requestData: {body:CustomerSmsTotalCountType}) => API.transmissionCount(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//고객관리 - 문자전송 - 전송대상 미리보기 - 확정인원
export const confirmedCustomerList = () => {
    return useMutation({
        mutationKey: KEY.confirmedCustomerList(),
        mutationFn: (requestData: {body: CustomerPreviewTotalCountType}) => API.confirmedCustomerList(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

// 고객 미리보기 - 중복인원원 목록
export const duplicateCustomerList = () => {
    return useMutation({
        mutationKey: KEY.confirmedCustomerList(),
        mutationFn: (requestData: {body: CustomerPreviewTotalCountType}) => API.confirmedCustomerList(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    }); 
};

// 고객 미리보기 - 형식오류 목록
export const errorCustomerList = () => {
    return useMutation({
        mutationKey: KEY.confirmedCustomerList(),
        mutationFn: (requestData: {body: CustomerPreviewTotalCountType}) => API.confirmedCustomerList(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    });
};

// 고객 미리보기 - 수신거부 목록
export const rejectCustomerList = () => {
    return useMutation({
        mutationKey: KEY.confirmedCustomerList(),
        mutationFn: (requestData: {body: CustomerPreviewTotalCountType}) => API.confirmedCustomerList(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    });
};

//고객 엑셀 업로드 헤더 위치 저장
export const customserExcelUploadHeaderPosition = () => {
    return useMutation({
        mutationKey: KEY.customserExcelUploadHeaderPosition(),
        mutationFn: (requestData : {body : CustomserExcelUploadHeaderPositionType}) => API.customserExcelUploadHeaderPosition(requestData),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    });
};