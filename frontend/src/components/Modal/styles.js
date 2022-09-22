import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  width: 460px;
  height: 600px;
  background-color: #fdfdfd;
`;

const ModalHeader = styled.div`
  height: 60px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ModalTitle = styled.h1`
  font-size: 18px;
  color: #333333;
`;

const CloseButton = styled.a`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 15px;
  cursor: pointer;
  &::after {
    position: absolute;
    content: ' ';
    height: 24px;
    width: 1px;
    top: 1px;
    left: calc(50% - 1px);
    background-color: #000;
    transform: rotate(45deg);
  }
  &::before {
    position: absolute;
    content: ' ';
    height: 24px;
    width: 1px;
    top: 1px;
    left: calc(50% - 1px);
    background-color: #000;
    transform: rotate(-45deg);
  }
`;

export { ModalContainer, ModalWrapper, ModalHeader, ModalTitle, CloseButton };
