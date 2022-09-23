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
    padding-bottom: 40px;
  }
  @media ${(e) => e.theme.tablet} {
    gap: 20px;
    display: flex;
  }
`;

const MainBody = styled.div`
  @media ${(e) => e.theme.tablet} {
    width: 66.666%;
    z-index: 0;
  }
`;

const FoodTruckName = styled.div`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  border: 1px solid lightgrey;
  > div {
    padding-top: 3px 0px 0px;
  }
`;

const FoodTruckCapsulizedInfo = styled.div`
  display: flex;
  justify-content: start;
  border: 1px solid lightgrey;
  margin-top: -1px;
  @media ${(e) => e.theme.tablet} {
  }
`;

const FoodTruckImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  > img {
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
  align-items: center;
  padding: 14px 20px 12px 15px;
  margin-top: -1px;
  @media ${(e) => e.theme.tablet} {
    width: 100%;
  }
`;

const MenuBar = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const MenuTabBtn = styled.button`
  width: 33.3%;
  background-color: white;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid lightgrey;
  border-bottom: 5px solid
    ${(props) => (props.menu === '메뉴' ? '#16267D' : '1px')};
  color: ${(props) => (props.menu === '메뉴' ? '#16267D' : 'black')};
`;

const ReviewTabBtn = styled.button`
  width: 33.3%;
  background-color: white;
  font-size: 15px;
  font-weight: 500;
  margin-left: -3px;
  border: 1px solid lightgrey;
  border-bottom: 5px solid
    ${(props) => (props.menu === '리뷰' ? '#16267D' : '1px')};
  color: ${(props) => (props.menu === '리뷰' ? '#16267D' : 'black')};
`;

const InfoTabBtn = styled.button`
  width: 33.3%;
  background-color: white;
  font-size: 15px;
  font-weight: 500;
  margin-left: -3px;
  border: 1px solid lightgrey;
  border-bottom: 5px solid
    ${(props) => (props.menu === '정보' ? '#16267D' : '1px')};
  color: ${(props) => (props.menu === '정보' ? '#16267D' : 'black')};
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px;
  @media ${(e) => e.theme.tablet} {
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
  MenuBar,
  ReviewTabBtn,
  InfoTabBtn,
  MenuTabBtn,
  MenuSection,
};
