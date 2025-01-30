import { ApiResponseType } from "./apiResponse";

//솔루션 리스트
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
};

//솔루션 메뉴 리스트
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

//솔루션 상세
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

//솔루션 메뉴 상세
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

//솔루션 추가
export type insertSolutionType = {
    slutnId: string,
    upperSlutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneCnfirmYn: string,
    authorNthgUrl: string,
    useYn: string,
    lnupOrd: string,
    rmk: string,
    userId: string | undefined,
};

//솔루션 메뉴 추가
export type insertMenuType = {
    slutnId: string,
    upperSlutnId: string,
    slutnNm: string,
    lisneCnfirmYn: string,
    url: string,
    iconFlpth: string,
    useYn: string,
    delYn: string,
    lnupOrd: string,
    rmk: string,
    userId: string | undefined,
};

//솔루션 수정
export type updateSolutionType = {
    slutnId: string,
    upperSlutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneCnfirmYn: string,
    url: string,
    iconFlpth: string,
    authorNthgUrl: string,
    lnupOrd: string,
    rmk: string,
};

//솔루션 메뉴 수정
export type updateMenuDetailType = {
    slutnId: string,
    upperSlutnId: string,
    slutnNm: string,
    lisneSeCd: string,
    lisneCnfirmYn: string,
    url: string,
    iconFlpth: string,
    authorNthgUrl: string,
    lnupOrd: string,
    rmk: string,
};

//솔루션 삭제
export type deleteSolutionType = {
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
    delYn: string,
    lnupOrd: string,
    rmk: string,
    regrId: string,
    updrId: string | undefined,
};

//솔루션 메뉴 삭제
export type deleteMenuType = {
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
    delYn: string,
    lnupOrd: string,
    rmk: string,
    regrId: string,
    updrId: string | undefined,
};

//솔루션 순서 변경
export type ReorderSolutionListType = {
    slutnId: string,
    lnupOrd: string,
    userId: string
}[];
