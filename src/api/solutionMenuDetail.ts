import { useQuery } from "@tanstack/react-query";
import { ApiResponseType } from "../types/apiResponse";
import instance from "../utils/axiosInstance";

export type solutionMenuDetailType = {
    slutnId: string,
    upperSlutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneSeNm: string,
    lisneCnfirmYn: string,
    url: string,
    iconFlpth: string,
    authorNthgUrl: string,
    useYn: string,
    delYn: string | null,
    lnupOrd: string | null,
    rmk: string,
    regrId: string | null,
    updrId: string | null
};

export interface SolutionMenuDetailResponse extends ApiResponseType {
    contents: solutionMenuDetailType
};

const API = {
    getMenuDetail : async (id: string | null) => {
        const url = id ? `/api/slutn?slutnId=${id}` : '/api/slutn?slutnId';
        return await instance.get<SolutionMenuDetailResponse>(url);
    }
};

const KEY = {
    getMenuDetail : (id: string | null) => [`/api/slutn?slutnId=${id}`],
};

export const useMenuDetail = (id: string | null) => {
    return useQuery({
        queryKey : KEY.getMenuDetail(id),
        queryFn : async () => {
            const result = await API.getMenuDetail(id);
            return result;
        }
    })
};