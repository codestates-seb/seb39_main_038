import React from 'react';
import { CartList, FoodName, CartListAdd } from './styles';

function ReceiptList() {
  return (
    <CartList>
      <div>
        <FoodName>치킨</FoodName>

        <CartListAdd>
          <div>
            <div type="button">x</div>
            <span>12,000원</span>
          </div>
          <div>
            <div type="button">-</div>
            <span>1</span>
            <div type="button">+</div>
          </div>
        </CartListAdd>
      </div>
    </CartList>
  );
}

export { ReceiptList };
