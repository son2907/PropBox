import { Components, Theme } from "@mui/material";

export default function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: theme.palette.common.black,
          display: "inline",
          whiteSpace: "nowrap", // 한 줄로 표시
          overflow: "visible", // 내용이 넘쳐도 숨기지 않음
          textOverflow: "clip", // 말줄임표 제거
        },
      },
    },
  } as Components;
}
