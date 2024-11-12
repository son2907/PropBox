import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { selectType } from "../../types/Select";
import { MdOutlineUnfoldMore } from "react-icons/md";

interface SelectProps {
  selectData: { value: number; data: string }[];
  defaultValue?: selectType;
  value: selectType;
  onChange: (e: SelectChangeEvent) => void;
  placeholder?: string;
  sx?: any;
}

// 데이터 타입
// const testData = [
//   {
//     value: 1,
//     data: "표시될 이름",
//   },
// ];

export default function PSelect({
  selectData,
  defaultValue,
  value,
  onChange,
  placeholder = "항목을 선택해주세요",
  ...rest
}: SelectProps) {
  return (
    <FormControl size="small">
      <InputLabel
        shrink={!!value}
        style={{ display: value ? "none" : "block" }}
      >
        {placeholder}
      </InputLabel>
      <Select
        {...rest}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        IconComponent={MdOutlineUnfoldMore}
      >
        {selectData.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.data}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
