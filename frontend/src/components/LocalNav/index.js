import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { atoms } from '../../store';
import { NavContainer, NavWrapper, NavList, Navitem } from './styles';
import { MENU } from '../../constants';

function LocalNav() {
  const setMenuQuery = useSetRecoilState(atoms.menuQuery);
  const navigate = useNavigate();
  const createNavList = () => {
    return MENU.map((item) => (
      <NavList key={item.id} value={item.query}>
        <Navitem>{item.title}</Navitem>
      </NavList>
    ));
  };
  const handleOnClick = (e) => {
    const $li = e.target.closest('li');
    setMenuQuery($li.value);
    navigate('/foodlist');
  };
  return (
    <NavContainer onClick={handleOnClick}>
      <NavWrapper>{createNavList()}</NavWrapper>
    </NavContainer>
  );
}

export { LocalNav };
