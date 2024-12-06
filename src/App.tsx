import "./App.css";
import ThemeProvider from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
import ModalContainer from "./components/ModalContainer";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Loading from "./pages/Loading";
// import { useAxiosInterceptor } from "./utils/axiosInstance";

function App() {
  // useAxiosInterceptor();

  // 모든 쿼리와 뮤테이션의 로딩 상태를 추적
  const isFetching = useIsFetching() > 0; // isFetching이 1 이상이면 로딩 중
  const isMutating = useIsMutating() > 0; // isMutating이 1 이상이면 뮤테이션 진행 중

  // 로딩 상태가 하나라도 true이면 로딩 컴포넌트 표시
  const isLoading = isFetching || isMutating;

  return (
    <ThemeProvider>
      {isLoading && <Loading />}
      <RouterProvider router={router} />
      <ModalContainer />
    </ThemeProvider>
  );
}

export default App;
