import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
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
import { ROUTE } from '../../constants';
import { usePay } from '../../hooks';

function Receipt({ order, request, type }) {
  const orderList = useRecoilValue(atoms.orderList);
  const resetReceipt = useResetRecoilState(atoms.orderList);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { payWithCard, payWithCash } = usePay(orderList[0]?.storeId);

  const totalPrice = () => {
    let sum = 0;
    for (let i = 0; i < orderList.length; i += 1)
      sum += orderList[i].price * orderList[i].count;
    return sum;
  };

  const createReceiptList = () => {
    return orderList.map((item, index) => (
      <ReceiptList
        order={order}
        key={item.name}
        name={item.name}
        price={item.price}
        count={item.count}
        idx={index}
      />
    ));
  };

  const goOrder = () => navigate(`/${ROUTE.ORDER.PATH}`);
  const goPay = () => {
    if (type === 'CARD') payWithCard(request, type);
    else payWithCash(request, type);
    resetReceipt();
    queryClient.invalidateQueries(['orderList']);
    navigate(`/${ROUTE.FOODLIST.PATH}`);
  };

  return (
    <StickyBody>
      <Cart>
        <CartTab>
          <CartTitle>{order ? orderList[0].storeName : '장바구니'}</CartTitle>
          <Button disabled={order} type="button" onClick={resetReceipt}>
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
      {order ? (
        <OrderButton onClick={goPay}>결제하기</OrderButton>
      ) : (
        <OrderButton disabled={!orderList.length} onClick={goOrder}>
          바로 주문하기
        </OrderButton>
      )}
    </StickyBody>
  );
}

export { Receipt };
