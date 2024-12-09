import { StateCreator } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { useShallow } from "../hooks/useShallow";

// AuthStoreType 정의
type AuthStoreType = {
  uuid?: string; // 사용자 고유 ID
  userNo?: string; // 사용자 번호
  loginId?: string; // 로그인 ID
  userNm?: string; // 사용자 이름
  attlistUserNm?: string; // 상세 사용자 이름
  attlistMbtlNo?: string | null; // 상세 사용자 연락처
  mbtlNo?: string | null; // 사용자 연락처
  constntUserNo?: string; // 사용자 고유 식별 번호
  userConstntSeCd?: string; // 사용자 코드
  loginIdPrefix?: string | null; // 로그인 ID 접두사
  accessToken?: string | null; // 액세스 토큰
  refreshToken?: string | null; // 리프레시 토큰
  remember?: boolean; // 로그인 기억 여부

  // 상태 변경 함수들
  setSaveLogin: (loginId: string, remember: boolean) => void; //자동 로그인
  setAuthData: (data: Partial<AuthStoreType>) => void; // JSON 데이터로 상태 설정
  setAuthToken: (accessToken: string) => void;
  clear: () => void; // 상태 초기화
};

// persist 미들웨어 타입 정의
type PersistAuthStoreType = (
  config: StateCreator<AuthStoreType>,
  options: PersistOptions<AuthStoreType>
) => StateCreator<AuthStoreType>;

// Zustand 스토어 생성
export const store = createWithEqualityFn<AuthStoreType>(
  (persist as PersistAuthStoreType)(
    (set) => ({
      // 상태 변경 함수들 구현
      setAuthData: (data) => set((state) => ({ ...state, ...data })),
      setAuthToken: (accessToken) => set({ accessToken }),
      setSaveLogin: (loginId, remember) => set({ loginId, remember }),
      clear: () =>
        set(() => ({
          uuid: undefined,
          userNo: undefined,
          userNm: undefined,
          attlistUserNm: undefined,
          attlistMbtlNo: null,
          mbtlNo: null,
          constntUserNo: undefined,
          userConstntSeCd: undefined,
          loginIdPrefix: null,
          accessToken: null,
          refreshToken: null,
        })),
    }),
    {
      name: "propbox-admin-auth", // 로컬 스토리지 키 이름
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지에 상태 저장
    }
  )
);

// 특정 상태를 선택적으로 구독하는 커스텀 훅
export const useAuthStore = <T extends keyof AuthStoreType>(keys: T[]) => {
  return useShallow(store, keys);
};
