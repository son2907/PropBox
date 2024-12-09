import * as yup from "yup";

// 유효성 검사 스키마
export const loginSchema = yup.object().shape({
  loginId: yup
    .string()
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+=-]*$/,
      "유효하지 않은 문자가 포함되어 있습니다."
    )
    .required("아이디를 입력하세요.")
    .trim(),
  pwdNo: yup
    .string()
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+=-]*$/,
      "유효하지 않은 문자가 포함되어 있습니다."
    )
    .required("비밀번호를 입력하세요.")
    .trim(),
});
