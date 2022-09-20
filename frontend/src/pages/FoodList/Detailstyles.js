import styled from 'styled-components';

const Section = styled.section`
  font-size: 25px;
  color: ${(e) => e.theme.fontColor};
  background-color: white;
  @media ${(e) => e.theme.mobile} {
    font-size: 20px;
    padding-bottom: 65px;
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
  padding: 0px 10px 0px;
`;

const FoodTruckCapsulizedInfo = styled.div`
  display: flex;
  justify-content: start;
  background-color: ${(e) => e.theme.mainColor};
  margin: 20px 0px 0px;
  height: 120px;
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
`;

const FoodMenu = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  background-color: lightgrey;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(e) => e.theme.mainColor};
  height: 104px;
  padding: 10px 10px 0px;
`;

const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const MenuImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  > img {
    width: 80px;
    height: 80px;
  }
`;

const Cart = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(e) => e.theme.mainColor};
  padding: 10px 10px 0px;
  width: 100%;
  height: 200px;
`;

const CartTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 900;
`;

const CartList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px 0px 0px;
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
`;

const OrderBtn = styled.div`
  bottom: 0px;
  position: fixed;
  width: 100%;
  > button {
    width: 50%;
    background-color: ${(e) => e.theme.mainColor};
    color: ${(e) => e.theme.fontColor};
    height: 65px;
    font-size: 20px;
    font-weight: 900;
  }
`;

export {
  Section,
  FoodTruckName,
  FoodTruckCapsulizedInfo,
  FoodTruckImg,
  CapsulizedInfo,
  Notice,
  FoodMenu,
  Menu,
  MenuInfo,
  MenuImg,
  Cart,
  CartTab,
  CartList,
  CartListAdd,
  TotalPrice,
  OrderBtn,
};
