import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      borderRadius: 8,
      marginTop: 1,
    },
  },
};

interface SelectProps {
  selectData: { value: number; data: string }[]; // value 타입을 number로 변경
  defaultValue?: number[]; // defaultValue를 number[]로 변경
  value: number[]; // value를 number[]로 변경
  onChange: (e: SelectChangeEvent<number[]>) => void;
  placeholder?: string;
  sx?: any;
}

export default function MultiSelect({
  selectData,
  defaultValue = [], // 기본값을 빈 배열로 설정
  value = [], // 기본값을 빈 배열로 설정
  onChange,
  placeholder = "항목을 선택해주세요",
  ...rest
}: SelectProps) {
  // 선택된 value들에 해당하는 data를 표시하는 함수
  const selectedData = selectData
    .filter((item) => value.includes(item.value))
    .map((item) => item.data);

  return (
    <FormControl size="small" fullWidth sx={{ ...(rest.sx || {}) }}>
      <InputLabel
        shrink={false}
        style={{ display: value.length > 0 ? "none" : "block" }}
      >
        {placeholder}
      </InputLabel>
      <Select
        multiple
        className="bg-white"
        {...rest}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        renderValue={() => selectedData.join(", ")}
        MenuProps={MenuProps}
      >
        {selectData.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            sx={{ padding: "3px 10px" }}
          >
            <Checkbox
              checked={value.includes(item.value)}
              sx={{
                color: value.includes(item.value)
                  ? "main.white"
                  : "root.mainBlue", // 체크박스 색상 설정
                "&.Mui-checked": {
                  color: "root.mainBlue", // 선택된 체크박스 색상
                },
                padding: 1,
              }}
            />
            <ListItemText primary={item.data} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
