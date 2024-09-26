import Solution from "../sidebar/Solution";
import MenuItem from "../sidebar/MenuItem";
import { MenuType, SolutionType } from "../../types/menu";

interface SidebarProps extends SolutionType {
  menuListData: MenuType[];
  fold: boolean;
}
// 대메뉴는 권한이 있는지 없는지도 함께
// 소메뉴는 권한이 있는 메뉴 리스트만 받아야 함
export default function Sidebar({
  menuListData,
  ...solutionProps
}: SidebarProps) {
  const { fold } = solutionProps;
  return (
    <Solution {...solutionProps}>
      {menuListData.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          label={item.label}
          url={item.url}
          fold={fold}
        />
      ))}
    </Solution>
  );
}
