import { Theme } from "@mui/material";
import Typography from "./Typography";

export default function componentsOverrides(theme: Theme) {
  return Object.assign(Typography(theme));
}
