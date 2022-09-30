import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FoodListContainer, FoodListWrapper } from './styles';
import { FoodTruck } from '../../../components';
import { API_URI } from '../../../constants';

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

const fetchFoodList = async () => {
  const response = await axios.get(API_URI.FOODLIST + 1);
  return response;
};

function FoodTrucks() {
  const { data, isError, error } = useQuery(['foodlist'], fetchFoodList);

  if (isError) return <div>{error.message}</div>;

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
