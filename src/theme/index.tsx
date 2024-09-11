import { ReactNode, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  ThemeOptions,
} from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import typography from "./typography";
import componentsOverrides from "./overrides";
import _palette from "./palette";

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // 테마 설정을 useMemo로 메모이제이션
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: _palette,
      breakpoints: {
        values: {
          xs: 0, // 엑스트라 스몰 (주로 모바일 기기)
          sm: 600, // 스몰 (태블릿 화면)
          md: 900, // 미디엄 (작은 노트북 화면)
          lg: 1200, // 라지 (대부분의 데스크탑 화면)
          xl: 1536, // 엑스트라 라지 (큰 화면 또는 고해상도 모니터)
        },
      },
      typography,
    }),
    []
  );

  const theme = createTheme(themeOptions);

  // 컴포넌트 오버라이드를 theme에 적용
  theme.components = componentsOverrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateFormats={{ monthShort: `M` }}
      >
        <CssBaseline>{children}</CssBaseline>
      </LocalizationProvider>
    </MUIThemeProvider>
  );
}
