import { ModalPropsType, useModalStore } from "../../stores/modalStore";
import { Nullable } from "../../types";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalContainer() {
  // 현재 모달 리스트 및 모달 닫기 메서드
  const { modals, close } = useModalStore();

  // 모달을 렌더링할 DOM 요소
  const [portal, setPortal] = useState<Nullable<Element>>(null);

  // 컴포넌트가 마운트되었을 때 모달을 렌더링할 DOM 요소를 설정
  useEffect(() => {
    setPortal(document.getElementById("modal"));
  }, []);

  const isStackFalse = modals.length === 1 && modals[0].props.stack === false;

  return (
    portal &&
    createPortal(
      <>
        {isStackFalse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 pointer-events-auto" />
        )}
        {/* 외부 클릭 차단 */}
        {modals.map((m) => {
          const { Component, props, key } = m;
          const {
            onSubmit = () => {},
            onClose = () => {},
            ...restProps
          } = props;

          const handleClose = async () => {
            await onClose?.();
            close(key);
          };

          const handleSubmit = async (_props?: ModalPropsType) => {
            await onSubmit?.(_props);
            close(key);
          };

          return (
            <Component
              key={key}
              modalId={props.modalId}
              onSubmit={handleSubmit}
              onClose={handleClose}
              {...restProps}
            />
          );
        })}
      </>,
      portal
    )
  );
}
