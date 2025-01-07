import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type SolutionMenuListType = {
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

export interface SolutionMenuListResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: SolutionMenuListType[];  
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

const API = {
    getSolutionMenuList: async (requsetData : string) => {
        const url = requsetData ? `/api/slutn/list/byslutn?slutnId=${requsetData}` : '/api/slutn/list/byslutn';
        return await instance.get<SolutionMenuListResponse>(url);
    }
};

const KEY = {
    getSolutionMenuList: (requsetData : string) => [`/api/slutn/list/byslutn?slutnId=${requsetData}`],
};

export const useSolutionMenuList = (requsetData : string) => {
    console.log("실행됨",requsetData);
    return useQuery({
        queryKey : KEY.getSolutionMenuList(requsetData),
        queryFn : async () => {
            return await API.getSolutionMenuList(requsetData);
        }
    });
};