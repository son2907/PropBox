import { CSSObject, Components, Theme } from "@mui/material";

type ColorType = {
  main: string;
  text: string;
  hover: string;
  ripple: string;
};

export default function Button(theme: Theme) {
  // Contained 버튼의 스타일을 정의하는 함수
  // 인자로 받는 ColorType의 값들을 이용하여 배경색, 텍스트 색상, 호버 시 색상, Ripple 색상을 설정
  const containedButton: (p: ColorType) => CSSObject = (p) => ({
    backgroundColor: p.main,
    color: p.text,
    ":hover": { backgroundColor: p.hover }, // 마우스를 올렸을 때 배경 색상
    "& .MuiTouchRipple-child": { backgroundColor: p.ripple }, // Ripple 효과의 색상
  });

  // Outlined 버튼의 스타일을 정의하는 함수
  // `text` 색상은 제외한 ColorType의 나머지 값들을 이용
  const outlinedButton: (p: ColorType) => CSSObject = (p) => ({
    border: `1px solid ${p.main}`, // 테두리 색상
    backgroundColor: theme.palette.common.white, // 배경색은 흰색으로 고정
    color: p.text, // 텍스트 색상은 text 색상
    ":hover": { backgroundColor: p.hover }, // 마우스를 올렸을 때 배경색
    "& .MuiTouchRipple-child": { backgroundColor: p.ripple }, // Ripple 효과의 색상
  });

  // 최종적으로 MUI Button 컴포넌트의 스타일과 변형을 반환하는 부분
  return {
    MuiButton: {
      // 기본 속성 설정
      defaultProps: {
        disableElevation: true, // 버튼에 그림자 효과 제거
        variant: "contained", // 기본적으로 contained 스타일을 사용
        size: "medium", // 기본 크기는 medium
      },

      // 버튼의 변형 스타일을 정의하는 부분
      variants: [
        {
          // 작은 크기의 버튼 스타일
          props: { size: "small" },
          style: { height: 29, ...theme.typography.buttonM }, // 높이와 폰트 스타일 설정
        },
        {
          // 중간 크기의 버튼 스타일
          props: { size: "medium" },
          style: { height: 34, ...theme.typography.buttonM }, // 높이와 폰트 스타일 설정
        },
        {
          // 큰 크기의 버튼 스타일
          props: { size: "large" },
          style: { height: 40, ...theme.typography.buttonM }, // 높이와 폰트 스타일 설정
        },
        // Primary 색상으로 설정된 Contained 버튼 스타일(회색 배경, 검은 텍스트)
        {
          props: { variant: "contained", color: "primary" },
          style: {
            ...containedButton({
              main: theme.palette.primary["A100"], // 주 색상
              text: theme.palette.primary.contrastText, // 텍스트 색상
              hover: theme.palette.primary[100], // 호버 시 색상
              ripple: theme.palette.primary[900], // Ripple 효과 색상
            }),
          },
        },
        // Primary 색상으로 설정된 Outlined 버튼 스타일(회색 테두리, 검은 텍스트)
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            ...outlinedButton({
              main: theme.palette.primary.main, // 테두리 색상
              text: theme.palette.primary.dark, // 텍스트 색상
              hover: theme.palette.primary.light, // 호버 시 색상
              ripple: theme.palette.primary[700], // Ripple 효과 색상
            }),
          },
        },
      ],

      // 버튼의 스타일을 전역적으로 오버라이드하는 부분
      styleOverrides: {
        root: {
          padding: "4px 10px", // 모든 버튼의 기본 패딩 설정
          "&.Mui-disabled": {
            backgroundColor: theme.palette.grey[100], // 비활성화된 버튼의 배경색
            color: "#b0b8c6", // 비활성화된 버튼의 텍스트 색상
            border: "1px solid #b0b8c6", // 비활성화된 버튼의 테두리 색상
          },
        },
      },
    },
  } as Components;
}
