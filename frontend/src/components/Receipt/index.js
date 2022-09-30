import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
  StickyBody,
  CartListBody,
  Cart,
  CartTab,
  TotalPrice,
  OrderBtn,
} from './styles';
import { ReceiptList } from '../ReceiptList';
import { atoms } from '../../store';

function Receipt() {
  const orderList = useRecoilValue(atoms.orderList);
  const resetReceipt = useResetRecoilState(atoms.orderList);

  return (
    <StickyBody>
      <Cart>
        <CartTab>
          <div>장바구니</div>
          <button type="button" onClick={resetReceipt}>
            리셋
          </button>
        </CartTab>
        <CartListBody>
          {orderList.map((res) => (
            <ReceiptList name={res.name} price={res.price} key={res.id} />
          ))}
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
