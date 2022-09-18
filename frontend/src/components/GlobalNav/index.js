import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../constants';

function GlobalNav() {
  return (
    <div>
      <Link to={ROUTE.HOME_PATH}>
        <button type="button">Home</button>
      </Link>
      <Link to={ROUTE.LOGIN_PATH}>
        <button type="button">Login</button>
      </Link>
      <Link to={ROUTE.REGISTER_PATH}>
        <button type="button">Register</button>
      </Link>
      <Link to={ROUTE.IDINQUIRY_PATH}>
        <button type="button">IdInquiry</button>
      </Link>
      <Link to={ROUTE.PWINQUIRY_PATH}>
        <button type="button">PwInquiry</button>
      </Link>
      <Link to={ROUTE.LOGIN_PATH}>
        <button type="button">FoodList</button>
      </Link>
    </div>
  );
}

export default GlobalNav;
