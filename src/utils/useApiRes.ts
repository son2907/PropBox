import { FailModal } from "../components/Modal/modal/FailModal";
import useModal from "../hooks/useModal";

export const useApiRes = () => {
  const { openModal, closeModal } = useModal();

  return (res) => {
    if (res.data.result === "FAIL" || res.data.result === "ALERT") {
      openModal(FailModal, {
        modalId: "apiFail",
        stack: true,
        onClose: () => closeModal,
        message: res.data.message,
      });
    } else {
      return res;
    }
  };
};
