import { useQuery } from "@tanstack/react-query";
import instance from "../utils/axiosInstance";
import { useAuthStore } from "../stores/authStore";

const API = {
  getCnsltItemList: async () => {
    return await instance.get("/api/cnslt/item/list");
  },
};

const KEY = {
  getCnsltItemList: () => ["/api/cnslt/item/list"],
};

export const useCnsltItemList = () => {
  const { accessToken } = useAuthStore(["accessToken"]);
  return useQuery({
    queryKey: KEY.getCnsltItemList(),
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is required");
      }
      return await API.getCnsltItemList();
    },
    enabled: !!accessToken,
  });
};
