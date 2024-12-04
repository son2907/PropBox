import { ReactNode } from "react";
import { MenuListType } from "../types/menu";

export function transformMenuData(data: any[], icon?: ReactNode): MenuListType {
  return data.map((menu) => ({
    icon: icon,
    label: menu.slutnNm,
    auth: menu.rollYn === "Y",
    subMenu:
      menu.rollYn === "N"
        ? [] // "N"일 경우 subMenu를 빈 배열로 설정
        : menu.menuList.map((subMenu: any) => ({
            label: subMenu.slutnNm,
            url: subMenu.url,
          })),
  }));
}
