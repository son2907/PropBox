import { FailModal } from "../components/layout/modal/FailModal";
import useModal from "../hooks/useModal";

export const useApiRes = () => {
  const { openModal, closeModal } = useModal();

  return (res) => {
    if (res.data.result === "FAIL") {
      openModal(FailModal, {
        modalId: "apiFail",
        stack: false,
        onClose: () => closeModal,
        message: res.data.message,
      });
    } else {
      return res;
    }
  };
};
