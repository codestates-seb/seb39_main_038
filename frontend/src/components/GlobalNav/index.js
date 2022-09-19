import React from 'react';
import { Link } from 'react-router-dom';
import { NavContainer, NavWrapper, NavLogo, LoginButton } from './styles';
import { ROUTE } from '../../constants';

function GlobalNav() {
  return (
    <NavContainer>
      <NavWrapper>
        <Link to={ROUTE.HOME.PATH}>
          <NavLogo />
        </Link>
        <Link to={ROUTE.LOGIN.PATH}>
          <LoginButton>{ROUTE.LOGIN.NAME}</LoginButton>
        </Link>
      </NavWrapper>
    </NavContainer>
  );
}

export default GlobalNav;
