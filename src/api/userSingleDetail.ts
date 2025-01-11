//api/user/one?userNo=1001

import { useQuery } from "@tanstack/react-query";
import { ApiResponseType } from "../types/apiResponse";
import instance from "../utils/axiosInstance";

export type UserSingleDetailType = {
    userNo: string,
    userNm: string,
    loginId: string,
    constntUserNo: string,
    userConstntSeCd: string,
    loginIdPrefix: string,
    encptUserNm: string,
    attlistUserNm: string,
    pwdNo: string,
    mbtlNo: string,
    attlistMbtlNo: string,
    encptMbtlNo: string,
    advrtsAgreYn: string,
    advrtsAgreDttm: string,
    delYn: string,
    rmk: string,
    userId: string,
};

export interface UserSingleDetailResponse extends ApiResponseType {
    contents: UserSingleDetailType;
}

const API = {
    getUserSingleDetail: async(id: string | null) => {
        const url = id ? `api/user/one?userNo=${id}` : 'api/user/one';
        return await instance.get<UserSingleDetailResponse>(url);
    }
};

const KEY = {
    getUserSingleDetail: (id: string | null) => [`api/user/one?userNo=${id}`]
};

export const useUserSingleDetail = (id: string | null) => {
    return useQuery({
        queryKey: KEY.getUserSingleDetail(id),
        queryFn: async () => {
            const result = await API.getUserSingleDetail(id);
            return result;
        }
    })
}