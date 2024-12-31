import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type SolutionMenuListType = {
    id?: string;
    cd: string,
    upCd: string,
    cdNm: string,
    othrSysCd: string,
    chartrRef1: string,
    chartrRef2: string,
    chartrRef3: string,
    chartrRef4: string,
    chartrRef5: string,
    numRef1: string,
    numRef2: string,
    numRef3: string,
    numRef4: string,
    numRef5: string,
    useYn: string,
    delYn: string,
    lnupOrd: string,
    updPsblYn: string,
    rmk: string
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