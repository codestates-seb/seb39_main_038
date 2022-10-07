import React from 'react';
import { useRecoilState } from 'recoil';
import { atoms } from '../../store';
import {
  CartListContainer,
  FoodName,
  CartListWrapper,
  CartListInner,
  Button,
  Text,
} from './styles';

function ReceiptList({ name, price, count, idx, order }) {
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
    <CartListContainer>
      <FoodName>{name}</FoodName>

      <CartListWrapper>
        <CartListInner>
          <Button
            disabled={order}
            type="button"
            color="#ccc"
            onClick={deleteOrderItem}
          >
            ×
          </Button>
          <Text color="#666666">{price}원</Text>
        </CartListInner>

        <CartListInner>
          <Button disabled={order} type="button" onClick={plusCount}>
            ＋
          </Button>
          <Text color="#666666">{count}</Text>
          <Button disabled={order} type="button" onClick={minusCount}>
            －
          </Button>
        </CartListInner>
      </CartListWrapper>
    </CartListContainer>
  );
}

export { ReceiptList };
