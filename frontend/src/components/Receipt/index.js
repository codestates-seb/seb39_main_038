import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
  StickyBody,
  CartListBody,
  Cart,
  CartTab,
  TotalPrice,
  OrderButton,
  Button,
  CartTitle,
  BlankOrderBox,
} from './styles';
import { ReceiptList } from '../ReceiptList';
import { atoms } from '../../store';

function Receipt() {
  const orderList = useRecoilValue(atoms.orderList);
  const resetReceipt = useResetRecoilState(atoms.orderList);
  const totalPrice = () => {
    let sum = 0;
    for (let i = 0; i < orderList.length; i += 1)
      sum += orderList[i].price * orderList[i].count;
    return sum;
  };

  const createReceiptList = () => {
    return orderList.map((item, index) => (
      <ReceiptList
        key={item.name}
        name={item.name}
        price={item.price}
        count={item.count}
        idx={index}
      />
    ));
  };

  return (
    <StickyBody>
      <Cart>
        <CartTab>
          <CartTitle>장바구니</CartTitle>
          <Button type="button" onClick={resetReceipt}>
            리셋
          </Button>
        </CartTab>
        <CartListBody>
          {orderList.length ? (
            createReceiptList()
          ) : (
            <BlankOrderBox>장바구니에 상품이 없습니다.</BlankOrderBox>
          )}
        </CartListBody>
        <TotalPrice>합계: {totalPrice()}원</TotalPrice>
      </Cart>

      <OrderButton>바로 주문하기 </OrderButton>
    </StickyBody>
  );
}

export { Receipt };
