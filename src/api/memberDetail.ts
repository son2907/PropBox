import { useQuery } from "@tanstack/react-query";
import { ApiResponseType } from "../types/apiResponse";
import instance from "../utils/axiosInstance";

export type memeberDetailType = {
    userNo: string,
    userNm: string,
    loginId: string,
    constntUserNo: string,
    userConstntSeCd: string,
    loginIdPrefix: string,
    encptUserNm: string,
    attlistUserNm: string,
    pwdNo: string,
    advrtsAgreYn: string,
    useYn: string,
    rmk: string,
    userId: string
};

export interface MemberDetailResponse extends ApiResponseType {
    contents: memeberDetailType;
};

const API = {
    getMemberDetail: async (id: string | null) => {
        const url = id ? `/api/constnt/${id}` : '/api/constnt/';  //id가 있으면 url에 붙여줌
        return await instance.get<MemberDetailResponse>(url);
    }
};

const KEY = {
    getMemberDetail: (id: string | null) => {
        const url = id ? `/api/constnt/${id}` : '/api/constnt/';
        return [url]
    }
};

export const useMemberDetail = (id: string | null) => {
    return useQuery({
        queryKey: KEY.getMemberDetail(id),
        queryFn: async () => {
            const result = await API.getMemberDetail(id);
            return result;
        }
    })
}