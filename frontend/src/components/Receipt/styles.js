import styled from 'styled-components';

const StickyBody = styled.div`
  @media ${(e) => e.theme.tablet} {
    width: calc(33% - 20px);
    display: inline-block;
    position: sticky;
    top: 50px;
  }
`;

const CartListBody = styled.div`
  border: 1px solid lightgrey;
`;

const Cart = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    margin-top: 20px;
  }
  @media ${(e) => e.theme.tablet} {
    width: 100%;
    position: relative;
    top: 20px;
  }
`;

const CartTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  background-color: ${(e) => e.theme.mainColor};
  color: ${(e) => e.theme.fontColor};
  padding: 10px 10px 10px 15px;
`;

const CartList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px 15px;
`;

const FoodName = styled.div`
  font-size: 14px;
  padding: 5px 12px 8px;
`;

const CartListAdd = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: end;
  height: 47px;
  align-items: center;
  font-weight: 900;
  background-color: lightyellow;
  border: 1px solid lightgrey;
  margin-top: -1px;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
    padding: 20px;
  }
`;

const OrderBtn = styled.div`
  > button {
    width: 50%;
    background-color: ${(e) => e.theme.mainColor};
    color: ${(e) => e.theme.fontColor};
    height: 65px;
    font-size: 18px;
    font-weight: bold;
  }
  @media screen and (max-width: 767px) {
    bottom: 0px;
    position: fixed;
    width: 100%;
  }
  @media ${(e) => e.theme.tablet} {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    > button {
      width: 100%;
      height: 47px;
      margin: 50px 0px 0px;
    }
  }
`;

export {
  StickyBody,
  CartListBody,
  Cart,
  CartTab,
  CartList,
  FoodName,
  CartListAdd,
  TotalPrice,
  OrderBtn,
};
