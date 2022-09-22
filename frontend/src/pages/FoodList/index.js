import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { atoms } from '../../store';
import { Banner, LocalNav } from '../../components';
import FoodTrucks from './FoodTrucks';
import FoodDetail from './FoodDetail';

function FoodList() {
  const menuQuery = useRecoilValue(atoms.menuQuery);

  useEffect(() => {
    console.log(menuQuery);
  }, [menuQuery]);

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
