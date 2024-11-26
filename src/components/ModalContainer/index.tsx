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

  return (
    portal &&
    createPortal(
      modals.map((m) => {
        // Zustand의 `modals` 배열을 순회하며 각각의 모달 데이터를 처리한다.
        const { Component, props, key } = m;
        // `Component`는 렌더링할 모달 컴포넌트,
        // `props`는 해당 모달에 전달할 프로퍼티,
        // `key`는 모달 고유 식별자

        const { onSubmit = () => {}, onClose = () => {}, ...restProps } = props;
        // `props`에서 `onSubmit`과 `onClose`를 분리하고 기본값으로 빈 함수 설정
        // 나머지 프로퍼티는 `restProps`로 그룹화

        const handleClose = async () => {
          // `onClose` 함수 실행 후, 모달을 닫는 함수.
          await onClose?.();
          // `onClose` 콜백을 실행 (비동기 처리 지원).
          close(key);
          // Zustand의 `close` 메서드를 호출해 해당 모달을 닫는다
        };

        const handleSubmit = async (_props?: ModalPropsType) => {
          // `onSubmit` 함수 실행 후, 모달을 닫는 함수.
          await onSubmit?.(_props);
          // `onSubmit` 콜백을 실행하며 필요한 경우 추가 데이터를 전달.
          close(key);
          // onSubmit이 실행된 이후 모달을 닫음
        };

        console.log("keys:", props);
        // 디버깅용 로그: 모달 프로퍼티 확인.

        return (
          <Component
            key={key}
            // React에서 고유한 키를 설정해 효율적인 렌더링을 보장.
            modalId={props.modalId}
            // `modalId`를 모달 컴포넌트에 전달.
            onSubmit={handleSubmit}
            // `handleSubmit`을 모달의 `onSubmit` 핸들러로 전달.
            onClose={handleClose}
            // `handleClose`를 모달의 `onClose` 핸들러로 전달.
            {...restProps}
            // 나머지 프로퍼티를 모달 컴포넌트에 전달.
          />
        );
      }),
      portal
      // `portal` DOM 요소에 렌더링.
    )
  );
}
