import { useQuery } from "@tanstack/react-query";
import { SocketResponseType } from "../types/socketApi";
import instance from "../utils/axiosInstance";
import { spt } from "../utils/sptNo";

const API = {
  // 소켓 로그인 정보 조회
  getSocket: async ({ userNo, telId }: { userNo: string; telId: string }) => {
    const url = `/api/tel/cnslt/cnsltnt/tel/${spt}/${userNo}/${telId}`;
    return await instance.get<SocketResponseType>(url);
  },
};
const KEY = {
  getSocket: ({ userNo, telId }: { userNo: string; telId: string }) => [
    "/tel/cnslt/cnsltnt/tel/",
    userNo,
    telId,
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
