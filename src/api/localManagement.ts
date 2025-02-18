import { useMutation, useQuery } from "@tanstack/react-query";
import { LocalDeleteType, LocalDetailResponse, LocalDetailType, LocalInsertType, LocalListResponseType, LocalMemberResponseType, LocalNonPermissionRegistrationType, LocalNonPermissionResponseType, LocalNonPermissionType, LocalPermissionListResponseType, LocalPermissionRegistrationType, LocalUpdateType, MemberDeleteListType, MemberInsertListType, MemberListResponseType, MemberPositionResponseType, MemeberPositionType } from "../types/localManagementType";
import instance from "../utils/axiosInstance";

const API = {
    //현장목록
    getLocalList: async (requestData: { sptNm: string; progrsSeCd: string; userNo: string, cntrctBgnde: string, cntrctEndde: string }) => {
        const { sptNm, progrsSeCd, userNo, cntrctBgnde, cntrctEndde } = requestData;
        const url = `/api/spt/listsimple?userNo=${userNo}&sptNm=${sptNm}&progrsSeCd=${progrsSeCd}&cntrctBgnde=${cntrctBgnde}&cntrctEndde=${cntrctEndde}`;
        return await instance.get<LocalListResponseType>(url);
    },
    //현장 허가 솔루션
    getLocalPermissionList: async (sptNo: string) => {
        const url = `/api/spt/slutn/lisne/sel/${sptNo}`;
        return await instance.get<LocalPermissionListResponseType>(url);
    },
    //현장 미허가 솔루션
    getLocalNonPermissionList: async (userNo: string) => {
        console.log("userNo 확인: ", userNo);
        const url = `/api/spt/slutn/lisne/nosel/${userNo}`;
        return await instance.get<LocalNonPermissionResponseType>(url);
    },
    //현장 구성원
    getLocalMemberList: async (requestData: { sptNo: string, userNm: string, rspofcNm: string }) => {
        const url = `/api/spt/constnt/searchlist/${requestData.sptNo}?userNm=${requestData.userNm}&rspofcNm=${requestData.rspofcNm}`;
        return await instance.get<LocalMemberResponseType>(url);
    },
    //구성원 직책 목록
    getMemberPositionList: async (upCd: string) => {
        const url = `/api/common/code?upCd=${upCd}`;
        return await instance.get<MemberPositionResponseType>(url);
    },
    //구성원 리스트
    getMemberList: async (userNo: string) => {
        const url = `/api/user/listofmber/${userNo}`;
        return await instance.get<MemberListResponseType>(url);
    },
    //현장 상세보기
    getLocalDetail: async (sptNo: string) => {
        const url = `/api/spt/${sptNo}`;
        return await instance.get<LocalDetailResponse>(url);
    },
    //구성원 직책 수정
    updateMemeberPosition: async (requestData : { body :  MemeberPositionType}) =>{
        //console.log("구성원 직책 수정 api req 데이터 확인 : ",requestData.body);
        const response = await instance.put('/api/spt/constnt', requestData.body);
        return response;
    },
    //구성원 현장 등록
    insertMember: async (requestData: { body: MemberInsertListType }) => {
        const url = '/api/spt/constnt'
        return await instance.post(url, requestData.body);
    },
    //구성원 현장에서 제외
    deleteMember: async (requestData: { body: MemberDeleteListType }) => {
        const url = '/api/spt/constnt/remove';
        return await instance.post(url, requestData.body);
    },
    //현장 허가 솔루션 등록
    localPermissionRegistration: async (requestData: { body: LocalPermissionRegistrationType }) => {
        const url = '/api/spt/slutn';
        return await instance.post(url, requestData.body);
    },
    //현장 미허가 솔루션 등록
    localNonPermissionRegistration: async (requestData: { body: LocalNonPermissionRegistrationType }) => {
        const response = await instance.put('/api/spt/slutn/remove/selected', requestData.body);
        return response;
    },
    //현장 등록
    localInsert: async (requestData: { body: LocalInsertType }) => {
        const response = await instance.post('/api/spt', requestData.body);
        return response;
    },
    //현장 수정
    localUpdate: async (requestData: { body: LocalUpdateType }) => {
        const response = await instance.put('/api/spt', requestData.body);
        return response;
    },
    //현장 삭제 
    localDelete: async (requestData: { body: LocalDeleteType }) => {
        const url = '/api/spt/remove';
        return await instance.post(url, requestData.body);
    },

};

const KEY = {
    //현장 목록
    getLocalList: (requestData: { sptNm: string; progrsSeCd: string; userNo: string, cntrctBgnde: string, cntrctEndde: string }) =>
        [`/api/spt/listsimple?userNo=${requestData.userNo}&sptNm=${requestData.sptNm}&progrsSeCd=${requestData.progrsSeCd}&cntrctBgnde=${requestData.cntrctBgnde}&cntrctEndde=${requestData.cntrctEndde}`],
    //허가 현장 목록
    getPermissionLocalList: (sptNo: string) =>
        [`/api/spt/slutn/lisne/sel/${sptNo}`],
    //미허가 현장 목록
    getNonPermissionLocalList: (userNo: string) => [`/api/spt/slutn/lisne/nosel/${userNo}`],
    //현장 구성원 목록
    getLocalMemberList: (requestData: { sptNo: string, userNm: string, rspofcNm: string }) => [`/api/spt/constnt/searchlist/${requestData.sptNo}?userNm=${requestData.userNm}&rspofcNm=${requestData.rspofcNm}`],
    //구성원 직책 목록
    getMemberPositionList: (upCd: string) => [`/api/common/code?upCd=${upCd}`],
    //구성원 목록
    getMemberList: (userNo: string) => [`/api/user/listofmber/${userNo}`],
    //구성원 직책 수정
    updateMemeberPosition: () => ['/api/spt/constnt'],
    //구성원 현장 등록
    insertMember: () => ['/api/spt/constnt'],
    //구성원 현장에서 제외
    deleteMember: () => ['/api/spt/constnt/remove'],
    //현장 허가 솔루션 등록
    localPermissionRegistration: () => ['/api/spt/slutn'],
    //현장 미허가 솔루션 등록
    localNonPermissionRegistration: () => ['/api/spt/slutn/remove/selected'],
    //현장 등록
    localInsert: () => ['/api/spt'],
    //현장 상세보기
    getLocalDetail: (sptNo: string) => [`/api/spt/${sptNo}`],
    //현장 수정
    localUpdate: () => ['/api/spt'],
    //현장 삭제
    localDelete: () => ['/api/spt/remove'],
};

