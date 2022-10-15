import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
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
  const isLogin = useRecoilValue(atoms.isLogin);
  const orderList = useRecoilValue(atoms.orderList);
  const resetReceipt = useResetRecoilState(atoms.orderList);
  const navigate = useNavigate();
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

  const goOrder = () => {
    if (isLogin.state) return navigate(`/${ROUTE.ORDER.PATH}`);
    alert('로그인을 먼저해주세요.');
    return navigate(`/${ROUTE.LOGIN.PATH}`);
  };

  const goPay = async () => {
    if (type === 'CARD') await payWithCard(request, type);
    else await payWithCash(request, type);
  };

  return (
    <StickyBody>
      <Cart>
        <CartTab>
          <CartTitle>{order ? orderList[0]?.storeName : '장바구니'}</CartTitle>
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
