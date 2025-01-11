import { useMutation } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";

export type UserType = {
    userNo: string;            // 사용자 번호
    userNm: string;            // 사용자 이름
    loginId: string;           // 로그인 ID
    constntUserNo: string;     // 고유 사용자 번호
    userConstntSeCd: string;   // 사용자 구분 코드
    loginIdPrefix: string;     // 로그인 ID 접두사
    encptUserNm: string;       // 암호화된 사용자 이름
    attlistUserNm: string;     // 사용자 이름(익명화)
    pwdNo: string;             // 비밀번호 번호
    mbtlNo: string;            // 휴대폰 번호
    attlistMbtlNo: string;     // 휴대폰 번호(익명화)
    encptMbtlNo: string;       // 암호화된 휴대폰 번호
    advrtsAgreYn: string;      // 광고 동의 여부
    advrtsAgreDttm: string;    // 광고 동의 일시
    delYn: string;             // 삭제 여부
    rmk: string;               // 비고
    userId: string;            // 사용자 ID
  };
  
  export type CompanyType = {
    userNo: string;            // 사용자 번호
    cmpnm: string;             // 회사명
    bizrno: string;            // 사업자 등록번호
    rprsntvNm: string;         // 대표자 이름
    adres1: string;            // 주소 1
    adres2: string;            // 주소 2
    reprsntTelno: string;      // 대표 전화번호
    fxnum: string;             // 팩스 번호
    rmk: string;               // 비고
    userId: string;            // 사용자 ID
  };
  
  export type UserAndCompanyType = {
    user: UserType;            // 사용자 정보
    cmpny: CompanyType;        // 회사 정보
  };

  const API = {
    userUpdate: async (requestData: { body: UserAndCompanyType }) => {
        console.log("API 요청 데이터:", requestData); // 요청 데이터 로깅
        const response = await instance.put('/api/user', requestData.body);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 로깅
        return response;
    }
  };

  const KEY = {
    userUpdate: () => ['/api/user']
  };

  export const userUpdate = (requestData: { body: UserAndCompanyType }) => {
    return useMutation({
        mutationFn: API.userUpdate,
        mutationKey: KEY.userUpdate(),
        onSuccess: (response) => {
            console.log("API 호출 성공. 응답 데이터:", response.data); // 성공 응답 로깅
        },
        onError: (error) => {
            console.error("API 호출 실패. 에러:", error); // 에러 로깅
        },
    })
  }