import { create } from "zustand";

type CunsltStoreType = {
  cstmrNo?: string; // 고객번호, 대기일때는 waitCstmrNo
  cnsltNo?: string; // 상담번호, 대기일때는 cnsltNm
  callYn?: string; // 전화 걸기, 받기
  trsmYn?: string; // 통화콜, 부재콜, 대기
  setCnsltInfo: (info: {
    cstmrNo?: string;
    cnsltNo?: string;
    callYn?: string;
    trsmYn?: string;
  }) => void;
  clear: () => void;
};

export const useCnsltStore = create<CunsltStoreType>()((set) => ({
  setCnsltInfo: (info) => set(info), // 객체를 받아서 상태 업데이트
  clear: () =>
    set(() => ({
      cstmrNo: "",
      cnsltNo: "",
      type: "",
    })),
}));
