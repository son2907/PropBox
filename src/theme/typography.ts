import { Palette } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const _typography:
  | TypographyOptions
  | ((palette: Palette) => TypographyOptions) = {
  h1: {
    fontSize: "32px",
    fontWeight: 700,
  },
  h2: {
    fontSize: "24px",
    fontWeight: 700,
  },
  h3: {
    fontSize: "20px",
    fontWeight: 700,
  },
  h4: {
    fontSize: "16px",
    fontWeight: 700,
  },
  h5: {
    fontSize: "14px",
    fontWeight: 700,
  },
  h6: {
    fontSize: "13px",
    fontWeight: 700,
  },
  bodyL: {
    fontSize: "18px",
    fontWeight: 400,
  },
  bodyM: {
    fontSize: "16px",
    fontWeight: 400,
  },
  bodyS: {
    fontSize: "14px",
    fontWeight: 400,
  },
  bodySS: {
    fontSize: "12px",
    fontWeight: 400,
  },
  buttonL: {
    fontSize: "16px",
    fontWeight: 400,
  },
  buttonM: {
    fontSize: "14px",
    fontWeight: 400,
  },
  buttonS: {
    fontSize: "12px",
    fontWeight: 400,
  },

  fontFamily: "'Noto Sans KR', serif",
  fontSize: 12,
};

if (_typography.bodyS) {
  _typography.body1 = _typography.bodyS;
}

export default _typography;
