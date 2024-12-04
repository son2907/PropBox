import { useQuery } from "@tanstack/react-query";
import { MenuResponseModel } from "../types/menu";
import instance from "../utils/axiosInstance";
import { useAuthStore } from "../stores/authStore";

const API = {
  getMenuList: async () => {
    return await instance.get<MenuResponseModel>("/api/user/slutn/list");
  },
};

const KEY = {
  getMenuList: () => ["/api/user/slutn/list"],
};

export const useMenuList = () => {
  const { accessToken } = useAuthStore(["accessToken"]);
  return useQuery({
    queryKey: KEY.getMenuList(),
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is required");
      }
      return await API.getMenuList();
    },
    enabled: !!accessToken,
    staleTime: Infinity, // 데이터를 캐싱하여 재호출 방지
    gcTime: Infinity, // 캐시를 오래 유지
    refetchOnMount: false,
  });
};
