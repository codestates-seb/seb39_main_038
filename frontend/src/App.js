import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTE } from './constants';
import { GlobalNav, Spinner } from './components';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const IdInquiry = React.lazy(() => import('./pages/IdInquiry'));
const PwInquiry = React.lazy(() => import('./pages/PwInquiry'));
const FoodList = React.lazy(() => import('./pages/FoodList'));
const Basket = React.lazy(() => import('./pages/Basket'));
const Order = React.lazy(() => import('./pages/Order'));
const MyPage = React.lazy(() => import('./pages/MyPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const FoodTruckSetting = React.lazy(() => import('./pages/FoodTruckSetting'));
const PwChange = React.lazy(() => import('./pages/PwChange'));

function App() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <GlobalNav />
      <Routes>
        <Route path={ROUTE.HOME.PATH} element={<Home />} />
        <Route path={`${ROUTE.FOODLIST.PATH}/*`} element={<FoodList />} />
        <Route path={ROUTE.LOGIN.PATH} element={<Login />} />
        <Route path={ROUTE.REGISTER.PATH} element={<Register />} />
        <Route path={ROUTE.IDINQUIRY.PATH} element={<IdInquiry />} />
        <Route path={ROUTE.PWINQUIRY.PATH} element={<PwInquiry />} />
        <Route path={ROUTE.BASKET.PATH} element={<Basket />} />
        <Route path={ROUTE.ORDER.PATH} element={<Order />} />
        <Route path={ROUTE.MYPAGE.PATH} element={<MyPage />} />
        <Route path={ROUTE.PWCHANGE.PATH} element={<PwChange />} />
        <Route path={`${ROUTE.MYPAGE.PATH}/*`} element={<FoodTruckSetting />} />
        <Route path={ROUTE.NOTFOUND.PATH} element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
