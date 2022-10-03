import React from 'react';
import { FoodListContainer, FoodListWrapper } from './styles';
import { FoodTruck } from '../../../components';
import { useFoodList } from '../../../hooks';

function FoodTrucks() {
  const { data, fetchNextPage } = useFoodList();

  const createFoodTruck = () => {
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const page of data.pages) result.push(...page.data.data);

    return result.map((item) => {
      return <FoodTruck key={item.storeId} id={item} data={item} />;
    });
  };

  return (
    <FoodListContainer>
      <button type="button" onClick={fetchNextPage}>
        클릭
      </button>
      <FoodListWrapper>{createFoodTruck()}</FoodListWrapper>
    </FoodListContainer>
  );
}

export default FoodTrucks;
