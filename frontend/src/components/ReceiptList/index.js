import React from 'react';
import { useRecoilState } from 'recoil';
import { atoms } from '../../store';
import { CartList, FoodName, CartListAdd } from './styles';

function ReceiptList({ name, price, count, idx }) {
  const [orderList, setOrderList] = useRecoilState(atoms.orderList);

  const deleteOrderItem = () => {
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const value of orderList) result.push({ ...value });
    result.splice(idx, 1);
    setOrderList(result);
  };

  const plusCount = () => {
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const value of orderList) result.push({ ...value });
    result[idx].count += 1;
    setOrderList(result);
  };

  const minusCount = () => {
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const value of orderList) result.push({ ...value });
    if (result[idx].count === 1) return;
    result[idx].count -= 1;
    setOrderList(result);
  };

  return (
    <CartList>
      <div>
        <FoodName>{name}</FoodName>

        <CartListAdd>
          <div>
            <button type="button" onClick={deleteOrderItem}>
              x
            </button>
            <span>{price}</span>
          </div>
          <div>
            <button type="button" onClick={plusCount}>
              +
            </button>
            <span>{count}</span>
            <button type="button" onClick={minusCount}>
              -
            </button>
          </div>
        </CartListAdd>
      </div>
    </CartList>
  );
}

export { ReceiptList };
