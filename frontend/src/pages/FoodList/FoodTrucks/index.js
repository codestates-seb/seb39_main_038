import React from 'react';
import { FoodListContainer, FoodListWrapper } from './styles';
import { FoodTruck } from '../../../components';
import { useFoodList } from '../../../hooks';

function FoodTrucks() {
  const { data } = useFoodList();

  const createFoodTruck = () => {
    return data?.data.map((item) => {
      return <FoodTruck key={item.storeId} id={item} data={item} />;
    });
  };

  return (
    <FoodListContainer>
      <FoodListWrapper>{createFoodTruck()}</FoodListWrapper>
    </FoodListContainer>
  );
}

export default FoodTrucks;
