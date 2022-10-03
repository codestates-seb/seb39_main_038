import React from 'react';
import { useRecoilState } from 'recoil';
import { atoms } from '../../store';
import { CartList, FoodName, CartListAdd } from './styles';

function ReceiptList({ name, price, id, count }) {
  const [orderList, setOrderList] = useRecoilState(atoms.orderList);
  const deleteHandler = () => {
    console.log(orderList[id].count);
    setOrderList(orderList.filter((e) => e.id !== id));
  };
  const onKeyPressHandler = () => {
    window.confirm('해당 음식을 제외하겠습니까?');
  };

  return (
    <CartList>
      <div>
        <FoodName>{name}</FoodName>

        <CartListAdd>
          <div>
            <div
              role="button"
              tabIndex="0"
              onKeyPress={onKeyPressHandler}
              onClick={deleteHandler}
            >
              x
            </div>
            <span>{price}</span>
          </div>
          <div>
            <div
              role="button"
              tabIndex="0"
              onKeyPress={onKeyPressHandler}
              onClick={() => {
                if (count === 1) {
                  deleteHandler();
                }
                return count - 1;
              }}
            >
              -
            </div>
            <span>{count}</span>
            <div
              role="button"
              tabIndex="0"
              onKeyPress={onKeyPressHandler}
              onClick={() => {
                // count += 1;
              }}
            >
              +
            </div>
          </div>
        </CartListAdd>
      </div>
    </CartList>
  );
}

export { ReceiptList };
