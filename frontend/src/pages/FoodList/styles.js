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
  font-size: 14px;
  background-color: white;
  padding: 10px 10px 0px 10px;
  @media screen and (max-width: 767px) {
    padding-bottom: 65px;
  }
`;

const MainBody = styled.div`
  @media ${(e) => e.theme.tablet} {
    width: 66%;
    display: inline-block;
    margin: 0px 20px 0px 0px;
    position: relative;
    top: -170px;
    z-index: 0;
  }
`;

const FoodTruckName = styled.div`
  height: 43px;
  font-size: 15.5px;
  font-weight: 500;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  border: 1px solid lightgrey;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
    height: 56px;
  }
`;

const FoodTruckCapsulizedInfo = styled.div`
  display: flex;
  justify-content: start;
  border: 1px solid lightgrey;
  height: 120px;
  margin-top: -1px;
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
  border: 1px solid lightgrey;
  height: 43px;
  align-items: center;
  padding: 14px 20px 12px 15px;
  margin-top: -1px;
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
