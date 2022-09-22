import React from 'react';
import {
  StickyBody,
  CartListBody,
  Cart,
  CartTab,
  CartList,
  CartListAdd,
  TotalPrice,
  OrderBtn,
} from './styles';

function Receipt() {
  return (
    <StickyBody>
      <Cart>
        <CartTab>
          <div>장바구니</div>
          <button type="button">리셋</button>
        </CartTab>
        <CartListBody>
          <CartList>
            <div>햄버거</div>

            <CartListAdd>
              <div>8,000원</div>
              <div className="수량버튼">
                <button type="button">-</button>
                <span>1</span>
                <button type="button">+</button>
              </div>
            </CartListAdd>
          </CartList>
          <CartList>
            <div>피자</div>

            <CartListAdd>
              <div>18,000원</div>
              <div className="수량버튼">
                <button type="button">-</button>
                <span>1</span>
                <button type="button">+</button>
              </div>
            </CartListAdd>
          </CartList>
          <CartList>
            <div>치킨</div>

            <CartListAdd>
              <div>12,000원</div>
              <div className="수량버튼">
                <button type="button">-</button>
                <span>1</span>
                <button type="button">+</button>
              </div>
            </CartListAdd>
          </CartList>
        </CartListBody>
        <TotalPrice className="totalPrice">합계: 38,000원</TotalPrice>
      </Cart>

      <OrderBtn>
        <button type="button">주문 취소</button>
        <button type="button">바로 주문하기</button>
      </OrderBtn>
    </StickyBody>
  );
}

export { Receipt };
