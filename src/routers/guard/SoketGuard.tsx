import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
} from "react";
import { sendMessage } from "./soketFn";
import useToast from "../../hooks/useToast";
import Toast from "../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import PathConstants from "../path";
import { useCnsltStore } from "../../stores/CunsltStore";

export const WebSocketContext = createContext<WebSocket | null>(null);

export default function SoketGuard({ children }: PropsWithChildren) {
  const webSocket = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const { openToast, toastOpen, toastClose } = useToast();
  const [toastContent, setToastContent] = useState({
    name: "",
    telNo: "",
    info: "",
  });
  const { setCnsltInfo } = useCnsltStore();
  const navigate = useNavigate();

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
      const messageType = JSON.parse(event.data).messageType;

      // 추후 고객 이름과 고객 정보도 등록해줘야 함
      if (messageType == "RINGING") {
        setToastContent({
          name: "이름",
          telNo: JSON.parse(event.data).counterpart,
          info: "고객정보",
        });

        toastOpen();

        setCnsltInfo({
          cstmrNm: "홍길동",
          cnsltTelno: JSON.parse(event.data).counterpart,
        });
      }
      if (messageType == "MISSED") {
        setToastContent({ name: "", telNo: "", info: "" });
        // clear();
        toastClose();
      }

      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      webSocket.current?.close();
    };
  }, []);

  console.log("메세지에 저장된 내용:", messages);

  const onClickToast = (e) => {
    // 다른페이지 이동 후 해당 정보가 clear() 되었을 때를 대비하여 set
    setCnsltInfo({
      cstmrNm: toastContent.name,
      cnsltTelno: toastContent.telNo,
    });
    navigate(PathConstants.Call.Consultation);
    e.preventDefault(); // 기본 동작을 막음
    e.stopPropagation(); // 이벤트 버블링을 막음
  };

  return (
    <WebSocketContext.Provider value={webSocket.current}>
      <div className="MuiBox-root css-1h1gi3g">
        <Toast
          open={openToast}
          vertical={"bottom"}
          horizontal={"right"}
          toastClose={toastClose}
          onClick={onClickToast}
        >
          <Toast.Row>
            <Toast.InfoHeader>고객명</Toast.InfoHeader>
            <Toast.InfoContent>{toastContent.name}</Toast.InfoContent>
          </Toast.Row>
          <Toast.Row>
            <Toast.InfoHeader>전화번호</Toast.InfoHeader>
            <Toast.InfoContent>{toastContent.telNo}</Toast.InfoContent>
          </Toast.Row>
          <Toast.Row>
            <Toast.InfoHeader>고객정보</Toast.InfoHeader>
            <Toast.InfoContent>
              {toastContent.info}
              홍길동님의 정보입니다.홍길동님의 정보입니다. 홍길동님의
              정보입니다. 홍길동님의 정보입니다. 홍길동님의 정보입니다.
            </Toast.InfoContent>
          </Toast.Row>
        </Toast>
        {children}
      </div>
    </WebSocketContext.Provider>
  );
}
