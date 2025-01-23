import { useContext } from "react";

export const sendMessage = ({
  webSocket,
  message,
}: {
  webSocket: React.MutableRefObject<WebSocket | null>;
  message: any;
}) => {
  if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
    webSocket.current.send(JSON.stringify(message));
    console.log("메시지 전송: ", JSON.stringify(message));
  } else {
    console.log("웹소켓 연결이 열려있지 않습니다.");
  }
};

export const useWebSocket = (
  WebSocketContext: React.Context<WebSocket | null>
) => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a SoketGuard");
  }
  return context;
};
