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
  console.log("useMenuList씀");
  const { accessToken } = useAuthStore(["accessToken"]); // accessToken을 저장소에서 가져옵니다.
  return useQuery({
    queryKey: KEY.getMenuList(),
    queryFn: async () => {
      if (!accessToken) {
        console.log("엑세스 토큰 없음");
        throw new Error("Access token is required");
      }
      return await API.getMenuList();
    },
    enabled: !!accessToken,
  });
};
