import { ApiResponseType } from "./apiResponse";

export type LocalListType = {
    sptNo: string,
    userNo: string,
    sptNm: string,
    progrsSeCd: string,
    cntrctBgnde: string,
    cntrctEndde: string,
    useYn: string
};

export interface LocalListResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: LocalListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

export type LocalPermissionListType = {
    id: string
    sptNo: string,
    slutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneSeNm: string,
    userlisneCnt: string,
    sptlisneCnt: string,
    chrgcnt: string,
    userId: string
};

export interface LocalPermissionListResponseType extends ApiResponseType {
    contents: LocalPermissionListType[];
};

export type LocalNonPermissionType = {
    slutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneSeNm: string,
};

export interface LocalNonPermissionResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: LocalNonPermissionType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
}


// export type SptList = {
//     slutnId: string,
//     sptNo: string,
//     lisneCnt: string,
//     rmk: string,
//     userId: string,
// };

// export type LocalNonPermissionType = {
//     sptList: SptList[];
//     userId: string | undefined; // 사용자 ID
// }
