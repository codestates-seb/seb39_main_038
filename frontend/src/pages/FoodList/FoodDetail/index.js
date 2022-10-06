import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFoodDetail } from '../../../hooks';
import {
  Section,
  MainBody,
  FoodTruckName,
  FoodTruckCapsulizedInfo,
  FoodTruckImg,
  CapsulizedInfo,
  Notice,
  MenuBar,
  ReviewTabBtn,
  InfoTabBtn,
  MenuTabBtn,
  MenuSection,
  InfoItem,
  Text,
  FoodTruckTag,
} from './styles';
import {
  DetailFoodList,
  DetailInfo,
  DetailReview,
  Receipt,
} from '../../../components';

function FoodDetail() {
  const { id } = useParams();
  const { data } = useFoodDetail(id);
  const [menu, setMenu] = useState('메뉴');
  const handleOnClick = (tabItem) => () => setMenu(tabItem);

  const {
    storeName,
    storeImage,
    storeContent,
    totalGrade,
    storeWaitTime,
    storeTag,
    totalMenu,
    totalReview,
  } = data.data.data;

  const { FOODTRUCK_IMG } = process.env;

  return (
    <Section>
      <MainBody>
        <FoodTruckName>{storeName}</FoodTruckName>
        <FoodTruckCapsulizedInfo>
          <FoodTruckImg src={storeImage || FOODTRUCK_IMG} />
          <CapsulizedInfo>
            <InfoItem>
              <Text color="#999999" size={13}>
                별점
              </Text>
              <Text color="#333333" size={13}>
                {totalGrade}
              </Text>
            </InfoItem>
            <InfoItem>
              <Text color="#999999" size={13}>
                대기시간
              </Text>
              <Text color="#333333" size={13}>
                {storeWaitTime}
              </Text>
            </InfoItem>
            <InfoItem>
              <Text color="#999999" size={13}>
                태그
              </Text>
              <FoodTruckTag>{storeTag}</FoodTruckTag>
            </InfoItem>
          </CapsulizedInfo>
        </FoodTruckCapsulizedInfo>
        <Notice className="Notice">
          <Text as="strong" color="#333333" size={12}>
            사장님알림
          </Text>
          <Text color="#666666" size={12}>
            {storeContent}
          </Text>
        </Notice>

        <MenuSection>
          <MenuBar>
            <MenuTabBtn
              menu={menu}
              type="button"
              onClick={handleOnClick('메뉴')}
            >
              메뉴 {totalMenu}
            </MenuTabBtn>
            <ReviewTabBtn
              menu={menu}
              type="button"
              onClick={handleOnClick('리뷰')}
            >
              클린리뷰 {totalReview}
            </ReviewTabBtn>
            <InfoTabBtn
              menu={menu}
              type="button"
              onClick={handleOnClick('정보')}
            >
              정보
            </InfoTabBtn>
          </MenuBar>
          {menu === '메뉴' ? (
            <DetailFoodList storeId={id} storeName={storeName} />
          ) : null}
          {menu === '리뷰' ? <DetailReview storeId={id} /> : null}
          {menu === '정보' ? <DetailInfo storeId={id} /> : null}
        </MenuSection>
      </MainBody>
      <Receipt />
    </Section>
  );
}

export default FoodDetail;
