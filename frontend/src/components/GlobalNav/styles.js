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
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Anton', sans-serif;
  color: ${COLOR.YELLOW};
  font-size: 40px;
  letter-spacing: 2px;
  text-decoration: none;

  @media all and (max-width: ${SCREEN.MOBILE}) {
    width: 90px;
    font-size: 30px;
  }
`;

const ButtonInner = styled.div`
  display: flex;
  gap: 0px 10px;
`;

const NavButton = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid ${({ color }) => color};
  background-color: transparent;
  font-size: 18px;
  color: ${({ color }) => color};

  @media all and (max-width: ${SCREEN.MOBILE}) {
    width: 120px;
    font-size: 16px;
  }
`;

export { NavContainer, NavWrapper, NavLogo, ButtonInner, NavButton };
