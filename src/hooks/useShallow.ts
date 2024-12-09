import { StoreApi } from "zustand";
import { UseBoundStoreWithEqualityFn } from "zustand/traditional";

export const useShallow = <T, K extends keyof T>(
  store: UseBoundStoreWithEqualityFn<StoreApi<T>>,
  keys: K[]
): Pick<T, K> => {
  return store((state) => {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
      result[key] = state[key];
    });
    return result;
  });
};
