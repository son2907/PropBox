import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TelStoreType = {
  telId: string; // 전화기 ID
  telno: string; // 전화번호

  setTelInfo: (telId: string, telno: string) => void;
  clear: () => void;
};

export const useTelStore = create<TelStoreType>()(
  persist(
    (set) => ({
      telId: "",
      telno: "",
      setTelInfo: (telId, telno) => set({ telId, telno }),
      clear: () => set(() => ({ telId: "", telno: "" })),
    }),
    {
      name: "selectedTel",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
