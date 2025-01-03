import { create } from "zustand";

type CunsltStoreType = {
  cstmrNo?: string; // 고객번호
  cnsltNo?: string; // 상담번호
  setTelInfo: (cstmrNo: string, cnsltNo: string) => void;
  clear: () => void;
};

export const useCnsltStore = create<CunsltStoreType>()((set) => ({
  setTelInfo: (cstmrNo, cnsltNo) => set({ cstmrNo, cnsltNo }),
  clear: () =>
    set(() => ({
      cstmrNo: "",
      cnsltNo: "",
    })),
}));
