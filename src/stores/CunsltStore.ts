import { create } from "zustand";

type CunsltStoreType = {
  cstmrNo?: string; // 고객번호
  cnsltNo?: string; // 상담번호
  callYn?: string; // 전화 걸기, 받기
  trsmYn?: string; // 통화콜, 부재콜, 대기
  setTelInfo: (
    cstmrNo: string,
    cnsltNo: string,
    callYn?: string,
    trsmYn?: string
  ) => void;
  clear: () => void;
};

export const useCnsltStore = create<CunsltStoreType>()((set) => ({
  setTelInfo: (cstmrNo, cnsltNo, callYn, trsmYn) =>
    set({ cstmrNo, cnsltNo, callYn, trsmYn }),
  clear: () =>
    set(() => ({
      cstmrNo: "",
      cnsltNo: "",
      type: "",
    })),
}));
