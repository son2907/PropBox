import { Slider, Typography } from "@mui/material";
import React, { useContext, useState } from "react";

const Context1 = React.createContext<any>(null); // state 보관함

function Test() {
  const [test] = useState<number>(1);

  return (
    <Context1.Provider value={{ test }}>
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
      <Child />
    </Context1.Provider>
  );
}

function Child() {
  const { test } = useContext(Context1);
  return (
    <div>
      <div>{test}</div>
    </div>
  );
}

export default Test;
