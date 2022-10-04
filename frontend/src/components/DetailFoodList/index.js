import React from 'react';
import { useSetRecoilState } from 'recoil';
import { atoms } from '../../store';
import { CustomModal } from '../CustomModal';
import { Section, Menu, MenuInfo, Name, Info, Price, MenuImg } from './styles';
import { useModal, useDetailFoodList } from '../../hooks';

function DetailFoodList({ id }) {
  const [openFood, closeFood] = useModal('food');
  const setMenuOrder = useSetRecoilState(atoms.menuOrder);
  const { data } = useDetailFoodList(id);

  const handleOnClick = (value, storeId) => () => {
    openFood();
    setMenuOrder({ storeId, ...value });
  };

  const createFoodMenuList = () => {
    return data?.data.storeMenu.map((menu) => (
      <Menu key={menu.name} id={id} onClick={handleOnClick(menu, id)}>
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
