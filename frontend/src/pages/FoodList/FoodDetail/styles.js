import styled from 'styled-components';
import { COLOR } from '../../../constants';

const Section = styled.section`
  max-width: 1020px;
  margin: 0 auto;
  font-size: 14px;
  background-color: white;
  padding: 20px 0px;

  @media screen and (max-width: 767px) {
    padding-bottom: 40px;
  }
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 20px;
  }
`;

const MainBody = styled.div`
  @media screen and (min-width: 768px) {
    width: 66.666%;
    z-index: 0;
  }
`;

const FoodTruckName = styled.h1`
  font-size: 16px;
  padding: 10px 15px;
  border: 1px solid lightgrey;
`;

const FoodTruckCapsulizedInfo = styled.div`
  display: flex;
  border: 1px solid lightgrey;
  margin-top: -1px;
  padding: 10px;
`;

const FoodTruckImg = styled.img`
  width: 120px;
  height: 120px;
`;

const CapsulizedInfo = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 15px;
  gap: 10px;
`;

const Notice = styled.div`
  display: flex;
  gap: 10px;
  border: 1px solid lightgrey;
  padding: 10px 15px;
  margin-top: -1px;
  font-size: 16px;
  div {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    ${(props) => (props.menu === 'menu' ? '#16267D' : '1px')};
  padding: 12px 12px;
  color: ${(props) => (props.menu === 'menu' ? '#16267D' : 'black')};
`;

const ReviewTabBtn = styled.button`
  width: 33.3%;
  background-color: white;
  font-size: 15px;
  font-weight: 500;
  margin-left: -3px;
  border: 1px solid lightgrey;
  border-bottom: 5px solid
    ${(props) => (props.menu === 'review' ? '#16267D' : '1px')};
  padding: 12px 12px;
  color: ${(props) => (props.menu === 'review' ? '#16267D' : 'black')};
`;

const InfoTabBtn = styled.button`
  width: 33.3%;
  background-color: white;
  font-size: 15px;
  font-weight: 500;
  margin-left: -3px;
  border: 1px solid lightgrey;
  padding: 12px 12px;
  border-bottom: 5px solid
    ${(props) => (props.menu === 'info' ? '#16267D' : '1px')};
  color: ${(props) => (props.menu === 'info' ? '#16267D' : 'black')};
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px;
`;

const InfoItem = styled.li`
  display: flex;
  gap: 10px;
`;

const Text = styled.span`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size};
`;

const FoodTruckTag = styled.span`
  font-size: 10px;
  border: 1px solid ${COLOR.LIGHTNAVY};
  color: ${COLOR.LIGHTNAVY};
  padding: 1px 4px;
  flex-shrink: 0;
`;

export {
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
  Text,
  InfoItem,
  FoodTruckTag,
};
