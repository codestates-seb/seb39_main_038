import axios from 'axios';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectors } from '../../store';
import { Section, Menu, MenuInfo, Name, Info, Price, MenuImg } from './styles';

function FoodMenuList() {
  const menu = useRecoilValue(selectors.getMenu);
  return (
    <Menu>
      <MenuInfo>
        <Name>{menu.name}</Name>
        <Info>{menu.info}</Info>
        <Price>{menu.price}</Price>
      </MenuInfo>
      <MenuImg>
        <img alt="menuImg" src={menu.img} />
      </MenuImg>
    </Menu>
  );
}

function DetailFoodList() {
  const AddOrder = () => {
    axios
      .post('ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com/order', {
        menuId: 1,
        count: 2,
      })
      .then(() => {
        alert('success');
      })
      .catch((res) => {
        alert(res);
      });
  };

  const onHandlerGetCart = () => {
    AddOrder();
  };

  return (
    <Section>
      <FoodMenuList />
      <Menu onClick={onHandlerGetCart}>
        <MenuInfo>
          <Name>치킨</Name>
          <Info>빠삭한 치킨입니다!</Info>
          <Price>12,000원</Price>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>

      <Menu>
        <MenuInfo>
          <Name>치킨</Name>
          <Info>빠삭한 치킨입니다!</Info>
          <Price>12,000원</Price>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>

      <Menu>
        <MenuInfo>
          <Name>햄버거</Name>
          <Info>두툼한 햄버거입니다!</Info>
          <Price>8,000원</Price>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>

      <Menu>
        <MenuInfo>
          <Name>피자</Name>
          <Info>말랑한 피자입니다!</Info>
          <Price>18,000원</Price>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>
    </Section>
  );
}

export { DetailFoodList };
