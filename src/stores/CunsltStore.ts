import { create } from "zustand";

type CunsltStoreType = {
  fromSocket?: boolean;
  cstmrNo?: string; // 고객번호, 대기일때는 waitCstmrNo
  cnsltNo?: string; // 상담번호, 대기일때는 cnsltNm
  cnsltTelno?: string; // 상담전화번호
  cstmrNm?: string; // 상담자 이름
  callYn?: string; // 전화 걸기, 받기
  trsmYn?: string; // 통화콜, 부재콜, 대기
  mbtlNo?: string;
  telNo?: string;
  socketInfo?: any;
  socketCallYn?: string;
  socketTrsmYn?: string;

  setCnsltInfo: (info: {
    fromSocket?: boolean;
    cstmrNo?: string;
    cnsltNo?: string;
    cnsltTelno?: string;
    cstmrNm?: string;
    callYn?: string;
    trsmYn?: string;
    mbtlNo?: string;
    telNo?: string;
    socketInfo?: any;
    socketCallYn?: string;
    socketTrsmYn?: string;
  }) => void;
  clear: () => void;
};

export const useCnsltStore = create<CunsltStoreType>()((set) => ({
  setCnsltInfo: (info) => set(info),
  clear: () =>
    set(() => ({
      fromSocket: false,
      cstmrNo: "",
      cnsltNo: "",
      cnsltTelno: "",
      cstmrNm: "",
      mbtlNo: "",
      telNo: "",
      socketInfo: null,
      socketCallYn: "",
      socketTrsmYn: "",
    })),
}));
