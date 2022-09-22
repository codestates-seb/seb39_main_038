import styled, { css } from 'styled-components';
import { COLOR } from '../../constants';

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
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: #fdfdfd;
  position: relative;
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

const FoodModalBody = styled.div`
  position: absolute;
  top: 60px;
  bottom: 48px;
  overflow-y: auto;
  width: 100%;
  background-color: #efefef;
`;

const FoodModalImage = styled.div`
  background-color: gold;
  height: 220px;
`;

const FoodModalBox = styled.div`
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 15px;
  height: ${({ height }) => height};

  ${({ description }) =>
    description &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;

      span {
        font-size: 12px;
        color: #999;
        padding-top: 5px;
        padding-bottom: 3px;
      }
    `}
`;

const FoodModalTitle = styled.h1`
  font-size: 24px;
`;

const FoodModalText = styled.span`
  font-size: ${({ size }) => (size ? `${size}` : '15px')};
  font-weight: bold;
  color: ${({ color }) => color};
`;

const FoodModalButtonBox = styled.div`
  display: flex;
`;

const FoodModalCountButton = styled.button`
  border: 1px solid #ccc;
  background-color: transparent;
  padding: 4px 8px;
  ${({ count }) =>
    count &&
    css`
      padding: 4px 16px;
    `}
`;

const FoodModalFooter = styled.footer`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const FoodModalFooterButton = styled.button`
  width: ${({ width }) => width};
  height: 48px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  padding: 4px;
  background-color: ${({ color }) => (color ? `${color}` : 'transparent')};
  color: white;
`;

const OrderModalBody = styled.div`
  position: absolute;
  top: 60px;
  bottom: 0px;
  overflow-y: auto;
  width: 100%;
`;

const OrderMenuBox = styled.div`
  padding: 22px 15px;
  border-bottom: 1px solid #f0f0f0;
  div {
    padding: 2px 0px;
    border: none;
  }
  h2 {
    padding-bottom: 15px;
  }
`;

const OrderModalBox = styled.div`
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 15px;
  ${({ none }) =>
    none &&
    css`
      border: none;
    `}
`;

const OrderModalTitle = styled.h1`
  font-size: 24px;
  padding: 25px 15px;
  border-bottom: 1px solid #ccc;
`;

const OrderModalText = styled.span`
  font-size: ${({ size }) => (size ? `${size}` : '15px')};
  font-weight: bold;
  color: ${({ color }) => color};
`;

const EmailBody = styled.div`
  display: flex;
  height: calc(100% - 60px);
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  font-size: 15px;
`;

const EmailInput = styled.input`
  padding: 10px 15px;
`;

const EmailButton = styled.button`
  padding: 10px 15px;
  border: 0;
  color: #fdfdfd;
  background-color: ${COLOR.NAVY};
`;

export {
  ModalContainer,
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  CloseButton,
  FoodModalBody,
  FoodModalBox,
  FoodModalButtonBox,
  FoodModalCountButton,
  FoodModalFooter,
  FoodModalFooterButton,
  FoodModalImage,
  FoodModalText,
  FoodModalTitle,
  OrderMenuBox,
  OrderModalBody,
  OrderModalTitle,
  OrderModalText,
  OrderModalBox,
  EmailBody,
  EmailButton,
  EmailInput,
};
