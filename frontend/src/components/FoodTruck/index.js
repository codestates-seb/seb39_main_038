import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FoodTruckContainer,
  FoodTruckWrapper,
  FoodTruckImage,
  FoodTruckTagBox,
  FoodTruckTag,
  FoodTruckTextInner,
  FoodTruckTitle,
  FoodTruckContentBox,
  FoodTruckText,
  FoodTruckTime,
} from './styles';

function FoodTruck({
  id = null,
  title = '가게이름',
  star = 4.5,
  review = 100,
  answer = 100,
  tag = ['카드환영', '밤샘영업'],
  time = '10분~20분',
}) {
  const navigate = useNavigate();
  const createTag = () => {
    let i = 0;
    return tag.map((item) => {
      i += 1;
      return <FoodTruckTag key={i}>{item}</FoodTruckTag>;
    });
  };

  return (
    <FoodTruckContainer onClick={() => navigate(`/foodlist/${id}`)}>
      <FoodTruckWrapper>
        <FoodTruckImage />
        <FoodTruckTextInner>
          <FoodTruckTitle>{title}</FoodTruckTitle>
          <FoodTruckContentBox>
            <FoodTruckText color="#ffa800">★ {star}</FoodTruckText>
            <FoodTruckText>리뷰 {review}</FoodTruckText>
            <FoodTruckText none>답변 {answer}</FoodTruckText>
          </FoodTruckContentBox>
          <FoodTruckTagBox>{createTag()}</FoodTruckTagBox>
        </FoodTruckTextInner>
        <FoodTruckTime>{time}</FoodTruckTime>
      </FoodTruckWrapper>
    </FoodTruckContainer>
  );
}

export { FoodTruck };
