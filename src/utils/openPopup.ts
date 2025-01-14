import { usePopupStore } from "../stores/popupStore";

type PopupType = {
  url: string;
  windowName: string;
  windowFeatures?: string;
};

export const openPopup = ({
  url,
  windowName,
  windowFeatures = "width=600,height=500,scrollbars=yes,resizable=yes",
}: PopupType) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const popupWidth = 600;
  const popupHeight = 400;

  const left = (screenWidth - popupWidth) / 2;
  const top = (screenHeight - popupHeight) / 2;

  const popupFeatures = `${windowFeatures},left=${left},top=${top}`;
  const newWindow = window.open(url, windowName, popupFeatures);

  if (
    !newWindow ||
    newWindow.closed ||
    typeof newWindow.closed === "undefined"
  ) {
    alert("팝업이 차단되었습니다. 팝업 차단 설정을 확인해주세요.");
    return;
  }

  // 팝업을 Store에 추가
  const { addPopup, removePopup } = usePopupStore.getState();
  addPopup(newWindow);

  // 팝업이 닫힐 때 Store에서 제거
  newWindow.onbeforeunload = () => {
    removePopup(newWindow);
  };
  return newWindow;
};
