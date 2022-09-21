import React from 'react';
import { NavContainer, NavWrapper, NavList, Navitem } from './styles';
import { MENU } from '../../constants';

function LocalNav() {
  const createNavList = () => {
    return MENU.map((item) => (
      <NavList key={item.id}>
        <Navitem>{item.title}</Navitem>
      </NavList>
    ));
  };
  return (
    <NavContainer>
      <NavWrapper>{createNavList()}</NavWrapper>
    </NavContainer>
  );
}

export { LocalNav };
