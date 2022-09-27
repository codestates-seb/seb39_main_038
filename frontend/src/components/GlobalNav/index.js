import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavContainer,
  NavWrapper,
  NavLogo,
  ButtonInner,
  NavButton,
} from './styles';
import { ROUTE, COLOR } from '../../constants';

function GlobalNav() {
  return (
    <NavContainer>
      <NavWrapper>
        <Link to={ROUTE.HOME.PATH}>
          <NavLogo />
        </Link>
        <ButtonInner>
          <Link to={ROUTE.LOGIN.PATH}>
            <NavButton color={COLOR.YELLOW}>{ROUTE.LOGIN.NAME}</NavButton>
          </Link>
          {true ? null : (
            <Link to={ROUTE.BASKET.PATH}>
              <NavButton color={COLOR.WHITE}>{ROUTE.BASKET.NAME}</NavButton>
            </Link>
          )}
        </ButtonInner>
      </NavWrapper>
    </NavContainer>
  );
}

export { GlobalNav };