//현장관리 현장 리스트
export const useLocalList = (requestData: { sptNm: string; progrsSeCd: string; userNo: string, cntrctBgnde: string, cntrctEndde: string }) => {
    console.log("실행됨", requestData);
    return useQuery({
        queryKey: KEY.getLocalList(requestData),
        queryFn: async () => {
            const result = await API.getLocalList(requestData);
            //console.log("결과는 :", result); // 쿼리 결과 로그 추가
            return result;
        },
        enabled: !!requestData.userNo, // 사용자 번호 선택안하면 실행 안함
        gcTime: 0,
    });
};
//현장 허가 솔루션
export const usePermissionLocalList = (sptNo: string) => {
    //console.log("허가된 현장 리스트 api 실행", sptNo);
    return useQuery({
        queryKey: KEY.getPermissionLocalList(sptNo),
        queryFn: async () => {
            const result = await API.getLocalPermissionList(sptNo);
            //console.log("결과는 :", result); // 쿼리 결과 로그 추가
            return result;
        },
        enabled: !!sptNo, // 현장번호 선택안하면 실행 안함
    });
};
//현장 미허가 솔루션
export const useNonPermissionLocalList = (userNo: string) => {
    //console.log("미허가된 현장 리스트 api 실행", userNo);
    return useQuery({
        queryKey: KEY.getNonPermissionLocalList(userNo),
        queryFn: async () => {
            const result = await API.getLocalNonPermissionList(userNo);
            //console.log("결과는 :", result); // 쿼리 결과 로그 추가
            return result;
        },
        enabled: !!userNo, // 현장번호 선택안하면 실행 안함
    })
};

// 현장 허가 구성원 리스트
export const useLocalMemberList = (requestData: { sptNo: string, userNm: string, rspofcNm: string }) => {
    console.log(" sptNo 실행됨", requestData);
    return useQuery({
        queryKey: KEY.getLocalMemberList(requestData),
        queryFn: async () => {
            const result = await API.getLocalMemberList(requestData);
            //console.log("결과는 :", result); // 쿼리 결과 로그 추가
            return result;
        },
        enabled: !!requestData.sptNo, // sptNo 번호 선택안하면 실행 안함
    })
};

//구성원 직책 목록
export const useMemberPositionList = (upCd: string) => {
    return useQuery({
        queryKey: KEY.getMemberPositionList(upCd),
        queryFn: async () => {
            const result = await API.getMemberPositionList(upCd);
            return result;
        },
        enabled: !!upCd
    })
};

//구성원 목록
export const useMemberList = (userNo: string) => {
    return useQuery({
        queryKey: KEY.getMemberList(userNo),
        queryFn: async () => {
            const result = await API.getMemberList(userNo);
            return result;
        }
    })
};

//현장 상세보기
export const useLocalDetail = (sptNo: string) => {
    return useQuery({
        queryKey: KEY.getLocalDetail(sptNo),
        queryFn: async () => {
            const result = await API.getLocalDetail(sptNo);
            return result
        }
    })
};

//구성원 직책 수정
export const updateMemberPosition = (requestData: { body: MemeberPositionType }) => {
    return useMutation({
        mutationFn: API.updateMemeberPosition,
        mutationKey: KEY.updateMemeberPosition(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//구성원 등록
export const memberLocalInsert = () => {
    return useMutation({
        mutationFn: (requestData: { body: MemberInsertListType }) => API.insertMember(requestData),
        mutationKey: KEY.insertMember(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//구성원 현장에서 제외
export const memberDeleteLocal = () => {
    return useMutation({
        mutationFn: (requestData: { body: MemberDeleteListType }) => API.deleteMember(requestData),
        mutationKey: KEY.deleteMember(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//현장 허가 솔루션 등록
export const localPermissionRegistration = () => {
    return useMutation({
        mutationFn: (requestData: { body: LocalPermissionRegistrationType }) => API.localPermissionRegistration(requestData),
        mutationKey: KEY.localPermissionRegistration(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//현장 미허가 솔루션 등록
export const localNonPermissionRegistration = () => {
    return useMutation({
        mutationFn: (requestData: { body: LocalNonPermissionRegistrationType }) => API.localNonPermissionRegistration(requestData),
        mutationKey: KEY.localNonPermissionRegistration(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//현장 등록
export const localInsert = () => {
    return useMutation({
        mutationFn: (requestData: { body: LocalInsertType }) => API.localInsert(requestData),
        mutationKey: KEY.localInsert(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//현장 수정
export const localUpdate = () => {
    return useMutation({
        mutationFn: (requestData: { body: LocalUpdateType }) => API.localUpdate(requestData),
        mutationKey: KEY.localUpdate(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};

//현장 삭제
export const localDelete = () => {
    return useMutation({
        mutationFn: (requestData: { body: LocalDeleteType }) => API.localDelete(requestData),
        mutationKey: KEY.localDelete(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
};