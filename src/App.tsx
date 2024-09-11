import "./App.css";
import { Slider, Typography } from "@mui/material";
import ThemeProvider from "./theme";

function App() {
  return (
    <>
      <ThemeProvider>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Slider defaultValue={30} />
        <Slider defaultValue={30} className="text-teal-600" />
        <Typography variant="h1" color="root.error">
          내용
        </Typography>
        <span color="root.error">
          일단 span 코드에는 tailwind css를 사용해야 함
        </span>
        <div className="text-teal-600">이것 처럼</div>
      </ThemeProvider>
    </>
  );
}

export default App;
