import React from 'react';
import { FoodListContainer, FoodListWrapper } from './styles';
import { FoodTruck } from '../../../components';

/*
  /store?page={page}&size={size}&type={all}

  data: [
    store_id" : Long,
    "local_id" : Long,
    "store_status" : String,
    "store_name" : String,
    "store_image" : String,
    "store_type" : String,
    "store_waittime" : String,
  ]
*/

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
