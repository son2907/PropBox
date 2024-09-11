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
        <Typography variant="bodySS" color="root.error">
          내용
        </Typography>
        <span color="root.error">테마로 적용되지 않은 것은 적용 안됨</span>
      </ThemeProvider>
    </>
  );
}

export default App;
