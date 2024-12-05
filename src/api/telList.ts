import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import { useAuthStore } from "../stores/authStore";
import { TelDataType } from "../types/TelList";

const API = {
  getTelList: async () => {
    return await instance.get<TelDataType>("/api/tel/list/bylogin");
  },
};

const KEY = {
  getTelList: () => ["/api/tel/list/bylogin"],
};

export const useTelList = () => {
  const { accessToken } = useAuthStore(["accessToken"]);
  return useQuery({
    queryKey: KEY.getTelList(),
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is required");
      }
      return await API.getTelList();
    },
    enabled: !!accessToken,
  });
};
