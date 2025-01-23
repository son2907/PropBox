import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
} from "react";
import { sendMessage } from "./soketFn";

export const WebSocketContext = createContext<WebSocket | null>(null);

export default function SoketGuard({ children }: PropsWithChildren) {
  const webSocket = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    webSocket.current = new WebSocket("ws://js-lab.iptime.org:23570");
    webSocket.current.onopen = () => {
      console.log("웹소켓 실행:", "ws://js-lab.iptime.org:23570");

      // 전화 걸기 api
      //   const exampleMessage = {
      //     messageType: "DIAL",
      //     timestampUTC: "2024-11-22 01:55:00.000",
      //     counterpart: "07040342009",
      //   };

      // 웹소켓 연결 후, 서버로 로그인 메세지 전송
      const exampleMessage = {
        messageType: "LOGIN",
        timestampUTC: "",
        loginInfo: {
          userNo: "유저1001",
          sptNo: "현장1",
          deviceSe: "통신1",
          commnCarrier: "LG U+",
          commnID: "209",
          commnPw: "js_labs_209",
          commnHost: "211.233.62.206",
        },
      };
      sendMessage({ webSocket, message: exampleMessage });
    };

    webSocket.current.onclose = (error) => {
      console.log("웹소켓 종료::", error);
    };

    webSocket.current.onerror = (error) => {
      console.log("웹소켓 에러::", error);
    };

    webSocket.current.onmessage = (event: MessageEvent) => {
      console.log("메세지 수신::", event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      webSocket.current?.close();
    };
  }, []);

  console.log("메세지에 저장된 내용:", messages);

  return (
    <WebSocketContext.Provider value={webSocket.current}>
      {children}
    </WebSocketContext.Provider>
  );
}
