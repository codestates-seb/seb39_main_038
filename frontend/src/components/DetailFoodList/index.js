import React from 'react';
// import { useRecoilValue } from 'recoil';
// import { selectors } from '../../store';
import { Section, Menu, MenuInfo, Name, Info, Price, MenuImg } from './styles';

// function FoodMenuList() {
//   const menu = useRecoilValue(selectors.getMenu);
//   return (
//     <>
//       <span>{menu.name}</span>
//       <span>{menu.info}</span>
//       <span>{menu.price}</span>
//       <span>{menu.img}</span>
//     </>
//   );
// }

function DetailFoodList() {
  // const menu = useRecoilValue(getMenu);
  return (
    <Section>
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
