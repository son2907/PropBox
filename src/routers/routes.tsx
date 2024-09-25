import { RouteObject } from "react-router-dom";
import DefaultLayout from "../layout";
import PathConstants from "./path";
import Main from "../pages/main";

export const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    // 에러 엘리먼트 추가 필요
    children: [
      { path: PathConstants.Home, element: <Main /> },
      {
        children: [
          {
            path: PathConstants.Login,
            element: <div>로그인</div>,
          },
        ],
      },
      {
        children: [
          {
            path: PathConstants.Test,
            element: <div>테스트</div>,
          },
        ],
      },
    ],
  },
];
