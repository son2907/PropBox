import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";


//라이선스 방식 selectBox 데이터
export type licenseMethodType = {
    cd: string,
    upCd: string,
    cdNm: string,
    othrSysCd: string,
    chartrRef1: string,
    chartrRef2: string,
    hartrRef3: string,
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
    rmk: string,
};

export interface licenseMethodResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: licenseMethodType[]; 
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

const API = {
    getLicenseMethod : async () => {
        return await instance.get<licenseMethodResponse>('/api/common/code?upCd=1001000');
    }
};

const KEY = {
    getLicenseMethod: () => ['/api/common/code?upCd=1001000'],
};

export const useLicenseMethod = () => {
    return useQuery({
        queryKey : KEY.getLicenseMethod(),
        queryFn : async () => {
            return await API.getLicenseMethod();
        }
    })
};
