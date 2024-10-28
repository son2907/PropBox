import { PaletteOptions, alpha } from "@mui/material";

const _palette: PaletteOptions = {
  sidebar: {
    menuBg: "#ffffff",
    menuItemActiveBg: "#f3f4f6",
  },
  tabbar: {
    tabBg: "#eff2f6",
    tabColor: "#2a374e",
    tabItemActiveBg: "#ffffff",
    tabIconColor: "#98A2B3",
  },
  appbar: {
    appbarBg: "#ffffff",
    appbarItemColorGreen: "#86E57F",
    appbarItemColorRed: "#FFA7A7",
    appbarItemTextColor: "#ffffff",
    appbarBorderColor: "#e5e7eb",
  },

  // 페이지 탭 컬러
  pageTab: {
    tabBg: "#F7F9FA",
    selectedTabBg: "#FFFFFF",
    tabIcon: "#6AA5FE",
  },

  modal: {
    modalBg: "#37404a",
    modalBorderColor: "#dee2e6",
  },
  heading: "#6c757d",

  // 주요 색상변수
  root: {
    secondary: "#6a7382",
    light: "#ebebeb",
    tertiary: "#b0b8c6",
    borderPrimary: "#E6E9EE",
    coolGray400: "#8a92a8",
    coolGray600: "#575f75",
    coolGray800: "#2c2f3a",
    statusDispatch: "#4480f5",
    statusAccident: "#f4475f",
    statusDelay: "#f9ba0d",
    statusCommonError: "#231f47",
    error: "#f4475f",
  },
  primary: {
    main: "#D9D9D9", // 중간 명도의 회색
    light: "#ffffff", // 흰색
    dark: "#000000", // 어두운 회색
    A100: "#f1f1f1", // 연한 회색
    "50": "#f0f0f0", // 아주 연한 회색
    "100": "#d9d9d9", // 더 밝은 회색
    "200": "#bfbfbf", // 밝은 회색
    "300": "#a6a6a6", // 중간보다 약간 밝은 회색
    "400": "#8c8c8c", // 중간 회색
    "500": "#7e7e7e", // 중간 명도의 회색
    "600": "#6c6c6c", // 중간보다 약간 어두운 회색
    "700": "#595959", // 어두운 회색
    "800": "#404040", // 더 어두운 회색
    "900": "#2e2e2e", // 매우 어두운 회색
  },
  secondary: {
    main: "#8738ff",
    light: "#a86dff",
    dark: "#7d28ff",
    A100: "#f3ebff",
    "50": "#e6d6ff",
    "100": "#c8a3ff",
    "200": "#bb8dff",
    "300": "#ae78ff",
    "400": "#a86dff",
    "500": "#a060ff",
    "600": "#9853ff",
    "700": "#9046ff",
    "800": "#8738ff",
    "900": "#7d28ff",
  },
  success: {
    main: "#1ad75d",
    light: "#95e8a4",
    dark: "#00be2e",
    "50": "#e5fae9",
    "100": "#c1f1c8",
    "200": "#95e8a4",
    "300": "#5fe07c",
    "400": "#1ad75c",
    "500": "#00ce39",
    "600": "#00be2e",
    "700": "#00ab1f",
    "800": "#00990c",
    "900": "#007800",
    contrastText: "#ffffff",
  },
  info: {
    main: "#0cc0c3",
    light: "#ace3e6",
    dark: "#00a3a2",
    "50": "#def4f6",
    "100": "#ace3e6",
    "200": "#71d2d5",
    "300": "#0cc0c3",
    "400": "#00b2b4",
    "500": "#00a3a2",
    "600": "#009593",
    "700": "#008581",
    "800": "#007471",
    "900": "#005851",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#f9ba0d",
    light: "#f8e318",
    dark: "#f57600",
    "50": "#fffce5",
    "100": "#fef7c0",
    "200": "#fdf295",
    "300": "#fded6a",
    "400": "#fbe846",
    "500": "#f8e318",
    "600": "#fad217",
    "700": "#f9ba0d",
    "800": "#f8a101",
    "900": "#f57600",
    contrastText: "#ffffff",
  },
  error: {
    main: "#f4475f",
    light: "#fd5e74",
    dark: "#f51837",
    A100: "#ffe4e8",
    "50": "#ffced5",
    "100": "#ff99a7",
    "200": "#ff8b9b",
    "300": "#ff7e90",
    "400": "#ff6e82",
    "500": "#fd5e74",
    "600": "#f95269",
    "700": "#f4475f",
    "800": "#fc2f4b",
    "900": "#f51837",
    contrastText: "#ffffff",
  },
  grey: {
    A100: "#f6f7f8",
    "50": "#f0f1f4",
    "100": "#e2e4e8",
    "200": "#c5c8d2",
    "300": "#a8adbc",
    "400": "#8b92a6",
    "500": "#585f73",
    "600": "#424757",
    "700": "#2d2f39",
    "800": "#24262f",
    "900": "#16181d",
  },
  action: {
    active: alpha("#000", 0.54),
    hover: alpha("#000", 0.04),
    hoverOpacity: 0.04,
    selected: alpha("#000", 0.08),
    selectedOpacity: 0.08,
    disabled: alpha("#000", 0.15),
    disabledBackground: alpha("#000", 0.05),
    disabledOpacity: 0.38,
    focus: alpha("#000", 0.12),
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
  background: {
    default: "#f0f1f4",
  },
};

export default _palette;
