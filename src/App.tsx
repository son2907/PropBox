import { useEffect, useState } from "react";
import "./App.css";
import ThemeProvider from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
import ModalContainer from "./components/ModalContainer";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Loading from "./pages/Loading";

function App() {
  const isFetching = useIsFetching() > 0;
  const isMutating = useIsMutating() > 0;
  const [showLoading, setShowLoading] = useState(false);

  const isLoading = isFetching || isMutating;

  useEffect(() => {
    let timeout: number | undefined;

    if (isLoading) {
      timeout = window.setTimeout(() => setShowLoading(true), 200);
    } else {
      setShowLoading(false);
      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
    }

    return () => {
      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
    };
  }, [isLoading]);

  return (
    <ThemeProvider>
      {showLoading && <Loading />}
      <RouterProvider router={router} />
      <ModalContainer />
    </ThemeProvider>
  );
}

export default App;
