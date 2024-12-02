import { ComponentType } from "react";
import { create } from "zustand";

type MenuStoreType = {
  menus: MenuItemType[];

  addMenu: (name: string, url: string, icon: ComponentType) => void; // url을 받아서 해당 아이템을 리스트에 추가함
  openMenu: (url: string) => void; // 클릭한 메뉴 값 반환
  closeMenu: (url: string) => void; //  url을 받아서 해당 아이템을 리스트에서 지움
  clear: () => void; // 모든 메뉴를 리스트에서 지움
};

type MenuItemType = {
  icon: ComponentType;
  name: string;
  url: string;
};

export const useMenu = create<MenuStoreType>((set, get) => ({
  // 초기 상태 : 메뉴 리스트는 빈 배열
  menus: [],
  // 메뉴 추가, name, url, icon을 받아와 메뉴 리스트에 추가함
  addMenu: (name, url, icon) =>
    set((state) => ({
      menus: [...state.menus, { name, url, icon }],
    })),
  // 메뉴 열기, 받은 url과 일치하는 아이템을 반환
  openMenu: (url) => {
    const menu = get().menus.find((menu) => menu.url === url);
    return menu ? menu : null;
  },
  // 메뉴 닫기, 받은 url과 일치하는 아이템을 삭제
  closeMenu: (url) =>
    set((state) => ({
      menus: state.menus.filter((menu) => menu.url !== url),
    })),
  // 메뉴 목록 비움
  clear: () => set({ menus: [] }),
}));
