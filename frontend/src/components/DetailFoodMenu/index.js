import React from 'react';
import { useRecoilValue } from 'recoil';
import { getMenu } from '../../../atom';
import { Section, Menu, MenuInfo, MenuImg } from './styles';

function FoodMenuList() {
  const menu = useRecoilValue(getMenu);
  return (
    <>
      <span>{menu.name}</span>
      <span>{menu.info}</span>
      <span>{menu.price}</span>
      <span>{menu.img}</span>
    </>
  );
}

function DetailFoodMenu() {
  // const menu = useRecoilValue(getMenu);
  return (
    <Section>
      <Menu>
        <MenuInfo>
          <span>치킨</span>
          <span>빠삭한 치킨입니다!</span>
          <span>12,000원</span>
          <FoodMenuList />
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>

      <Menu>
        <MenuInfo>
          <span>치킨</span>
          <span>빠삭한 치킨입니다!</span>
          <span>12,000원</span>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>

      <Menu>
        <MenuInfo>
          <span>치킨</span>
          <span>빠삭한 치킨입니다!</span>
          <span>12,000원</span>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>

      <Menu>
        <MenuInfo>
          <span>치킨</span>
          <span>빠삭한 치킨입니다!</span>
          <span>12,000원</span>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>
    </Section>
  );
}

export { DetailFoodMenu };
