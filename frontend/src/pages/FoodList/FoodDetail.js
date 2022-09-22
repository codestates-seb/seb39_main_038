import React from 'react';
import { DetailMenuBar, Receipt } from '../../components';
import {
  Section,
  MainBody,
  FoodTruckName,
  FoodTruckCapsulizedInfo,
  FoodTruckImg,
  CapsulizedInfo,
  Notice,
} from './styles';

function FoodDetail() {
  return (
    <Section>
      <MainBody>
        <FoodTruckName>
          <div>맘스터치</div>
        </FoodTruckName>

        <FoodTruckCapsulizedInfo>
          <FoodTruckImg>
            <img alt="FoodTruckImg" />
          </FoodTruckImg>

          <CapsulizedInfo>
            <span>별점</span>
            <span>대기줄 시간</span>
            <span>정보</span>
          </CapsulizedInfo>
        </FoodTruckCapsulizedInfo>

        <Notice className="Notice">
          <div>사장님의 알림</div>
        </Notice>

        <DetailMenuBar />
      </MainBody>
      <Receipt />
    </Section>
  );
}

export default FoodDetail;
