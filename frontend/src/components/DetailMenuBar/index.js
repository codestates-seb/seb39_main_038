import React from 'react';
import { useRecoilState } from 'recoil';
import { atoms } from '../../store';
import { MenuBar, TabBtn, Section } from './styles';
import { DetailFoodMenu } from '../DetailFoodMenu';
import { DetailInfo } from '../DetailInfo';
import { DetailReview } from '../DetailReview';

function DetailMenuBar() {
  const [menu, setMenu] = useRecoilState(atoms.menuTab);

  return (
    <Section>
      <MenuBar>
        <TabBtn
          type="button"
          onClick={() => {
            setMenu('메뉴');
          }}
        >
          메뉴 35
        </TabBtn>
        <TabBtn
          type="button"
          onClick={() => {
            setMenu('리뷰');
          }}
        >
          클린리뷰 1740
        </TabBtn>
        <TabBtn
          type="button"
          onClick={() => {
            setMenu('정보');
          }}
        >
          정보
        </TabBtn>
      </MenuBar>
      {menu === '메뉴' ? <DetailFoodMenu /> : null}
      {menu === '리뷰' ? <DetailReview /> : null}
      {menu === '정보' ? <DetailInfo /> : null}
    </Section>
  );
}

export { DetailMenuBar };
