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
      return (
        <NavList
          key={item.id}
          data-value={item.query}
          active={menuQuery === item.query}
        >
          <Navitem>{item.title}</Navitem>
        </NavList>
      );
    });
  };

  const handleOnClick = (e) => {
    const $li = e.target.closest('li');
    setMenuQuery($li.dataset.value);
    navigate(`/${ROUTE.FOODLIST.PATH}`);
  };

  return (
    <NavContainer onClick={handleOnClick}>
      <NavWrapper>{createNavList()}</NavWrapper>
    </NavContainer>
  );
}

export { LocalNav };
