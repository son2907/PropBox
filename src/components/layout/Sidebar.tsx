import Solution from "../sidebar/Solution";
import MenuItem from "../sidebar/MenuItem";
import { MenuType } from "../../types/menu";

interface SidebarProps {
  label: string;
  icon: React.ReactNode;
  menuListData: MenuType[];
  isAble: boolean;
  isOpen: boolean;
}

// 대메뉴는 권한이 있는지 없는지도 함께
// 소메뉴는 권한이 있는 메뉴 리스트만 받아야 함
export default function Sidebar({
  label,
  icon,
  menuListData,
  isAble,
  isOpen,
}: SidebarProps) {
  //MenuItem 중 하나가 클릭된 상태이면 div의 백그라운드 컬러를 gray로
  return (
    <Solution label={label} icon={icon} isAble={isAble} isOpen={isOpen}>
      {menuListData.map((item, index) => {
        return (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            url={item.url}
          />
        );
      })}
    </Solution>
  );
}
