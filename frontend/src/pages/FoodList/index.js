import React from 'react';
import { useLocation } from 'react-router-dom';
import { Banner, LocalNav } from '../../components';
import FoodDetail from './FoodDetail';

function FoodList() {
  const location = useLocation();
  console.log(location.state.query);

  return (
    <div>
      <Banner />
      <LocalNav />
      <FoodDetail />
    </div>
  );
}

export default FoodList;
