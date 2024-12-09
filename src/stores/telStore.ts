import { StateCreator } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { useShallow } from "../hooks/useShallow";

// TelStoreType 정의
type TelStoreType = {
  telId: string; // 전화기 ID
  telno: string; // 전화번호
  telTitle: string; // 통신구분 (전화번호)
  commnSeCd: string; // 통신구분_1006000
  cntrctBgnde: string; // 사용시기
  cntrctEndde: string; // 사용종기
  lxtnNo: string; // 내선번호
  host: string; // 호스트
  id: string; // 아이디
  pwdNo: string; // 패스워드
  lastSptNo: string; // 최근 현장 번호
  useYn: string; // 사용여부
  delYn: string; // 삭제여부
  rmk: string; // 비고
  userId: string; // 사용자 ID
  userNo: string; // 사용자 번호

  // 상태 변경 함수
  setTelInfo: (telId: string, telno: string) => void;
  clear: () => void; // 상태 초기화
};

// persist 미들웨어 타입 정의
type PersistTelStoreType = (
  config: StateCreator<TelStoreType>,
  options: PersistOptions<TelStoreType>
) => StateCreator<TelStoreType>;

// Zustand 스토어 생성
export const store = createWithEqualityFn<TelStoreType>(
  (persist as PersistTelStoreType)(
    (set) => ({
      telId: "",
      telno: "",
      telTitle: "",
      commnSeCd: "",
      cntrctBgnde: "",
      cntrctEndde: "",
      lxtnNo: "",
      host: "",
      id: "",
      pwdNo: "",
      lastSptNo: "",
      useYn: "",
      delYn: "",
      rmk: "",
      userId: "",
      userNo: "",

      // 상태 변경 함수 구현
      setTelInfo: (telId, telno) => set({ telId, telno }),

      // 상태 초기화
      clear: () =>
        set({
          telId: "",
          telno: "",
          telTitle: "",
          commnSeCd: "",
          cntrctBgnde: "",
          cntrctEndde: "",
          lxtnNo: "",
          host: "",
          id: "",
          pwdNo: "",
          lastSptNo: "",
          useYn: "",
          delYn: "",
          rmk: "",
          userId: "",
          userNo: "",
        }),
    }),
    {
      name: "selectedTel", // 로컬 스토리지 키 이름
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지에 상태 저장
    }
  )
);

// 특정 상태를 선택적으로 구독하는 커스텀 훅
export const useTelStore = <T extends keyof TelStoreType>(keys: T[]) => {
  return useShallow(store, keys);
};
