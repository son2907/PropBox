import { useQuery } from "@tanstack/react-query";
import {
  FindToastCustomRequestType,
  FindToastCustomResponseType,
  SocketResponseType,
} from "../types/socketApi";
import instance from "../utils/axiosInstance";
import { spt } from "../utils/sptNo";

const API = {
  // 소켓 로그인 정보 조회
  getSocket: async ({ userNo, telId }: { userNo: string; telId: string }) => {
    const url = `/api/tel/cnslt/cnsltnt/tel/${spt}/${userNo}/${telId}`;
    return await instance.get<SocketResponseType>(url);
  },
  // 전화 상담 고객 정보 조회
  getFindToastCustom: async ({ telno }: FindToastCustomRequestType) => {
    let url = `/api/tel/cnslt/findToastCustom?sptNo=${spt}`;
    if (telno) url += `&telno=${telno}`;
    return await instance.get<FindToastCustomResponseType>(url);
  },
};
const KEY = {
  getSocket: ({ userNo, telId }: { userNo: string; telId: string }) => [
    "/tel/cnslt/cnsltnt/tel/",
    userNo,
    telId,
    spt,
  ],
  getFindToastCustom: ({ telno }: FindToastCustomRequestType) => [
    "/api/tel/cnslt/findToastCustom",
    telno,
    spt,
  ],
};

// 전화 상담의 상담 현황 팝업
export const useSocketApi = ({
  userNo,
  telId,
}: {
  userNo: string;
  telId: string;
}) => {
  return useQuery({
    queryKey: KEY.getSocket({
      userNo,
      telId,
    }),
    queryFn: async () => {
      return await API.getSocket({
        userNo,
        telId,
      });
    },
    enabled: !!userNo && !!telId,
    gcTime: 0,
  });
};

// 전화 상담의 상담 현황 팝업
export const useFindCustom = ({ telno }: FindToastCustomRequestType) => {
  return useQuery({
    queryKey: KEY.getFindToastCustom({ telno }),
    queryFn: async () => {
      return await API.getFindToastCustom({ telno });
    },
    enabled: !!telno,
    gcTime: 0,
  });
};
