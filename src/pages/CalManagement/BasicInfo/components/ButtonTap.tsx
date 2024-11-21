import { BasicButton } from "../../../../components/Button";
import { TabMenusProps } from "../../../../components/Tab/TabMenus";

interface ButtonTap extends TabMenusProps {
  index: number; // 버튼의 고윳값
}

export default function ButtonTab({
  index,
  value,
  handleChange,
  children,
}: ButtonTap) {
  return (
    <BasicButton
      sx={{
        justifyContent: "flex-start",
        bgcolor: index == value ? "root.lightBlue" : "main.light",
        "&:hover": {
          bgcolor: index === value ? "root.mainBlue" : "root.light",
        }, // 마우스 오버 시 배경색 유지
      }}
      onClick={(event) => handleChange(event, index)}
    >
      {children}
    </BasicButton>
  );
}
