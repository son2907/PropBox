import { useAuthStore } from "../../stores/authStore";
import { PropsWithChildren, useEffect } from "react";
import { useMatches, useNavigate } from "react-router-dom";
import PathConstants from "../path";

// 라우트의 handle 속성에서 인증 여부(requireAuth)를 확인하는 타입 정의
type RouteHandle = { requireAuth?: boolean } | undefined;

export default function AuthGuard({ children }: PropsWithChildren) {
  const matches = useMatches(); // 현재 매칭된 라우트를 가져옵니다.
  const navigate = useNavigate(); // 라우팅을 위한 훅
  const { accessToken } = useAuthStore(["accessToken"]); // accessToken 상태를 가져옵니다.

  useEffect(() => {
    // 현재 라우트에서 인증이 필요한지 확인
    const requireAuth = matches.some(
      ({ handle }) => (handle as RouteHandle)?.requireAuth
    );

    // 인증이 필요한데 accessToken이 없으면 로그인 페이지로 리다이렉트
    if (requireAuth && !accessToken) {
      navigate(PathConstants.Login, { replace: true });
    }
  }, [matches]); // 라우트 매칭 변경 시 효과 실행

  // 인증 문제가 없으면 자식 컴포넌트 렌더링
  return children;
}
