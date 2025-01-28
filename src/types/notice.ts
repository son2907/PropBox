import { ApiResponseType } from "./apiResponse";

//공지사항 목록 조회회
export type NoticeListType = {
    noticeNo: string;
    noticeSj: string;
    regDe: string;
};
export interface NoticeListResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: NoticeListType[];
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};

//공지사항 상세세 형식 정의
export type noticeDetailType = {
    noticeNo: string,       //공지사항 번호
    noticeSj: string,       //공지사항 제목
    noticeCn: string,       //공지사항 내용
    popupYn: string,        //팝업 여부
    popupBgnde: string,     //팝업 유지 startdate
    popupEndde: string,     //팝업 유지 enddate
    regDe: string,          //등록일
};

//API에서 반환하는 데이터 형식을 아래와 같이 정의
export interface NoticeDetailResponse extends ApiResponseType {
    contents: noticeDetailType;
};

//공지사항 추가
export type insertNoticeType = {
    noticeNo: string,       //공지사항 번호
    noticeSj: string,       //공지사항 제목
    noticeCn: string,       //공지사항 내용
    popupYn: string,        //팝업 여부
    popupBgnde: string,     //팝업 유지 startdate
    popupEndde: string,     //팝업 유지 enddate
    regDe: string,          //등록일
    userId: string | undefined //userID
};

//공지사항 삭제
export type deleteNoticeType = {
    noticeNo: string,       //공지사항 번호
    noticeSj: string,       //공지사항 제목
    noticeCn: string,       //공지사항 내용
    popupYn: string,        //팝업 여부
    popupBgnde: string,     //팝업 유지 startdate
    popupEndde: string,     //팝업 유지 enddate
    regDe: string,          //등록일
    userId: string | undefined //userID
}[];

//공지사항 수정
export type updateNoticeType = {
    noticeNo: string,       //공지사항 번호
    noticeSj: string,       //공지사항 제목
    noticeCn: string,       //공지사항 내용
    popupYn: string,        //팝업 여부
    popupBgnde: string,     //팝업 유지 startdate
    popupEndde: string,     //팝업 유지 enddate
    regDe: string,          //등록일
    userId: string | undefined //userID
};

//팝업 공지
export type popupNoticeType = {
    noticeNo: string,       //공지사항 번호
    noticeSj: string,       //공지사항 제목
    noticeCn: string,       //공지사항 내용
    popupYn: string,        //팝업 여부
    popupBgnde: string,     //팝업 유지 startdate
    popupEndde: string,     //팝업 유지 enddate
    regDe: string,          //등록일
};
export interface PopupNoticeListResponse {
    code: number;
    result: string;
    message: string;
    totalCnt: number | null;
    contents: popupNoticeType[]; 
    params: null;
    errorCode: null;
    accessToken: null;
    refreshToken: null;
};