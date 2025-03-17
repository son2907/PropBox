import { ComponentType } from "react";
import {
  ModalPropsType,
  useModalStoreClose,
  useModalStoreOpen,
} from "../stores/modalStore";

export default function useModal() {
  const open = useModalStoreOpen();
  const close = useModalStoreClose();

  const openModal = <P extends ModalPropsType>(
    Component: ComponentType<P>,
    props?: P & { stack?: boolean }
  ) => {
    open(Component, { ...props, stack: props?.stack ?? true });
  };

  const closeModal = (modalId: string) => {
    close(modalId);
  };

  return { openModal, closeModal };
}
