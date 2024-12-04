import { ReactNode } from "react";
import { ApiResponseType } from "./apiResponse";

// 컴포넌트를 위한 타입
export type SolutionType = {
  label: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  auth: boolean;
};

export type MenuType = {
  icon?: ReactNode;
  label: string;
  url: string;
  fold: boolean;
};

// 데이터를 위한 타입
export type SubMenuType = {
  label: string;
  url: string;
};

export type MainMenuType = {
  icon?: ReactNode;
  label: string;
  auth: boolean;
  subMenu: SubMenuType[]; // 소메뉴 리스트
};

// 여러 개의 대메뉴로 구성된 배열
export type MenuListType = MainMenuType[];

// 탭 선택에 따라 하위 컴포넌트 ui 변경시 사용되는 탭 hook 타입
export type TabType = {
  tabType: number;
  tabChange: (event: React.SyntheticEvent, newValue: number) => void;
};

// 메뉴 API 응답
export interface MenuResponseModel extends ApiResponseType {
  totalCnt: number | null;
  contents: Array<{
    slutnId: string;
    upperSlutnId: string;
    slutnNm: string;
    lisneSeCd: string;
    iconFlpth: string | null;
    authorNthgUrl: string;
    lnupOrd: string;
    rollYn: string;
    menuList: Array<{
      slutnId: string;
      upperSlutnId: string;
      slutnNm: string;
      lisneCnfirmYn: string;
      url: string;
      iconFlpth: string | null;
      lnupOrd: string;
    }>;
  }>;
}
