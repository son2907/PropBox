import { PaletteColor, PaletteColorOptions, Color } from "@mui/material";

declare module "@mui/material/styles" {
  // 팔레트 확장
  interface PaletteColor extends Color {}

  interface Palette {
    sidebar: {
      menuBg: string;
      menuItemActiveBg: string;
    };
    tabbar: {
      tabBg: string;
      tabColor: string;
      tabItemActiveBg: string;
      tabIconColor: string;
    };
    appbar: {
      appbarBg: string;
      appbarItemColorGreen: string;
      appbarItemColorRed: string;
      appbarItemTextColor: string;
      appbarBorderColor: string;
    };
    modal: {
      modalBg: string;
      modalBorderColor: string;
    };
    heading: string;
    root: {
      secondary: string;
      light: string;
      tertiary: string;
      borderPrimary: string;
      error: string;
      coolGray400: string;
      coolGray600: string;
      coolGray800: string;
      statusDispatch: string;
      statusAccident: string;
      statusDelay: string;
      statusCommonError: string;
    };
  }
  interface PaletteOptions {
    sidebar: {
      menuBg: string;
      menuItemActiveBg: string;
    };
    tabbar: {
      tabBg: string;
      tabColor: string;
      tabItemActiveBg: string;
      tabIconColor: string;
    };
    appbar: {
      appbarBg: string;
      appbarItemColorGreen: string;
      appbarItemColorRed: string;
      appbarItemTextColor: string;
      appbarBorderColor: string;
    };
    modal: {
      modalBg: string;
      modalBorderColor: string;
    };
    heading: string;
    root: {
      secondary: string;
      light: string;
      tertiary: string;
      borderPrimary: string;
      error: string;
      coolGray400: string;
      coolGray600: string;
      coolGray800: string;
      statusDispatch: string;
      statusAccident: string;
      statusDelay: string;
      statusCommonError: string;
    };
  }

  interface TypographyVariants {
    bodyL: CSSProperties;
    bodyM: CSSProperties;
    bodyS: CSSProperties;
    bodySS: CSSProperties;
    buttonL: CSSProperties;
    buttonM: CSSProperties;
    buttonS: CSSProperties;
  }

  interface TypographyVariantsOptions {
    bodyL?: CSSProperties;
    bodyM?: CSSProperties;
    bodyS?: CSSProperties;
    bodySS?: CSSProperties;
    buttonL?: CSSProperties;
    buttonM?: CSSProperties;
    buttonS?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bodyL: true;
    bodyM: true;
    bodyS: true;
    bodySS: true;
    buttonL: true;
    buttonM: true;
    buttonS: true;
  }
}
