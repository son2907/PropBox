import "./App.css";
import ThemeProvider from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./routers";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
