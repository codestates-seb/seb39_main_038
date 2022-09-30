import React from 'react';
import axios from 'axios';
// import { useRecoilValue } from 'recoil';
// import { selectors } from '../../store/atoms';
import {
  StickyBody,
  CartListBody,
  Cart,
  CartTab,
  TotalPrice,
  OrderBtn,
} from './styles';
// import { ReceiptList } from '../ReceiptList';

function Receipt() {
  // const menu = useRecoilValue(selectors.getCart);

  const session = () => {
    const orderMenus = [
      { menuId: 1, count: 2, price: 24000 },
      { totalPrice: 24000 },
    ];

    axios
      .post(
        'ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com/order',
        window.sessionStorage.getItem(orderMenus),
      )
      .then(() => {
        alert('success');
      })
      .catch((res) => {
        alert(res);
      });
  };

  const onClickHandlerOrder = () => {
    session();
  };
  return (
    <StickyBody>
      <Cart>
        <CartTab>
          <div>장바구니</div>
          <button type="button">리셋</button>
        </CartTab>
        <CartListBody>
          {/* {menu.map((res) => (
            <ReceiptList name={res.name} price={res.price} />
          ))} */}
        </CartListBody>
        <TotalPrice>합계: 38,000원</TotalPrice>
      </Cart>

      <OrderBtn>
        <button type="button" onClick={onClickHandlerOrder}>
          바로 주문하기
        </button>
      </OrderBtn>
    </StickyBody>
  );
}

export { Receipt };
