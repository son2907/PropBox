import { useMutation, useQuery } from "@tanstack/react-query";
import { CompanyLocalListResponse, DeviceSectionListResponse, InsertPhone, MemeberLocalListResponse, MemNonPermissionListResponse, MemPermissionListResponse, SptNonPermissionPhoneListResponse, SptNonPermissionPhoneType, SptPermissionPhoneListResponse, SptPermissionPhoneType, UserCompanyListResponse } from "../types/networkSetup";
import instance from "../utils/axiosInstance";

const API = {
    //통신환경설정 1번째 테이블 리스트
    getUserCompanyList: async (requestData: { userNo: string, cmpNm: string }) => {
        const url = requestData ? `/api/tel/user/config/list?userNo=${requestData.userNo}&cmpNm=${requestData.cmpNm}` : '/api/tel/user/config/list';
        return await instance.get<UserCompanyListResponse>(url);
    },
    //통신환경설정 2번째 테이블 리스트
    getComapnyLocalList: async (requestData: { userNo: string, sptNm: string }) => {
        const url = `/api/tel/user/config/spt/list/${requestData.userNo}?sptNm=${requestData.sptNm}`;
        return await instance.get<CompanyLocalListResponse>(url);
    },
    //통신환경설정 3번째 테이블 리스트
    getSptPermissionPhoneList: async (requestData: { sptNo: string, cntrctBgnde: string }) => {
        const url = `/api/tel/spt/selected/list/${requestData.sptNo}?cntrctBgnde=${requestData.cntrctBgnde}`;
        return await instance.get<SptPermissionPhoneListResponse>(url);
    },
    //통신환경설정 4번째 테이블 리스트
    getSptNonPermissionPhoneList: async (requestData: { userNo: string, commnSeNo: string, telNo: string }) => {
        const url = `/api/tel/spt/isspt/list/${requestData.userNo}?commnSeNo=${requestData.commnSeNo}&telNo=${requestData.telNo}`;
        return await instance.get<SptNonPermissionPhoneListResponse>(url);
    },
    //통신환경설정 5번째 테이블 리스트
    getMemberLocalList: async (requestData: { userNo: string, constntNm: string }) => {
        const url = `/api/tel/user/config/constnt/list/${requestData.userNo}?constntNm=${requestData.constntNm}`
        return await instance.get<MemeberLocalListResponse>(url);
    },
    //통신환경설정 6번째 테이블 리스트
    getMemPermissionPhoneList: async (requestData: { userNo: string, commnSeNo: string, telNo: string }) => {
        const url = `/api/tel/Constnt/list/${requestData.userNo}?commnSeNo=${requestData.commnSeNo}&telNo=${requestData.telNo}`
        return await instance.get<MemPermissionListResponse>(url);
    },
    //통신환경설정 7번 테이블 리스트
    getMemNonPermissionList: async (requestData: { sptNo: string, commnSeNo: string, telNo: string }) => {
        const url = `/api/tel/Constnt/phone/list/${requestData.sptNo}?commnSeNo=${requestData.commnSeNo}&telNo=${requestData.telNo}`;
        return await instance.get<MemNonPermissionListResponse>(url);
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
    //통신환경설정 4번테이블에서 3번테이블로 전화기 등록
    sptPermissionPhone: async (requestData: { body: SptPermissionPhoneType }) => {
        const url = `/api/tel/spt/phone`;
        return await instance.post(url, requestData.body);
    },
    //통신환경설정 3번테이블에서 4번테이블로 전화기 등록
    sptNonPermissionPhone: async (requestData: { body: SptNonPermissionPhoneType }) => {
        const url = '/api/tel/spt/phone/remove';
        return await instance.put(url, requestData.body);
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
    //통신환경설정 3번째 테이블 리스트
    getSptPermissionPhoneList: (requestData: { sptNo: string, cntrctBgnde: string }) => [`/api/tel/spt/selected/list/${requestData.sptNo}?cntrctBgnde=${requestData.cntrctBgnde}`],
    //통신환경설정 4번째 테이블 리스트
    getSptNonPermissionPhoneList: (requestData: { userNo: string, commnSeNo: string, telNo: string }) => [`api/tel/spt/isspt/list/${requestData.userNo}?commnSeNo=${requestData.commnSeNo}&telNo=${requestData.telNo}`],
    //통신환경설정 4번테이블에서 3번테이블로 전화기 등록
    sptPermissionPhone: () => [`/api/tel/spt/phone`],
    //통신환경설정 3번테이블에서 4번테이블로 전화기 등록
    sptNonPermissionPhone: () => ['/api/tel/spt/phone/remove'],
    //통신환경설정 7번 테이블 리스트
    getMemNonPermissionList: (requestData: { sptNo: string, commnSeNo: string, telNo: string }) => [`/api/tel/Constnt/phone/list/${requestData.sptNo}?commnSeNo=${requestData.commnSeNo}&telNo=${requestData.telNo}`],
    //통신환경설정 6번째 테이블 리스트
    getMemPermissionPhoneList : (requestData: { userNo: string, commnSeNo: string, telNo: string }) => [`/api/tel/Constnt/list/${requestData.userNo}?commnSeNo=${requestData.commnSeNo}&telNo=${requestData.telNo}`],
}

//사용자 아이디 및 회사 조회
export const getUserCompanyList = (requestData: { userNo: string, cmpNm: string }) => {
    //console.log("보낸데이터 : ", requestData);
    return useQuery({
        queryKey: KEY.getUserCompanyList(requestData),
        queryFn: async () => {
            const result = await API.getUserCompanyList(requestData);
            //console.log("받은데이터 : ", result);
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
            //console.log("2번테이블 받은데이터 : ", result);
            return result;
        },
        enabled: !!requestData.userNo
    })
};

//구성원과 현장 리스트 조회 - 5번째 테이블
export const getMemberLocalList = (requestData: { userNo: string, constntNm: string }) => {
    return useQuery({
        queryKey: KEY.getMemberLocalList(requestData),
        queryFn: async () => {
            //console.log("5번째 테이블 보낸값값:", requestData);
            const result = await API.getMemberLocalList(requestData);
            console.log("5번 받은데이터 : ", result);
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
            //console.log("받은데이터 : ", result);
            return result;
        }
    })
};

//통신환경설정 3번째 테이블 리스트
export const getSptPermissionPhoneList = (requestData: { sptNo: string, cntrctBgnde: string, commnSeNo: string }) => {
    return useQuery({
        queryKey: KEY.getSptPermissionPhoneList(requestData),
        queryFn: async () => {
            console.log("3번째 테이블 보낸값값:", requestData);
            const result = await API.getSptPermissionPhoneList(requestData);
            console.log("3번째 테이블 데이터:", result);
            return result;
        },
        enabled: !!requestData.sptNo
    })
};

//통신환경설정 4번째 테이블 리스트
export const getSptNonPermissionPhoneList = (requestData: { userNo: string, commnSeNo: string, telNo: string }) => {
    return useQuery({
        queryKey: KEY.getSptNonPermissionPhoneList(requestData),
        queryFn: async () => {
            //console.log("4번째 테이블 보낸값값:", requestData);
            const result = await API.getSptNonPermissionPhoneList(requestData);
            console.log("4번째 테이블 데이터:", result);
            return result
        },
        enabled: !!requestData.userNo
    })
};

//통신환경설정 4번테이블에서 3번테이블로 전화기 등록
export const sptPermissionPhone = () => {
    return useMutation({
        mutationKey: KEY.sptPermissionPhone(),
        mutationFn: async (requestData: { body: SptPermissionPhoneType }) => {
            console.log("4->3 보낸데이터:", requestData.body)
            const result = await API.sptPermissionPhone(requestData);
            return result;
        },
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//통신환경설정 3번테이블에서 4번테이블로 전화기 등록
export const sptNonPermissionPhone = () => {
    return useMutation({
        mutationKey: KEY.sptNonPermissionPhone(),
        mutationFn: async (requestData: { body: SptNonPermissionPhoneType }) => {
            console.log("3->4 보낸데이터:", requestData.body);
            const result = await API.sptNonPermissionPhone(requestData);
            return result;
        },
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//통신환경설정 7번 테이블 리스트
export const getMemNonPermissionList = (requestData: { sptNo: string, commnSeNo: string, telNo: string }) => {
    return useQuery({
        queryKey: KEY.getMemNonPermissionList(requestData),
        queryFn: async () => {
            console.log("7번째 테이블 데이터 조회 보낸데이터:", requestData);
            const result = await API.getMemNonPermissionList(requestData);
            console.log("7번째 테이블 데이터:", result);
            return result;
        },
        enabled: !!requestData.sptNo
    })
};

//통신환경설정 6번 테이블 리스트
export const getMemPermissionPhoneList = (requestData: { userNo: string, commnSeNo: string, telNo: string }) => {
    return useQuery({
        queryKey: KEY.getMemPermissionPhoneList(requestData),
        queryFn: async () => {
            console.log("6번째 테이블 데이터 조회 보낸데이터:", requestData);
            const result = await API.getMemPermissionPhoneList(requestData);
            console.log("6번째 테이블 데이터:", result);
            return result;
        }
    })
};