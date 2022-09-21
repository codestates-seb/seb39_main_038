import React from 'react';
import { useLocation } from 'react-router-dom';
import { Banner, LocalNav, FoodTruck } from '../../components';
import { FoodListContainer, FoodListWrapper } from './styles';

function FoodList() {
  const location = useLocation();
  console.log(location.state.query);

  return (
    <div>
      <Banner />
      <LocalNav />
      <FoodListContainer>
        <FoodListWrapper>
          <FoodTruck />
          <FoodTruck />
          <FoodTruck />
          <FoodTruck />
        </FoodListWrapper>
      </FoodListContainer>
    </div>
  );
}

export default FoodList;
