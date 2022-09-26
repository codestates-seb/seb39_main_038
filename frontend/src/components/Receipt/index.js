import React from 'react';
import {
  StickyBody,
  CartListBody,
  Cart,
  CartTab,
  TotalPrice,
  OrderBtn,
} from './styles';
import { ReceiptList } from '../ReceiptList';

function Receipt() {
  return (
    <StickyBody>
      <Cart>
        <CartTab>
          <div>장바구니</div>
          <button type="button">리셋</button>
        </CartTab>
        <CartListBody>
          <ReceiptList />
          <ReceiptList />
          <ReceiptList />
          <ReceiptList />
          <ReceiptList />
          <ReceiptList />
        </CartListBody>
        <TotalPrice>합계: 38,000원</TotalPrice>
      </Cart>

      <OrderBtn>
        <button type="button">바로 주문하기</button>
      </OrderBtn>
    </StickyBody>
  );
}

export { Receipt };
