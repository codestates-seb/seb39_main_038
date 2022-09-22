import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { Banner, LocalNav } from '../../components';
import FoodTrucks from './FoodTrucks';
import FoodDetail from './FoodDetail';

function FoodList() {
  const location = useLocation();
  console.log('FoodList', location.state?.query);

  return (
    <>
      <Banner />
      <LocalNav />
      <Routes>
        <Route path="/" element={<FoodTrucks />} />
        <Route path="/:id" element={<FoodDetail />} />
      </Routes>
    </>
  );
}

export default React.memo(FoodList);
