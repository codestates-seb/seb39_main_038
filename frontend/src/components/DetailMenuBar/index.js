import React from 'react';
import styled from 'styled-components';

const MenuBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0px 0px;
`;

const TabBtn = styled.button`
  width: 33.3%;
  height: 47px;
  background-color: ${(e) => e.theme.mainColor};
  color: ${(e) => e.theme.fontColor};
  font-size: 20px;
  font-weight: 900;
`;

function DetailMenuBar() {
  return (
    <MenuBar>
      <TabBtn type="button">메뉴 35</TabBtn>
      <TabBtn type="button">클린리뷰 1740</TabBtn>
      <TabBtn type="button">정보</TabBtn>
    </MenuBar>
  );
}

export default DetailMenuBar;
