import { useState, useEffect } from "react";

// Hook to sync Zustand store with localStorage
export const useStorageStore = (store, key) => {
  // 상태를 초기화할 때, 로컬스토리지에 저장된 값을 사용
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    // Zustand store가 변경될 때마다 state를 업데이트
    const unsubscribe = store.subscribe((newState) => {
      setState(newState); // 상태 변경 시 UI 업데이트
    });

    // 로컬 스토리지 값이 변경되었을 때, 상태를 동기화
    const onStorageChange = (e) => {
      if (e.key === key) {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
          setState(JSON.parse(storedValue)); // 로컬 스토리지의 값으로 상태 갱신
        }
      }
    };

    // storage 이벤트 리스너를 추가하여 외부에서 변경된 로컬 스토리지 값 감지
    window.addEventListener("storage", onStorageChange);

    // cleanup: unmount 시 상태 구독과 이벤트 리스너 제거
    return () => {
      unsubscribe(); // 상태 구독 해제
      window.removeEventListener("storage", onStorageChange); // storage 이벤트 리스너 해제
    };
  }, [store, key]);

  return state; // 최종 상태 반환
};
