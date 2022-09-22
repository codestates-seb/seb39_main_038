import React from 'react';
import { useRecoilState } from 'recoil';
import { atoms } from '../../store';
import {
  MenuBar,
  ReviewTabBtn,
  InfoTabBtn,
  MenuTabBtn,
  Section,
} from './styles';
import { DetailFoodList } from '../DetailFoodList';
import { DetailInfo } from '../DetailInfo';
import { DetailReview } from '../DetailReview';

function DetailMenuBar() {
  const [menu, setMenu] = useRecoilState(atoms.menuTab);

  return (
    <Section>
      <MenuBar>
        <MenuTabBtn
          menu={menu}
          type="button"
          onClick={() => {
            setMenu('메뉴');
          }}
        >
          메뉴 35
        </MenuTabBtn>
        <ReviewTabBtn
          menu={menu}
          type="button"
          onClick={() => {
            setMenu('리뷰');
          }}
        >
          클린리뷰 1740
        </ReviewTabBtn>
        <InfoTabBtn
          menu={menu}
          type="button"
          onClick={() => {
            setMenu('정보');
          }}
        >
          정보
        </InfoTabBtn>
      </MenuBar>
      {menu === '메뉴' ? <DetailFoodList /> : null}
      {menu === '리뷰' ? <DetailReview /> : null}
      {menu === '정보' ? <DetailInfo /> : null}
    </Section>
  );
}

export { DetailMenuBar };
