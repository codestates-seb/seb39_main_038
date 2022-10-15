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
import { dateFormat } from '../../../utils';

function OrderModal({ closeModal }) {
  const isMadal = useRecoilValue(atoms.modal);
  const orderData = useRecoilValue(atoms.orderData);

  if (!isMadal.order) return null;
  const createModalBox = () => {
    return orderData.orderMenu.map((item) => {
      return (
        <OrderModalBox key={item.menuId}>
          <ModalText>
            {item.name} × {item.count}
          </ModalText>
          <ModalText>{item.price}원</ModalText>
        </OrderModalBox>
      );
    });
  };

  const total = () => {
    let n = 0;
    orderData.orderMenu.forEach((item) => {
      n += item.price * item.count;
    });
    return n;
  };

  return (
    <Modal title="주문상세" width={450} height={450} closeModal={closeModal}>
      <OrderModalBody>
        <OrderModalTitle>{orderData.orderMenu[0].storeName}</OrderModalTitle>
        <OrderMenuBox>
          <ModalText as="h2" size={20}>
            주문내역
          </ModalText>
          {createModalBox()}
        </OrderMenuBox>
        <OrderModalBox>
          <ModalText>주문시간</ModalText>
          <ModalText>
            {dateFormat(new Date(orderData.createdAt), '. ')}
          </ModalText>
        </OrderModalBox>
        <OrderModalBox>
          <ModalText>상품합계</ModalText>
          <ModalText>{total()}원</ModalText>
        </OrderModalBox>
        <OrderModalBox>
          <ModalText color={COLOR.YELLOW}>결제금액</ModalText>
          <ModalText size={24} color={COLOR.YELLOW}>
            {total()}원
          </ModalText>
        </OrderModalBox>
        <OrderModalBox none>
          <ModalText>결제방식</ModalText>
          <ModalText>현금결제</ModalText>
        </OrderModalBox>
      </OrderModalBody>
    </Modal>
  );
}

export { OrderModal };
