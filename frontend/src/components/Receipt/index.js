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
  const total = orderList.reduce(
    (acc, curr) => acc.price * acc.count + curr.price * curr.count,
  );

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
            <ReceiptList
              key={res.name}
              name={res.name}
              price={res.price}
              count={res.count}
            />
          ))}
        </CartListBody>
        <TotalPrice>합계: {total}원</TotalPrice>
      </Cart>

      <OrderBtn>
        <button type="button">바로 주문하기</button>
      </OrderBtn>
    </StickyBody>
  );
}

export { Receipt };
