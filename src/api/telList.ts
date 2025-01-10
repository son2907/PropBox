import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import { useAuthStore } from "../stores/authStore";
import { TelApiResponseType } from "../types/callCnslt";

const API = {
  getTelList: async (sptNo: string) => {
    return await instance.get<TelApiResponseType>(
      `/api/tel/list/bylogin?sptNo=${sptNo}`
    );
  },
};

const KEY = {
  getTelList: () => ["/api/tel/list/bylogin"],
};

export const useTelList = (sptNo: string) => {
  const { accessToken } = useAuthStore(["accessToken"]);
  return useQuery({
    queryKey: KEY.getTelList(),
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is required");
      }
      return await API.getTelList(sptNo);
    },
    enabled: !!accessToken,
  });
};
