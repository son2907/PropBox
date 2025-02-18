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
import { useAuthStore } from "../../stores/authStore";
import useModal from "../../hooks/useModal";
import { DisconnectedModal } from "./modal/DisconnectedModal";
import { useFindCustom, useSocketApi } from "../../api/soketApi";
import { useTelStore } from "../../stores/telStore";
import { useApiRes } from "../../utils/useApiRes";
import { FindToastCustomResponseType } from "../../types/socketApi";
import { AxiosResponse } from "axios";

export const WebSocketContext = createContext<WebSocket | null>(null);

export const SocketLoginInfoContext = createContext<{
  loginInfo: any | null;
  setLoginInfo: React.Dispatch<React.SetStateAction<any | null>>;
}>({
  loginInfo: null,
  setLoginInfo: () => {},
});

export default function SoketGuard({ children }: PropsWithChildren) {
  const webSocket = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [callNumber, setCallNumber] = useState<string>("");

  const { openToast, toastOpen, toastClose } = useToast();
  const { openModal, closeModal } = useModal();

  const [loginInfo, setLoginInfo] = useState<any | null>(null);

  const [toastContent, setToastContent] = useState({
    name: "",
    telNo: "",
    info: "",
  });

  const { setCnsltInfo } = useCnsltStore();
  const navigate = useNavigate();

  const { accessToken, userNo } = useAuthStore(["accessToken", "userNo"]);
  const { telId } = useTelStore();
  const checkApiFail = useApiRes();

  const { data } = useSocketApi({
    userNo: userNo,
    telId: telId,
  });

  const { data: customerData, refetch: refetchCustomer } = useFindCustom({
    telno: callNumber,
  });

  useEffect(() => {
    const info = data?.data.contents;
    if (!info) {
      console.log("인포 없음:", info);
      return;
    }
    if (!accessToken) return;
    if (data?.data.code !== 200) {
      checkApiFail(data);
      return;
    }

    webSocket.current = new WebSocket("ws://js-lab.iptime.org:23570");
    webSocket.current.onopen = () => {
      console.log("웹소켓 실행:", "ws://js-lab.iptime.org:23570");

      // 웹소켓 연결 후, 서버로 로그인 메세지 전송

      const exampleMessage = {
        messageType: "LOGIN",
        timestampUTC: "",
        loginInfo: {
          userNo: info.userNo,
          sptNo: info.sptNo,
          deviceSe: info.deviceSe,
          commnCarrier: info.commCarrier,
          commnID: info.commnId,
          commnPw: info.commnPw,
          commnHost: info.commnHost,
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
      console.log("########메세지 수신::", event.data);

      const messageType = JSON.parse(event.data).messageType;

      if (messageType == "HEARTBEAT") {
        const responseData = {
          messageType: "HEARTBEAT",
        };

        sendMessage({ webSocket, message: responseData });
        return;
      }

      if (messageType == "DISCONNECTED") {
        setMessages((prev) => [...prev, event.data]);
        openModal(DisconnectedModal, {
          modalId: "disconnected",
          stack: false, // 단일 모달 모드 = false,
          onClose: () => closeModal,
        });
        return;
      }
      if (messageType == "RINGING") {
        setCallNumber(JSON.parse(event.data).counterpart);
        refetchCustomer().then((result) => {
          console.log("result:", result.data?.data.contents);
          if (result.data) {
            const axiosData =
              result.data as AxiosResponse<FindToastCustomResponseType>;
            setToastContent({
              name: axiosData.data.contents.cstmrNm || "",
              telNo: JSON.parse(event.data).counterpart,
              info: axiosData.data.contents.cstmrRmk || "",
            });
          }
          toastOpen();
        });
      }
      // MISSED와 ANSWERED의 동작은 같지만, 추후 유지보수를 위해 따로 작성
      if (messageType === "MISSED") {
        setToastContent({ name: "", telNo: "", info: "" });
        setCnsltInfo({
          socketInfo: { ...customerData?.data.contents },
          cstmrNo: customerData?.data.contents.cstmrNo || "",
          fromSocket: true,
          socketCallYn: "N",
          socketTrsmYn: "N",
        });
        toastClose();
        navigate(PathConstants.Call.Consultation);
      }

      if (messageType === "ANSWERED") {
        setToastContent({ name: "", telNo: "", info: "" });
        setCnsltInfo({
          socketInfo: { ...customerData?.data.contents },
          cstmrNo: customerData?.data.contents.cstmrNo || "",
          fromSocket: true,
          socketCallYn: "N",
          socketTrsmYn: "Y",
        });
        toastClose();
        navigate(PathConstants.Call.Consultation);
      }

      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      webSocket.current?.close();
    };
  }, [accessToken, data, customerData]);

  useEffect(() => {
    useTelStore.persist.rehydrate();
  }, []);

  console.log("웹소켓 응답 리스트:", messages);

  const onClickToast = (e?) => {
    setCnsltInfo({
      socketInfo: { ...customerData?.data.contents },
      cstmrNo: customerData?.data.contents.cstmrNo || "",
      fromSocket: true,
    });

    toastClose();
    navigate(PathConstants.Call.Consultation);
    if (e) {
      e.preventDefault(); // 기본 동작을 막음
      e.stopPropagation(); // 이벤트 버블링을 막음
    }
  };

  return (
    <WebSocketContext.Provider value={webSocket.current}>
      <SocketLoginInfoContext.Provider value={{ loginInfo, setLoginInfo }}>
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
            <Toast.InfoContent>{toastContent.info}</Toast.InfoContent>
          </Toast.Row>
        </Toast>
        {children}
      </SocketLoginInfoContext.Provider>
    </WebSocketContext.Provider>
  );
}
