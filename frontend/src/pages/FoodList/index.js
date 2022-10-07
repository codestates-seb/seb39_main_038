import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Banner, LocalNav, Spinner, ErrorBoundary } from '../../components';
import { ROUTE, COLOR } from '../../constants';
import FoodTrucks from './FoodTrucks';
import FoodDetail from './FoodDetail';

function FoodList() {
  return (
    <>
      <Banner />
      <LocalNav />
      <ErrorBoundary>
        <React.Suspense fallback={<Spinner color={COLOR.NAVY} size={50} />}>
          <Routes>
            <Route
              path={ROUTE.FOODLIST.FOODTRUCKS.PATH}
              element={<FoodTrucks />}
            />
            <Route
              path={ROUTE.FOODLIST.FOODDETAIL.PATH}
              element={<FoodDetail />}
            />
          </Routes>
        </React.Suspense>
      </ErrorBoundary>
    </>
  );
}

export default React.memo(FoodList);
