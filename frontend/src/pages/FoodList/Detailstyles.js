import styled from 'styled-components';

const Section = styled.section`
  max-width: 1020px;
  margin: 0 auto;
  font-size: 22px;
  color: ${(e) => e.theme.fontColor};
  background-color: white;
  @media screen and (max-width: 767px) {
    font-size: 20px;
    padding-bottom: 65px;
  }
  @media ${(e) => e.theme.tablet} {
    flex-direction: row;
  }
`;

const MainBody = styled.div`
  @media ${(e) => e.theme.tablet} {
    width: 65%;
    display: inline-block;
    margin: 0px 20px 0px 0px;
  }
`;

const FoodTruckName = styled.div`
  background-color: ${(e) => e.theme.mainColor};
  height: 43px;
  font-size: 30px;
  font-weight: 900;
  display: flex;
  justify-content: start;
  align-items: center;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
    height: 56px;
  }
`;

const FoodTruckCapsulizedInfo = styled.div`
  display: flex;
  justify-content: start;
  background-color: ${(e) => e.theme.mainColor};
  margin: 20px 0px 0px;
  height: 120px;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
  }
`;

const FoodTruckImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  > img {
    width: 80px;
    height: 80px;
  }
`;

const CapsulizedInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: start;
`;

const Notice = styled.div`
  display: flex;
  background-color: ${(e) => e.theme.mainColor};
  margin: 10px 0px 0px;
  height: 43px;
  align-items: center;
  padding: 0px 10px 0px;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
  }
`;

const StickyBody = styled.div`
  @media ${(e) => e.theme.tablet} {
    width: 30%;
    display: inline-block;
    position: sticky;
    top: 50px;
  }
`;

const Cart = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(e) => e.theme.mainColor};
  padding: 10px 10px 0px;
  width: 100%;
  height: 200px;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
    height: 220px;
  }
`;

const CartTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 900;
  margin: 0px 0px 10px;
`;

const CartList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px 0px 0px 0px;
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
  @media ${(e) => e.theme.tablet} {
    height: 55px;
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
    > button {
      width: 100%;
      height: 47px;
      margin: 50px 0px 0px;
    }
  }
`;

export {
  Section,
  MainBody,
  FoodTruckName,
  FoodTruckCapsulizedInfo,
  FoodTruckImg,
  CapsulizedInfo,
  Notice,
  StickyBody,
  Cart,
  CartTab,
  CartList,
  CartListAdd,
  TotalPrice,
  OrderBtn,
};
