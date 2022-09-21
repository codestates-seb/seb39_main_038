import React from 'react';
import DetailMenuBar from '../../components/DetailMenuBar';
import {
  Section,
  MainBody,
  FoodTruckName,
  FoodTruckCapsulizedInfo,
  FoodTruckImg,
  CapsulizedInfo,
  Notice,
  StickyBody,
  Cart,
  CartTab,
  CartList,
  CartListAdd,
  TotalPrice,
  OrderBtn,
} from './Detailstyles';

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
      <StickyBody>
        <Cart>
          <CartTab>
            <div>장바구니</div>
            <button type="button">리셋</button>
          </CartTab>

          <CartList>
            <div>햄버거</div>

            <CartListAdd>
              <div>8,000원</div>
              <div className="수량버튼">
                <button type="button">-</button>
                <span>1</span>
                <button type="button">+</button>
              </div>
            </CartListAdd>
          </CartList>
          <CartList>
            <div>치킨</div>

            <CartListAdd>
              <div>12,000원</div>
              <div className="수량버튼">
                <button type="button">-</button>
                <span>2</span>
                <button type="button">+</button>
              </div>
            </CartListAdd>
          </CartList>
          <TotalPrice className="totalPrice">합계: 20,000원</TotalPrice>
        </Cart>
        <OrderBtn>
          <button type="button">주문 취소</button>
          <button type="button">바로 주문하기</button>
        </OrderBtn>
      </StickyBody>
    </Section>
  );
}

export default FoodDetail;
