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
  const total = () => {
    let n = 0;
    for (let i = 0; i < orderList.length; i += 1) {
      const sum = orderList[i].price * orderList[i].count;
      n += sum;
    }
    return n;
  };

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
          {orderList.map((item, index) => (
            <ReceiptList
              key={item.name}
              name={item.name}
              price={item.price}
              count={item.count}
              idx={index}
            />
          ))}
        </CartListBody>
        <TotalPrice>합계: {total()}원</TotalPrice>
      </Cart>

      <OrderBtn>
        <button type="button">바로 주문하기</button>
      </OrderBtn>
    </StickyBody>
  );
}

export { Receipt };
