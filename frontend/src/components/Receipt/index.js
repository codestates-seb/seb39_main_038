/* global IMP */
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

const { IMP_KEY } = process.env;

IMP.init(IMP_KEY);

function Receipt({ order }) {
  const orderList = useRecoilValue(atoms.orderList);
  const resetReceipt = useResetRecoilState(atoms.orderList);
  const navigate = useNavigate();
  console.log(order);
  console.log(orderList);

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

  const goOrder = () => navigate(`/${ROUTE.ORDER.PATH}`);

  const goPay = () => {
    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: 'ORD20180131-0000012',
        name: '노르웨이 회전 의자',
        amount: 100,
        buyer_email: 'gildong@gmail.com',
        buyer_name: '홍길동',
        buyer_tel: '010-4242-4242',
        buyer_addr: '서울특별시 강남구 신사동',
        buyer_postcode: '01181',
      },
      (rsp) => {
        if (rsp.success) {
          console.log('success');
        } else {
          console.log('error');
        }
      },
    );
  };

  return (
    <StickyBody>
      <Cart>
        <CartTab>
          <CartTitle>{order ? orderList[0].storeName : '장바구니'}</CartTitle>
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
      {order ? (
        <OrderButton onClick={goPay}>결제하기</OrderButton>
      ) : (
        <OrderButton onClick={goOrder}>바로 주문하기 </OrderButton>
      )}
    </StickyBody>
  );
}

export { Receipt };
