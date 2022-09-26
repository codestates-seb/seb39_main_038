import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  ModalContainer,
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalText,
} from './styles';

function Modal({ title = '제목', closeModal, children, width, height }) {
  const modalRef = useRef(null);

  const overlayEvent = useCallback(
    (e) => {
      if (!modalRef.current || modalRef.current.contains(e.target)) return;
      closeModal();
    },
    [closeModal],
  );

  useEffect(() => {
    window.addEventListener('mousedown', overlayEvent);
    const $body = document.querySelector('body');
    $body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('mousedown', overlayEvent);
      $body.style.overflow = 'auto';
    };
  }, [overlayEvent]);

  return createPortal(
    <ModalContainer>
      <ModalWrapper ref={modalRef} width={width} height={height}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={closeModal} />
        </ModalHeader>
        {children}
      </ModalWrapper>
    </ModalContainer>,
    document.getElementById('modal'),
  );
}

export { Modal, ModalText };
