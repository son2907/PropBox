import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import { useAuthStore } from "../stores/authStore";
import { SiteDataType } from "../types/SiteSelection";

const API = {
  getSiteList: async () => {
    return await instance.get<SiteDataType>("/api/spt/list/bylogin");
  },
};

const KEY = {
  getSiteList: () => ["/api/spt/list/bylogin"],
};

export const useSiteList = () => {
  const { accessToken } = useAuthStore(["accessToken"]);
  return useQuery({
    queryKey: KEY.getSiteList(),
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is required");
      }
      return await API.getSiteList();
    },
    enabled: !!accessToken,
  });
};
