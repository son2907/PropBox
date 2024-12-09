// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3, //3번까지 재시도
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StyledEngineProvider injectFirst>
      {/* <StrictMode> */}
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
      {/* </StrictMode> */}
    </StyledEngineProvider>
  </QueryClientProvider>
);
