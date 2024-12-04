import { create } from "zustand";
import { MenuListType } from "../types/menu";

type MenuItemType = {
  label: string;
  url: string;
};

type MenuStoreType = {
  allMenus: MenuListType;
  menus: MenuItemType[];
  setAllMenuData: (data: MenuListType) => void;
  addMenu: (label: string, url: string) => void; // 메뉴 추가 함수
  openMenu: (url: string) => MenuItemType | null; // 메뉴 열기 함수
  closeMenu: (url: string) => void; // 메뉴 닫기 함수
  clear: () => void; // 메뉴 목록 비우기 함수
};

// 메뉴 상태 관리 스토어
export const useMenuStore = create<MenuStoreType>((set, get) => ({
  allMenus: [],
  menus: [],
  setAllMenuData: (data) => set(() => ({ allMenus: data })),
  addMenu: (label, url) =>
    set((state) => {
      // 동일한 URL을 가진 항목이 있는지 확인
      if (state.menus.some((menu) => menu.url === url)) {
        return state; // 기존 상태를 반환하여 아무 것도 변경하지 않음
      }

      // 메뉴가 10개를 넘지 않도록 처리
      const updatedMenus = [...state.menus, { label, url }];
      if (updatedMenus.length > 10) {
        updatedMenus.shift(); // 첫 번째 메뉴를 제거
      }

      return {
        menus: updatedMenus,
      };
    }),
  openMenu: (url) => {
    const menu = get().menus.find((menu) => menu.url === url);
    return menu ? menu : null;
  },
  closeMenu: (url) =>
    set((state) => ({
      menus: state.menus.filter((menu) => menu.url !== url),
    })),
  clear: () => set({ menus: [], allMenus: [] }),
}));
