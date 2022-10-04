import styled from 'styled-components';

const CartList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  > div {
    padding: 10px 15px;
  }
`;

const FoodName = styled.div`
  font-size: 14px;
  padding: 5px 12px 8px;
`;

const CartListAdd = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    padding: 0px 12px;
    width: 50%;
    display: flex;
    justify-content: space-between;
  }
  > div > div {
    font-size: 14px;
    padding: 6px 12px;
    cursor: pointer;
  }
  > div > span {
    padding: 5px;
  }
`;

export { CartList, FoodName, CartListAdd };
