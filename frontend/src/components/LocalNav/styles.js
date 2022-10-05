import styled from 'styled-components';

const { BAR_URI } = process.env;

const NavContainer = styled.nav`
  box-shadow: 2px 2px 3px 0px rgb(0 0 0 / 25%);
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 1;
`;

const NavWrapper = styled.ul`
  max-width: 1020px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const NavList = styled.li`
  padding: 22px 0px;
  flex: 1;
  text-align: center;
  cursor: pointer;
  background: url(${BAR_URI}) no-repeat -999px 20px;
  &:first-child {
    background: ${({ active }) => (active ? 'gold' : null)} none;
  }
  &:hover {
    background-color: gold;
  }
  background-color: ${({ active }) => (active ? 'gold' : null)};
`;

const Navitem = styled.span`
  font-size: 14px;
`;

export { NavContainer, NavWrapper, NavList, Navitem };
