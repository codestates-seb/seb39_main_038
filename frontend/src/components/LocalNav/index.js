import React from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { atoms } from '../../store';
import { NavContainer, NavWrapper, NavList, Navitem } from './styles';
import { MENU, ROUTE } from '../../constants';

function LocalNav() {
  const [menuQuery, setMenuQuery] = useRecoilState(atoms.menuQuery);
  const navigate = useNavigate();

  const createNavList = () => {
    return MENU.map((item) => {
      console.log(menuQuery, item.query);
      return (
        <NavList
          key={item.id}
          value={item.query}
          active={menuQuery.toString() === item.query}
        >
          <Navitem>{item.title}</Navitem>
        </NavList>
      );
    });
  };

  const handleOnClick = (e) => {
    const $li = e.target.closest('li');
    setMenuQuery($li.value);
    navigate(`/${ROUTE.FOODLIST.PATH}`);
  };

  return (
    <NavContainer onClick={handleOnClick}>
      <NavWrapper>{createNavList()}</NavWrapper>
    </NavContainer>
  );
}

export { LocalNav };
