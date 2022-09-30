import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../constants';
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
  data: { storeId, storeName, storeTag, storeWaittime, storeImage },
}) {
  const navigate = useNavigate();
  const handleOnClick = () => navigate(`/${ROUTE.FOODLIST.PATH}/${storeId}`);

  return (
    <FoodTruckContainer onClick={handleOnClick}>
      <FoodTruckWrapper>
        <FoodTruckImage src={storeImage} />
        <FoodTruckTextInner>
          <FoodTruckTitle>{storeName}</FoodTruckTitle>
          <FoodTruckContentBox>
            <FoodTruckText color="#ffa800">★ {5}</FoodTruckText>
            <FoodTruckText>리뷰 {100}</FoodTruckText>
            <FoodTruckText none>답변 {100}</FoodTruckText>
          </FoodTruckContentBox>
          <FoodTruckTagBox>
            <FoodTruckTag>{storeTag}</FoodTruckTag>
          </FoodTruckTagBox>
        </FoodTruckTextInner>
        <FoodTruckTime>{storeWaittime}</FoodTruckTime>
      </FoodTruckWrapper>
    </FoodTruckContainer>
  );
}

export { FoodTruck };
