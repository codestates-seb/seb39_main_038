import styled from 'styled-components';

const StickyBody = styled.div`
  @media screen and (min-width: 768px) {
    width: 33.333%;
  }
`;

const CartListBody = styled.div`
  border: 1px solid lightgrey;
  max-height: 400px;
  overflow: auto;
`;

const Cart = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    padding: 20px 0px;
  }
`;

const CartTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  background-color: #16267d;
  color: #f4b504;
  padding: 10px 10px 10px 15px;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  font-weight: 900;
  background-color: lightyellow;
  border: 1px solid lightgrey;
  margin-top: -1px;
  padding: 10px 12px;
  font-size: 16px;
`;

const OrderBtn = styled.div`
  > button {
    background-color: #16267d;
    color: #f4b504;
    font-size: 14px;
    font-weight: bold;
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    bottom: 0px;
    position: fixed;
    width: 100%;
    > button {
      padding: 10px;
    }
  }
  @media screen and (min-width: 768px) {
    display: flex;
    padding: 35px 0px 0px;
    gap: 15px;
    > button {
      padding: 10px;
    }
  }
`;

export { StickyBody, CartListBody, Cart, CartTab, TotalPrice, OrderBtn };
