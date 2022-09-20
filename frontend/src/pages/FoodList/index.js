import React from 'react';
import { useLocation } from 'react-router-dom';
import { Banner } from '../../components/Banner';
import LocalNav from '../../components/LocalNav';
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
