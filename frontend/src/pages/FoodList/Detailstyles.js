import styled from 'styled-components';

const Section = styled.section`
  font-size: 40px;
  color: ${(e) => e.theme.fontColor};
  background-color: white;
  @media ${(e) => e.theme.mobile} {
    font-size: 20px;
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
`;

const FoodMenu = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(e) => e.theme.mainColor};
  height: 104px;
`;

const Menu = styled.div`
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

export {
  Section,
  FoodTruckName,
  FoodTruckCapsulizedInfo,
  FoodTruckImg,
  CapsulizedInfo,
  Notice,
  FoodMenu,
  Menu,
  MenuImg,
};
