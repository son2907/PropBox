import { create } from "zustand";

type CunsltStoreType = {
  cstmrNo?: string; // 고객번호
  cnsltNo?: string; // 상담번호
  type?: string; // 통화콜, 부재콜 등 클릭한 탭 타입
  setTelInfo: (cstmrNo: string, cnsltNo: string, type?: string) => void;
  clear: () => void;
};

export const useCnsltStore = create<CunsltStoreType>()((set) => ({
  setTelInfo: (cstmrNo, cnsltNo, type) => set({ cstmrNo, cnsltNo, type }),
  clear: () =>
    set(() => ({
      cstmrNo: "",
      cnsltNo: "",
      type: "",
    })),
}));
