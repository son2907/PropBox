import { Input, OutlinedInput } from "@mui/material";

interface Inputprops {
  value: string;
  placeholder: string;
}
export default function BasicInput({ value, placeholder }: Inputprops) {
  return <OutlinedInput id="outlined-basic" placeholder={placeholder} />;
}
