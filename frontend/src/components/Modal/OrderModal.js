import React from 'react';
import styled, { css } from 'styled-components';
import { Modal } from './Modal';
import { COLOR } from '../../constants';

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

function OrderModal() {
  return (
    <Modal title="주문상세" width={450} height={450}>
      <OrderModalBody>
        <OrderModalTitle>BBQ-신논현점</OrderModalTitle>
        <OrderMenuBox>
          <OrderModalText as="h2" size={20}>
            주문내역
          </OrderModalText>
          <OrderModalBox>
            <OrderModalText>치즈스틱 × 1</OrderModalText>
            <OrderModalText>2,500원</OrderModalText>
          </OrderModalBox>
        </OrderMenuBox>
        <OrderModalBox>
          <OrderModalText>주문시간</OrderModalText>
          <OrderModalText>2022년 9월 22일</OrderModalText>
        </OrderModalBox>
        <OrderModalBox>
          <OrderModalText>상품합계</OrderModalText>
          <OrderModalText>6,900원</OrderModalText>
        </OrderModalBox>
        <OrderModalBox>
          <OrderModalText color={COLOR.YELLOW}>결제금액</OrderModalText>
          <OrderModalText size={24} color={COLOR.YELLOW}>
            6,900원
          </OrderModalText>
        </OrderModalBox>
        <OrderModalBox none>
          <OrderModalText>결제방식</OrderModalText>
          <OrderModalText>카드결제</OrderModalText>
        </OrderModalBox>
      </OrderModalBody>
    </Modal>
  );
}

export { OrderModal };
