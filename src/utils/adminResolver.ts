import * as Yup from "yup";
import { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// 각 폼의 스키마 타입
type FormShape = "loginForm" | "signupForm";

// 폼 스키마 정의
const formShape: { [schema in FormShape]: any } = {
  loginForm: {
    loginId: Yup.string()
      .required("로그인 아이디를 입력해주세요")
      .matches(
        /^[A-Za-z\d@$!%*?&]+$/,
        "로그인 아이디는 영문, 숫자, 특수문자만 입력 가능합니다."
      ), // 로그인 아이디의 유효성 검사,
    password: Yup.string()
      .required("비밀번호를 입력해 주세요")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "비밀번호는 최소 8자, 영문, 숫자, 특수문자를 포함해야 합니다."
      ), // 비밀번호 유효성 검사
  },
  signupForm: {
    loginId: Yup.string()
      .required("로그인 아이디를 입력해주세요")
      .matches(
        /^[A-Za-z\d@$!%*?&]+$/,
        "로그인 아이디는 영문, 숫자, 특수문자만 입력 가능합니다."
      ), // 로그인 아이디의 유효성 검사
    password: Yup.string()
      .required("비밀번호를 입력해 주세요")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "비밀번호는 최소 8자, 영문, 숫자, 특수문자를 포함해야 합니다."
      ), // 비밀번호 유효성 검사
  },
};

export default function getResolverBySchemaName(
  schemaName: FormShape
): Resolver<any, any> | undefined {
  if (!Yup) return;

  if (!formShape[schemaName]) return;

  return yupResolver(Yup.object().shape(formShape[schemaName]));
}
