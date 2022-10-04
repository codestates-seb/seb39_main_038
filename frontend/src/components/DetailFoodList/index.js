import React from 'react';
import { useSetRecoilState } from 'recoil';
import { atoms } from '../../store';
import { CustomModal } from '../CustomModal';
import { Section, Menu, MenuInfo, Name, Info, Price, MenuImg } from './styles';
import { useModal } from '../../hooks';

const foods = [
  { name: '치킨', info: '바삭한 치킨', price: 10000, img: null },
  { name: '피자', info: '바삭한 피자', price: 10000, img: null },
];

function DetailFoodList() {
  const [openFood, closeFood] = useModal('food');
  const setMenuOrder = useSetRecoilState(atoms.menuOrder);

  const handleOnClick = (data) => () => {
    openFood();
    setMenuOrder({ ...data });
  };

  const createFoodMenuList = () => {
    return foods.map((menu) => (
      <Menu key={menu.name} onClick={handleOnClick(menu)}>
        <MenuInfo>
          <Name>{menu.name}</Name>
          <Info>{menu.info}</Info>
          <Price>{menu.price}</Price>
        </MenuInfo>
        <MenuImg>
          <img alt="menuImg" src={menu.img} />
        </MenuImg>
      </Menu>
    ));
  };

  return (
    <Section>
      {createFoodMenuList()}
      <CustomModal.Food closeModal={closeFood} />
    </Section>
  );
}

export { DetailFoodList };
