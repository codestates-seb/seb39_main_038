import React from 'react';
import { useRecoilValue } from 'recoil';
import { atoms } from '../../store';
import { Modal } from './Modal';
import { COLOR } from '../../constants';
import {
  OrderMenuBox,
  OrderModalBody,
  OrderModalBox,
  OrderModalText,
  OrderModalTitle,
} from './styles';

function OrderModal({ closeModal }) {
  const isMadal = useRecoilValue(atoms.modal);
  if (!isMadal.order) return null;
  return (
    <Modal title="주문상세" width={450} height={450} closeModal={closeModal}>
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
