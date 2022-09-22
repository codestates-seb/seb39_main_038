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
          {/* <FoodMenuList /> */}
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
    </Section>
  );
}

export { DetailFoodList };
