import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// SptStoreType 정의
type SptStoreType = {
  cntrctBgnde?: string | null;
  cntrctEndde?: string | null;
  constntUserNo?: string | null;
  delYn?: string | null;
  progrsSeCd?: string | null;
  realEndde?: string | null;
  regrId?: string | null;
  rmk?: string | null;
  sptNm: string;
  sptNo: string;
  updrId?: string | null;
  useYn?: string | null;
  userNm?: string | null;
  userNo?: string;

  // 상태 변경 함수들
  setSptData: (data: Partial<SptStoreType>) => void; // JSON 데이터로 상태 설정
  clear: () => void; // 상태 초기화
};

export const useSptStore = create<SptStoreType>()(
  persist(
    (set) => ({
      sptNo: "",
      sptNm: "",
      setSptData: (data) => set((state) => ({ ...state, ...data })),
      clear: () =>
        set(() => ({
          cntrctBgnde: null,
          cntrctEndde: null,
          constntUserNo: null,
          delYn: null,
          progrsSeCd: null,
          realEndde: null,
          regrId: null,
          rmk: null,
          sptNm: "",
          sptNo: "",
          updrId: null,
          useYn: null,
          userNm: null,
          userNo: "",
        })),
    }),
    {
      name: "selectedSite",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// // 특정 상태를 선택적으로 구독하는 커스텀 훅
// export const useSptStore = <T extends keyof SptStoreType>(keys: T[]) => {
//   return useShallow(store, keys);
// };
