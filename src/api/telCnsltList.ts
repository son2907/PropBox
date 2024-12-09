import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import { useAuthStore } from "../stores/authStore";
import { TelApiResponseType } from "../types/TelList";

const API = {
  getTelCnsltList: async (
    sptNo: string,
    cnsltDt: string,
    absnceYn?: string, // 전화박기/걸기구분 (선택적)
    trsmYn?: string // 통화여부 (선택적)
  ) => {
    // 쿼리 파라미터를 동적으로 생성
    let url = `/api/tel/cnslt?sptNo=${sptNo}&cnsltDt=${cnsltDt}`;
    if (absnceYn) {
      url += `&absnceYn=${absnceYn}`;
    }
    if (trsmYn) {
      url += `&trsmYn=${trsmYn}`;
    }
    return await instance.get<TelApiResponseType>(url);
  },
};

const KEY = {
  getTelCnsltList: () => ["/api/tel/cnslt"],
};

export const useTelCnsltList = (
  sptNo: string,
  cnsltDt: string,
  absnceYn?: string, // 전화박기/걸기구분 (선택적)
  trsmYn?: string // 통화여부 (선택적)
) => {
  const { accessToken } = useAuthStore(["accessToken"]);
  return useQuery({
    queryKey: KEY.getTelCnsltList(),
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is required");
      }
      return await API.getTelCnsltList(sptNo, cnsltDt, absnceYn, trsmYn);
    },
    enabled: !!accessToken,
  });
};
