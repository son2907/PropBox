import { ApiResponseType } from "./apiResponse";

//공지사항 목록 조회
export type FAQListContentType = {
    faqNo: string,
    faqSj: string,
    faqCn: string,
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

//faq 상세 조회
export type FaqDetailType = {
    faqNo: string,
    faqSj: string,
    faqCn: string,
    userId: string,
};
export interface FaqDetailResponse extends ApiResponseType {
    contents: FaqDetailType;
};

//faq 추가
export type FaqInsertType = {
    faqNo: string,
    faqSj: string,
    faqCn: string,
    userId: string | undefined
}

//faq 수정
export type FaqUpdateType = {
    faqNo: string,
    faqSj: string,
    faqCn: string,
    userId: string | undefined,
};

//faq 삭제
export type FaqDeleteType = {
    faqNo: string,
    faqSj: string,
    faqCn: string,
    userId: string | undefined,
}[];