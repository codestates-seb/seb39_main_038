import React from 'react';
import { useRecoilValue } from 'recoil';
import { atoms } from '../../../store';
import { Modal, ModalText } from '../Modal';
import { COLOR } from '../../../constants';
import {
  OrderMenuBox,
  OrderModalBody,
  OrderModalBox,
  OrderModalTitle,
} from './styles';

function OrderModal({ closeModal }) {
  const isMadal = useRecoilValue(atoms.modal);
  const orderData = useRecoilValue(atoms.orderData);
  console.log(orderData);

  if (!isMadal.order) return null;
  return (
    <Modal title="주문상세" width={450} height={450} closeModal={closeModal}>
      <OrderModalBody>
        <OrderModalTitle>BBQ-신논현점</OrderModalTitle>
        <OrderMenuBox>
          <ModalText as="h2" size={20}>
            주문내역
          </ModalText>
          <OrderModalBox>
            <ModalText>치즈스틱 × 1</ModalText>
            <ModalText>2,500원</ModalText>
          </OrderModalBox>
        </OrderMenuBox>
        <OrderModalBox>
          <ModalText>주문시간</ModalText>
          <ModalText>2022년 9월 22일</ModalText>
        </OrderModalBox>
        <OrderModalBox>
          <ModalText>상품합계</ModalText>
          <ModalText>6,900원</ModalText>
        </OrderModalBox>
        <OrderModalBox>
          <ModalText color={COLOR.YELLOW}>결제금액</ModalText>
          <ModalText size={24} color={COLOR.YELLOW}>
            6,900원
          </ModalText>
        </OrderModalBox>
        <OrderModalBox none>
          <ModalText>결제방식</ModalText>
          <ModalText>카드결제</ModalText>
        </OrderModalBox>
      </OrderModalBody>
    </Modal>
  );
}

export { OrderModal };
