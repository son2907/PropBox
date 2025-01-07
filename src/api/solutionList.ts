import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type SolutionListType = {
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
    rmk: string | null,
    regrId: string | null,
    updrId: string | null
};

export interface SolutionResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: SolutionListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
}

const API = {
    getSolutionList: async () => {
        return await instance.get<SolutionResponse>('/api/slutn/list');
    }
};

const KEY = {
    getSolutionList: () => ['/api/slutn/list'],
};

export const useSolutionList = () => {
    return useQuery({
        queryKey: KEY.getSolutionList(),
        queryFn: async () => {
            return await API.getSolutionList();
        }
    });
};