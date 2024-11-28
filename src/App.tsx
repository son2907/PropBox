import "./App.css";
import ThemeProvider from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
import ModalContainer from "./components/ModalContainer";
import { useAxiosInterceptor } from "./utils/axiosInstance";

function App() {
  useAxiosInterceptor();

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <ModalContainer />
    </ThemeProvider>
  );
}

export default App;
