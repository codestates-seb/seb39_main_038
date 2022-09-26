import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { atoms } from '../../store';
import { Banner, LocalNav } from '../../components';
import { ROUTE } from '../../constants';
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
        <Route path={ROUTE.FOODLIST.FOODTRUCKS.PATH} element={<FoodTrucks />} />
        <Route path={ROUTE.FOODLIST.FOODDETAIL.PATH} element={<FoodDetail />} />
      </Routes>
    </>
  );
}

export default React.memo(FoodList);
