import { useQuery } from "@tanstack/react-query";
import { ApiResponseType } from "../types/apiResponse";
import instance from "../utils/axiosInstance";

export type solutionDetailType = {
    slutnId: string,
    upperSlutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneSeNm: string,
    lisneCnfirmYn: string | null,
    url: string | null,
    iconFlpth: string | null,
    authorNthgUrl: string,
    useYn: string,
    delYn: string | null,
    lnupOrd: string | null,
    rmk: string,
    regrId: string | null,
    updrId: string | null
};

export interface SolutionDetailResponse extends ApiResponseType {
    contents: solutionDetailType;
};

const API = {
    getSolutionDetail : async (id: string | null) => {
        const url = id ? `/api/slutn?slutnId=${id}` : '/api/slutn?slutnId';
        return await instance.get<SolutionDetailResponse>(url);
    }
};

const KEY = {
    getSolutionDetail : (id: string | null) => [`/api/slutn?slutnId=${id}`],
};

export const useSolutionDetail = (id: string | null) => {
    return useQuery({
        queryKey : KEY.getSolutionDetail(id),
        queryFn : async () => {
            const result = await API.getSolutionDetail(id);
            return result;
        }
    })
};