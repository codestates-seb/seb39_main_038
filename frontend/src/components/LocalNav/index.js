import React from 'react';
import { NavContainer, NavWrapper, NavList, Navitem } from './styles';

function LocalNav() {
  return (
    <NavContainer>
      <NavWrapper>
        <NavList>
          <Navitem>전체보기</Navitem>
        </NavList>
        <NavList>
          <Navitem>양식</Navitem>
        </NavList>
        <NavList>
          <Navitem>한식</Navitem>
        </NavList>
        <NavList>
          <Navitem>중식</Navitem>
        </NavList>
        <NavList>
          <Navitem>분식</Navitem>
        </NavList>
        <NavList>
          <Navitem>야식</Navitem>
        </NavList>
        <NavList>
          <Navitem>카페/디저트</Navitem>
        </NavList>
      </NavWrapper>
    </NavContainer>
  );
}

export default LocalNav;
