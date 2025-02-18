import { useMutation, useQuery } from "@tanstack/react-query";
import { MemberAuthDetailResponse, MemberMenuListResponseType, MemberPermissionMenuListResponse, MenuNonPermissionInsertType, MenuPermissionInsertType, NonPermissionMenuListResponse, PermissionMenuCopyType, PermissionMenuListResponse, PermissionRevokeType } from "../types/authManagement";
import instance from "../utils/axiosInstance";

const API = {
    //구성원별 메뉴 목록 조회 - 현장 구성원
    getMemberMenuList: async (userNo: string) => {
        const url = `/api/spt/constnt/lisnelist/${userNo}`;
        return await instance.get<MemberMenuListResponseType>(url);
    },
    //구성원 권한 상세 조회
    getMemberAuthDetail: async (requestData: { userNo: string, sptNo: string }) => {
        const url = `/api/spt/constnt/${requestData.sptNo}/${requestData.userNo}`;
        return await instance.get<MemberAuthDetailResponse>(url);
    },
    //구성원 메뉴 권한 등록 및 수정 팝업 - 미권한 메뉴 조회
    getNonPermissionMenuList: async (sptNo: string) => {
        const url = `api/spt/constnt/lisnenolist/${sptNo}`;
        return await instance.get<NonPermissionMenuListResponse>(url);
    },
    //구성원 메뉴 권한 등록 및 수정 팝업 - 권한메뉴 조회
    getMemberPermissionMenuList: async (userNo: string) => {
        const url = `/api/spt/constnt/lisnelist/${userNo}`;
        return await instance.get<MemberPermissionMenuListResponse>(url);
    },
    // 구성원 메뉴 권한 등록 및 수정 팝업 - 미권한 등록
    nonPermissionMenuInsert: async (requestData: { body: MenuNonPermissionInsertType }) => {
        const url = '/api/spt/constnt/lisne/remove';
        return await instance.post(url, requestData.body);
    },
    // 구성원 메뉴 권한 등록 및 수정 팝업 - 권한 등록
    permissionMenuInsert: async (requestData: { body: MenuPermissionInsertType }) => {
        const url = '/api/spt/constnt/lisne';
        return await instance.post(url, requestData.body);
    },
    //구성원 권한 복사 팝업 - 목록 조회
    permissionMenuCopyList: async (requestData: { sptNo: string, userNo: string, userNm: string, rspofcCd: string }) => {
        const url = `api/spt/constnt/list/${requestData.sptNo}/${requestData.userNo}?userNm=${requestData.userNm}&rspofcCd=${requestData.rspofcCd}`;
        return await instance.get<PermissionMenuListResponse>(url);
    },
    //구성원 권한 복사 팝업 - 권한 복사
    permissionMenuCopy: async (requestData: { body: PermissionMenuCopyType }) => {
        const url = 'api/spt/constnt/lisne/copy';
        return await instance.post(url, requestData.body);
    },
    //구성원 권한 회수
    permissionRevoke: async (requestData: {body : PermissionRevokeType }) => {
        const url = '/api/spt/constnt/lisne/removereason';
        return await instance.post(url, requestData.body);
    },
}

const KEY = {
    //구성원별 메뉴 목록 조회
    getMemberMenuList: (userNo: string) => [`/api/spt/constnt/lisnelist/${userNo}`],
    //구성원 권한 상세 조회
    getMemberAuthDetail: (requestData: { userNo: string, sptNo: string }) => [`/api/spt/constnt/${requestData.sptNo}/${requestData.userNo}`],
    //구성원 메뉴 권한 등록 및 수정 팝업 - 미권한 메뉴 조회
    getNonPermissionMenuList: (sptNo: string) => [`api/spt/constnt/lisnenolist/${sptNo}`],
    //구성원 메뉴 권한 등록 및 수정 팝업 - 권한메뉴 조회
    getMemberPermissionMenuList: (userNo: string) => [`/api/spt/constnt/lisnelist/${userNo}`],
    // 구성원 메뉴 권한 등록 및 수정 팝업 - 미권한 등록
    nonPermissionMenuInsert: () => ['/api/spt/constnt/lisne/remove'],
    // 구성원 메뉴 권한 등록 및 수정 팝업 - 권한 등록
    permissionMenuInsert: () => ['/api/spt/constnt/lisne'],
    //구성원 권한 복사 팝업 - 목록 조회
    permissionMenuCopyList: (requestData: { sptNo: string, userNo: string, userNm: string, rspofcCd: string }) => [`api/spt/constnt/list/${requestData.sptNo}/${requestData.userNo}?userNm=${requestData.userNm}&rspofcCd=${requestData.rspofcCd}`],
    //구성원 권한 복사 팝업 - 권한 복사
    permissionMenuCopy: () => ['api/spt/constnt/lisne/copy'],
    //구성원 권한 회수
    permissionRevoke: () => ['/api/spt/constnt/lisne/removereason'],
};

