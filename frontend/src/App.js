import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { atoms } from './store';
import { ROUTE } from './constants';
import { ErrorBoundary, GlobalNav, Spinner } from './components';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const IdInquiry = React.lazy(() => import('./pages/IdInquiry'));
const PwInquiry = React.lazy(() => import('./pages/PwInquiry'));
const FoodList = React.lazy(() => import('./pages/FoodList'));
const Order = React.lazy(() => import('./pages/Order'));
const MyPage = React.lazy(() => import('./pages/MyPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const FoodTruckSetting = React.lazy(() => import('./pages/FoodTruckSetting'));
const PwChange = React.lazy(() => import('./pages/PwChange'));
const Review = React.lazy(() => import('./pages/Review'));

function App() {
  const { type } = useRecoilValue(atoms.isLogin);
  axios.defaults.headers.common.Login = type;

  return (
    <>
      <GlobalNav />
      <ErrorBoundary>
        <React.Suspense fallback={<Spinner />}>
          <Routes>
            <Route path={ROUTE.HOME.PATH} element={<Home />} />
            <Route path={`${ROUTE.FOODLIST.PATH}/*`} element={<FoodList />} />
            <Route path={`${ROUTE.FOODLIST.PATH}/*`} element={<FoodList />} />
            <Route path={ROUTE.LOGIN.PATH} element={<Login />} />
            <Route path={ROUTE.REGISTER.PATH} element={<Register />} />
            <Route path={ROUTE.IDINQUIRY.PATH} element={<IdInquiry />} />
            <Route path={ROUTE.PWINQUIRY.PATH} element={<PwInquiry />} />
            <Route path={ROUTE.ORDER.PATH} element={<Order />} />
            <Route path={ROUTE.MYPAGE.PATH} element={<MyPage />} />
            <Route path={ROUTE.PWCHANGE.PATH} element={<PwChange />} />
            <Route path={`${ROUTE.MYPAGE.PATH}/*`} />
            <Route
              path={`${ROUTE.MYPAGE.FOODTRUCKSETTING.PATH}`}
              element={<FoodTruckSetting />}
            />
            <Route path={ROUTE.NOTFOUND.PATH} element={<NotFound />} />
            <Route path={ROUTE.REVIEW.PATH} element={<Review />} />
          </Routes>
        </React.Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
