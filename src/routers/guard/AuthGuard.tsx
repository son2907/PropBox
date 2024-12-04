import { useAuthStore } from "../../stores/authStore";
import { PropsWithChildren, useEffect } from "react";
import { useMatches, useNavigate } from "react-router-dom";
import PathConstants from "../path";

export default function AuthGuard({ children }: PropsWithChildren) {
  const matches = useMatches(); // 현재 매칭된 라우트를 가져옵니다.
  const navigate = useNavigate(); // 라우팅을 위한 훅
  const { accessToken } = useAuthStore(["accessToken"]); // accessToken 상태를 가져옵니다.

  useEffect(() => {
    // 인증이 필요한데 accessToken이 없으면 로그인 페이지로 리다이렉트
    if (!accessToken) {
      // 이미 로그인 페이지로 리다이렉트된 경우엔 다시 리다이렉트하지 않음
      if (window.location.pathname !== PathConstants.Login) {
        navigate(PathConstants.Login, { replace: true });
      }
    }
    // accessToken이 이미 있으면서 로그인 페이지로 진입하려고 하는 경우
    if (
      accessToken != null &&
      window.location.pathname === PathConstants.Login
    ) {
      alert("이미 로그인 된 상태입니다");
      navigate(PathConstants.Home);
    }
  }, [matches]); // 라우트 매칭 변경 시 효과 실행

  // 인증 문제가 없으면 자식 컴포넌트 렌더링
  return children;
}
