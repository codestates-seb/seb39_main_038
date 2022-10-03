import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
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

  const orderedMenu = () => {
    axios.post('/order', {
      kakao_id: 'id',
      data: [{ menu_id: orderList.id, count: orderList.count }],
    });
  };

  const onSuccess = () => {
    alert('성공');
  };

  const onError = () => {
    alert('실패');
  };

  const onSettled = () => {
    alert('처리종료');
  };

  const { mutate: postMutateOrderedMenu } = useMutation(orderedMenu, {
    onSuccess,
    onError,
    onSettled,
  });
  const singlePrice = orderList.map((res) => {
    return res.price;
  });

  const totalPrice = () => {
    let total = 0;
    for (let i = 0; i < singlePrice.length; i += 1) {
      const price = singlePrice[i];
      total += price;
    }
    return total;
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
          {orderList.map((res) => (
            <ReceiptList
              name={res.name}
              price={res.price}
              key={res.id}
              id={res.id}
              count={res.count}
            />
          ))}
        </CartListBody>
        <TotalPrice>{totalPrice()}</TotalPrice>
      </Cart>

      <OrderBtn>
        <button type="button" onClick={postMutateOrderedMenu}>
          바로 주문하기
        </button>
      </OrderBtn>
    </StickyBody>
  );
}

export { Receipt };
