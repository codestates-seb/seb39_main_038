import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTE } from './constants';
import Spinner from './components/Spinner';

const GlobalNav = React.lazy(() => import('./components/GlobalNav'));
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const IdInquiry = React.lazy(() => import('./pages/IdInquiry'));
const PwInquiry = React.lazy(() => import('./pages/PwInquiry'));
const FoodList = React.lazy(() => import('./pages/FoodList'));

function App() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <GlobalNav />
      <Routes>
        <Route path={ROUTE.HOME_PATH} element={<Home />} />
        <Route path={ROUTE.LOGIN_PATH} element={<Login />} />
        <Route path={ROUTE.REGISTER_PATH} element={<Register />} />
        <Route path={ROUTE.IDINQUIRY_PATH} element={<IdInquiry />} />
        <Route path={ROUTE.PWINQUIRY_PATH} element={<PwInquiry />} />
        <Route path={ROUTE.FOODLIST_PATH} element={<FoodList />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
