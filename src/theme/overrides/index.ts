import { Theme } from "@mui/material";
import Typography from "./Typography";
import Button from "./Button";

export default function componentsOverrides(theme: Theme) {
  return Object.assign(Button(theme), Typography(theme));
}
