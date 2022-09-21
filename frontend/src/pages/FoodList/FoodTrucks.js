import React from 'react';
import { FoodListContainer, FoodListWrapper } from './styles';
import { FoodTruck } from '../../components';

function FoodTrucks() {
  const data = [1, 2, 3, 4];
  const createFoodTruck = () => {
    return data.map((item) => <FoodTruck key={item} id={item} />);
  };
  return (
    <FoodListContainer>
      <FoodListWrapper>{createFoodTruck()}</FoodListWrapper>
    </FoodListContainer>
  );
}

export default FoodTrucks;
