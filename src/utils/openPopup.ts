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
  // 화면의 크기
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // 팝업의 크기
  const popupWidth = 600;
  const popupHeight = 400;

  // 팝업 창의 중앙 위치
  const left = (screenWidth - popupWidth) / 2;
  const top = (screenHeight - popupHeight) / 2;

  // 중앙에서 열기 위해 Features 설정
  const popupFeatures = `${windowFeatures},left=${left},top=${top}`;

  const newWindow = window.open(url, windowName, popupFeatures);

  // 팝업이 차단되었거나 새 창이 열리지 않을 시 alert
  if (
    !newWindow ||
    newWindow.closed ||
    typeof newWindow.closed === "undefined"
  ) {
    alert("팝업이 차단되었습니다. 팝업 차단 설정을 확인해주세요.");
    return;
  }

  // newWindow가 null이 아닌지 확인하고, 로드된 후에 제목을 설정
  newWindow.onload = () => {
    if (newWindow && newWindow.document) {
      newWindow.document.title = windowName;
    }
  };
};
