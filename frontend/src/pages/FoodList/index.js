import React from 'react';
import { useLocation } from 'react-router-dom';
import FoodDetail from './FoodDetail';

function FoodList() {
  const location = useLocation();
  console.log(location.state.query);

  return (
    <div>
      FoodList <FoodDetail />
    </div>
  );
}

export default FoodList;
