import styled from 'styled-components';
import { COLOR, SCREEN } from '../../constants';

const NavContainer = styled.nav`
  background-color: ${COLOR.NAVY};
`;

const NavWrapper = styled.div`
  min-width: 320px;
  max-width: 1020px;
  margin: 0 auto;
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogo = styled.h1`
  width: 120px;
  height: 38px;
  background-color: red;

  @media all and (max-width: ${SCREEN.MOBILE}) {
    width: 90px;
  }
`;

const LoginButton = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid #fae57c;
  background-color: transparent;
  font-size: 18px;
  color: ${COLOR.YELLOW};

  @media all and (max-width: ${SCREEN.MOBILE}) {
    width: 120px;
    font-size: 16px;
  }
`;

export { NavContainer, NavWrapper, NavLogo, LoginButton };
