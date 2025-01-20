import { ApiResponseType } from "./apiResponse";

//구성원별 메뉴 목록 조회
export type MemberMenuList = {
    userNo: string,
    slutnId: string,
    slutnNm: string,
    menuId: string,
    menuNm: string,
    sptNo: string,
};
export interface MemberMenuListResponseType extends ApiResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: MemberMenuList[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};