//구성원 조회
export const useMemberMenuList = (userNo: string) => {
    console.log("실행됨", userNo);
    return useQuery({
        queryKey: KEY.getMemberMenuList(userNo),
        queryFn: async () => {
            const result = await API.getMemberMenuList(userNo);
            console.log("허가 솔루션 결과는 :", result, userNo); // 쿼리 결과 로그 추가
            return result;
        }
    })
}

//구성원 권한 상세 조회
export const getMemberAuthDetail = (requestData: { userNo: string, sptNo: string }) => {
    return useQuery({
        queryKey: KEY.getMemberAuthDetail(requestData),
        queryFn: async () => {
            const result = await API.getMemberAuthDetail(requestData);
            //console.log("결과는 :", result); // 쿼리 결과 로그 추가
            return result;
        }
    })
};

//구성원 메뉴 권한 등록 및 수정 팝업 - 미권한 메뉴 조회
export const getNonPermissionMuneList = (sptNo: string) => {
    return useQuery({
        queryKey: KEY.getNonPermissionMenuList(sptNo),
        queryFn: async () => {
            const result = await API.getNonPermissionMenuList(sptNo);
            return result;
        }
    })
};

//구성원 메뉴 권한 등록 및 수정 팝업 - 권한메뉴 조회
export const getMemberPermissionMenuList = (userNo: string) => {
    return useQuery({
        queryKey: KEY.getMemberPermissionMenuList(userNo),
        queryFn: async () => {
            const result = await API.getMemberPermissionMenuList(userNo);
            //console.log("결과값 확인 : ",result)
            return result;
        },
        enabled: !!userNo
    });
};

// 구성원 메뉴 권한 등록 및 수정 팝업 - 미권한 등록
export const nonPermissionMenuInsert = () => {
    return useMutation({
        mutationFn: (requestData: { body: MenuNonPermissionInsertType }) => API.nonPermissionMenuInsert(requestData),
        mutationKey: KEY.nonPermissionMenuInsert(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

// 구성원 메뉴 권한 등록 및 수정 팝업 - 권한 등록
export const permissionMenuInsert = () => {
    return useMutation({
        mutationFn: (requestData: { body: MenuPermissionInsertType }) => API.permissionMenuInsert(requestData),
        mutationKey: KEY.permissionMenuInsert(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//구성원 권한 복사 팝업 - 목록 조회
export const permissionMenuCopyList = (requestData: { sptNo: string, userNo: string, userNm: string, rspofcCd: string }) => {
    return useQuery({
        queryKey: KEY.permissionMenuCopyList(requestData),
        queryFn: async () => {
            const result = await API.permissionMenuCopyList(requestData);
            console.log("결과값 확인 : ", result);
            return result;
        },
    })
};

//구성원 권한 복사 팝업 - 권한 복사
export const permissionMenuCopy = () => {
    return useMutation({
        mutationFn: (requestData: { body: PermissionMenuCopyType }) => API.permissionMenuCopy(requestData),
        mutationKey: KEY.permissionMenuCopy(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//구성원 권한 회수
export const permissionRevoke = () => {
    return useMutation({
        mutationFn: (requestData: {body : PermissionRevokeType }) => API.permissionRevoke(requestData),
        mutationKey: KEY.permissionRevoke(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};