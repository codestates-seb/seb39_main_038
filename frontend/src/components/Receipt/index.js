import React from 'react';
import {
  StickyBody,
  CartListBody,
  Cart,
  CartTab,
  CartList,
  FoodName,
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
            <FoodName>햄버거</FoodName>

            <CartListAdd>
              <div>
                <button type="button">x</button>8,000원
              </div>
              <div>
                <button type="button">-</button>
                <span>1</span>
                <button type="button">+</button>
              </div>
            </CartListAdd>
          </CartList>
          <CartList>
            <FoodName>피자</FoodName>

            <CartListAdd>
              <div>
                <button type="button">x</button>18,000원
              </div>
              <div>
                <button type="button">-</button>
                <span>1</span>
                <button type="button">+</button>
              </div>
            </CartListAdd>
          </CartList>
          <CartList>
            <FoodName>치킨</FoodName>

            <CartListAdd>
              <div>
                <button type="button">x</button>12,000원
              </div>
              <div>
                <button type="button">-</button>
                <span>1</span>
                <button type="button">+</button>
              </div>
            </CartListAdd>
          </CartList>
        </CartListBody>
        <TotalPrice>합계: 38,000원</TotalPrice>
      </Cart>

      <OrderBtn>
        <button type="button">주문 취소</button>
        <button type="button">바로 주문하기</button>
      </OrderBtn>
    </StickyBody>
  );
}

export { Receipt };
