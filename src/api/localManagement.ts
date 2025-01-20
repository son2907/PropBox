import { useQuery } from "@tanstack/react-query";
import { LocalListResponseType, LocalNonPermissionResponseType, LocalNonPermissionType, LocalPermissionListResponseType } from "../types/localManagementType";
import instance from "../utils/axiosInstance";

const API = {
    //현장목록
    getLocalList: async (requestData: { sptNm: string; progrsSeCd: string; userNo: string, cntrctBgnde: string, cntrctEndde: string}) => {
        const { sptNm, progrsSeCd, userNo, cntrctBgnde, cntrctEndde } = requestData;
        const url = `/api/spt/listsimple?userNo=${userNo}&sptNm=${sptNm}&progrsSeCd=${progrsSeCd}&cntrctBgnde=${cntrctBgnde}&cntrctEndde=${cntrctEndde}`;
        return await instance.get<LocalListResponseType>(url) ;
    },
    //현장 허가 솔루션
    getLocalPermissionList : async (sptNo : string) => {
        const url = `/api/spt/slutn/lisne/sel/${sptNo}`;
        return await instance.get<LocalPermissionListResponseType>(url);
    },
    //현장 미허가 솔루션
    getLocalNonPermissionList: async (userNo : string) => {
        console.log("userNo 확인: ",userNo);
        const url = `/api/spt/slutn/lisne/nosel/${userNo}`;
        
        return await instance.get<LocalNonPermissionResponseType>(url);
    },
};

const KEY = {
    getLocalList: (requestData: { sptNm: string; progrsSeCd: string; userNo: string, cntrctBgnde: string, cntrctEndde: string}) => 
        [`/api/spt/listsimple?userNo=${requestData.userNo}&sptNm=${requestData.sptNm}&progrsSeCd=${requestData.progrsSeCd}&cntrctBgnde=${requestData.cntrctBgnde}&cntrctEndde=${requestData.cntrctEndde}`],
    getPermissionLocalList: (sptNo : string) =>
        [`/api/spt/slutn/lisne/sel/${sptNo}`],
    getNonPermissionLocalList: (userNo : string) => [`/api/spt/slutn/lisne/nosel/${userNo}`],
};

//현장관리 현장 리스트
export const useLocalList = (requestData: { sptNm: string; progrsSeCd: string; userNo: string, cntrctBgnde: string, cntrctEndde: string}) => {
    //console.log("실행됨",requestData);
    return useQuery({
        queryKey: KEY.getLocalList(requestData),
        queryFn: async () => {
            const result = await API.getLocalList(requestData);
            //console.log("결과는 :", result); // 쿼리 결과 로그 추가
            return result;
        }
    });
};
//현장 허가 솔루션
export const usePermissionLocalList = (sptNo : string) => {
    console.log("허가된 현장 리스트 api 실행", sptNo);
    return useQuery({
        queryKey: KEY.getPermissionLocalList(sptNo),
        queryFn: async () => {
            const result = await API.getLocalPermissionList(sptNo);
            console.log("결과는 :", result); // 쿼리 결과 로그 추가
            return result;
        }
    });
};
//현장 미허가 솔루션
export const useNonPermissionLocalList = (userNo : string) => {
    console.log("미허가된 현장 리스트 api 실행", userNo);
    return useQuery({
        queryKey: KEY.getNonPermissionLocalList(userNo),
        queryFn: async () => {
            const result = await API.getLocalNonPermissionList(userNo);
            console.log("결과는 :", result); // 쿼리 결과 로그 추가
            return result;
        }
    })
};