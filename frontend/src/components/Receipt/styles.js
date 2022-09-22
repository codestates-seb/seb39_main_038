import styled from 'styled-components';

const StickyBody = styled.div`
  @media ${(e) => e.theme.tablet} {
    width: 30%;
    display: inline-block;
    position: sticky;
    top: 50px;
  }
`;

const CartListBody = styled.div`
  background-color: ${(e) => e.theme.mainColor};
`;

const Cart = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(e) => e.theme.mainColor};
  width: 100%;
  height: 200px;
  @media screen and (max-width: 767px) {
    margin-top: 20px;
  }
  @media ${(e) => e.theme.tablet} {
    width: 100%;
    height: 150px;
    position: relative;
    top: 20px;
  }
`;

const CartTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 900;
  margin: 5px;
`;

const CartList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px 5px;
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
  background-color: ${(e) => e.theme.mainColor};
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
    font-size: 20px;
    font-weight: 900;
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
    position: relative;
    top: 120px;
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
  CartListAdd,
  TotalPrice,
  OrderBtn,
};
