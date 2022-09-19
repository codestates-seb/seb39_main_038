import React from 'react';
import DetailMenuBar from '../../components/DetailMenuBar';
import {
  Section,
  FoodTruckName,
  FoodTruckCapsulizedInfo,
  FoodTruckImg,
  CapsulizedInfo,
  Notice,
  FoodMenu,
  Menu,
  MenuImg,
} from './Detailstyles';

function FoodDetail() {
  return (
    <Section>
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

      <FoodMenu>
        <Menu>
          <span>치킨</span>
          <span>빠삭한 치킨입니다!</span>
          <span>12,000원</span>
        </Menu>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </FoodMenu>

      <div className="장바구니">
        <div className="장바구니 탭">
          장바구니
          <button type="button">리셋</button>
        </div>

        <div className="장바구니 내용">
          <div className="장바구니 메뉴이름">치킨</div>

          <div className="장바구니 메뉴가격&수량">
            12,000원
            <div className="수량버튼">
              <button type="button">-</button>
              <span>1</span>
              <button type="button">+</button>
            </div>
          </div>
        </div>
        <div className="totalPrice">합계: 12,000원</div>
      </div>
      <div className="주문 버튼">
        <button type="button">주문 취소</button>
        <button type="button">바로 주문하기</button>
      </div>
    </Section>
  );
}

export default FoodDetail;
