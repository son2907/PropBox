import { useQuery } from "@tanstack/react-query";
import { MemberMenuListResponseType } from "../types/authManagement";
import instance from "../utils/axiosInstance";

const API = {
    //구성원별 메뉴 목록 조회 - 현장 구성원
    getMemberMenuList: async (userNo : string) => {
        const url = `/api/spt/constnt/lisnelist/${userNo}`;
        return await instance.get<MemberMenuListResponseType>(url);
    },
}

const KEY = {
    getMemberMenuList: (userNo : string) => [`/api/spt/constnt/lisnelist/${userNo}`],
};

//구성원 조회
export const useMemberMenuList = (userNo : string) => {
    console.log("실행됨",userNo);
    return useQuery({
        queryKey: KEY.getMemberMenuList(userNo),
        queryFn: async () => {
            const result = await API.getMemberMenuList(userNo);
            console.log("결과는 :", result); // 쿼리 결과 로그 추가
            return result;
        }
    })
}