import { RouteObject } from "react-router-dom";
import DefaultLayout from "../layout";
import PathConstants from "./path";
import Main from "../pages/main";
import Test from "../pages/test";
import Login from "../pages/Login";
import NetworkSetup from "../pages/NetworkSetup";

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
            element: <Login />,
          },
        ],
      },
      {
        children: [
          {
            path: PathConstants.Test,
            element: <Test />,
          },
        ],
      },
      {
        children: [
          {
            path: PathConstants.Call.Consultation,
            element: <div>전화 상담</div>,
          },
          {
            path: PathConstants.Call.Analysis,
            element: <div>상담 분석</div>,
          },
          {
            path: PathConstants.Call.Management,
            element: <div>데이터 관리</div>,
          },
          {
            path: PathConstants.Call.Information,
            element: <div>기본 정보</div>,
          },
        ],
      },
      {
        children: [
          {
            path: PathConstants.Message.Auto,
            element: <div>자동 문자</div>,
          },
          {
            path: PathConstants.Message.Bulk,
            element: <div>대량 문자</div>,
          },
          {
            path: PathConstants.Message.Declaration,
            element: <div>방통위 신고</div>,
          },
          {
            path: PathConstants.Message.Reject,
            element: <div>수신 거부</div>,
          },
        ],
      },
      {
        children: [
          {
            path: PathConstants.Customer.Registration,
            element: <div>고객 등록</div>,
          },
        ],
      },
      {
        children: [
          {
            path: PathConstants.System.Solution,
            element: <div>솔루션 및 메뉴 관리</div>,
          },
          {
            path: PathConstants.System.User,
            element: <div>사용자 관리</div>,
          },
          {
            path: PathConstants.System.Member,
            element: <div>구성원 관리</div>,
          },
          {
            path: PathConstants.System.Local,
            element: <div>현장 관리</div>,
          },
          {
            path: PathConstants.System.LocalMember,
            element: <div>현장 별 구성원 관리</div>,
          },
          {
            path: PathConstants.System.Auth,
            element: <div>현장 구성원 권한 관리</div>,
          },
          {
            path: PathConstants.System.NetworkSetup,
            element: <NetworkSetup />,
          },
        ],
      },
    ],
  },
];
