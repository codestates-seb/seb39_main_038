import styled from 'styled-components';

const FoodListContainer = styled.div`
  max-width: 1020px;
  margin: 0 auto;
`;

const FoodListWrapper = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
  flex-flow: row wrap;
`;

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

export {
  FoodListContainer,
  FoodListWrapper,
  Section,
  MainBody,
  FoodTruckName,
  FoodTruckCapsulizedInfo,
  FoodTruckImg,
  CapsulizedInfo,
  Notice,
};
