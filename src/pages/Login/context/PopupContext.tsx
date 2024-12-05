import { createContext, useContext, useRef } from "react";

const PopupContext = createContext<{ closePopup: () => boolean }>({
  closePopup: () => false,
});

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const popupRef = useRef(false);

  const closePopup = () => {
    if (!popupRef.current) {
      popupRef.current = true;
      return true; // 한 번만 true 반환
    }
    return false; // 이미 열렸다면 false 반환
  };

  return (
    <PopupContext.Provider value={{ closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
