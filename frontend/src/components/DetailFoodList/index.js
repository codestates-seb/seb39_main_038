import React from 'react';
import { useSetRecoilState } from 'recoil';
import { atoms } from '../../store';
import { CustomModal } from '../CustomModal';
import { Section, Menu, MenuInfo, Name, Info, Price, MenuImg } from './styles';
import { useModal, useDetailFoodList } from '../../hooks';

function DetailFoodList({ storeId, storeName }) {
  const [openFood, closeFood] = useModal('food');
  const setMenuOrder = useSetRecoilState(atoms.menuOrder);
  const { data } = useDetailFoodList(storeId);

  const handleOnClick = (id, name, value) => () => {
    openFood();
    setMenuOrder({ storeId: id, storeName: name, ...value });
  };

  const createFoodMenuList = () => {
    return data?.data.menus.map((menu) => (
      <Menu key={menu.name} onClick={handleOnClick(storeId, storeName, menu)}>
        <MenuInfo>
          <Name>{menu.name}</Name>
          <Info>{menu.content}</Info>
          <Price>{menu.price}</Price>
        </MenuInfo>
        {menu.image ? (
          <MenuImg>
            <img alt="menuImg" src={menu.image} />
          </MenuImg>
        ) : null}
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
