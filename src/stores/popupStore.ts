import { create } from "zustand";

type PopupStore = {
  popups: Window[]; // 열린 팝업 객체 배열
  addPopup: (popup: Window) => void; // 팝업 추가
  removePopup: (popup: Window) => void; // 팝업 제거
  closeAllPopups: () => void; // 모든 팝업 닫기
};

export const usePopupStore = create<PopupStore>((set) => ({
  popups: [],
  addPopup: (popup) =>
    set((state) => ({
      popups: [...state.popups, popup],
    })),
  removePopup: (popup) =>
    set((state) => ({
      popups: state.popups.filter((p) => p !== popup),
    })),
  closeAllPopups: () =>
    set((state) => {
      state.popups.forEach((popup) => {
        if (!popup.closed) popup.close();
      });
      return { popups: [] }; // 배열 초기화
    }),
}));
