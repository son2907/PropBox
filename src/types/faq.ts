//공지사항 목록 조회회
export type FAQListContentType = {
    noticeNo: string;
    noticeSj: string;
    regDe: string;
};
export interface FAQListResponseType {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: FAQListContentType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};